# Design System Audit - Task Manager App

## Current State Analysis

### Typography Issues

#### Font Sizes Found (in pixels)
The codebase currently uses **11 different font sizes** without a clear system:

| Font Size | Usage Count | Context |
|-----------|-------------|---------|
| 32px | 1 | Large headings |
| 28px | 2 | Headlines |
| 24px | 6 | Section titles |
| 20px | 4 | Medium titles |
| 18px | 5 | Subtitles |
| 16px | 28 | Body text (most common) |
| 15px | 2 | Body variants |
| 14px | 18 | Secondary text |
| 13px | 3 | Small text |
| 12px | 7 | Labels/captions |
| 11px | 1 | Tiny text |
| 10px | 3 | Priority chips |

**Problems Identified:**
- Too many font size variations (11 different sizes)
- Inconsistent usage: 15px appears only twice, 11px only once
- No clear hierarchy between similar sizes (15px vs 16px, 13px vs 14px)
- React Native Paper variants are used alongside hardcoded sizes
- Priority chip text uses 10px which is too small for accessibility

#### React Native Paper Text Variants Usage
The app uses RNP's built-in variants inconsistently:
- `headlineMedium` - Used for profile stats
- `titleMedium` - Used for task titles, section headers
- `bodyLarge` - Used for empty states
- `bodyMedium` - Used for task descriptions
- `bodySmall` - Used for contact names
- `labelSmall` - Used for dates

**Mixed Approach Problem:** Some components use RNP variants while others use hardcoded `fontSize` values, leading to inconsistency.

---

### Spacing Issues

#### Margins Found (in pixels)
The codebase uses **22 different margin values**:

| Value | Count | Common Usage |
|-------|-------|--------------|
| 0 | 1 | Reset |
| 2 | 5 | Micro spacing |
| 4 | 7 | Tight spacing |
| 6 | 2 | Small spacing |
| 8 | 24 | Small-medium (most common) |
| 10 | 1 | Rare |
| 12 | 14 | Medium spacing |
| 15 | 2 | Inconsistent |
| 16 | 13 | Standard spacing |
| 20 | 8 | Large spacing |
| 24 | 5 | Extra large |
| 25 | 1 | Inconsistent |
| 32 | 5 | Section spacing |

**Problems Identified:**
- Arbitrary values like 15px, 25px break the rhythm
- No clear 4px or 8px base unit system
- Too many options make it hard to choose consistently
- Similar values (8, 10, 12) used interchangeably

#### Padding Found (in pixels)
The codebase uses **8 different padding values**:

| Value | Count | Common Usage |
|-------|-------|--------------|
| 0 | 5 | Reset |
| 8 | 2 | Tight |
| 12 | 2 | Small |
| 16 | 17 | Standard (most common) |
| 20 | 7 | Medium |
| 24 | 2 | Large |
| 32 | 3 | Extra large |
| 40 | 1 | Huge |

**Problems Identified:**
- More consistent than margins but still too many options
- No clear relationship between padding and margin values
- 40px padding appears only once (likely an outlier)

#### Gap (Flexbox) Found (in pixels)
The codebase uses **6 different gap values**:

| Value | Count | Common Usage |
|-------|-------|--------------|
| 4 | 6 | Tight |
| 6 | 2 | Small |
| 8 | 16 | Standard (most common) |
| 12 | 10 | Medium |
| 16 | 7 | Large |
| 20 | 1 | Extra large |

**Problems Identified:**
- Relatively consistent but could be simplified
- Gap of 6 breaks the 4px base unit pattern

---

## Key Findings

### Strengths
1. **Color System**: Well-defined with Material Design 3 theme (Purple Light/Dark)
2. **React Native Paper Integration**: Already using RNP components
3. **Theme Context**: Proper theme usage with `useTheme()` hook
4. **Dark Mode Support**: Fully implemented

### Critical Issues
1. **No Typography Scale**: Mixing RNP variants with hardcoded font sizes
2. **Inconsistent Spacing**: Too many arbitrary values without a clear system
3. **No Design Tokens**: Values are hardcoded throughout components
4. **Lack of Documentation**: No guide for developers on which values to use
5. **Accessibility Concerns**: Some text (10px) is too small

### Impact on User Experience
- **Visual Inconsistency**: Different screens feel disconnected
- **Unprofessional Appearance**: Lack of rhythm and hierarchy
- **Maintenance Difficulty**: Hard to update spacing/typography globally
- **Scalability Issues**: Adding new screens perpetuates inconsistency

---

## Recommendations Summary

### Immediate Actions Needed
1. **Establish Typography Scale**: Define 5-7 text styles based on RNP variants
2. **Create Spacing System**: Use 4px base unit with 6-8 predefined values
3. **Build Design Tokens**: Centralize all design values in theme file
4. **Refactor Components**: Replace hardcoded values with theme tokens
5. **Document System**: Create usage guidelines for the team

### Long-term Goals
- Maintain consistency across all new features
- Improve accessibility (minimum 12px font size)
- Reduce cognitive load for developers
- Create a professional, cohesive user experience
---------------------------------------------
# Professional Design System for Task Manager App

## Overview

This design system provides a comprehensive, professional foundation for consistent typography and spacing across the Task Manager application. It leverages **React Native Paper's Material Design 3** components while adding structured design tokens for spacing.

---

## Typography System

### Philosophy
Use **React Native Paper's built-in text variants** exclusively to ensure consistency with Material Design 3 guidelines and automatic theme integration. Avoid hardcoded `fontSize` values.

### Type Scale

The following type scale is based on Material Design 3 and React Native Paper's `<Text>` component variants:

| Variant | Size | Line Height | Weight | Usage |
|---------|------|-------------|--------|-------|
| `displayLarge` | 57px | 64px | Regular (400) | Hero sections, splash screens |
| `displayMedium` | 45px | 52px | Regular (400) | Large promotional content |
| `displaySmall` | 36px | 44px | Regular (400) | Page headers (rare) |
| `headlineLarge` | 32px | 40px | Regular (400) | Main screen titles |
| `headlineMedium` | 28px | 36px | Regular (400) | Section headers, stats |
| `headlineSmall` | 24px | 32px | Regular (400) | Card headers, dialog titles |
| `titleLarge` | 22px | 28px | Medium (500) | Large list items |
| `titleMedium` | 16px | 24px | Medium (500) | **Task titles, section headers** |
| `titleSmall` | 14px | 20px | Medium (500) | Dense list items, tabs |
| `bodyLarge` | 16px | 24px | Regular (400) | **Primary body text, descriptions** |
| `bodyMedium` | 14px | 20px | Regular (400) | **Secondary body text** |
| `bodySmall` | 12px | 16px | Regular (400) | Supporting text, captions |
| `labelLarge` | 14px | 20px | Medium (500) | Button text, prominent labels |
| `labelMedium` | 12px | 16px | Medium (500) | Form labels, chips |
| `labelSmall` | 11px | 16px | Medium (500) | **Timestamps, metadata** |

