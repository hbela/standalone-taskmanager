# Currency Locale Implementation Summary

## Overview
Implemented locale-based currency selection for both the dashboard and create task screen. The currency now defaults to the user's regional currency based on their device locale settings instead of always defaulting to USD.

## Changes Made

### 1. Dashboard (profile.tsx)
**File**: `app/(app)/profile.tsx`

**Changes**:
- Added import: `import { getCurrencyForRegion } from '@/utils/localization';`
- Updated the default currency selection logic in the `useEffect` hook (lines 60-68)
- Now checks if the locale-based currency exists in the billing data
- Falls back to the first available currency if the locale currency doesn't exist in the data

**Behavior**:
- When the dashboard loads, it will automatically select the currency matching the user's locale
- For example, users in Hungary will see HUF, users in the US will see USD, users in France will see EUR, etc.
- If the locale currency doesn't have any billing data, it falls back to the first available currency

### 2. Create Task Screen (TaskForm.tsx)
**File**: `components/TaskForm.tsx`

**Changes**:
- Added import: `import { getCurrencyForRegion } from '@/utils/localization';`
- Updated initial state for `billCurrency` (line 150): Changed from hardcoded `'USD'` to `getCurrencyForRegion()`
- Updated form reset logic (line 244): Changed from hardcoded `'USD'` to `getCurrencyForRegion()`

**Behavior**:
- When creating a new task, the currency selector will default to the user's locale currency
- After submitting a task, the form resets and the currency returns to the locale default
- When editing an existing task, it still uses the task's saved currency

## Locale to Currency Mapping
The `getCurrencyForRegion()` function in `utils/localization.ts` maps region codes to currencies:
- US → USD
- GB → GBP
- HU → HUF
- FR, DE, ES, IT, NL, BE, AT, PT, IE → EUR
- JP → JPY
- And many more (40+ regions supported)

## Testing Recommendations
1. Test on devices with different locale settings
2. Verify the currency selector shows the correct default
3. Ensure existing tasks with different currencies still display correctly
4. Test the fallback behavior when locale currency has no billing data

## Technical Notes
- The function uses `expo-localization` to detect the device's region code
- Falls back to 'USD' if the region code is not in the mapping
- No breaking changes - existing functionality is preserved
- TypeScript compilation successful with no new errors
