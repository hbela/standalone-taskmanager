# 🚀 Fastify API Server - Quick Setup

## ✅ Server Created Successfully!

Your Fastify API server is ready with Google authentication support.

## 📋 Quick Start

### 1. Configure Environment Variables

You need to create a `.env` file in the `server` directory manually (it's gitignored):

```bash
cd server
```

Create `.env` with this content:
```env
PORT=3001
NODE_ENV=development
GOOGLE_CLIENT_ID=<COPY_FROM_YOUR_MAIN_.ENV_FILE>
JWT_SECRET=super-secret-jwt-key-change-this-to-something-random
ALLOWED_ORIGINS=*
```

**Important**: Copy the `EXPO_PUBLIC_WEB_CLIENT_ID` value from your main `.env` file and use it as `GOOGLE_CLIENT_ID` here.

### 2. Start the Server

```bash
npm run dev
```

You should see:
```
🚀 Server is running!
📍 URL: http://localhost:3001
🌍 Network: http://192.168.1.1:3001

Available endpoints:
  GET  /health
  POST /auth/google
  POST /auth/verify
  GET  /auth/me
  POST /auth/logout
```

### 3. Test the Server

Open a browser and go to:
```
http://localhost:3001
```

You should see the API information.

Test health check:
```
http://localhost:3001/health
```

## 📡 API Endpoints

### POST /auth/google
Authenticate with Google ID token and get a session token.

**Request:**
```json
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

### GET /auth/me
Get current user info using session token.

**Headers:**
```
Authorization: Bearer <sessionToken>
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

## 🔧 Project Structure

```
server/
├── src/
│   ├── index.ts      # Main server (Fastify setup, CORS, routes)
│   ├── routes.ts     # Authentication endpoints
│   └── auth.ts       # Google token verification, JWT generation
├── .env              # Your config (CREATE THIS MANUALLY)
├── .env.example      # Template
├── package.json      # Dependencies
├── tsconfig.json     # TypeScript config
└── README.md         # Full documentation
```

## 🔐 How It Works

1. **Mobile app** signs in with Google → gets ID token
2. **Mobile app** sends ID token to `POST /auth/google`
3. **Server** verifies ID token with Google
4. **Server** generates JWT session token
5. **Server** returns user info + session token
6. **Mobile app** stores session token
7. **Mobile app** uses session token for API calls

## 🎯 Next: Integrate with Mobile App

See `docs/INTEGRATE_BACKEND.md` for instructions on connecting your mobile app to this server.

## 📚 Full Documentation

See `server/README.md` for complete documentation including:
- All API endpoints
- Testing with cURL
- Deployment instructions
- Security best practices
- Troubleshooting

---

**Ready to start!** Run `npm run dev` in the server directory 🚀