### Recommended Usage Map

#### Current App Context

| Component/Element | Recommended Variant | Current Issues |
|-------------------|---------------------|----------------|
| **Screen Titles** | `headlineMedium` (28px) | Mixed 24px, 28px hardcoded |
| **Task Card Title** | `titleMedium` (16px) | Correct usage ✓ |
| **Task Description** | `bodyMedium` (14px) | Correct usage ✓ |
| **Section Headers** | `titleMedium` (16px) | Sometimes hardcoded 18px |
| **Body Text** | `bodyLarge` (16px) | Often hardcoded |
| **Secondary Text** | `bodyMedium` (14px) | Mixed with hardcoded 13px, 14px |
| **Timestamps/Dates** | `labelSmall` (11px) | Correct usage ✓ |
| **Priority Chips** | `labelMedium` (12px) | Currently 10px (too small!) |
| **Button Text** | `labelLarge` (14px) | Often hardcoded 16px |
| **Form Labels** | `labelMedium` (12px) | Inconsistent |
| **Empty State Text** | `bodyLarge` (16px) | Correct usage ✓ |
| **Dialog Titles** | `headlineSmall` (24px) | Sometimes hardcoded |

### Typography Rules

1. **Never use hardcoded `fontSize`** - Always use RNP Text variants
2. **Font weights** - Only use `fontWeight: '600'` or `'bold'` for emphasis, not for hierarchy
3. **Line height** - Let RNP handle it automatically (built into variants)
4. **Color** - Use theme colors: `theme.colors.onSurface`, `theme.colors.onSurfaceVariant`, `theme.colors.outline`
5. **Accessibility** - Minimum text size is 11px (`labelSmall`), prefer 12px+ for body content

### Migration Strategy

**Before:**
```tsx
<Text style={{ fontSize: 16, fontWeight: '600' }}>Task Title</Text>
```

**After:**
```tsx
<Text variant="titleMedium" style={{ fontWeight: '600' }}>Task Title</Text>
```

---

## Spacing System

### Philosophy
Use a **4px base unit** system with predefined spacing tokens. This creates visual rhythm and consistency while reducing decision fatigue.

### Spacing Scale

Define spacing tokens in your theme file based on multiples of 4:

| Token Name | Value | Usage |
|------------|-------|-------|
| `spacing.xs` | 4px | Tight spacing, icon gaps, chip padding |
| `spacing.sm` | 8px | Small gaps, compact layouts, list item padding |
| `spacing.md` | 12px | Medium gaps, card spacing, form field margins |
| `spacing.lg` | 16px | Standard padding, section spacing, card padding |
| `spacing.xl` | 20px | Large spacing, screen padding |
| `spacing.xxl` | 24px | Extra large spacing, section dividers |
| `spacing.xxxl` | 32px | Major section spacing, screen margins |
| `spacing.huge` | 48px | Hero section spacing, empty states |

### Spacing Usage Guidelines

#### Margins

| Context | Token | Value | Example |
|---------|-------|-------|---------|
| **Card vertical spacing** | `spacing.sm` | 8px | `marginVertical: spacing.sm` |
| **Card horizontal spacing** | `spacing.lg` | 16px | `marginHorizontal: spacing.lg` |
| **Section spacing** | `spacing.xxl` | 24px | `marginBottom: spacing.xxl` |
| **Element spacing (small)** | `spacing.xs` | 4px | `marginTop: spacing.xs` |
| **Element spacing (medium)** | `spacing.md` | 12px | `marginBottom: spacing.md` |
| **Screen bottom padding** | `spacing.xxxl` | 32px | For floating nav bars |

#### Padding

| Context | Token | Value | Example |
|---------|-------|-------|---------|
| **Card content** | `spacing.lg` | 16px | `padding: spacing.lg` |
| **Screen horizontal** | `spacing.lg` | 16px | `paddingHorizontal: spacing.lg` |
| **Screen vertical** | `spacing.xl` | 20px | `paddingVertical: spacing.xl` |
| **Button padding** | `spacing.md` | 12px | `paddingVertical: spacing.md` |
| **Compact padding** | `spacing.sm` | 8px | `padding: spacing.sm` |
| **Form container** | `spacing.xl` | 20px | `padding: spacing.xl` |

#### Gap (Flexbox)

| Context | Token | Value | Example |
|---------|-------|-------|---------|
| **Tight elements** | `spacing.xs` | 4px | Icon + text in same line |
| **Standard gap** | `spacing.sm` | 8px | Filter chips, form fields |
| **Medium gap** | `spacing.md` | 12px | Card sections, date rows |
| **Large gap** | `spacing.lg` | 16px | Major sections within a card |

### Special Cases

#### List Items
- **Card vertical margin**: `6px` (exception for visual density)
  - This is `marginVertical: 6` which equals 12px total spacing between cards
  - Acceptable deviation from 4px grid for better visual density

#### Bottom Padding for Floating Navigation
- Use `120px` for screens with floating bottom navigation
- This ensures content is not hidden behind the nav bar

---

## Implementation

### Step 1: Extend Theme File

Add spacing tokens to your existing `constants/theme.ts`:

```typescript
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export type SpacingKey = keyof typeof Spacing;
```

### Step 2: Create Typography Helper (Optional)

For cases where you need to override RNP Text styles:

```typescript
// constants/typography.ts
export const Typography = {
  // Only use these for special cases where RNP variants don't fit
  emphasis: {
    fontWeight: '600' as const,
  },
  bold: {
    fontWeight: 'bold' as const,
  },
} as const;
```

### Step 3: Usage in Components

**Typography:**
```tsx
import { Text } from 'react-native-paper';

// Task title
<Text variant="titleMedium" style={{ fontWeight: '600' }}>
  {task.title}
</Text>

// Task description
<Text variant="bodyMedium" numberOfLines={2}>
  {task.description}
</Text>

// Timestamp
<Text variant="labelSmall" style={{ color: theme.colors.outline }}>
  {formatDateTime(task.createdAt)}
</Text>
```

**Spacing:**
```tsx
import { Spacing } from '@/constants/theme';

const styles = StyleSheet.create({
  card: {
    marginVertical: 6, // Special case for density
    marginHorizontal: Spacing.lg,
  },
  cardContent: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
});
```

---

## Migration Checklist

### Phase 1: Setup (30 minutes)
- [ ] Add `Spacing` object to `constants/theme.ts`
- [ ] Export and import `Spacing` in components
- [ ] Test that theme file compiles without errors

### Phase 2: Typography Migration (2-3 hours)
- [ ] Replace all hardcoded `fontSize: 16` with `variant="bodyLarge"` or `variant="titleMedium"`
- [ ] Replace all hardcoded `fontSize: 14` with `variant="bodyMedium"`
- [ ] Replace all hardcoded `fontSize: 12` with `variant="labelMedium"` or `variant="bodySmall"`
- [ ] Replace all hardcoded `fontSize: 24` with `variant="headlineSmall"`
- [ ] Replace all hardcoded `fontSize: 28` with `variant="headlineMedium"`
- [ ] Fix priority chip text from 10px to `variant="labelMedium"` (12px)
- [ ] Remove all standalone `lineHeight` values (let RNP handle it)

