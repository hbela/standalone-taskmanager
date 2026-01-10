import cors from '@fastify/cors';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import { authRoutes } from './routes';

// Load environment variables
dotenv.config();

// Create Fastify instance
const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Register CORS
fastify.register(cors, {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
});

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Root endpoint
fastify.get('/', async (request, reply) => {
  return {
    name: 'Task EAS Google API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      auth: {
        google: 'POST /auth/google',
        verify: 'POST /auth/verify',
        me: 'GET /auth/me',
        logout: 'POST /auth/logout',
      },
    },
  };
});

// Register routes
fastify.register(authRoutes);

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001', 10);
    const host = process.env.HOST || '0.0.0.0';

    await fastify.listen({ port, host });

    console.log('');
    console.log('🚀 Server is running!');
    console.log(`📍 URL: http://localhost:${port}`);
    console.log(`🌍 Network: http://${getLocalIP()}:${port}`);
    console.log('');
    console.log('Available endpoints:');
    console.log(`  GET  /health`);
    console.log(`  POST /auth/google`);
    console.log(`  POST /auth/verify`);
    console.log(`  GET  /auth/me`);
    console.log(`  POST /auth/logout`);
    console.log('');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Get local IP address
function getLocalIP(): string {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  
  return 'localhost';
}

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down gracefully...');
  await fastify.close();
  process.exit(0);
});

start();
