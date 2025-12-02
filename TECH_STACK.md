# Technical Stack Documentation

## 📦 Complete Dependency List

### Production Dependencies

| Package | Version | Purpose | Documentation |
|---------|---------|---------|---------------|
| **next** | 16.0.6 | React framework with App Router, SSR, and optimization features | [Next.js Docs](https://nextjs.org/docs) |
| **react** | 19.2.0 | UI library for building component-based interfaces | [React Docs](https://react.dev) |
| **react-dom** | 19.2.0 | React renderer for web browsers | [React DOM Docs](https://react.dev/reference/react-dom) |

### Development Dependencies

| Package | Version | Purpose | Documentation |
|---------|---------|---------|---------------|
| **typescript** | ^5 | Static type checking and enhanced IDE support | [TypeScript Docs](https://www.typescriptlang.org/docs) |
| **@types/node** | ^20 | TypeScript type definitions for Node.js APIs | [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) |
| **@types/react** | ^19 | TypeScript type definitions for React | [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) |
| **@types/react-dom** | ^19 | TypeScript type definitions for React DOM | [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) |
| **eslint** | ^9 | JavaScript/TypeScript linting for code quality | [ESLint Docs](https://eslint.org/docs/latest/) |
| **eslint-config-next** | 16.0.6 | Next.js recommended ESLint configuration | [Next.js ESLint](https://nextjs.org/docs/app/building-your-application/configuring/eslint) |

## 🏗️ Framework & Architecture

### Next.js 16.0.6 (App Router)

**Architecture Type**: App Router (Modern Next.js 13+ architecture)

**Key Features Used**:
- **File-based Routing**: Routes defined by file structure in [`src/app`](src/app)
- **Server Components**: Default rendering strategy for optimal performance
- **Client Components**: Interactive components with `"use client"` directive
- **Dynamic Routes**: Parameter-based routing with `[id]` syntax
- **Metadata API**: SEO optimization through [`layout.tsx`](src/app/layout.tsx:1)
- **Image Optimization**: Automatic optimization via `next/image`
- **Font Optimization**: Variable font loading with `next/font`

**Rendering Strategies**:
- Server-side rendering (SSR) for blog detail pages
- Client-side interactivity for search functionality
- Static asset optimization for images and fonts

### React 19.2.0

**Component Patterns**:
- Functional components with hooks
- Server Components (default in App Router)
- Client Components for interactivity
- TypeScript for type-safe props

**React Features Used**:
- `useState` for search state management in [`src/app/page.tsx`](src/app/page.tsx:1)
- `Image` component from `next/image` for optimization
- Async components for server-side data fetching

## 🔧 Build Tools & Configuration

### TypeScript 5.x

**Configuration**: [`tsconfig.json`](tsconfig.json:1)

**Key Settings**:
```json
{
  "compilerOptions": {
    "strict": true,                    // Enable all strict type checking
    "target": "ES2017",                // Modern JavaScript output
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",                 // Preserve JSX for Next.js
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]               // Path alias for imports
    }
  }
}
```

**Benefits**:
- Compile-time error detection
- Enhanced IDE autocomplete and IntelliSense
- Refactoring safety
- Self-documenting code through types

### ESLint 9.x

**Configuration**: [`eslint.config.mjs`](eslint.config.mjs:1)

**Extends**:
- `next/core-web-vitals`: Performance-focused rules
- `next/typescript`: TypeScript-specific rules

**Purpose**:
- Code quality enforcement
- Consistent code style
- Early bug detection
- Best practice adherence

**Usage**:
```bash
npm run lint  # Check for linting errors
```

### Next.js Configuration

**File**: [`next.config.ts`](next.config.ts:1)

**Configuration Details**:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

**Purpose**:
- Enable external image optimization for Unsplash CDN
- Type-safe configuration with TypeScript
- Security through explicit domain allowlisting

## 🎨 Styling System

### CSS Modules

**Implementation**:
- Component-scoped styles (e.g., [`page.module.css`](src/app/page.module.css:1))
- Automatic class name hashing to prevent conflicts
- Co-located with components for better maintainability

**Example Usage**:
```typescript
import styles from './page.module.css';

export default function Page() {
  return <div className={styles.container}>Content</div>;
}
```

### Global CSS

**File**: [`src/app/globals.css`](src/app/globals.css:1)

**Contains**:
- CSS reset and normalization
- CSS custom properties (variables)
- Dark mode support via `prefers-color-scheme`
- Base typography and layout styles

**CSS Variables**:
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

## 🖼️ Font Optimization

### Geist Font Family

**Implementation**: [`src/app/layout.tsx`](src/app/layout.tsx:1)

**Fonts Used**:
1. **Geist Sans**: Primary sans-serif font
2. **Geist Mono**: Monospace font for code

**Configuration**:
```typescript
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

**Benefits**:
- Variable fonts for flexible sizing
- Automatic font subsetting (Latin only)
- Self-hosted fonts (no external requests)
- CSS variable integration
- Zero layout shift with `font-display: swap`

## 🖼️ Image Optimization

### Next.js Image Component

**Configuration**: [`next.config.ts`](next.config.ts:1)

**Features**:
- Automatic format optimization (WebP, AVIF)
- Responsive image sizing
- Lazy loading by default
- Blur placeholder support
- CDN integration (Unsplash)

**Usage Example**:
```typescript
import Image from 'next/image';

<Image
  src="https://images.unsplash.com/photo-..."
  alt="Description"
  width={800}
  height={600}
  priority={false}  // Lazy load by default
/>
```

**Allowed Domains**:
- `images.unsplash.com` (configured in [`next.config.ts`](next.config.ts:1))

## 📊 Data Management

### Static Data Source

**File**: [`src/data.ts`](src/data.ts:1)

**Structure**:
```typescript
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

export const blogPosts: BlogPost[] = [
  // Blog post data
];
```

**Current Approach**:
- Static TypeScript data file
- Type-safe blog post structure
- In-memory data access
- No database required for this example

**Future Considerations**:
- Could be replaced with CMS (Contentful, Sanity)
- Database integration (PostgreSQL, MongoDB)
- API routes for dynamic data
- Markdown/MDX for content

## 🚀 Runtime Environment

### Node.js 20 LTS

**Requirements**:
- Minimum version: Node.js 20.x
- Recommended: Latest LTS release
- Package manager: npm (bundled with Node.js)

**Why Node.js 20**:
- Long-term support until April 2026
- Modern JavaScript features
- Performance improvements
- Security updates

### Package Manager

**npm** (Node Package Manager)

**Key Commands**:
```bash
npm install           # Install dependencies
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Run ESLint
```

**Lock File**: [`package-lock.json`](package-lock.json:1)
- Ensures consistent dependency versions
- Faster installation
- Security through version locking

## 🔐 Type Safety

### TypeScript Integration

**Type Definitions**:
- All components use TypeScript
- Props interfaces defined inline or exported
- Type-safe configuration files
- Strict mode enabled

**Example Type Usage**:
```typescript
// In src/data.ts
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

// In components
interface PageProps {
  params: Promise<{ id: string }>;
}
```

## 📁 Configuration Files Explained

### [`package.json`](package.json:1)
- Project metadata and dependencies
- NPM scripts for development and build
- Version specifications

### [`tsconfig.json`](tsconfig.json:1)
- TypeScript compiler options
- Path aliases (`@/*` → `./src/*`)
- Strict type checking enabled

### [`next.config.ts`](next.config.ts:1)
- Next.js framework configuration
- Image domain allowlist
- Type-safe with TypeScript

### [`eslint.config.mjs`](eslint.config.mjs:1)
- ESLint flat config format (ESLint 9+)
- Next.js recommended rules
- TypeScript integration

### [`.gitignore`](.gitignore:1)
- Excludes `node_modules/`, `.next/`, build artifacts
- Prevents committing sensitive or generated files

## 🎯 Modern Patterns & Best Practices

### Server Components First
- Default to Server Components for better performance
- Use Client Components only when needed (interactivity, browser APIs)
- Reduces JavaScript bundle size

### Type Safety Everywhere
- TypeScript for all code files
- Type-safe configuration files
- Interface definitions for data structures

### Performance Optimization
- Automatic code splitting
- Image optimization with `next/image`
- Font optimization with `next/font`
- CSS Modules for scoped styles

### Developer Experience
- Hot Module Replacement (HMR)
- Fast Refresh for instant updates
- ESLint for code quality
- TypeScript for type checking

## 🔄 Build Process

### Development Mode
```bash
npm run dev
```
- Starts development server on port 3000
- Hot reload enabled
- Source maps for debugging
- Detailed error messages

### Production Build
```bash
npm run build
```
- Optimizes code for production
- Minifies JavaScript and CSS
- Generates static pages where possible
- Creates optimized image variants

### Production Server
```bash
npm run start
```
- Serves production build
- Requires `npm run build` first
- Optimized for performance

## 📚 Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **ESLint Rules**: https://eslint.org/docs/latest/rules/
- **CSS Modules**: https://github.com/css-modules/css-modules

---

**Last Updated**: December 2025  
**Stack Version**: Next.js 16.0.6 + React 19.2.0 + TypeScript 5