### Phase 3: Spacing Migration (3-4 hours)
- [ ] Replace `padding: 16` with `padding: Spacing.lg`
- [ ] Replace `marginBottom: 8` with `marginBottom: Spacing.sm`
- [ ] Replace `marginBottom: 12` with `marginBottom: Spacing.md`
- [ ] Replace `marginTop: 16` with `marginTop: Spacing.lg`
- [ ] Replace `gap: 8` with `gap: Spacing.sm`
- [ ] Replace `gap: 12` with `gap: Spacing.md`
- [ ] Replace arbitrary values (15, 25, etc.) with closest standard token
- [ ] Update screen padding to use `Spacing.lg` or `Spacing.xl`

### Phase 4: Verification (1 hour)
- [ ] Test all screens in light mode
- [ ] Test all screens in dark mode
- [ ] Check accessibility (minimum text size)
- [ ] Verify visual consistency across screens
- [ ] Test on different screen sizes (phone, tablet)

---

## Before & After Examples

### Example 1: Task Card

**Before:**
```tsx
const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 16,
  },
  cardContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  dateRow: {
    gap: 4,
  },
});
```

**After:**
```tsx
import { Spacing } from '@/constants/theme';

const styles = StyleSheet.create({
  card: {
    marginVertical: 6, // Keep for density
    marginHorizontal: Spacing.lg,
  },
  cardContent: {
    padding: Spacing.sm,
  },
  title: {
    // Use variant="titleMedium" on Text component
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  description: {
    // Use variant="bodyMedium" on Text component
    marginBottom: Spacing.sm,
  },
  dateRow: {
    gap: Spacing.xs,
  },
});
```

### Example 2: Screen Layout

**Before:**
```tsx
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginTop: 16,
    padding: 20,
  },
});
```

**After:**
```tsx
import { Spacing } from '@/constants/theme';

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  header: {
    // Use variant="headlineSmall" on Text component
    marginBottom: Spacing.xl,
  },
  section: {
    marginTop: Spacing.lg,
    padding: Spacing.xl,
  },
});
```

### Example 3: Priority Chip (Critical Fix)

**Before:**
```tsx
<Chip
  textStyle={{ 
    color: priorityColor, 
    fontSize: 10,  // TOO SMALL!
    lineHeight: 10 
  }}
>
  {task.priority.toUpperCase()}
</Chip>
```

**After:**
```tsx
<Chip
  textStyle={{ 
    color: priorityColor,
    fontSize: 12,  // Better readability
  }}
  style={[styles.priorityChip, { 
    backgroundColor: priorityColor + '20', 
    borderColor: priorityColor 
  }]}
>
  {task.priority.toUpperCase()}
</Chip>
```

---

## Design Principles

### 1. Consistency Over Perfection
Use the design system even if a value seems slightly off. Consistency creates a professional feel.

### 2. Less is More
Fewer options = faster decisions = more consistent results. Stick to the predefined tokens.

### 3. Semantic Naming
Use token names that describe purpose (`spacing.lg`) not appearance (`spacing.16px`).

### 4. Theme-First Approach
Always use theme values for colors, never hardcode. This ensures dark mode works correctly.

### 5. Accessibility Matters
- Minimum text size: 11px (prefer 12px+)
- Minimum touch target: 44x44px
- Sufficient color contrast (WCAG AA)

---

## Maintenance Guidelines

### Adding New Components
1. Choose typography from RNP Text variants (never hardcode fontSize)
2. Choose spacing from `Spacing` tokens (never use arbitrary values)
3. Use theme colors exclusively
4. Test in both light and dark mode

### Updating the Design System
1. Discuss changes with the team
2. Update this documentation first
3. Create a migration plan for existing components
4. Update all affected components at once

### Code Review Checklist
- [ ] No hardcoded `fontSize` values
- [ ] No arbitrary spacing values (must use `Spacing` tokens)
- [ ] Uses RNP Text variants
- [ ] Uses theme colors
- [ ] Tested in dark mode

---

## Benefits of This System

### For Developers
- **Faster development**: No decision fatigue on spacing/typography
- **Easier maintenance**: Change once, update everywhere
- **Better code reviews**: Clear standards to check against
- **Reduced bugs**: Consistent values reduce edge cases

### For Users
- **Professional appearance**: Consistent visual rhythm
- **Better readability**: Proper type hierarchy
- **Improved accessibility**: Minimum text sizes enforced
- **Cohesive experience**: All screens feel part of the same app

### For the Product
- **Scalability**: Easy to add new features consistently
- **Brand consistency**: Professional, polished appearance
- **Faster iterations**: Less time tweaking individual values
- **Quality perception**: Users perceive well-designed apps as higher quality

---

## Resources

