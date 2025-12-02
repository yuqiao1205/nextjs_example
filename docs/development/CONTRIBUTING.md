# Contributing to Next.js Blog

Thank you for your interest in contributing to this Next.js blog project! We welcome contributions from developers of all skill levels. This guide will help you get started and ensure a smooth contribution process.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Project Structure](#project-structure)
- [Component Guidelines](#component-guidelines)
- [Styling Guidelines](#styling-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Code of Conduct](#code-of-conduct)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x (LTS) or higher
- **npm**: Comes with Node.js (version 10.x or higher recommended)
- **Git**: For version control
- **Code Editor**: We recommend [Visual Studio Code](https://code.visualstudio.com/) with the following extensions:
  - ESLint
  - Prettier (optional)
  - TypeScript and JavaScript Language Features

### Installation

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nextjs_example.git
   cd nextjs_example
   ```

3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/nextjs_example.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Starts the development server with hot-reload at http://localhost:3000
- `npm run build` - Creates an optimized production build
- `npm run start` - Starts the production server (requires `npm run build` first)
- `npm run lint` - Runs ESLint to check for code quality issues

## Development Workflow

### Branch Strategy

We follow a feature branch workflow:

1. **Create a new branch** for each feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Keep your branch up to date** with the main branch:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

3. **Make your changes** in logical, atomic commits

4. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

**Examples:**
```bash
feat(blog): add pagination to blog list
fix(layout): correct dark mode toggle behavior
docs(readme): update installation instructions
style(components): format code according to ESLint rules
```

## Code Style Guidelines

### TypeScript Guidelines

This project uses **TypeScript 5** with **strict mode** enabled. Follow these guidelines:

1. **Always use TypeScript** - No `.js` or `.jsx` files
2. **Explicit types** for function parameters and return values:
   ```typescript
   // ✅ Good
   function getBlogPost(id: string): BlogPost | undefined {
     return posts.find(post => post.id === id);
   }

   // ❌ Avoid
   function getBlogPost(id) {
     return posts.find(post => post.id === id);
   }
   ```

3. **Use interfaces** for object shapes:
   ```typescript
   interface BlogPost {
     id: string;
     title: string;
     content: string;
     date: string;
   }
   ```

4. **Leverage type inference** when the type is obvious:
   ```typescript
   // ✅ Good - type is inferred
   const posts = [{ id: '1', title: 'Hello' }];
   
   // ❌ Unnecessary
   const posts: Array<{ id: string; title: string }> = [{ id: '1', title: 'Hello' }];
   ```

5. **Use `const` by default**, `let` when reassignment is needed, avoid `var`

### ESLint Rules

This project uses ESLint 9 with Next.js recommended configuration:

- **Core Web Vitals** rules are enabled
- **TypeScript** rules are enforced
- Run `npm run lint` before committing to catch issues early

**Common ESLint fixes:**
```bash
# Check for issues
npm run lint

# Some issues can be auto-fixed (when supported)
npx eslint . --fix
```

### Code Formatting

- **Indentation**: 2 spaces (configured in [`tsconfig.json`](tsconfig.json))
- **Quotes**: Double quotes for strings
- **Semicolons**: Required
- **Line length**: Aim for 80-100 characters (not strictly enforced)
- **Trailing commas**: Use in multi-line objects and arrays

## Project Structure

Understanding the project structure will help you navigate and contribute effectively:

```
nextjs_example/
├── public/                 # Static assets (images, icons, etc.)
│   ├── blog.png           # Blog-related images
│   ├── favicon.ico        # Site favicon
│   └── *.svg              # SVG icons
├── src/
│   ├── app/               # Next.js App Router directory
│   │   ├── layout.tsx     # Root layout (Server Component)
│   │   ├── page.tsx       # Home page (Client Component)
│   │   ├── globals.css    # Global styles
│   │   ├── page.module.css # Home page styles
│   │   └── blog/
│   │       └── [id]/      # Dynamic blog post routes
│   │           ├── page.tsx        # Blog detail page (Server Component)
│   │           └── page.module.css # Blog detail styles
│   └── data.ts            # Blog data source (mock data)
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies and scripts
```

### Key Directories

- **`src/app/`**: Contains all pages and layouts using Next.js App Router
  - Files named `layout.tsx` define shared UI for a segment and its children
  - Files named `page.tsx` define the UI for a route
  - Dynamic routes use `[param]` folder naming convention

- **`public/`**: Static files served from the root URL
  - Files here are accessible at `/filename.ext`
  - Use for images, fonts, and other static assets

- **`src/data.ts`**: Currently contains mock blog data
  - Future: Could be replaced with database queries or CMS integration

### Path Aliases

The project uses path aliases configured in [`tsconfig.json`](tsconfig.json:21):

```typescript
// ✅ Use path alias
import { posts } from '@/data';

// ❌ Avoid relative paths when possible
import { posts } from '../../data';
```

## Component Guidelines

This project uses Next.js 16 with the App Router, which introduces Server and Client Components.

### Server Components (Default)

**Server Components** are the default in the App Router. They:
- Render on the server
- Can directly access backend resources (databases, file system)
- Reduce client-side JavaScript bundle size
- Cannot use browser APIs or React hooks like `useState`, `useEffect`

**When to use:**
- Fetching data from APIs or databases
- Accessing backend resources
- Keeping sensitive information on the server (API keys, tokens)
- Reducing client-side JavaScript

**Example:**
```typescript
// src/app/blog/[id]/page.tsx
import { posts } from '@/data';

// This is a Server Component by default
export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);
  
  return <article>{post?.content}</article>;
}
```

### Client Components

**Client Components** require the `'use client'` directive. They:
- Render on the client (browser)
- Can use React hooks (`useState`, `useEffect`, etc.)
- Can use browser APIs
- Enable interactivity and event listeners

**When to use:**
- Interactive UI elements (buttons, forms, modals)
- React hooks (`useState`, `useEffect`, `useContext`)
- Browser-only APIs (`window`, `localStorage`, etc.)
- Event listeners (`onClick`, `onChange`, etc.)

**Example:**
```typescript
// src/app/page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

### Component Best Practices

1. **Start with Server Components** - Only use `'use client'` when necessary
2. **Keep Client Components small** - Move server logic to Server Components
3. **Use async/await** for data fetching in Server Components
4. **Handle params correctly** - In Next.js 15+, params are promises:
   ```typescript
   // ✅ Correct
   const { id } = await params;
   
   // ❌ Incorrect (old pattern)
   const { id } = params;
   ```

5. **Export metadata** from pages for SEO:
   ```typescript
   export const metaMetadata = {
     title: 'My Page',
     description: 'Page description',
   };
   ```

## Styling Guidelines

This project uses **CSS Modules** for component-scoped styling.

### CSS Modules

CSS Modules automatically scope CSS to components, preventing style conflicts.

**File naming convention:**
- `ComponentName.module.css` for component styles
- `globals.css` for global styles

**Usage example:**
```typescript
// Component file: src/app/page.tsx
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello World</h1>
    </div>
  );
}
```

```css
/* Style file: src/app/page.module.css */
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  color: var(--foreground);
}
```

### CSS Best Practices

1. **Use CSS Variables** - Defined in [`globals.css`](src/app/globals.css) for theming:
   ```css
   .myComponent {
     color: var(--foreground);
     background: var(--background);
   }
   ```

2. **Dark Mode Support** - The project supports dark mode via CSS variables:
   ```css
   @media (prefers-color-scheme: dark) {
     :root {
       --foreground: #ededed;
       --background: #0a0a0a;
     }
   }
   ```

3. **Mobile-First Approach** - Write base styles for mobile, then add media queries:
   ```css
   .container {
     padding: 1rem; /* Mobile */
   }
   
   @media (min-width: 768px) {
     .container {
       padding: 2rem; /* Tablet and up */
     }
   }
   ```

4. **Use Semantic Class Names** - Describe what the element is, not how it looks:
   ```css
   /* ✅ Good */
   .blogPost { }
   .authorInfo { }
   
   /* ❌ Avoid */
   .redText { }
   .bigBox { }
   ```

### Font Optimization

The project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for automatic font optimization:

```typescript
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

When adding new fonts, follow this pattern and use CSS variables.

### Image Optimization

Use [`next/image`](https://nextjs.org/docs/app/api-reference/components/image) for automatic image optimization:

```typescript
import Image from 'next/image';

<Image
  src="/blog.png"
  alt="Blog illustration"
  width={500}
  height={300}
  priority // Use for above-the-fold images
/>
```

## Testing

### Current Status

⚠️ **Testing framework is not currently configured** in this project. This is an area where contributions are especially welcome!

### Recommended Testing Setup

We recommend adding the following testing tools:

1. **Test Framework**: [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)
2. **React Testing**: [React Testing Library](https://testing-library.com/react)
3. **E2E Testing**: [Playwright](https://playwright.dev/) (optional)

### Proposed Test Structure

```
src/
├── app/
│   ├── page.test.tsx          # Component tests
│   └── blog/
│       └── [id]/
│           └── page.test.tsx
└── __tests__/                  # Integration tests
    └── blog.test.ts
```

### Test File Naming Conventions

When adding tests, use these naming conventions:
- `*.test.tsx` or `*.test.ts` for unit tests
- `*.spec.tsx` or `*.spec.ts` for integration tests
- `*.e2e.ts` for end-to-end tests

### Test Coverage Goals

When testing is implemented, aim for:
- **Unit Tests**: 80%+ coverage for utility functions and components
- **Integration Tests**: Critical user flows (viewing blog posts, navigation)
- **E2E Tests**: Main user journeys

### Contributing Tests

If you'd like to help set up testing:

1. **Create an issue** proposing your testing approach
2. **Add test configuration** (e.g., `vitest.config.ts`)
3. **Write example tests** for existing components
4. **Update this documentation** with testing instructions
5. **Add test scripts** to [`package.json`](package.json)

Example test script additions:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Pull Request Process

### Before Submitting

1. **Run linting**:
   ```bash
   npm run lint
   ```

2. **Build the project** to ensure no build errors:
   ```bash
   npm run build
   ```

3. **Test locally**:
   ```bash
   npm run start
   ```

4. **Update documentation** if you've changed functionality

5. **Commit your changes** following our commit conventions

### Submitting a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub with:
   - **Clear title** following commit conventions
   - **Description** explaining what and why
   - **Screenshots** for UI changes
   - **Related issues** (e.g., "Closes #123")

3. **PR Template** (use this format):
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Code refactoring
   
   ## Testing
   - [ ] Tested locally
   - [ ] No console errors
   - [ ] Responsive design verified (if UI change)
   
   ## Screenshots (if applicable)
   Add screenshots here
   
   ## Related Issues
   Closes #(issue number)
   ```

### Review Process

1. **Automated checks** will run (ESLint, build)
2. **Maintainers will review** your code
3. **Address feedback** by pushing new commits
4. **Once approved**, a maintainer will merge your PR

### After Your PR is Merged

1. **Delete your branch**:
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Update your local main branch**:
   ```bash
   git checkout main
   git pull upstream main
   ```

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers. All complaints will be reviewed and investigated promptly and fairly.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org/), version 2.1.

## Questions?

If you have questions or need help:

1. **Check existing issues** on GitHub
2. **Open a new issue** with the "question" label
3. **Be specific** about what you need help with

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

Thank you for contributing to this project! Your efforts help make this blog better for everyone. 🎉