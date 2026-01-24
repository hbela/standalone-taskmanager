# 🔧 Fixing "Unable to Load Script" Error

## Problem
Your development build can't connect to the Metro bundler running on your computer.

**Error**: `java.lang.RuntimeException: Unable to load script`
**Connection Error**: `Failed to connect to 127.0.0.1:8081`

## ✅ Solution: Connect Your Phone to Metro Bundler

### Method 1: Using the Development Menu (Easiest)

1. **Make sure Metro is running** on your computer:
   ```bash
   npx expo start --dev-client
   ```
   You should see output like:
   ```
   Metro waiting on exp://192.168.1.1:8081
   ```

2. **On your phone**, shake the device or press the menu button to open the **Developer Menu**

3. **Select "Settings"** or "Dev Settings"

4. **Tap "Debug server host & port for device"**

5. **Enter your computer's IP address and port**:
   ```
   192.168.1.1:8081
   ```
   (Replace with your actual computer IP - see below to find it)

6. **Go back** and tap **"Reload"** in the developer menu

### Method 2: Using Expo Dev Client URL

1. **Start Metro bundler**:
   ```bash
   npx expo start --dev-client
   ```

2. **Look for the QR code** in the terminal

3. **In your development build app**, tap "Enter URL manually"

4. **Scan the QR code** or enter the URL shown (like `exp://192.168.1.1:8081`)

### Method 3: Using ADB (If USB Connected)

If your phone is connected via USB:

```bash
# Forward the port from your computer to your phone
adb reverse tcp:8081 tcp:8081

# Then reload the app
adb shell input keyevent 82  # Opens dev menu
```

---

## 🔍 Finding Your Computer's IP Address

### On Windows:
```bash
ipconfig
```
Look for **"Wireless LAN adapter Wi-Fi"** or **"Ethernet adapter"**
Find the line: **IPv4 Address** (e.g., `192.168.1.1`)

### Your Current IP Address:
Based on the ipconfig output, your IP is likely:
```
192.168.1.1
```

---

## ✅ Step-by-Step Checklist

### Before Starting:
- [ ] Your phone and computer are on the **same Wi-Fi network**
- [ ] Windows Firewall allows Metro bundler (port 8081)
- [ ] Metro bundler is running (`npx expo start --dev-client`)

### On Your Phone:
1. [ ] Open the development build app
2. [ ] Shake device to open developer menu
3. [ ] Go to Settings → "Debug server host & port"
4. [ ] Enter: `192.168.1.1:8081` (or your computer's IP)
5. [ ] Go back and tap "Reload"

---

## 🚨 Common Issues & Fixes

### Issue 1: "No apps connected"
**Cause**: The app isn't running or can't reach Metro
**Fix**: 
- Make sure the app is open on your phone
- Verify you entered the correct IP address
- Check both devices are on the same network

### Issue 2: Firewall Blocking Connection
**Cause**: Windows Firewall is blocking port 8081
**Fix**:
```bash
# Allow Metro bundler through firewall
netsh advfirewall firewall add rule name="Expo Metro" dir=in action=allow protocol=TCP localport=8081
```

### Issue 3: Wrong Network
**Cause**: Phone is on mobile data or different Wi-Fi
**Fix**: 
- Connect phone to the same Wi-Fi as your computer
- Disable mobile data temporarily

### Issue 4: Metro Not Running
**Cause**: Metro bundler crashed or wasn't started
**Fix**:
```bash
# Kill any existing Metro processes
npx expo start --dev-client --clear
```

---

## 🎯 Quick Fix Commands

### Restart Everything:
```bash
# 1. Stop Metro (Ctrl+C)

# 2. Clear cache and restart
npx expo start --dev-client --clear

# 3. On phone: Shake → Reload
```

### If Using USB (ADB):
```bash
# Forward port
adb reverse tcp:8081 tcp:8081

# Open dev menu
adb shell input keyevent 82

# Then tap "Reload" on phone
```

---

## 📱 Alternative: Use Tunnel Mode

If you can't get local network connection working, use Expo's tunnel:

```bash
npx expo start --dev-client --tunnel
```

This creates a public URL that works even if you're on different networks (slower but more reliable).

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Metro shows: "› Opening on Android..."
- ✅ App loads without the "Unable to load script" error
- ✅ You see your app's home screen with the Google Sign-In button
- ✅ Hot reload works when you save files

---

## 🎉 Next Steps After Fixing

Once the app loads successfully:
1. Test the Google Sign-In button
2. Verify the SHA-1 fingerprint is updated in Google Cloud Console
3. Wait 5-10 minutes after updating SHA-1 before testing

---

**Need more help?** Check the Metro bundler output for the exact URL to use!
