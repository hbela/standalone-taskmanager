# Fastify API Server

Backend API server for Google authentication with JWT session management.

## 🚀 Features

- ✅ Google ID token verification
- ✅ JWT session token generation
- ✅ Protected API endpoints
- ✅ CORS configuration
- ✅ TypeScript support
- ✅ Hot reload in development

## 📋 Prerequisites

- Node.js 18+ installed
- Google Cloud Console Web Client ID

## 🛠️ Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your configuration:

```env
PORT=3001
NODE_ENV=development

# Copy this from your main .env file
GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com

# Generate a random secret (use a password generator)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Allow all origins in development
ALLOWED_ORIGINS=*
```

### 3. Start the Server

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:3001`

## 📡 API Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-10T15:30:00.000Z"
}
```

### Google Sign-In
```http
POST /auth/google
Content-Type: application/json

{
  "idToken": "eyJhbGciOiJSUzI1NiIs..."
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "123456789",
    "email": "user@gmail.com",
    "name": "User Name",
    "picture": "https://..."
  },
  "sessionToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Verify Session Token
```http
POST /auth/verify
Content-Type: application/json

{
  "sessionToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "userId": "123456789",
    "email": "user@gmail.com",
    "name": "User Name"
  }
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "success": true,
  "user": {
    "userId": "123456789",
    "email": "user@gmail.com",
    "name": "User Name"
  }
}
```

### Logout
```http
POST /auth/logout
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## 🔧 Project Structure

```
server/
├── src/
│   ├── index.ts      # Main server file
│   ├── routes.ts     # API routes
│   └── auth.ts       # Authentication utilities
├── .env              # Environment variables (create this)
├── .env.example      # Environment template
├── package.json      # Dependencies
└── tsconfig.json     # TypeScript config
```

## 🔐 Authentication Flow

1. **Mobile App** gets Google ID token from `@react-native-google-signin/google-signin`
2. **Mobile App** sends ID token to `POST /auth/google`
3. **Server** verifies ID token with Google
4. **Server** generates JWT session token
5. **Server** returns user info + session token
6. **Mobile App** stores session token securely
7. **Mobile App** uses session token for subsequent API calls

## 🧪 Testing with cURL

### Sign in with Google:
```bash
curl -X POST http://localhost:3001/auth/google \
  -H "Content-Type: application/json" \
  -d '{"idToken": "YOUR_GOOGLE_ID_TOKEN"}'
```

### Verify session:
```bash
curl -X POST http://localhost:3001/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"sessionToken": "YOUR_SESSION_TOKEN"}'
```

### Get current user:
```bash
curl http://localhost:3001/auth/me \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN"
```

## 🔒 Security Notes

- **JWT_SECRET**: Use a long, random string in production
- **CORS**: Configure `ALLOWED_ORIGINS` properly for production
- **HTTPS**: Always use HTTPS in production
- **Token Expiry**: Session tokens expire after 7 days
- **Environment Variables**: Never commit `.env` to git

## 📦 Dependencies

- **fastify**: Fast web framework
- **@fastify/cors**: CORS support
- **google-auth-library**: Google ID token verification
- **jsonwebtoken**: JWT token generation/verification
- **dotenv**: Environment variable management
- **tsx**: TypeScript execution with hot reload

## 🚀 Deployment

### Using Node.js:
```bash
npm run build
NODE_ENV=production node dist/index.js
```

### Using PM2:
```bash
npm install -g pm2
npm run build
pm2 start dist/index.js --name task-api
```

### Environment Variables for Production:
```env
PORT=3001
NODE_ENV=production
GOOGLE_CLIENT_ID=your-production-client-id
JWT_SECRET=very-long-random-secret-key
ALLOWED_ORIGINS=https://yourdomain.com
```

## 🐛 Troubleshooting

### "Invalid Google token" error:
- Check that `GOOGLE_CLIENT_ID` matches your Web Client ID
- Ensure the ID token is fresh (they expire quickly)
- Verify the ID token is from the correct Google project

### CORS errors:
- Add your mobile app's origin to `ALLOWED_ORIGINS`
- Use `*` for development (not recommended for production)

### JWT errors:
- Ensure `JWT_SECRET` is set and consistent
- Check that the session token hasn't expired

## 📚 Next Steps

- Add database integration for user persistence
- Implement refresh tokens
- Add rate limiting
- Add request validation
- Add logging and monitoring
- Implement user roles and permissions

---

**Server ready!** Start with `npm run dev` 🚀
