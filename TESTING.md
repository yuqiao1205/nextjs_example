# Testing Documentation

## 📊 Current Testing Status

⚠️ **No testing framework is currently configured in this project.**

This document provides recommendations for implementing a comprehensive testing strategy, including setup instructions, best practices, and example test cases.

## 🎯 Recommended Testing Setup

### Testing Stack Recommendation

| Tool | Purpose | Why |
|------|---------|-----|
| **Vitest** | Test runner and framework | Fast, Vite-powered, Jest-compatible API |
| **React Testing Library** | Component testing | Best practices for testing React components |
| **@testing-library/jest-dom** | Custom matchers | Enhanced assertions for DOM elements |
| **@testing-library/user-event** | User interaction simulation | Realistic user behavior testing |
| **@vitejs/plugin-react** | Vite React support | Required for JSX transformation |

**Alternative**: Jest + React Testing Library (more traditional, widely used)

## 🚀 Setup Instructions

### Option 1: Vitest (Recommended)

#### 1. Install Dependencies

```bash
npm install -D vitest @vitejs/plugin-react
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @vitest/ui  # Optional: UI for test results
```

#### 2. Create Vitest Configuration

Create [`vitest.config.ts`](vitest.config.ts:1) in the project root:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.config.*',
        '**/.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### 3. Create Test Setup File

Create [`src/test/setup.ts`](src/test/setup.ts:1):

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

#### 4. Update package.json Scripts

Add to [`package.json`](package.json:1):

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Option 2: Jest (Alternative)

#### 1. Install Dependencies

```bash
npm install -D jest @types/jest jest-environment-jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D ts-jest
```

#### 2. Create Jest Configuration

Create [`jest.config.js`](jest.config.js:1):

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

#### 3. Create Jest Setup File

Create [`jest.setup.js`](jest.setup.js:1):

```javascript
import '@testing-library/jest-dom';
```

## 📝 Testing Strategy

### Test Coverage Goals

| Component Type | Target Coverage | Priority |
|----------------|----------------|----------|
| Critical paths (search, routing) | 90%+ | High |
| UI components | 80%+ | High |
| Utility functions | 90%+ | Medium |
| Configuration files | N/A | Low |

### Testing Pyramid

```
        /\
       /  \      E2E Tests (10%)
      /____\     - Critical user flows
     /      \    
    /        \   Integration Tests (30%)
   /__________\  - Component interactions
  /            \ 
 /              \ Unit Tests (60%)
/________________\ - Individual functions/components
```

### What to Test

✅ **DO Test**:
- Component rendering with different props
- User interactions (clicks, typing, form submissions)
- Conditional rendering logic
- Data filtering and search functionality
- Error states and edge cases
- Accessibility features

❌ **DON'T Test**:
- Implementation details (internal state, private methods)
- Third-party library internals
- Styling (unless critical to functionality)
- Next.js framework behavior

## 🧪 Example Test Cases

### Test File Structure

```
src/
├── app/
│   ├── page.tsx
│   ├── page.test.tsx          # Tests for home page
│   └── blog/
│       └── [id]/
│           ├── page.tsx
│           └── page.test.tsx  # Tests for blog detail
├── data.ts
├── data.test.ts               # Tests for data utilities
└── test/
    └── setup.ts               # Test configuration
```

### Example 1: Testing Blog Listing Page

