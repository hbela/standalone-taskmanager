import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { generateSessionToken, verifyGoogleToken, verifySessionToken } from './auth';

interface GoogleSignInBody {
  idToken: string;
}

interface VerifyTokenBody {
  sessionToken: string;
}

export async function authRoutes(fastify: FastifyInstance) {
  /**
   * POST /auth/google
   * Authenticate user with Google ID token
   */
  fastify.post<{ Body: GoogleSignInBody }>(
    '/auth/google',
    {
      schema: {
        body: {
          type: 'object',
          required: ['idToken'],
          properties: {
            idToken: { type: 'string' },
          },
        },
      },
    },
    async (request: FastifyRequest<{ Body: GoogleSignInBody }>, reply: FastifyReply) => {
      try {
        const { idToken } = request.body;

        // Verify Google ID token
        const user = await verifyGoogleToken(idToken);

        // Generate session token
        const sessionToken = generateSessionToken(user);

        return reply.code(200).send({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            picture: user.picture,
          },
          sessionToken,
        });
      } catch (error: any) {
        fastify.log.error(error);
        return reply.code(401).send({
          success: false,
          error: 'Authentication failed',
          message: error.message,
        });
      }
    }
  );

  /**
   * POST /auth/verify
   * Verify session token
   */
  fastify.post<{ Body: VerifyTokenBody }>(
    '/auth/verify',
    {
      schema: {
        body: {
          type: 'object',
          required: ['sessionToken'],
          properties: {
            sessionToken: { type: 'string' },
          },
        },
      },
    },
    async (request: FastifyRequest<{ Body: VerifyTokenBody }>, reply: FastifyReply) => {
      try {
        const { sessionToken } = request.body;

        // Verify session token
        const payload = verifySessionToken(sessionToken);

        return reply.code(200).send({
          success: true,
          user: {
            userId: payload.userId,
            email: payload.email,
            name: payload.name,
          },
        });
      } catch (error: any) {
        fastify.log.error(error);
        return reply.code(401).send({
          success: false,
          error: 'Invalid session token',
          message: error.message,
        });
      }
    }
  );

  /**
   * GET /auth/me
   * Get current user from Authorization header
   */
  fastify.get(
    '/auth/me',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return reply.code(401).send({
            success: false,
            error: 'Missing or invalid authorization header',
          });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        const payload = verifySessionToken(token);

        return reply.code(200).send({
          success: true,
          user: {
            userId: payload.userId,
            email: payload.email,
            name: payload.name,
          },
        });
      } catch (error: any) {
        fastify.log.error(error);
        return reply.code(401).send({
          success: false,
          error: 'Unauthorized',
          message: error.message,
        });
      }
    }
  );

  /**
   * POST /auth/logout
   * Logout (client-side token removal, server just acknowledges)
   */
  fastify.post(
    '/auth/logout',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.code(200).send({
        success: true,
        message: 'Logged out successfully',
      });
    }
  );
}