### React Native Paper Documentation
- [Text Component](https://callstack.github.io/react-native-paper/docs/components/Text)
- [Typography Guide](https://callstack.github.io/react-native-paper/docs/guides/typography)
- [Theming](https://callstack.github.io/react-native-paper/docs/guides/theming)

### Material Design 3
- [Type Scale](https://m3.material.io/styles/typography/type-scale-tokens)
- [Spacing](https://m3.material.io/foundations/layout/applying-layout/spacing)

### Design System Examples
- [Material Design](https://m3.material.io/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Shopify Polaris](https://polaris.shopify.com/)

----------------------------------------------

# Implementation Guide: Professional Design System

This guide provides step-by-step instructions to refactor your Task Manager app and implement the new, professional design system. By following these steps, you will replace hardcoded styles with a consistent, theme-based system.

---

## Step 1: Update Your Theme File

The first step is to centralize your spacing values into design tokens. Open the `constants/theme.ts` file and add the following `Spacing` object. This creates a single source of truth for all spacing values in the application.

**File: `/constants/theme.ts`**

```typescript
// Add this Spacing object to your theme.ts file

export const Spacing = {
  xs: 4,    // Extra Small
  sm: 8,    // Small
  md: 12,   // Medium
  lg: 16,   // Large
  xl: 20,   // Extra Large
  xxl: 24,  // Extra Extra Large
  xxxl: 32, // Extra Extra Extra Large
  huge: 48,   // Huge
} as const;

// You can also define a type for these keys for better TypeScript support
export type SpacingKey = keyof typeof Spacing;

// ... (rest of your theme.ts file)
```

---

## Step 2: Refactor Components with New System

Now, you will refactor your components to use the new typography and spacing systems. The primary goal is to **eliminate all hardcoded `fontSize`, `margin`, and `padding` values** from your `StyleSheet` objects and replace them with React Native Paper (RNP) variants and the new `Spacing` tokens.

### Example 1: Refactoring `TaskCard.tsx`

This example demonstrates how to apply the new system to the `TaskCard` component. It fixes inconsistent spacing and improves the typography hierarchy.

**File: `/components/TaskCard.tsx`**

#### Before Refactoring (Your Current Code)

```tsx
// components/TaskCard.tsx (Current State)

// ... imports

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  mainContent: {
    flex: 1,
    gap: 4,
  },
  headerRow: {
    marginBottom: 4,
  },
  title: {
    fontWeight: '600',
  },
  description: {
    marginBottom: 8,
  },
  footer: {
    gap: 12,
    marginTop: 4,
  },
  // ... other styles
});

// In the component render:
<Text
  variant="titleMedium" // You are already using this, which is great!
  style={styles.title}
>
  {task.title}
</Text>

<Chip
  textStyle={{ color: priorityColor, fontSize: 10, lineHeight: 10 }} // Font size is too small
>
  {task.priority.toUpperCase()}
</Chip>
```

#### After Refactoring (The New Code)

```tsx
// components/TaskCard.tsx (New, Refactored State)

import { Spacing } from '@/constants/theme'; // <-- Import Spacing tokens
// ... other imports

const styles = StyleSheet.create({
  card: {
    marginVertical: 6, // This is an acceptable exception for list density
    marginHorizontal: Spacing.lg, // Use lg token (16px)
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm, // Use sm token (8px) for a more compact card
  },
  mainContent: {
    flex: 1,
    gap: Spacing.xs, // Use xs token (4px) for tight content grouping
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs, // Use xs token (4px)
  },
  title: {
    flex: 1,
    marginRight: Spacing.sm, // Use sm token (8px)
    fontWeight: '600', // Keep for emphasis
  },
  description: {
    marginBottom: Spacing.sm, // Use sm token (8px)
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md, // Use md token (12px)
    marginTop: Spacing.xs, // Use xs token (4px)
  },
  // ... other styles
});

// In the component render:
<Text
  variant="titleMedium" // Correct: Continue using RNP variants
  style={styles.title}
>
  {task.title}
</Text>

<Chip
  textStyle={{ color: priorityColor }} // Remove hardcoded font size
  // The default Chip text style is now appropriate (labelLarge)
>
  {task.priority.toUpperCase()}
</Chip>
```

### Example 2: Refactoring `TaskForm.tsx`

Forms are critical for a good user experience. Applying consistent spacing makes them cleaner and easier to use.

**File: `/components/TaskForm.tsx`**

#### Before Refactoring (Your Current Code)

```tsx
// components/TaskForm.tsx (Current State)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  // ... other styles
});
```

#### After Refactoring (The New Code)

```tsx
// components/TaskForm.tsx (New, Refactored State)

import { Spacing } from '@/constants/theme'; // <-- Import Spacing tokens
// ... other imports

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg, // Use lg token (16px)
    paddingBottom: Spacing.huge, // Add extra padding at the bottom
  },
  inputGroup: {
    marginBottom: Spacing.md, // Use md token (12px) for more space
  },
  // REMOVE the 'label' style, use RNP variants instead
  // ... other styles
});

// In the component render, for labels:
<Text variant="titleMedium" style={{ marginBottom: Spacing.sm }}>
  {t('form.priority')}
</Text>
```

### Example 3: Fixing the Priority Chip Font Size

The `10px` font size in the priority chip is too small and harms accessibility. The new design system recommends using `labelMedium` (12px) as a minimum for such elements. React Native Paper's `Chip` component uses `labelLarge` by default, which is even better.

**File: `/components/TaskCard.tsx`**

#### Before (Your Current Code)

```tsx
<Chip
  textStyle={{ color: priorityColor, fontSize: 10, lineHeight: 10 }}
  style={[styles.priorityChip, { backgroundColor: priorityColor + '20' }]}
  compact
>
  {task.priority.toUpperCase()}
</Chip>
```

#### After (The New Code)

By simply removing the `textStyle` prop with the hardcoded `fontSize`, the `Chip` will default to a more readable size provided by the RNP theme (`labelLarge`, which is 14px).

```tsx
<Chip
  // The textStyle prop is removed to allow the theme's default to apply.
  style={[
    styles.priorityChip, 
    { backgroundColor: priorityColor + '20', borderColor: priorityColor }
  ]}
  compact
>
  {task.priority.toUpperCase()}
</Chip>
```

---

## Step 3: Migration Checklist

Follow this checklist to systematically update your entire application. This process may take a few hours, but it will have a significant impact on your app's quality.

### Typography Migration

- [ ] **Global Search:** Search your codebase for `fontSize:`. Your goal is to eliminate every instance.
- [ ] **Replace with Variants:** For each hardcoded `fontSize`, find the most appropriate RNP Text variant from the `design-system.md` document and apply it.
    - `fontSize: 24` or `28` -> `<Text variant="headlineSmall">` or `<Text variant="headlineMedium">`
    - `fontSize: 16` -> `<Text variant="bodyLarge">` or `<Text variant="titleMedium">`
    - `fontSize: 14` -> `<Text variant="bodyMedium">`
    - `fontSize: 12` -> `<Text variant="bodySmall">` or `<Text variant="labelMedium">`
- [ ] **Remove `lineHeight`:** Delete all hardcoded `lineHeight` properties. The RNP variants handle this automatically.

### Spacing Migration

- [ ] **Global Search:** Search for `margin`, `padding`, and `gap`.
- [ ] **Replace with Tokens:** Replace every hardcoded spacing value with a token from the `Spacing` object.
    - `padding: 16` -> `padding: Spacing.lg`
    - `marginBottom: 8` -> `marginBottom: Spacing.sm`
    - `gap: 12` -> `gap: Spacing.md`
- [ ] **Handle Arbitrary Values:** For non-standard values (e.g., `15`, `25`), choose the nearest token from the scale. Consistency is more important than pixel-perfect replication of the old design.

### Verification

- [ ] **Visual Review:** Navigate through every screen of the app in both light and dark modes.
- [ ] **Check for Consistency:** Ensure that similar elements (e.g., all screen titles, all cards) look the same.
- [ ] **Test on Different Devices:** If possible, check the layout on different screen sizes to ensure it remains robust.

---

## Final Recommendations

- **Be Disciplined:** Once the system is in place, strictly adhere to it for all new components and features.
- **Update the Theme:** If a new spacing value is truly needed, add it to the `Spacing` object in `theme.ts` first. Do not hardcode it.
- **Code Reviews:** Make adherence to the design system a required check during code reviews. This will ensure long-term consistency.

By completing this refactoring, you will elevate your app's design from functional to professional, creating a more polished and enjoyable user experience.

---------------------------------------------------
TaskForm.tsx

import { useTranslation } from '@/hooks/useTranslation';
import { DEFAULT_REMINDER_OPTIONS, DEFAULT_REMINDERS, getReminderLabel } from '@/lib/notifications';
import { CreateTaskInput, TaskPriority, UpdateTaskInput } from '@/types/task';
import { formatDate, formatTime } from '@/utils/dateFormatter';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import {
    Button,
    Card,
    Chip,
    Divider,
    HelperText,
    IconButton,
    Modal,
    Portal,
    Switch,
    Text,
    TextInput,
    useTheme,
} from 'react-native-paper';
import { de, en, fr, registerTranslation, TimePickerModal } from 'react-native-paper-dates';
import ContactDisplay from './ContactDisplay';
import ContactSearchButton from './ContactSearchButton';
import DictationButton from './DictationButton';

// Register translations
registerTranslation('en', en);
registerTranslation('de', de);
registerTranslation('fr', fr);
registerTranslation('hu', {
  save: 'Mentés',
  selectSingle: 'Válasszon dátumot',
  selectMultiple: 'Válasszon dátumokat',
  selectRange: 'Válasszon időszakot',
  notAccordingToDateFormat: (inputFormat) => `A dátum formátuma legyen ${inputFormat}`,
  mustBeHigherThan: (date) => `Legyen ennél későbbi: ${date}`,
  mustBeLowerThan: (date) => `Legyen ennél korábbi: ${date}`,
  mustBeBetween: (startDate, endDate) => `Legyen eközött: ${startDate} - ${endDate}`,
  dateIsDisabled: 'A dátum nem választható',
  previous: 'Előző',
  next: 'Következő',
  typeInDate: 'Dátum megadása',
  pickDateFromCalendar: 'Választás naptárból',
  close: 'Bezárás',
  hour: 'Óra',
  minute: 'Perc',
});

// Configure calendar locales
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today'
};

LocaleConfig.locales['hu'] = {
  monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
  dayNamesShort: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
  today: 'Ma'
};

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: "Aujourd'hui"
};

LocaleConfig.locales['de'] = {
  monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  today: 'Heute'
};

LocaleConfig.defaultLocale = 'en';


interface TaskFormProps {
  initialValues?: {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    dueDate?: string;
    reminderTimes?: number[];
    contactId?: string | null;
  };
  onSubmit: (data: CreateTaskInput | UpdateTaskInput) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
}


export default function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  loading = false
}: TaskFormProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(initialValues?.priority || 'medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(
    initialValues?.dueDate ? new Date(initialValues.dueDate) : undefined
  );
  const [showDatePicker, setShowDatePicker] = useState(false); // Native picker fallback / Time picker
  const [showCalendarModal, setShowCalendarModal] = useState(false); // Custom calendar modal
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [enableReminders, setEnableReminders] = useState(!!initialValues?.dueDate);
  const [reminderTimes, setReminderTimes] = useState<number[]>(
    initialValues?.reminderTimes || DEFAULT_REMINDERS
  );
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    initialValues?.contactId || null
  );
  const [errors, setErrors] = useState<{ title?: string }>({});

  // Refs for focus management
  const titleInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  // Set calendar locale based on user's language
  useEffect(() => {
    const locale = t('locale') || 'en'; // Get locale from translations root
    LocaleConfig.defaultLocale = locale;
  }, [t]);

  const priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

  const getPriorityColor = (p: TaskPriority) => {
    switch (p) {
      case 'urgent': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#007AFF';
      case 'low': return '#34C759';
    }
  };

  const validate = (): boolean => {
    const newErrors: { title?: string } = {};

    if (!title.trim()) {
      newErrors.title = t('form.errors.titleRequired');
    } else if (title.trim().length < 3) {
      newErrors.title = t('form.errors.titleTooShort');
    } else if (title.trim().length > 255) {
      newErrors.title = t('form.errors.titleTooLong');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const data: CreateTaskInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      ...(dueDate && { dueDate: dueDate.toISOString() }),
      ...(dueDate && enableReminders && { reminderTimes }),
      ...(selectedContactId && { contactId: selectedContactId }),
    };

    try {
      await onSubmit(data);
      // Reset form after successful submission
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate(undefined);
      setEnableReminders(false);
      setReminderTimes(DEFAULT_REMINDERS);
      setSelectedContactId(null);
      setErrors({});
    } catch (error) {
      // Error handling is done by parent component
      console.error('[TaskForm] Form submission error:', error);
    }
  };

  // Handle dictation completion - append dictated text to description
  const handleDictationComplete = (dictatedText: string) => {
    // Append the new dictated text to the existing description
    setDescription((prevText) => {
      // Add a space if there's already some text
      const separator = prevText && !prevText.endsWith(' ') ? ' ' : '';
      return prevText + separator + dictatedText;
    });
  };

  // Handle title dictation - replace the title
  const handleTitleDictation = (dictatedText: string) => {
    if (dictatedText.trim()) {
      setTitle(dictatedText.trim());
      if (errors.title) {
        setErrors({ ...errors, title: undefined });
      }
      setTimeout(() => {
        descriptionInputRef.current?.focus();
      }, 100);
    }
  };

  const handleCalendarDayPress = (day: DateData) => {
    setShowCalendarModal(false);
    const selectedDate = new Date(day.dateString);
    // Add current time or default to end of day? Or keep current time if set.
    // If we only have date, let's set time to 12:00 PM or keep current time if updating.
    if (dueDate) {
        selectedDate.setHours(dueDate.getHours(), dueDate.getMinutes());
    } else {
        selectedDate.setHours(12, 0, 0, 0); // Default to noon
    }
    setDueDate(selectedDate);
  };
  
  // Keep native handler for Time
  // Handle time confirmation from TimePickerModal
  const handleTimeConfirm = ({ hours, minutes }: { hours: number; minutes: number }) => {
    setShowTimePicker(false);
    if (dueDate) {
      const newDate = new Date(dueDate);
      newDate.setHours(hours, minutes);
      setDueDate(newDate);
    }
  };

  const handleTimeDismiss = () => {
    setShowTimePicker(false);
  };

  // Memoize button text
  const buttonText = React.useMemo(() => {
    return loading ? t('common.saving') : (submitLabel || t('common.save'));
  }, [loading, submitLabel, t]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Input */}
        <View style={styles.inputGroup}>
          <TextInput
            ref={titleInputRef}
            mode="outlined"
            label={t('form.title')}
            placeholder={t('form.placeholders.title')}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) setErrors({ ...errors, title: undefined });
            }}
            error={!!errors.title}
            maxLength={255}
            disabled={loading}
            returnKeyType="next"
            onSubmitEditing={() => descriptionInputRef.current?.focus()}
            right={<TextInput.Affix text={`${title.length}/255`} />}
          />
          <HelperText type="error" visible={!!errors.title}>
            {errors.title}
          </HelperText>
          
          <DictationButton 
            id="title-dictation"
            onDictationComplete={handleTitleDictation}
            disabled={loading}
          />
        </View>

        {/* Description Input */}
        <View style={styles.inputGroup}>
          <TextInput
            ref={descriptionInputRef}
            mode="outlined"
            label={t('tasks.description')}
            placeholder={t('form.placeholders.description')}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            disabled={loading}
            maxLength={2000}
            right={<TextInput.Affix text={`${description.length}/2000`} />}
          />
          <View style={{ marginTop: 8 }}>
            <DictationButton 
                id="description-dictation"
                onDictationComplete={handleDictationComplete}
                disabled={loading}
            />
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Priority Selector */}
        <View style={styles.inputGroup}>
          <Text variant="titleMedium" style={styles.label}>{t('tasks.priority')}</Text>
          <View style={styles.priorityOptions}>
            {priorities.map((p) => {
                const color = getPriorityColor(p);
                const isSelected = priority === p;
                return (
                    <Chip
                        key={p}
                        selected={isSelected}
                        showSelectedOverlay
                        mode={isSelected ? 'flat' : 'outlined'}
                        onPress={() => setPriority(p)}
                        textStyle={{ 
                            color: isSelected ? 'white' : color, 
                            fontWeight: 'bold' 
                        }}
                        style={[
                            styles.priorityChip, 
                            isSelected ? { backgroundColor: color } : { borderColor: color }
                        ]}
                        disabled={loading}
                    >
                        {t(`tasks.priorities.${p}`)}
                    </Chip>
                );
            })}
          </View>
        </View>

        {/* Contact Selector */}
        <View style={styles.inputGroup}>
          <Text variant="titleMedium" style={styles.label}>{t('form.contact')}</Text>
          {selectedContactId ? (
            <View>
              <ContactDisplay contactId={selectedContactId} showActions={false} />
              <Button 
                mode="text" 
                textColor={theme.colors.error}
                icon="close-circle" 
                onPress={() => setSelectedContactId(null)}
                disabled={loading}
                style={{ alignSelf: 'flex-start', marginTop: 4 }}
              >
                {t('form.removeContact')}
              </Button>
            </View>
          ) : (
            <ContactSearchButton
              onContactSelect={(contactId) => setSelectedContactId(contactId)}
              selectedContactId={selectedContactId}
              disabled={loading}
            />
          )}
        </View>

        <Divider style={styles.divider} />

        {/* Due Date Selector */}
        <View style={styles.inputGroup}>
          <Text variant="titleMedium" style={styles.label}>{t('form.dueDateTime')}</Text>
          
          <View style={styles.dateRow}>
            <TextInput
              mode="outlined"
              label={t('tasks.dueDate')}
              value={dueDate ? formatDate(dueDate, {
                  month: 'short', day: 'numeric', year: 'numeric'
              }) : ''}
              editable={false}
              right={<TextInput.Icon icon="calendar" onPress={() => !loading && setShowCalendarModal(true)} />}
              style={{ flex: 1 }}
              onPressIn={() => !loading && setShowCalendarModal(true)}
              disabled={loading}
            />
            
            {dueDate && (
                 <IconButton
                    icon="close-circle"
                    iconColor={theme.colors.error}
                    size={24}
                    onPress={() => setDueDate(undefined)}
                    disabled={loading}
                 />
            )}
          </View>

          {dueDate && (
            <View style={styles.timeRow}>
                <TextInput
                    mode="outlined"
                    label={t('date.time') || "Time"}
                    value={formatTime(dueDate)}
                    editable={false}
                    right={<TextInput.Icon icon="clock-outline" onPress={() => !loading && setShowTimePicker(true)} />}
                    style={{ flex: 1 }}
                    onPressIn={() => !loading && setShowTimePicker(true)}
                    disabled={loading}
                />
            </View>
          )}

          {dueDate && (
            <TimePickerModal
              visible={showTimePicker}
              onDismiss={handleTimeDismiss}
              onConfirm={handleTimeConfirm}
              hours={dueDate.getHours()}
              minutes={dueDate.getMinutes()}
              locale={t('common.languageCode') || 'en'}
              label={t('date.time')}
              cancelLabel={t('common.cancel')}
              confirmLabel={t('common.save')}
              inputFontSize={18}
            />
          )}

          <Portal>
            <Modal visible={showCalendarModal} onDismiss={() => setShowCalendarModal(false)} contentContainerStyle={styles.modalContent}>
                <Card mode="elevated" style={{ margin: 0, width: '100%' }}>
                    <Card.Content style={{ padding: 0 }}>
                        <Calendar
                            current={dueDate ? dueDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                            onDayPress={handleCalendarDayPress}
                            markedDates={{
(Content truncated due to size limit. Use line ranges to read remaining content)

-------------------------------------------------
TaskCard.tsx


import { useTranslation } from '@/hooks/useTranslation';
import { isTaskOverdue } from '@/lib/taskUtils';
import { Task } from '@/types/task';
import { formatDateTime } from '@/utils/dateFormatter';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Checkbox, Chip, Text, useTheme } from 'react-native-paper';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggleComplete: () => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return '#FF3B30';
    case 'high':
      return '#FF9500';
    case 'medium':
      return '#007AFF';
    case 'low':
      return '#34C759';
    default:
      return '#8E8E93';
  }
};

