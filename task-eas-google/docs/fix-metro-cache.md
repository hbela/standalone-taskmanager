# Metro Cache Issue - Quick Fix

## The Problem
The redirect URI is showing as malformed: `new-taskmanager:/@[/refactor-task-crud]`

This is a Metro bundler cache issue. The code is correct but Metro hasn't fully reloaded the changes.

## Solution: Force Clean Restart

### Option 1: Stop and Restart Metro
1. Press `Ctrl+C` in the Metro terminal to stop it
2. Run:
   ```bash
   npx expo start --dev-client --clear
   ```

### Option 2: Clear All Caches
```bash
# Stop Metro (Ctrl+C)
# Then run:
npx expo start --dev-client --clear --reset-cache
```

### Option 3: Nuclear Option (if above don't work)
```bash
# Stop Metro
# Delete cache folders
rm -rf node_modules/.cache
rm -rf .expo

# Restart
npx expo start --dev-client --clear
```

## After Restart

The redirect URI should show correctly as:
```
Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
```

Then OAuth should work with your Google Cloud Console configuration!

## Verify in Logs

After restarting, when you tap Export, you should see:
```
🔐 Starting Google Drive authentication...
Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
```

NOT:
```
Redirect URI: new-taskmanager:/@[/refactor-task-crud]  ❌
```
