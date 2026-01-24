# Google OAuth Client Types - Complete Guide

## Overview

Google OAuth supports different client types for different platforms. Understanding which to use is crucial for proper authentication.

## Client Types

### 1. Android Client
**When to use**: Expo/React Native mobile apps (RECOMMENDED)
**Requires**: Package name + SHA-1 certificate fingerprint
**Redirect URI**: Handled automatically by Android OS
**Client Secret**: NOT used (Android apps don't need it)

### 2. Web Client
**When to use**: 
- Web applications
- Server-side OAuth flows
- Fallback for Expo apps (less secure)

**Requires**: Authorized redirect URIs and JavaScript origins
**Client Secret**: Used for server-side flows ONLY (never expose in mobile apps)

### 3. iOS Client
**When to use**: Native iOS apps
**Requires**: Bundle ID
**Client Secret**: NOT used

## For Your Expo App

### Recommended: Android Client

**Setup**:
1. Create Android OAuth client in Google Cloud Console
2. Package name: `com.taskmanager.app`
3. SHA-1: `B4:89:CC:E0:56:D5:4F:5C:54:8D:D0:3F:32:96:7D:E9:7F:21:7B:7E`
4. No redirect URI needed (handled by Android)
5. No client secret needed

**In .env**:
```env
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=YOUR_ANDROID_CLIENT_ID
```

**Pros**:
- ✅ More secure (no redirect URI to configure)
- ✅ Better user experience
- ✅ Recommended by Google for mobile apps
- ✅ No client secret exposure risk

**Cons**:
- ⚠️ Requires rebuilding app if SHA-1 changes
- ⚠️ Separate client for each platform (Android/iOS)

### Alternative: Web Client (Current Setup)

**Setup**:
1. Use existing Web OAuth client
2. Add redirect URI: `https://auth.expo.io/@elyscom/new-taskmanager`
3. Add JavaScript origin: `https://auth.expo.io`
4. Client secret NOT used in mobile app

**In .env**:
```env
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
```

**Pros**:
- ✅ Works immediately (no app rebuild needed)
- ✅ Same client for all platforms
- ✅ Easier to test during development

**Cons**:
- ⚠️ Less secure (redirect URI can be spoofed)
- ⚠️ Requires proper redirect URI configuration
- ⚠️ Not recommended for production

## Environment Variable Naming Convention

### Current Configuration (Using Web Client)

```env
# Google Sign-In (for user authentication)
EXPO_PUBLIC_WEB_CLIENT_ID=748565427378-7grplag7b4g748mubf6li27a5diba37p.apps.googleusercontent.com

# Google Drive OAuth (using Web Client temporarily)
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
```

### Recommended Configuration (Using Android Client)

```env
# Google Sign-In (for user authentication)
EXPO_PUBLIC_WEB_CLIENT_ID=748565427378-7grplag7b4g748mubf6li27a5diba37p.apps.googleusercontent.com

# Google Drive OAuth (using Android Client - RECOMMENDED)
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=YOUR_ANDROID_CLIENT_ID_HERE
```

### If You Need Both (Development + Production)

```env
# Google Sign-In
EXPO_PUBLIC_WEB_CLIENT_ID=748565427378-7grplag7b4g748mubf6li27a5diba37p.apps.googleusercontent.com

# Google Drive - Android Client (Production)
EXPO_PUBLIC_GOOGLE_DRIVE_ANDROID_CLIENT_ID=YOUR_ANDROID_CLIENT_ID

# Google Drive - Web Client (Development/Testing)
EXPO_PUBLIC_GOOGLE_DRIVE_WEB_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com

# Active configuration (switch between them)
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=${EXPO_PUBLIC_GOOGLE_DRIVE_WEB_CLIENT_ID}
```

## Important: Client Secret

### ❌ DO NOT use Client Secret in mobile apps

```env
# ❌ WRONG - Never include client secret in mobile apps
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_SECRET=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
```

**Why?**
- Mobile apps are public clients (code can be decompiled)
- Client secret would be exposed to anyone who downloads your app
- Security risk: Anyone could impersonate your app
- Not needed for mobile OAuth flows (PKCE is used instead)

### ✅ When Client Secret IS needed

Client secret is ONLY used for:
- Server-side OAuth flows
- Backend API authentication
- Web applications with a secure backend

If you need server-side OAuth:
```env
# Server-side only (never exposed to mobile app)
GOOGLE_DRIVE_WEB_CLIENT_SECRET=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
```

Note: No `EXPO_PUBLIC_` prefix (not exposed to the app)

## Your Current Setup

Based on your `.env` file, you have:

1. **Google Sign-In**: Web Client ID
   - Used for: User authentication
   - Variable: `EXPO_PUBLIC_WEB_CLIENT_ID`

2. **Google Drive**: Web Client ID (temporary)
   - Used for: Google Drive file uploads
   - Variable: `EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID`
   - Current value: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`

## Recommended Action Plan

### Option 1: Quick Fix (Use Web Client)
**Best for**: Testing immediately

1. Keep current Web Client ID
2. Configure redirect URI in Google Cloud Console:
   - Add: `https://auth.expo.io/@elyscom/new-taskmanager`
   - Add origin: `https://auth.expo.io`
3. Remove client secret from `.env`
4. Test immediately (no app rebuild needed)

### Option 2: Production Setup (Use Android Client)
**Best for**: Production deployment

1. Create Android OAuth client in Google Cloud Console
2. Update `.env` with Android Client ID
3. Remove Web Client ID and secret
4. Rebuild app with EAS Build
5. Test on device

## Migration Path

### Phase 1: Development (Now)
```env
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
```
- Use Web Client
- Configure redirect URI
- Test and develop

### Phase 2: Production (Later)
```env
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=YOUR_ANDROID_CLIENT_ID
```
- Switch to Android Client
- Rebuild app
- Deploy to production

## Summary

**Variable Naming**:
- ✅ `EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID` - Main client ID (Android or Web)
- ✅ `EXPO_PUBLIC_GOOGLE_DRIVE_ANDROID_CLIENT_ID` - Specific Android client (optional)
- ✅ `EXPO_PUBLIC_GOOGLE_DRIVE_WEB_CLIENT_ID` - Specific Web client (optional)
- ❌ `EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_SECRET` - NEVER use in mobile apps
- ✅ `GOOGLE_DRIVE_WEB_CLIENT_SECRET` - Server-side only (no EXPO_PUBLIC prefix)

**Current Recommendation**:
Use the Web Client ID for now to test quickly, then migrate to Android Client for production.

**Security**:
- Never include client secret in `.env` with `EXPO_PUBLIC_` prefix
- Use PKCE for mobile OAuth (automatically handled by `expo-auth-session`)
- Android Client is more secure than Web Client for mobile apps