export default function TaskCard({
  task,
  onPress,
  onToggleComplete
}: TaskCardProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isOverdue = isTaskOverdue(task);
  const priorityColor = getPriorityColor(task.priority);

  return (
    <Card
      style={[
        styles.card,
        task.completed && styles.completedCard,
        isOverdue && !task.completed && styles.overdueCard
      ]}
      onPress={onPress}
      mode="elevated"
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.leftColumn}>
          <Checkbox
            status={task.completed ? 'checked' : 'unchecked'}
            onPress={onToggleComplete}
            color={task.completed ? '#34C759' : theme.colors.primary}
            uncheckedColor={isOverdue ? '#FF3B30' : theme.colors.outline}
          />
        </View>

        <View style={styles.mainContent}>
          <View style={styles.headerRow}>
            <Text
              variant="titleMedium"
              style={[
                styles.title,
                task.completed && styles.completedText
              ]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            <Chip
              textStyle={{ color: priorityColor, fontSize: 10, lineHeight: 10, marginVertical: 0, marginHorizontal: 0 }}
              style={[styles.priorityChip, { backgroundColor: priorityColor + '20', borderColor: priorityColor }]}
              compact
            >
              {task.priority.toUpperCase()}
            </Chip>
          </View>

          {task.description ? (
            <Text
              variant="bodyMedium"
              style={[
                styles.description,
                task.completed && styles.completedText
              ]}
              numberOfLines={2}
            >
              {task.description}
            </Text>
          ) : null}

          <View style={styles.footer}>
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={14} color={theme.colors.outline} />
              <Text variant="labelSmall" style={{ color: theme.colors.outline }}>
                {formatDateTime(task.createdAt)}
              </Text>
            </View>

            {task.dueDate && (
              <View style={styles.dateRow}>
                <Ionicons
                  name={isOverdue ? "alert-circle" : "alarm-outline"}
                  size={14}
                  color={isOverdue ? "#FF3B30" : "#FF9500"}
                />
                <Text
                  variant="labelSmall"
                  style={[
                    styles.dateText,
                    isOverdue ? { color: '#FF3B30', fontWeight: 'bold' } : { color: '#FF9500' }
                  ]}
                >
                  {formatDateTime(task.dueDate)}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.rightColumn}>
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 16,
  },
  completedCard: {
    opacity: 0.7,
  },
  overdueCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  leftColumn: {
    marginRight: 8,
  },
  mainContent: {
    flex: 1,
    gap: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    marginRight: 8,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  priorityChip: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    // color: '#3C3C43', // Use Default Text color
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    // color: '#8E8E93', // replaced inline
  },
  rightColumn: {
    marginLeft: 8,
    justifyContent: 'center',
  },
});
----------------------------------------------------
index.tsx i.e. TasksScreen component


