# Google OAuth Redirect URI - UPDATED

## ✅ Correct Redirect URIs for Your App

Your app scheme is: **`new-taskmanager`**  
Your Expo username is: **`hajzerbela`**  
Your Expo owner is: **`elyscom`**

---

## 🔧 Google Cloud Console Configuration

### Add this redirect URI:

**Expo Proxy (works for both development and production):**
```
https://auth.expo.io/@elyscom/new-taskmanager
```

**Note:** Google Cloud Console only accepts `https://` URIs. The Expo proxy handles the redirect to your app's custom scheme automatically.

---

## 📝 Steps to Configure:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, add:
   ```
   https://auth.expo.io/@elyscom/new-taskmanager
   ```
5. Click **Save**
6. Wait 5-10 minutes for changes to propagate

---

## ✅ What I Fixed

Changed the OAuth redirect URI in `googleDriveService.ts` from:
```typescript
scheme: 'task-eas-google'  // ❌ Wrong
```

To:
```typescript
scheme: 'new-taskmanager'  // ✅ Correct (matches app.json)
```

---

## 🧪 Testing

After adding the redirect URIs to Google Cloud Console:

1. Wait 5-10 minutes
2. Try the export feature again
3. OAuth should work correctly now!

---

## 📱 Expected Behavior

When you tap Export:
1. ✅ Excel file generates
2. ✅ Google OAuth screen opens
3. ✅ You sign in and grant permissions
4. ✅ Redirects back to app correctly
5. ✅ File uploads to Google Drive
6. ✅ Success message appears

---

**The redirect URI is now correct!** Just update Google Cloud Console and you're good to go! 🎉
