# Unused Files Analysis

**Generated:** 2026-02-07  
**Project:** Standalone Task Manager

## Summary

This document identifies files in the project that appear to be unused or are remnants from the Expo template. These files can potentially be removed to reduce codebase clutter.

---

## 🔴 High Priority - Template/Example Files (Safe to Remove)

These are clearly template files from the Expo starter that are not used in the actual app:

### App Routes (Template)
1. **`app/(tabs)/_layout.tsx`** - Template tab layout (not used, app uses `app/(app)/_layout.tsx`)
2. **`app/(tabs)/index.tsx`** - Template home screen with "Welcome!" and example content
3. **`app/modal.tsx`** - Template modal screen ("This is a modal")

### Components (Template/Examples)
4. **`components/examples/LocalizedTaskListExample.tsx`** - Example component, not imported anywhere
5. **`components/LocalizationDemo.tsx`** - Demo component, not imported anywhere
6. **`components/external-link.tsx`** - Not imported anywhere
7. **`components/hello-wave.tsx`** - Only used in template `(tabs)/index.tsx`
8. **`components/parallax-scroll-view.tsx`** - Only used in template `(tabs)/index.tsx`
9. **`components/themed-text.tsx`** - Only used in template files `modal.tsx` and `(tabs)/index.tsx`
10. **`components/themed-view.tsx`** - Only used in template files `modal.tsx` and `(tabs)/index.tsx`
11. **`components/ui/collapsible.tsx`** - Not imported anywhere

### Test/Development Files
12. **`app/splash-test.tsx`** - Test screen for splash image, not linked in navigation

---

## 🟡 Medium Priority - Potentially Unused

These files might be unused but require verification:

### Server Directory
The entire **`server/`** directory appears to be a separate backend project with JWT authentication and Prisma. Questions:
- Is this backend currently being used by the mobile app?
- The mobile app uses SQLite locally, not a remote API
- If not used, the entire `server/` directory (28 files) could be removed

**Files in server/:**
- `server/README.md`
- `server/package.json`
- `server/src/` (9 files)
- `server/prisma/` (8 files)
- `server/examples/` (2 files)
- And more...

---

## 🟢 Low Priority - Keep for Now

These files are part of the UI component system and might be used indirectly:

1. **`components/ui/icon-symbol.tsx`** - Used in `(tabs)/_layout.tsx` (which is template, but icon system might be needed)
2. **`components/ui/icon-symbol.ios.tsx`** - Platform-specific icon component
3. **`components/haptic-tab.tsx`** - Used in `(tabs)/_layout.tsx` (template), but haptic feedback might be useful

---

## Detailed Analysis

### Template Route Structure

The app currently uses this structure:
```
app/
├── (app)/          ← ACTIVE - Main app layout with 5 tabs
│   ├── _layout.tsx
│   ├── index.tsx   (Tasks list)
│   ├── calendar.tsx
│   ├── create.tsx
│   ├── profile.tsx
│   ├── settings.tsx
│   ├── notification-qa.tsx
│   └── task/
│       ├── [id].tsx
│       └── edit/[id].tsx
├── (tabs)/         ← UNUSED - Template from Expo
│   ├── _layout.tsx
│   └── index.tsx
├── _layout.tsx     ← ACTIVE - Root layout
├── index.tsx       ← ACTIVE - Entry point
├── welcome.tsx     ← ACTIVE - Welcome screen
├── modal.tsx       ← UNUSED - Template
└── splash-test.tsx ← UNUSED - Test screen
```

### Component Usage

**Active Components:**
- `ContactDisplay.tsx` ✓
- `ContactSearchButton.tsx` ✓
- `DictationButton.tsx` ✓
- `ErrorMessage.tsx` ✓
- `ExportButton.tsx` ✓
- `LanguageSwitcher.tsx` ✓
- `LoadingSpinner.tsx` ✓
- `OpenMapButton.tsx` ✓
- `TaskCard.tsx` ✓
- `TaskForm.tsx` ✓
- `create-task-modal.tsx` ✓

**Unused Components:**
- `LocalizationDemo.tsx` ✗
- `examples/LocalizedTaskListExample.tsx` ✗
- `external-link.tsx` ✗
- `hello-wave.tsx` ✗ (only in template)
- `parallax-scroll-view.tsx` ✗ (only in template)
- `themed-text.tsx` ✗ (only in template)
- `themed-view.tsx` ✗ (only in template)
- `ui/collapsible.tsx` ✗
- `haptic-tab.tsx` ⚠️ (in template layout)
- `ui/icon-symbol.tsx` ⚠️ (in template layout)
- `ui/icon-symbol.ios.tsx` ⚠️ (in template layout)

---

## Recommendations

### Phase 1: Safe Deletions (No Risk)
Remove these files immediately as they're clearly unused template files:

```bash
# Template routes
rm app/(tabs)/_layout.tsx
rm app/(tabs)/index.tsx
rm app/modal.tsx
rm app/splash-test.tsx

# Template components
rm components/examples/LocalizedTaskListExample.tsx
rm components/LocalizationDemo.tsx
rm components/external-link.tsx
rm components/hello-wave.tsx
rm components/parallax-scroll-view.tsx
rm components/themed-text.tsx
rm components/themed-view.tsx
rm components/ui/collapsible.tsx

# If haptic/icon components are only in template
rm components/haptic-tab.tsx
rm components/ui/icon-symbol.tsx
rm components/ui/icon-symbol.ios.tsx
```

After deletion, also remove the `(tabs)` directory if empty:
```bash
rmdir app/(tabs)
rmdir components/examples
```

### Phase 2: Verify Server Directory
1. Check if the mobile app makes any API calls to `localhost:3001`
2. Search for imports from `server/` directory
3. If not used, remove entire `server/` directory

### Phase 3: Cleanup
1. Remove unused imports from remaining files
2. Update `.gitignore` if needed
3. Run `npm run lint` to catch any broken imports

---

## Estimated Impact

**Files to Remove:** ~15-20 files  
**Lines of Code Reduced:** ~3,000-4,000 lines  
**Directories to Remove:** 2-3 directories  

If server directory is also unused:
**Additional Files:** ~28 files  
**Additional Lines:** ~5,000+ lines

---

## Notes

- All analysis based on static code analysis (import statements)
- Some files might be dynamically imported (check for `require()` or dynamic imports)
- Template files are from Expo Router starter template
- Server directory appears to be a separate backend project (Fastify + Prisma + PostgreSQL)
- Main app uses local SQLite database, not remote API

---

## Next Steps

1. **Review this analysis** - Verify findings
2. **Backup project** - Create git commit before deletion
3. **Delete Phase 1 files** - Safe template removals
4. **Test app** - Ensure nothing breaks
5. **Investigate server/** - Determine if backend is needed
6. **Final cleanup** - Remove empty directories and update documentation
