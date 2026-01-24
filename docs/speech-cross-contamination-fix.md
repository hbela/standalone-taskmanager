# Speech-to-Text Cross-Contamination Fix

## Problem
When using the microphone button on either the title or description input field, the dictated text was appearing in **both** fields simultaneously. This was caused by the speech recognition event listeners being global and not scoped to individual button instances.

## Root Cause
The `DictationButton` component uses `useSpeechRecognitionEvent` hooks to listen for speech recognition events. These event listeners are **global** - they fire for ALL instances of the component, not just the one that initiated the speech recognition.

When you had two `DictationButton` components (one for title, one for description):
1. Pressing the microphone on the title field would start speech recognition
2. The `result` event would fire
3. **Both** button instances would receive the event
4. **Both** would call their respective `onDictationComplete` callbacks
5. Result: Same text appears in both title and description fields

## Solution
Implemented a **global active button tracking system**:

### 1. Added Global State
```typescript
// Global state to track which button instance is currently listening
let activeButtonId: string | null = null;
```

### 2. Added Unique ID Prop
Each `DictationButton` now requires a unique `id` prop:
```typescript
interface DictationButtonProps {
  id: string; // Unique identifier for this button instance
  onDictationComplete: (text: string) => void;
  disabled?: boolean;
}
```

### 3. Updated Event Listeners
All event listeners now check if they belong to the active button:
```typescript
useSpeechRecognitionEvent('result', (event: any) => {
  if (activeButtonId !== id) {
    console.log(`[DictationButton:${id}] Ignoring result event - not active`);
    return; // Ignore events that don't belong to this button
  }
  // Process the event...
});
```

### 4. Set Active Button on Start
When a button starts listening, it sets itself as the active button:
```typescript
const startListening = async () => {
  activeButtonId = id; // Mark this button as active
  setIsListening(true);
  await Speech.start({ lang: locale });
};
```

### 5. Clear Active Button on End/Error
When speech recognition ends or errors, the active button is cleared:
```typescript
useSpeechRecognitionEvent('end', () => {
  if (activeButtonId !== id) return;
  setIsListening(false);
  setCurrentText('');
  activeButtonId = null; // Clear the active button
});
```

### 6. Updated TaskForm
Both `DictationButton` instances now have unique IDs:
```typescript
// Title dictation button
<DictationButton 
  id="title-dictation"
  onDictationComplete={handleTitleDictation}
  disabled={loading}
/>

// Description dictation button
<DictationButton 
  id="description-dictation"
  onDictationComplete={handleDictationComplete}
  disabled={loading}
/>
```

## How It Works Now
1. User presses the microphone on the **title** field
2. The title button sets `activeButtonId = "title-dictation"`
3. Speech recognition starts
4. When results come in, **only** the title button processes them (description button ignores them)
5. Title field gets updated with dictated text
6. Description field remains unchanged ✅

## Testing
To verify the fix:
1. Create a new task
2. Press and hold the microphone under the **title** field
3. Speak some text
4. Release the microphone
5. ✅ Only the title field should contain the dictated text
6. Press and hold the microphone under the **description** field
7. Speak different text
8. Release the microphone
9. ✅ Only the description field should contain the new dictated text

## Files Modified
- `components/DictationButton.tsx` - Added ID-based event filtering
- `components/TaskForm.tsx` - Added unique IDs to each button instance
