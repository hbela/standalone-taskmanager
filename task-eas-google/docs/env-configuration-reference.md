# Your .env Configuration - Quick Reference

## Current Setup Summary

You have **TWO** different Google OAuth configurations:

### 1. Google Sign-In (User Authentication)
```env
EXPO_PUBLIC_WEB_CLIENT_ID=748565427378-7grplag7b4g748mubf6li27a5diba37p.apps.googleusercontent.com
```
- **Purpose**: User authentication in your app
- **Type**: Web Client
- **Used by**: Your existing authentication system

### 2. Google Drive (File Upload)
You have created **TWO** OAuth clients for Google Drive:

#### Web Client (Current - for testing)
```
Client ID: 77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
Client Secret: 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
```

#### Android Client (New - for production)
```
Client ID: [You need to get this from Google Cloud Console]
Package: com.taskmanager.app
SHA-1: B4:89:CC:E0:56:D5:4F:5C:54:8D:D0:3F:32:96:7D:E9:7F:21:7B:7E
```

## Recommended .env File

### For Testing NOW (Using Web Client)

```env
# ============================================
# Google Sign-In Configuration
# ============================================
EXPO_PUBLIC_WEB_CLIENT_ID=748565427378-7grplag7b4g748mubf6li27a5diba37p.apps.googleusercontent.com


# ============================================
# Google Drive OAuth Configuration
# ============================================
# Using Web Client for quick testing
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com

# Note: Client Secret is NOT used in mobile apps (only for server-side OAuth)
# Do NOT add: EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_SECRET
```

**Required Google Cloud Console Configuration**:
1. Go to: https://console.cloud.google.com/apis/credentials
2. Edit Web Client: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`
3. Add Authorized redirect URI:
   ```
   https://auth.expo.io/@elyscom/new-taskmanager
   ```
4. Add Authorized JavaScript origin:
   ```
   https://auth.expo.io
   ```
5. Save

### For Production LATER (Using Android Client)

```env
# ============================================
# Google Sign-In Configuration
# ============================================
EXPO_PUBLIC_WEB_CLIENT_ID=748565427378-7grplag7b4g748mubf6li27a5diba37p.apps.googleusercontent.com


# ============================================
# Google Drive OAuth Configuration
# ============================================
# Using Android Client for production (more secure)
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=YOUR_ANDROID_CLIENT_ID_HERE
```

**Required Steps**:
1. Get Android Client ID from Google Cloud Console
2. Update `.env` with the Android Client ID
3. Rebuild app with EAS Build
4. No redirect URI configuration needed (handled by Android)

## Variable Naming Explained

### ✅ Correct Variable Names

| Variable Name | Purpose | When to Use |
|--------------|---------|-------------|
| `EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID` | **Main** Google Drive client ID | Always (this is what the app uses) |
| `EXPO_PUBLIC_GOOGLE_DRIVE_ANDROID_CLIENT_ID` | Android-specific client | Optional (if you want to store both) |
| `EXPO_PUBLIC_GOOGLE_DRIVE_WEB_CLIENT_ID` | Web-specific client | Optional (if you want to store both) |

### ❌ WRONG Variable Names

| Variable Name | Why It's Wrong |
|--------------|----------------|
| `EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_SECRET` | ❌ Client secret should NEVER be in mobile apps |
| `GOOGLE_DRIVE_CLIENT_ID` | ❌ Missing `EXPO_PUBLIC_` prefix (won't be accessible) |
| `EXPO_PUBLIC_DRIVE_CLIENT_ID` | ❌ Inconsistent naming |

## Client Secret - Important Notes

### ❌ DO NOT DO THIS:
```env
# WRONG - Never expose client secret in mobile apps!
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_SECRET=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
```

### ✅ If You Need Client Secret (Server-Side Only):
```env
# Correct - No EXPO_PUBLIC prefix (not exposed to app)
# Only use this if you have a backend server handling OAuth
GOOGLE_DRIVE_WEB_CLIENT_SECRET=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
```

**Why?**
- Mobile apps are "public clients" - anyone can decompile them
- Client secret would be visible to attackers
- Mobile OAuth uses PKCE instead (more secure, no secret needed)
- Only server-side apps need client secrets

## Your Next Steps

### Option A: Quick Test (Recommended for Now)

1. **Update `.env`** (already done):
   ```env
   EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
   ```

2. **Configure Google Cloud Console**:
   - Add redirect URI: `https://auth.expo.io/@elyscom/new-taskmanager`
   - Add JavaScript origin: `https://auth.expo.io`

3. **Test**:
   - Restart Metro: `npx expo start --clear`
   - Try export feature
   - Should work immediately!

### Option B: Production Setup (Later)

1. **Get Android Client ID** from Google Cloud Console
2. **Update `.env`**:
   ```env
   EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=YOUR_ANDROID_CLIENT_ID
   ```
3. **Rebuild app** with EAS Build
4. **Test** on device

## FAQ

**Q: Can I use both Web and Android clients?**
A: Yes! Store both in `.env` and switch between them:
```env
EXPO_PUBLIC_GOOGLE_DRIVE_WEB_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_DRIVE_ANDROID_CLIENT_ID=YOUR_ANDROID_CLIENT_ID

# Use Web for development
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=${EXPO_PUBLIC_GOOGLE_DRIVE_WEB_CLIENT_ID}

# Switch to Android for production
# EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=${EXPO_PUBLIC_GOOGLE_DRIVE_ANDROID_CLIENT_ID}
```

**Q: Do I need the client secret?**
A: **NO** for mobile apps. Only needed for server-side OAuth flows.

**Q: What about the Web Client secret I have?**
A: Don't include it in `.env` with `EXPO_PUBLIC_` prefix. It's not needed for mobile OAuth.

**Q: Which client type is more secure?**
A: Android Client is more secure for mobile apps. Web Client is fine for testing.

**Q: Can I use the same client for both Google Sign-In and Google Drive?**
A: You can, but it's better to keep them separate for different scopes and easier management.

## Summary

**For NOW (Testing)**:
- Use Web Client ID: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`
- Variable: `EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID`
- Configure redirect URI in Google Cloud Console
- No client secret needed
- No app rebuild needed

**For LATER (Production)**:
- Create and use Android Client ID
- Variable: `EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID`
- No redirect URI configuration needed
- No client secret needed
- Requires app rebuild