Create [`src/app/page.test.tsx`](src/app/page.test.tsx:1):

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './page';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Home Page', () => {
  it('renders the page title', () => {
    render(<Home />);
    expect(screen.getByText('My Blog')).toBeInTheDocument();
  });

  it('displays all blog posts initially', () => {
    render(<Home />);
    // Assuming we have 3 blog posts in data.ts
    const blogPosts = screen.getAllByRole('article');
    expect(blogPosts).toHaveLength(3);
  });

  it('filters blog posts based on search input', async () => {
    render(<Home />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    
    // Type in search box
    fireEvent.change(searchInput, { target: { value: 'Next.js' } });
    
    // Should show only posts matching "Next.js"
    const filteredPosts = screen.getAllByRole('article');
    expect(filteredPosts.length).toBeLessThan(3);
  });

  it('shows "No posts found" when search has no results', () => {
    render(<Home />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
  });

  it('clears search when input is emptied', () => {
    render(<Home />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    
    // Type and then clear
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.change(searchInput, { target: { value: '' } });
    
    // Should show all posts again
    const blogPosts = screen.getAllByRole('article');
    expect(blogPosts).toHaveLength(3);
  });

  it('renders blog post links correctly', () => {
    render(<Home />);
    
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/blog/1');
  });
});
```

### Example 2: Testing Blog Detail Page

Create [`src/app/blog/[id]/page.test.tsx`](src/app/blog/[id]/page.test.tsx:1):

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlogPost from './page';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Blog Post Page', () => {
  it('renders blog post with valid ID', async () => {
    const params = Promise.resolve({ id: '1' });
    const component = await BlogPost({ params });
    
    render(component);
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('displays post metadata (author and date)', async () => {
    const params = Promise.resolve({ id: '1' });
    const component = await BlogPost({ params });
    
    render(component);
    
    // Check for author name
    expect(screen.getByText(/by/i)).toBeInTheDocument();
    
    // Check for date
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it('renders full post content', async () => {
    const params = Promise.resolve({ id: '1' });
    const component = await BlogPost({ params });
    
    render(component);
    
    // Content should be present
    const content = screen.getByText(/./);
    expect(content).toBeInTheDocument();
  });

  it('returns 404 for invalid post ID', async () => {
    const params = Promise.resolve({ id: '999' });
    const component = await BlogPost({ params });
    
    render(component);
    
    expect(screen.getByText(/post not found/i)).toBeInTheDocument();
  });

  it('handles non-numeric IDs gracefully', async () => {
    const params = Promise.resolve({ id: 'invalid' });
    const component = await BlogPost({ params });
    
    render(component);
    
    expect(screen.getByText(/post not found/i)).toBeInTheDocument();
  });
});
```

### Example 3: Testing Data Utilities

Create [`src/data.test.ts`](src/data.test.ts:1):

```typescript
import { describe, it, expect } from 'vitest';
import { blogPosts, type BlogPost } from './data';

describe('Blog Data', () => {
  it('exports an array of blog posts', () => {
    expect(Array.isArray(blogPosts)).toBe(true);
    expect(blogPosts.length).toBeGreaterThan(0);
  });

  it('each blog post has required fields', () => {
    blogPosts.forEach((post: BlogPost) => {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('excerpt');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('author');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('imageUrl');
    });
  });

  it('blog post IDs are unique', () => {
    const ids = blogPosts.map(post => post.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('blog post dates are valid', () => {
    blogPosts.forEach((post: BlogPost) => {
      const date = new Date(post.date);
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });

  it('image URLs are valid', () => {
    blogPosts.forEach((post: BlogPost) => {
      expect(post.imageUrl).toMatch(/^https?:\/\//);
    });
  });
});
```

## 🎨 Testing Best Practices

### 1. Write Tests That Resemble User Behavior

```typescript
// ❌ Bad: Testing implementation details
expect(component.state.searchTerm).toBe('test');

// ✅ Good: Testing user-visible behavior
expect(screen.getByDisplayValue('test')).toBeInTheDocument();
```

### 2. Use Semantic Queries

Priority order for queries:
1. `getByRole` - Most accessible
2. `getByLabelText` - Form elements
3. `getByPlaceholderText` - Inputs
4. `getByText` - Non-interactive elements
5. `getByTestId` - Last resort

```typescript
// ✅ Best: Accessible query
const button = screen.getByRole('button', { name: /submit/i });

// ⚠️ Okay: Text-based query
const heading = screen.getByText('Welcome');

// ❌ Avoid: Test IDs (unless necessary)
const element = screen.getByTestId('custom-element');
```

### 3. Test Accessibility

```typescript
it('has accessible form labels', () => {
  render(<SearchForm />);
  
  const input = screen.getByLabelText(/search/i);
  expect(input).toBeInTheDocument();
});

it('has proper ARIA attributes', () => {
  render(<Button />);
  
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-label');
});
```

### 4. Mock External Dependencies

```typescript
// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/',
  }),
}));

// Mock API calls
vi.mock('./api', () => ({
  fetchPosts: vi.fn(() => Promise.resolve(mockPosts)),
}));
```

### 5. Use Descriptive Test Names

```typescript
// ❌ Bad
it('works', () => { /* ... */ });

// ✅ Good
it('displays error message when form submission fails', () => { /* ... */ });
```

## 🔄 Running Tests

### Development Workflow

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --run

# Run tests with UI (Vitest only)
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- src/app/page.test.tsx

# Run tests matching pattern
npm test -- --grep "search"
```

### Coverage Reports

After running `npm run test:coverage`, view the HTML report:

```bash
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

## 🎯 Coverage Goals by Component

| Component | File | Target Coverage | Priority |
|-----------|------|----------------|----------|
| Home Page | [`src/app/page.tsx`](src/app/page.tsx:1) | 90% | High |
| Blog Detail | [`src/app/blog/[id]/page.tsx`](src/app/blog/[id]/page.tsx:1) | 85% | High |
| Data Module | [`src/data.ts`](src/data.ts:1) | 100% | Medium |
| Layout | [`src/app/layout.tsx`](src/app/layout.tsx:1) | 70% | Low |

## 🚨 Common Testing Pitfalls

### 1. Testing Implementation Details

```typescript
// ❌ Don't test internal state
expect(wrapper.state('isOpen')).toBe(true);

// ✅ Test visible behavior
expect(screen.getByRole('dialog')).toBeVisible();
```

### 2. Not Cleaning Up

```typescript
// ✅ Always cleanup (automatic with setup file)
afterEach(() => {
  cleanup();
});
```

### 3. Async Issues

```typescript
// ❌ Not waiting for async updates
fireEvent.click(button);
expect(screen.getByText('Success')).toBeInTheDocument();

// ✅ Wait for async updates
fireEvent.click(button);
await screen.findByText('Success');
```

## 📚 Additional Resources

### Documentation
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Learning Resources
- [Testing JavaScript](https://testingjavascript.com/) by Kent C. Dodds
- [React Testing Library Tutorial](https://www.robinwieruch.de/react-testing-library/)
- [Next.js Testing Guide](https://nextjs.org/docs/app/building-your-application/testing)

## 🔄 Next Steps

1. **Choose a testing framework** (Vitest recommended)
2. **Install dependencies** using the commands above
3. **Create configuration files** (vitest.config.ts, setup.ts)
4. **Write your first test** for [`src/app/page.tsx`](src/app/page.tsx:1)
5. **Set up CI/CD** to run tests automatically
6. **Aim for 80%+ coverage** on critical paths
7. **Add pre-commit hooks** to run tests before commits

## 🎓 Testing Checklist

- [ ] Install testing framework (Vitest or Jest)
- [ ] Install React Testing Library
- [ ] Create configuration files
- [ ] Set up test utilities and mocks
- [ ] Write tests for home page
- [ ] Write tests for blog detail page
- [ ] Write tests for data module
- [ ] Configure coverage reporting
- [ ] Add test scripts to package.json
- [ ] Set up CI/CD integration
- [ ] Document testing conventions for team

---

**Last Updated**: December 2025  
**Recommended Stack**: Vitest + React Testing Library  
**Target Coverage**: 80%+ for critical paths