# Pending Native Modules for Next EAS Build

## 📦 Native Modules to Include in Next Build

The following native modules have been installed and will be included in the next EAS development build:

### 1. ✅ expo-crypto
- **Purpose**: Required for Google Drive OAuth authentication
- **Used by**: `expo-auth-session` for PKCE security flow
- **Feature**: Google Drive Excel export

### 2. ✅ react-native-calendars
- **Purpose**: Native calendar integration for upcoming feature
- **Planned Feature**: Calendar view for tasks
- **Status**: Installed, ready for implementation

## 🚀 Next Steps

### Build Command:
```bash
eas build --profile development --platform android
```

### What Will Be Included:
- ✅ All existing features (tasks, notifications, contacts, etc.)
- ✅ Google Drive export with OAuth (expo-crypto)
- ✅ Calendar library for upcoming calendar feature (react-native-calendars)

### After Build:
1. Install the new APK on your device
2. Test Google Drive export feature
3. Implement calendar view feature

## 📝 Notes

- Both modules are installed in `package.json`
- No code changes needed for expo-crypto (already implemented)
- Calendar feature implementation pending
- Single build will include both modules

## 🔄 Build Status

- [ ] EAS build initiated
- [ ] Build completed
- [ ] APK installed on device
- [ ] Google Drive export tested
- [ ] Ready for calendar feature implementation

---

**Ready to build when you are!** 🎉
