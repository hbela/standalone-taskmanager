# Vexo & Sentry: Implementation Guide for Task Manager App

**Date:** February 10, 2026  
**Purpose:** Step-by-step guide to implement both Vexo and Sentry in your Task Manager app

---

## Recommended Strategy: Sentry First, Then Vexo

1.  **Phase 1: Launch (Now)** - Install Sentry (free tier) for stability
2.  **Phase 2: Post-Launch (1-2 months)** - Add Vexo ($7/month) for analytics

This guide will walk you through both implementations.

---

## Part 1: Sentry Implementation (Stability First)

**Goal:** Catch crashes and errors immediately upon launch.
**Time:** ~75 minutes

### Step 1: Sign Up for Sentry

1.  Go to [sentry.io](https://sentry.io/) and sign up for the **Developer** plan (free).
2.  Create a new project and select **React Native** as the platform.
3.  You will be given a **DSN (Data Source Name)** key. Keep this handy.

### Step 2: Install Sentry SDK

Run the Sentry wizard in your project root:

```bash
npx @sentry/wizard@latest -i reactNative
```

The wizard will:
-   Install necessary packages (`@sentry/react-native`)
-   Ask for your DSN key
-   Create `sentry.properties` files for Android and iOS
-   Configure your project for source map uploads

### Step 3: Initialize Sentry in Your App

Open your `app/_layout.tsx` file and initialize Sentry at the very top:

```typescript
// app/_layout.tsx
import * as Sentry from "@sentry/react-native";

// Initialize Sentry at the top
Sentry.init({
  dsn: "YOUR_SENTRY_DSN_HERE",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

// ... rest of your _layout.tsx file

// Wrap your root component with Sentry.wrap()
export default Sentry.wrap(RootLayout);
```

### Step 4: Configure Source Maps

The wizard should handle this, but verify:

1.  **`sentry.properties`:** Ensure this file exists in your project root and contains your org, project, and auth token.
2.  **Build script:** The wizard should add a build script to your `package.json` to upload source maps during the build process.

### Step 5: Test Your Implementation

Add a button to a test screen to trigger a test error:

```typescript
import * as Sentry from "@sentry/react-native";

<Button onPress={() => Sentry.captureException(new Error("Test error from Task Manager"))}>
  Trigger Test Error
</Button>
```

Click the button and check your Sentry dashboard. You should see the error appear within a few minutes.

### Step 6: Add Error Boundary

Wrap your root component with Sentry’s `ErrorBoundary` to catch UI rendering errors:

```typescript
// app/_layout.tsx
import { Sentry.ErrorBoundary } from "@sentry/react-native";

function RootLayout() {
  // ... your layout code
}

export default () => (
  <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
    <RootLayout />
  </Sentry.ErrorBoundary>
);
```

### Step 7: Production Build

When you build for production, Sentry will automatically upload source maps:

```bash
eas build --platform android --profile production
```

**Sentry is now live!** You will get alerts for any crashes or errors in your production app.

---

## Part 2: Vexo Implementation (Growth Analytics)

**Goal:** Understand user behavior and optimize for growth.
**Time:** ~45 minutes

### Step 1: Sign Up for Vexo

1.  Go to [vexo.co](https://www.vexo.co/) and sign up for the **Free** plan.
2.  Create a new app project.
3.  You will be given an **API Key**. Keep this handy.

### Step 2: Install Vexo SDK

Install the Vexo package:

```bash
npm install vexo-analytics
# or
yarn add vexo-analytics
```

### Step 3: Initialize Vexo in Your App

Open your `app/_layout.tsx` file and initialize Vexo at the top (it can coexist with Sentry):

```typescript
// app/_layout.tsx
import { Vexo } from "vexo-analytics";

// Initialize Vexo at the top
Vexo.init("YOUR_VEXO_API_KEY_HERE");

// ... rest of your _layout.tsx file
```

**That’s it!** Vexo will automatically start tracking:
-   Sessions
-   Screen views
-   User activity
-   Device information
-   And more!

### Step 4: Track Custom Events (Optional but Recommended)

Track key business events to understand feature usage.

**Example: Track Task Creation**

In your `TaskForm.tsx` component, after a task is successfully created:

```typescript
import { Vexo } from "vexo-analytics";

// ... inside your form submission logic
if (isSuccess) {
  Vexo.track("Task Created", { priority: values.priority });
  // ... rest of your logic
}
```

**Other recommended custom events:**
-   `Task Completed`
-   `Task Deleted`
-   `Donation Made`
-   `Language Changed`
-   `Calendar View Opened`

### Step 5: Verify Your Implementation

1.  Run your app:
    ```bash
    npx expo start
    ```

2.  Navigate through your app, create a task, and perform some actions.

3.  Go to your Vexo dashboard. You should see:
    -   Your session replay
    -   Screen view events
    -   Custom events you tracked

**Vexo is now live!** You can now watch user sessions, analyze heatmaps, and track your custom events.

---

## Final `app/_layout.tsx` with Both Tools

```typescript
import * as Sentry from "@sentry/react-native";
import { Vexo } from "vexo-analytics";
import { Sentry.ErrorBoundary } from "@sentry/react-native";

// Initialize Sentry
Sentry.init({
  dsn: "YOUR_SENTRY_DSN_HERE",
  tracesSampleRate: 1.0,
});

// Initialize Vexo
Vexo.init("YOUR_VEXO_API_KEY_HERE");

function RootLayoutNav() {
  // ... your layout code
}

function RootLayout() {
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
      <RootLayoutNav />
    </Sentry.ErrorBoundary>
  );
}

// Wrap the root component with Sentry
export default Sentry.wrap(RootLayout);
```

---

## Best Practices

### Environment Variables

Store your DSN and API keys in environment variables, not directly in your code:

```typescript
// In your app.config.ts or a separate config file
Sentry.init({ dsn: process.env.EXPO_PUBLIC_SENTRY_DSN });
Vexo.init(process.env.EXPO_PUBLIC_VEXO_API_KEY);
```

### User Identification

Identify users to correlate errors and analytics with specific users:

```typescript
// After user logs in
const userId = user.id;
const userEmail = user.email;

Sentry.setUser({ id: userId, email: userEmail });
Vexo.identify(userId, { email: userEmail });
```

### Disabling in Development

You can disable tracking in development to save quota:

```typescript
if (!__DEV__) {
  Sentry.init({ dsn: "..." });
  Vexo.init("...");
}
```

---

## Summary

| Tool | Setup Time | Key Benefit | When to Use |
|--------|------------|-------------|-------------|
| **Sentry** | ~75 min | Stability & Debugging | **Now** (before launch) |
| **Vexo** | ~45 min | Growth & Analytics | **Post-launch** (1-2 months) |

By implementing both, you get a complete picture of your app’s health and user behavior, enabling you to both maintain a stable app and make data-driven decisions for growth.