import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import TaskCard from '@/components/TaskCard';
import { useDeleteTask, useTasks, useToggleTaskComplete } from '@/hooks/useTasksQuery';
import { useTranslation } from '@/hooks/useTranslation';
import { exportTasksToExcel, getFileNameFromUri } from '@/lib/export/excelExporter';
import { uploadToGoogleDrive } from '@/lib/export/googleDriveService';
import { isTaskOverdue } from '@/lib/taskUtils';
import { Task } from '@/types/task';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Appbar, Button, Chip, Dialog, Paragraph, Portal, Searchbar, useTheme } from 'react-native-paper';

export default function TasksScreen() {
  const { t, _key } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'overdue' | 'completed'>('pending');
  const [forceRender, setForceRender] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  
  // State for translated text to force updates
  const [pageTitle, setPageTitle] = useState(t('tasks.title'));
  const [searchPlaceholder, setSearchPlaceholder] = useState(t('tasks.searchPlaceholder'));

  // Force re-render when language changes
  React.useEffect(() => {
    setForceRender(prev => prev + 1);
    // Update text state to force React Native to recognize the change
    setPageTitle(t('tasks.title'));
    setSearchPlaceholder(t('tasks.searchPlaceholder'));
    console.log('[TasksScreen] Updated text state:', {
      title: t('tasks.title'),
      placeholder: t('tasks.searchPlaceholder'),
    });
  }, [_key, t]);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [exportDialogVisible, setExportDialogVisible] = useState(false);
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [exportResult, setExportResult] = useState<{ webViewLink?: string } | null>(null);
  const [exportError, setExportError] = useState('');

  // Debug logging
  console.log('[TasksScreen] Rendering with key:', _key, 'forceRender:', forceRender);
  console.log('[TasksScreen] Current translations:', {
    title: t('tasks.title'),
    searchPlaceholder: t('tasks.searchPlaceholder'),
    filterPending: t('tasks.filterPending'),
  });
  console.log('[TasksScreen] State values:', { pageTitle, searchPlaceholder });

  // Fetch tasks with TanStack Query
  const { data, isLoading, error, refetch, isRefetching } = useTasks({
    status: filter === 'all' || filter === 'overdue' ? undefined : filter,
  });

  // Mutations
  const deleteTaskMutation = useDeleteTask();
  const toggleCompleteMutation = useToggleTaskComplete();

  const tasks = data?.tasks || [];

  const handleDelete = (task: Task) => {
    Alert.alert(
      t('tasks.delete'),
      t('tasks.deleteConfirm', { title: task.title }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTaskMutation.mutateAsync(task.id);
            } catch (err) {
              Alert.alert(t('common.error'), t('errors.deleteTask'));
            }
          }
        }
      ]
    );
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await toggleCompleteMutation.mutateAsync({
        id: task.id,
        completed: !task.completed,
      });
    } catch (err) {
      Alert.alert(t('common.error'), t('errors.updateTask'));
    }
  };

  const handleExport = () => {
    if (filteredTasks.length === 0) {
      Alert.alert(t('export.title'), t('export.noTasks'));
      return;
    }
    setExportDialogVisible(true);
  };

  const performExport = async () => {
    setExportDialogVisible(false);
    setIsExporting(true);
    try {
      // Generate Excel file
      console.log('📊 Generating Excel file...');
      const fileUri = await exportTasksToExcel(filteredTasks);
      const fileName = getFileNameFromUri(fileUri);
      
      // Upload to Google Drive
      console.log('☁️ Uploading to Google Drive...');
      const result = await uploadToGoogleDrive(fileUri, fileName);
      
      setExportResult(result);
      setSuccessDialogVisible(true);
      
    } catch (error) {
      console.error('Export error:', error);
      const errorMessage = error instanceof Error ? error.message : t('export.error');
      setExportError(errorMessage);
      setErrorDialogVisible(true);
    } finally {
      setIsExporting(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    // Search filter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // Status filter
    if (filter === 'pending') {
      // Pending: not completed AND not overdue
      return !task.completed && !isTaskOverdue(task);
    } else if (filter === 'overdue') {
      // Overdue: not completed AND overdue
      return !task.completed && isTaskOverdue(task);
    }
    
    // 'all' and 'completed' filters handled by backend
    return true;
  });

  const renderTask = ({ item }: { item: Task }) => (
    <TaskCard
      task={item}
      onPress={() => router.push(`/(app)/task/${item.id}`)}
      onToggleComplete={() => handleToggleComplete(item)}
    />
  );


  const renderEmpty = () => {
    if (isLoading) return null;
    
    return (
      <View style={styles.emptyContainer} key={`empty-${_key}`}>
        <Ionicons name="checkmark-done-circle" size={64} color="#ccc" />
        <Text style={styles.emptyText} key={`empty-text-${_key}`}>
          {searchQuery
            ? t('tasks.noSearchResults')
            : filter === 'completed' 
            ? t('tasks.noCompletedTasks')
            : filter === 'pending'
            ? t('tasks.noPendingTasks')
            : filter === 'overdue'
            ? t('tasks.noOverdueTasks')
            : t('tasks.emptyHint')}
        </Text>
        {!searchQuery && filter === 'all' && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/(app)/create')}
          >
            <Text style={styles.createButtonText} key={`create-btn-${_key}`}>{t('tasks.create')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (isLoading) {
    return <LoadingSpinner message={t('common.loading')} />;
  }

  if (error && tasks.length === 0) {
    return (
      <ErrorMessage
        message={error.message || t('errors.loadTasks')}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]} key={`container-${_key}`}>
        {isSearchVisible ? (
          <Appbar.Header elevated>
            <Searchbar
              placeholder={searchPlaceholder}
              onChangeText={setSearchQuery}
              value={searchQuery}
              icon="arrow-left"
              onIconPress={() => {
                setIsSearchVisible(false);
                setSearchQuery('');
              }}
              style={styles.searchBar}
            />
          </Appbar.Header>
        ) : (
          <Appbar.Header elevated>
            <Appbar.Content title={pageTitle} />
            <Appbar.Action icon="magnify" onPress={() => setIsSearchVisible(true)} />
            {filter === 'completed' && (
              <Appbar.Action 
                 icon="cloud-upload"
                 onPress={handleExport} 
                 disabled={isExporting} 
              />
            )}
          </Appbar.Header>
        )}

        {/* Filter Chips */}
        <View style={[styles.filterContainer, { backgroundColor: theme.colors.background }]} key={`filters-${_key}`}>
          {(['all', 'pending', 'overdue', 'completed'] as const).map((filterType) => (
            <Chip
              key={`${filterType}-${_key}`}
              selected={filter === filterType}
              onPress={() => setFilter(filterType)}
              style={styles.filterChip}
              showSelectedOverlay
            >
                {filterType === 'all' ? t('tasks.filterAll') :
                 filterType === 'pending' ? t('tasks.filterPending') :
                 filterType === 'overdue' ? t('tasks.filterOverdue') :
                 t('tasks.filterCompleted')}
            </Chip>
          ))}
        </View>

        {/* Task List */}
        <FlatList
          key={`task-list-${_key}`}
          data={filteredTasks}
          renderItem={renderTask}
          keyExtractor={(item) => `task-${item.id}-${_key}`}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          extraData={`${_key}-${forceRender}`}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />
          }
        />

        {/* Error Banner */}
        {error && tasks.length > 0 && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{error.message || 'An error occurred'}</Text>
            <TouchableOpacity onPress={() => refetch()}>
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Export Confirmation Dialog */}
      <Portal>
        <Dialog 
          visible={exportDialogVisible} 
          onDismiss={() => setExportDialogVisible(false)}
          style={[styles.dialog, { backgroundColor: theme.colors.surface }]}
        >
          <Dialog.Title style={styles.dialogTitle}>{t('export.title')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {filteredTasks.length === 1 
                ? t('export.confirmCompletedSingle')
                : t('export.confirmCompleted', { count: filteredTasks.length })}
            </Paragraph>
            <Paragraph style={{ marginTop: 8, fontStyle: 'italic' }}>
              {t('export.backupNote')}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setExportDialogVisible(false)}>{t('common.cancel')}</Button>
            <Button onPress={performExport}>{t('export.button')}</Button>
          </Dialog.Actions>
        </Dialog>

        {/* Success Dialog */}
        <Dialog 
          visible={successDialogVisible} 
          onDismiss={() => setSuccessDialogVisible(false)}
          style={[styles.dialog, { backgroundColor: theme.colors.surface }]}
        >
          <Dialog.Title style={styles.dialogTitle}>{t('common.success')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{t('export.successWithLink')}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSuccessDialogVisible(false)}>{t('common.done')}</Button>
            {exportResult?.webViewLink && (
              <Button onPress={() => {
                if (exportResult.webViewLink) {
                  Linking.openURL(exportResult.webViewLink);
                }
                setSuccessDialogVisible(false);
              }}>
                {t('export.viewInDrive')}
              </Button>
            )}
          </Dialog.Actions>
        </Dialog>

        {/* Error Dialog */}
        <Dialog 
          visible={errorDialogVisible} 
          onDismiss={() => setErrorDialogVisible(false)}
          style={[styles.dialog, { backgroundColor: theme.colors.surface }]}
        >
          <Dialog.Title style={styles.dialogTitle}>{t('common.error')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{exportError}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setErrorDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>

        {/* Loading Dialog */}
        <Dialog 
          visible={isExporting} 
          dismissable={false}
          style={[styles.dialog, { backgroundColor: theme.colors.surface }]}
        >
          <Dialog.Content style={styles.loadingContent}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>{t('export.uploading')}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flex: 1,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  filterChip: {
    marginRight: 4,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  createButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF3B30',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  errorBannerText: {
    flex: 1,
    color: 'white',
    marginRight: 12,
  },
  dialog: {
    borderRadius: 12,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
  },
});

--------------------------------------------

theme.ts

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const PurpleLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "rgb(120, 69, 172)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(240, 219, 255)",
    onPrimaryContainer: "rgb(44, 0, 81)",
    secondary: "rgb(102, 90, 111)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(237, 221, 246)",
    onSecondaryContainer: "rgb(33, 24, 42)",
    tertiary: "rgb(128, 81, 88)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 217, 221)",
    onTertiaryContainer: "rgb(50, 16, 23)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(29, 27, 30)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(29, 27, 30)",
    surfaceVariant: "rgb(233, 223, 235)",
    onSurfaceVariant: "rgb(74, 69, 78)",
    outline: "rgb(124, 117, 126)",
    outlineVariant: "rgb(204, 196, 206)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(50, 47, 51)",
    inverseOnSurface: "rgb(245, 239, 244)",
    inversePrimary: "rgb(220, 184, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(248, 242, 251)",
      level2: "rgb(244, 236, 248)",
      level3: "rgb(240, 231, 246)",
      level4: "rgb(239, 229, 245)",
      level5: "rgb(236, 226, 243)"
    },
    surfaceDisabled: "rgba(29, 27, 30, 0.12)",
    onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
    backdrop: "rgba(51, 47, 55, 0.4)"
  }
};

