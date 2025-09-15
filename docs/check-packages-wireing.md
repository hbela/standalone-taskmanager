I'll help you understand how packages are wired up in this Next.js monorepo by examining the structure and configuration. Let me start by exploring the package structure and configuration files.


[4 tools called]

Now let me examine the individual package configurations to understand how they're structured:


[4 tools called]

Now let me examine the TypeScript configurations to understand how packages are linked:


[4 tools called]

Let me also check how the packages are actually used in the web app:


[3 tools called]

Let me check a specific usage example:


[4 tools called]

Perfect! Now I have a comprehensive understanding of how packages are wired up in this Next.js monorepo. Let me explain this step by step:

# How to Wire Up Packages in a Next.js Monorepo

This project demonstrates a well-structured monorepo setup using **pnpm workspaces**, **Turbo**, and **TypeScript**. Here's how packages are wired up step by step:

## 1. **Monorepo Structure Setup**

The project uses a **monorepo architecture** with:
- **Root level**: Contains shared configuration and orchestration
- **`apps/`**: Contains applications (web app, mcp-server, unsubscriber)
- **`packages/`**: Contains reusable packages (resend, loops, tinybird, etc.)

## 2. **Package Manager Configuration (pnpm)**

### Root `package.json`:
```json
{
  "packageManager": "pnpm@10.15.0",
  "pnpm": {
    "overrides": {
      "@types/react": "19.0.10",
      "@types/react-dom": "19.0.4"
    }
  }
}
```

### `pnpm-workspace.yaml`:
```yaml
packages:
- packages/*
- apps/*
```

This tells pnpm to treat all directories under `packages/` and `apps/` as separate packages.

## 3. **Package Dependencies with Workspace Protocol**

### In the web app (`apps/web/package.json`):
```json
{
  "dependencies": {
    "@inboxzero/loops": "workspace:*",
    "@inboxzero/resend": "workspace:*",
    "@inboxzero/tinybird": "workspace:*",
    "@inboxzero/tinybird-ai-analytics": "workspace:*"
  }
}
```

The `workspace:*` protocol tells pnpm to link to the local workspace package instead of downloading from npm.

### Individual package structure (`packages/resend/package.json`):
```json
{
  "name": "@inboxzero/resend",
  "version": "0.0.0",
  "main": "src/index.ts",
  "dependencies": {
    "resend": "6.0.2",
    "react": "19.1.1"
  },
  "devDependencies": {
    "tsconfig": "workspace:*"
  }
}
```

## 4. **TypeScript Configuration**

### Shared TypeScript configs (`packages/tsconfig/`):
- **`base.json`**: Common TypeScript settings
- **`nextjs.json`**: Next.js-specific settings extending base

### Package TypeScript configs:
Each package has its own `tsconfig.json`:
```json
{
  "extends": "tsconfig/base.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true
  }
}
```

### App TypeScript config (`apps/web/tsconfig.json`):
```json
{
  "extends": "tsconfig/nextjs.json",
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 5. **Build System (Turbo)**

### `turbo.json`:
```json
{
  "tasks": {
    "build": {
      "env": ["NODE_ENV", "DATABASE_URL", ...],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Root scripts:
```json
{
  "scripts": {
    "build": "turbo build --filter=./apps/web",
    "dev": "turbo dev --filter=./apps/web"
  }
}
```

## 6. **Package Implementation Pattern**

### Package exports (`packages/resend/src/index.ts`):
```typescript
export * from "./send";
export * from "./contacts";
```

### Package implementation (`packages/resend/src/send.tsx`):
```typescript
import { render } from "@react-email/render";
import { resend } from "./client";

export const sendSummaryEmail = async ({
  from,
  to,
  test,
  emailProps,
}: {
  from: string;
  to: string;
  test?: boolean;
  emailProps: SummaryEmailProps;
}) => {
  // Implementation here
};
```

## 7. **Usage in Applications**

### Importing packages in the web app:
```typescript
// apps/web/utils/auth.ts
import { createContact as createLoopsContact } from "@inboxzero/loops";
import { createContact as createResendContact } from "@inboxzero/resend";

// Usage
await createLoopsContact(user.email, user.name);
await createResendContact(user.email, user.name);
```

## 8. **Key Benefits of This Setup**

1. **Code Reusability**: Shared packages can be used across multiple apps
2. **Type Safety**: Full TypeScript support across packages
3. **Dependency Management**: pnpm handles workspace linking automatically
4. **Build Optimization**: Turbo caches and parallelizes builds
5. **Development Experience**: Hot reloading works across packages
6. **Version Management**: All packages share the same dependency versions

## 9. **Development Workflow**

1. **Install dependencies**: `pnpm install` (installs all workspace packages)
2. **Start development**: `pnpm dev` (starts the web app with hot reloading)
3. **Build**: `pnpm build` (builds the web app and its dependencies)
4. **Add new package**: Create new directory in `packages/` with proper `package.json`

This setup provides a robust foundation for building scalable applications with shared, reusable packages while maintaining excellent developer experience and build performance.