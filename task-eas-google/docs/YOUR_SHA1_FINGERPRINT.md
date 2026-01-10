# 🔐 Your EAS Keystore SHA-1 Fingerprint

## ✅ Retrieved SHA-1 Fingerprint

```
SHA1 Fingerprint: 0F:66:FE:E8:7B:65:DF:8C:77:29:F8:B5:00:D6:D7:A1:30:70:DF:9D
```

## 📋 Next Steps

### 1. Update Google Cloud Console

1. Go to: https://console.cloud.google.com/
2. Navigate to: **APIs & Services** → **Credentials**
3. Click on your **Android OAuth 2.0 Client ID**
4. Update/Add the **SHA-1 certificate fingerprint**:
   ```
   0F:66:FE:E8:7B:65:DF:8C:77:29:F8:B5:00:D6:D7:A1:30:70:DF:9D
   ```
5. Verify the **Package name** is: `com.taskmanager.app`
6. Click **Save**

### 2. Wait for Propagation

⏱️ Wait **5-10 minutes** for Google to propagate the changes across their servers.

### 3. Test Your App

1. Install the APK from your EAS build
2. Open the app
3. Tap "Sign in with Google"
4. Select your Google account
5. ✅ Sign-in should work!

---

## 📝 Additional Keystore Information

**From EAS Build Profile: development**

- **Type**: JKS
- **Key Alias**: 92b391278f2488921e356dd6b56b9d11
- **MD5 Fingerprint**: E3:FE:01:F0:1F:32:D8:65:3E:99:2F:A2:3D:50:45:8C
- **SHA1 Fingerprint**: 0F:66:FE:E8:7B:65:DF:8C:77:29:F8:B5:00:D6:D7:A1:30:70:DF:9D
- **SHA256 Fingerprint**: 45:04:51:ED:22:29:1B:04:7F:06:F3:28:4F:E0:9C:F6:49:02:AB:DE:AF:6E:6D:A9:E7:E3:6D:11:11:49:A5:05

---

## 💡 Pro Tips

### If You Build for Production Later

When you create a production build, EAS might use a different keystore. You'll need to:
1. Get the SHA-1 from the production keystore (same process)
2. Add it to the same Android OAuth client in Google Cloud Console
3. You can have **multiple SHA-1 fingerprints** on the same client!

### Multiple Keystores Support

You can add multiple SHA-1 fingerprints to your Android OAuth client:
- ✅ Development keystore SHA-1
- ✅ Production keystore SHA-1
- ✅ Local debug keystore SHA-1 (if testing locally)

This way, all your builds will work with Google Sign-In! 🎉

---

## 🔍 Verification Checklist

Before testing, verify in Google Cloud Console:

- ✅ Android OAuth 2.0 Client ID exists
- ✅ Package name: `com.taskmanager.app`
- ✅ SHA-1 fingerprint: `0F:66:FE:E8:7B:65:DF:8C:77:29:F8:B5:00:D6:D7:A1:30:70:DF:9D`
- ✅ Saved changes
- ✅ Waited 5-10 minutes

---

**Ready to update Google Cloud Console!** 🚀
