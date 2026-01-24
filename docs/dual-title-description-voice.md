Adding **speech-to-text to both the title and description fields**. 
It respects your form's structure (title vs. description are different things) and gives users maximum flexibility—quick voice input for the short title, and longer dictation for the detailed description.

The great news is that your existing `DictationButton` component can be **reused exactly as-is** for both fields. You just need to manage two separate states and handlers in your form.

Here’s exactly how to do it:

### 🎯 Implementation: Dual-Field Dictation

In your task creation screen, you'll manage two text states and connect two instances of the `DictationButton`.

```javascript
// AddTaskScreen.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import DictationButton from '../components/DictationButton'; // Your existing component

export default function AddTaskScreen() {
  // Separate states for title and description
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Handler for title dictation
  const handleTitleDictation = (dictatedText) => {
    // For a title, you might want to replace, not append
    setTitle(dictatedText);
    // Optional: Automatically move focus to the next field
    // descriptionInputRef.current?.focus();
  };

  // Handler for description dictation (appends)
  const handleDescriptionDictation = (dictatedText) => {
    setDescription((prev) => {
      const separator = prev && !prev.endsWith(' ') ? ' ' : '';
      return prev + separator + dictatedText;
    });
  };

  return (
    <View style={styles.container}>
      {/* TITLE FIELD with Dictation */}
      <Text style={styles.label}>Task Title *</Text>
      <View style={styles.fieldRow}>
        <TextInput
          style={[styles.textInput, styles.titleInput]}
          placeholder="e.g., Call John re: project"
          value={title}
          onChangeText={setTitle}
          // ref={titleInputRef} // Optional for focus management
        />
        {/* Dictation button for TITLE */}
        <View style={styles.dictationButtonWrapper}>
          <DictationButton onDictationComplete={handleTitleDictation} />
        </View>
      </View>

      {/* DESCRIPTION FIELD with Dictation */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.textInput, styles.descriptionInput]}
        multiline
        numberOfLines={4}
        placeholder="Add details, notes, or steps..."
        value={description}
        onChangeText={setDescription}
        // ref={descriptionInputRef}
      />
      {/* Dictation button for DESCRIPTION */}
      <DictationButton onDictationComplete={handleDescriptionDictation} />

      {/* ... rest of your form (priority, contact, date pickers) ... */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
    color: '#333',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align to the top of the input
    marginBottom: 16,
  },
  titleInput: {
    flex: 1, // Takes up available space
    marginRight: 8,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dictationButtonWrapper: {
    // Ensures the button doesn't get squeezed
    minWidth: 50,
  },
});
```

### 🧠 Key Design Decisions & User Experience

1.  **Different Behavior per Field**:
    *   **Title**: Dictation **replaces** the entire field. This is logical as titles are short and concise. A user saying "New title" likely wants to set it, not add to an existing one.
    *   **Description**: Dictation **appends**. This allows users to build notes incrementally, which is natural for longer text.

2.  **UI Placement**:
    *   For the **title**, the button is placed **inline** (same row) since it's a single-line input. This saves vertical space.
    *   For the **description**, the button is placed **below** the multi-line input, as it has more room and the button is larger.

3.  **Optional Focus Management**:
    The commented `ref` code shows how you could automatically move the user's cursor (focus) after dictation. For example, after dictating the title, the focus could jump to the description field, creating a seamless flow. This is an advanced but highly polished touch.


## Focus Management for Seamless Dictation Flow

This feature automatically moves the user's cursor (focus) after they finish dictating into a field, creating a smooth, keyboard-like experience. We'll use React's `useRef` hook to control the inputs.

Here's the updated `AddTaskScreen.js`:

```javascript
// AddTaskScreen.js - Updated with Focus Management
import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DictationButton from '../components/DictationButton';

export default function AddTaskScreen() {
  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Refs to control focus programmatically
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  // Handler for title dictation
  const handleTitleDictation = (dictatedText) => {
    setTitle(dictatedText);
    // Auto-focus the description field after title dictation
    setTimeout(() => {
      descriptionInputRef.current?.focus();
    }, 100); // Small delay ensures smooth transition
  };

  // Handler for description dictation
  const handleDescriptionDictation = (dictatedText) => {
    setDescription((prev) => {
      const separator = prev && !prev.endsWith(' ') ? ' ' : '';
      return prev + separator + dictatedText;
    });
    // Keep focus in description field to continue typing
    setTimeout(() => {
      descriptionInputRef.current?.focus();
    }, 100);
  };

  // Manual focus functions (optional, for button clicks)
  const focusTitle = () => titleInputRef.current?.focus();
  const focusDescription = () => descriptionInputRef.current?.focus();

  return (
    <View style={styles.container}>
      {/* TITLE FIELD with Dictation */}
      <View style={styles.fieldHeader}>
        <Text style={styles.label}>Task Title *</Text>
        <TouchableOpacity onPress={focusTitle} style={styles.focusHint}>
          <Text style={styles.focusHintText}>Tap to type</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.fieldRow}>
        <TextInput
          ref={titleInputRef}
          style={[styles.textInput, styles.titleInput]}
          placeholder="e.g., Call John re: project"
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
          onSubmitEditing={() => descriptionInputRef.current?.focus()} // "Next" on keyboard
        />
        <View style={styles.dictationButtonWrapper}>
          <DictationButton 
            onDictationComplete={handleTitleDictation}
            onListeningStart={() => {
              // Optional: Blur the field while listening for cleaner UI
              titleInputRef.current?.blur();
            }}
          />
        </View>
      </View>

      {/* DESCRIPTION FIELD with Dictation */}
      <View style={styles.fieldHeader}>
        <Text style={styles.label}>Description</Text>
        <TouchableOpacity onPress={focusDescription} style={styles.focusHint}>
          <Text style={styles.focusHintText}>Tap to type</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        ref={descriptionInputRef}
        style={[styles.textInput, styles.descriptionInput]}
        multiline
        numberOfLines={4}
        placeholder="Add details, notes, or steps..."
        value={description}
        onChangeText={setDescription}
        blurOnSubmit={false}
      />
      
      <DictationButton 
        onDictationComplete={handleDescriptionDictation}
        onListeningStart={() => {
          descriptionInputRef.current?.blur();
        }}
      />

      {/* Visual flow indicator */}
      <View style={styles.flowIndicator}>
        <Text style={styles.flowText}>Flow: Title → Description → Save</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  focusHint: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
  },
  focusHintText: {
    fontSize: 12,
    color: '#007AFF',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleInput: {
    flex: 1,
    marginRight: 8,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dictationButtonWrapper: {
    minWidth: 50,
  },
  flowIndicator: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
  },
  flowText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
});
```

**Key improvements:**
1. **Auto-focus**: After dictating the title, focus automatically jumps to the description field.
2. **Keyboard integration**: The `returnKeyType="next"` and `onSubmitEditing` props allow the "Next" button on the keyboard to also move focus.
3. **Visual cues**: "Tap to type" hints and a flow indicator help users understand the optimized path.
4. **Blur during listening**: Inputs are blurred while the microphone is active for a cleaner UI.