export const PurpleDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "rgb(220, 184, 255)",
    onPrimary: "rgb(71, 12, 122)",
    primaryContainer: "rgb(95, 43, 146)",
    onPrimaryContainer: "rgb(240, 219, 255)",
    secondary: "rgb(208, 193, 218)",
    onSecondary: "rgb(54, 44, 63)",
    secondaryContainer: "rgb(77, 67, 87)",
    onSecondaryContainer: "rgb(237, 221, 246)",
    tertiary: "rgb(243, 183, 190)",
    onTertiary: "rgb(75, 37, 43)",
    tertiaryContainer: "rgb(101, 58, 65)",
    onTertiaryContainer: "rgb(255, 217, 221)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(29, 27, 30)",
    onBackground: "rgb(231, 225, 229)",
    surface: "rgb(29, 27, 30)",
    onSurface: "rgb(231, 225, 229)",
    surfaceVariant: "rgb(74, 69, 78)",
    onSurfaceVariant: "rgb(204, 196, 206)",
    outline: "rgb(150, 142, 152)",
    outlineVariant: "rgb(74, 69, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(231, 225, 229)",
    inverseOnSurface: "rgb(50, 47, 51)",
    inversePrimary: "rgb(120, 69, 172)",
    elevation: {
      level0: "transparent",
      level1: "rgb(39, 35, 41)",
      level2: "rgb(44, 40, 48)",
      level3: "rgb(50, 44, 55)",
      level4: "rgb(52, 46, 57)",
      level5: "rgb(56, 49, 62)"
    },
    surfaceDisabled: "rgba(231, 225, 229, 0.12)",
    onSurfaceDisabled: "rgba(231, 225, 229, 0.38)",
    backdrop: "rgba(51, 47, 55, 0.4)"
  }
};

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});


