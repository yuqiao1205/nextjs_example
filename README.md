# Next.js Blog Example - Project Overview

- [Next.js Blog Example - Project Overview](#nextjs-blog-example---project-overview)
  - [📋 Project Description](#-project-description)
  - [✨ Key Features](#-key-features)
    - [Blog Functionality](#blog-functionality)
    - [Performance \& Optimization](#performance--optimization)
    - [Developer Experience](#developer-experience)
  - [🚀 Tech Stack Overview](#-tech-stack-overview)
  - [🏃 Quick Start Guide](#-quick-start-guide)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Available Scripts](#available-scripts)
  - [📁 Project Structure](#-project-structure)
    - [Key Files Explained](#key-files-explained)
  - [📖 Documentation Structure \& Guidelines](#-documentation-structure--guidelines)
    - [Documentation Folder Structure](#documentation-folder-structure)
    - [Documentation Guidelines](#documentation-guidelines)
      - [Placement Rules](#placement-rules)
      - [Naming Conventions](#naming-conventions)
      - [Update Rules](#update-rules)
      - [Markdown Standards](#markdown-standards)
  - [🏗️ Architecture](#️-architecture)
    - [App Router Pattern](#app-router-pattern)
    - [Component Types](#component-types)
    - [Routing](#routing)
    - [Styling Strategy](#styling-strategy)
  - [🎨 Features in Detail](#-features-in-detail)
    - [Blog Listing Page (`/`)](#blog-listing-page-)
    - [Blog Detail Pages (`/blog/[id]`)](#blog-detail-pages-blogid)
    - [Dark Mode Support](#dark-mode-support)
  - [🧪 Testing](#-testing)
  - [📚 Additional Documentation](#-additional-documentation)
  - [🔗 Useful Links](#-useful-links)
  - [🚀 Deploy on Vercel](#-deploy-on-vercel)
  - [📝 License](#-license)

## 📋 Project Description

This is a modern blog application built with Next.js 16, showcasing the latest App Router architecture and React 19 features. The project demonstrates best practices for building performant, type-safe web applications with server-side rendering, client-side interactivity, and optimized asset delivery.

## ✨ Key Features

### Blog Functionality

- **Dynamic Blog Listing**: Interactive homepage displaying all blog posts in a responsive grid layout
- **Real-time Search**: Client-side filtering by title and content with instant results
- **Individual Post Pages**: Server-rendered detail pages with full-width hero images
- **404 Handling**: Graceful error handling for invalid blog post IDs

### Performance & Optimization

- **Image Optimization**: Automatic image optimization using [`next/image`](next.config.ts:1) with Unsplash CDN support
- **Font Optimization**: Variable fonts (Geist Sans & Mono) with Latin subset for optimal loading
- **Server Components**: Default server-side rendering for improved performance
- **CSS Modules**: Component-scoped styling preventing style conflicts

### Developer Experience

- **TypeScript**: Full type safety with strict mode enabled
- **ESLint**: Code quality enforcement with Next.js recommended rules
- **Hot Reload**: Fast refresh during development
- **Modern Patterns**: Latest Next.js 15+ async params handling

## 🚀 Tech Stack Overview

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 16.0.6 |
| UI Library | React | 19.2.0 |
| Language | TypeScript | 5.x |
| Runtime | Node.js | 20 LTS |
| Package Manager | npm | - |
| Styling | CSS Modules | Built-in |

For detailed dependency information, see [TECH_STACK.md](TECH_STACK.md).

## 🏃 Quick Start Guide

### Prerequisites

- Node.js 20 LTS or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository** (or navigate to the project directory)

   ```bash
   cd nextjs_example
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint checks
```

## 📁 Project Structure

```
nextjs_example/
├── public/                    # Static assets
│   ├── blog.png              # Blog-related images
│   ├── file.svg              # Icon assets
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/                  # App Router directory
│   │   ├── layout.tsx        # Root layout with metadata
│   │   ├── page.tsx          # Home page (blog list)
│   │   ├── page.module.css   # Home page styles
│   │   ├── globals.css       # Global styles & CSS variables
│   │   ├── favicon.ico       # Site favicon
│   │   └── blog/
│   │       └── [id]/         # Dynamic blog routes
│   │           ├── page.tsx  # Blog detail page
│   │           └── page.module.css
│
│   └── data.ts               # Blog post data source
│
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── eslint.config.mjs         # ESLint flat config
├── package.json              # Dependencies & scripts
└── README.md                 # Project readme
```

### Key Files Explained

- **[`src/app/layout.tsx`](src/app/layout.tsx:1)**: Root layout component with metadata, font configuration, and HTML structure
- **[`src/app/page.tsx`](src/app/page.tsx:1)**: Home page with blog listing and search functionality (Client Component)
- **[`src/app/blog/[id]/page.tsx`](src/app/blog/[id]/page.tsx:1)**: Dynamic blog detail pages (Server Component)
- **[`src/data.ts`](src/data.ts:1)**: Static blog post data with TypeScript types
- **[`next.config.ts`](next.config.ts:1)**: Next.js configuration including image domains
- **[`tsconfig.json`](tsconfig.json:1)**: TypeScript compiler options with path aliases

## 📖 Documentation Structure & Guidelines

### Documentation Folder Structure

The project maintains a well-organized documentation structure in the `docs/` directory:

```
docs/
├── design/                 # Architecture and design documentation
│   ├── ARCHITECTURE.md     # System architecture overview
│   ├── CSS_ANALYSIS.md     # CSS structure and analysis
│   └── TECH_STACK.md       # Technology stack details
├── development/            # Development process documentation
│   ├── CONTRIBUTING.md     # Contribution guidelines
│   └── CSS_FIX_PLAN.md     # CSS improvement plan
├── requirement/            # Requirements documentation (reserved)
└── test/                   # Testing documentation
    └── TESTING.md          # Testing strategy and setup
```

### Documentation Guidelines

#### Placement Rules
- **Design Documentation**: Place in `docs/design/` (architecture, tech stack, UI/UX specs)
- **Development Documentation**: Place in `docs/development/` (contributing, workflows, plans)
- **Requirements**: Place in `docs/requirement/` (business requirements, user stories)
- **Testing Documentation**: Place in `docs/test/` (testing strategies, test cases)

#### Naming Conventions
- Use UPPER_CASE for main documentation files (e.g., `ARCHITECTURE.md`)
- Use descriptive names that clearly indicate content
- Avoid generic names like `README.md` in subdirectories

#### Update Rules
- **Create New Files**: When introducing new features or processes that need documentation
- **Update Existing**: Modify existing files when refining processes or adding details
- **Cross-References**: Use relative links to reference related documentation
- **Version Control**: All documentation changes should be committed with clear commit messages

#### Markdown Standards
- Use consistent heading levels (start with H2 for main sections)
- Include table of contents for longer documents
- Use code blocks with language specification for code examples
- Maintain consistent emoji usage for visual organization

## 🏗️ Architecture

### App Router Pattern

This project uses Next.js App Router (introduced in Next.js 13+), which provides:

- File-based routing in the `src/app` directory
- Server Components by default for better performance
- Colocation of routes, components, and styles
- Built-in loading and error states

### Component Types

**Server Components** (default):

- [`src/app/blog/[id]/page.tsx`](src/app/blog/[id]/page.tsx:1) - Blog detail pages
- [`src/app/layout.tsx`](src/app/layout.tsx:1) - Root layout

**Client Components** (with `"use client"`):

- [`src/app/page.tsx`](src/app/page.tsx:1) - Home page with search interactivity

### Routing

- **Static Route**: `/` → [`src/app/page.tsx`](src/app/page.tsx:1)
- **Dynamic Route**: `/blog/[id]` → [`src/app/blog/[id]/page.tsx`](src/app/blog/[id]/page.tsx:1)

### Styling Strategy

1. **Global Styles**: [`src/app/globals.css`](src/app/globals.css:1) for CSS resets and variables
2. **CSS Modules**: Component-scoped styles (e.g., [`page.module.css`](src/app/page.module.css:1))
3. **CSS Variables**: Theme colors and dark mode support
4. **Responsive Design**: Mobile-first approach with media queries

## 🎨 Features in Detail

### Blog Listing Page (`/`)

- Displays all blog posts from [`src/data.ts`](src/data.ts:1)
- Real-time search filtering by title and content
- Responsive grid layout (1-3 columns based on screen size)
- Optimized images with automatic lazy loading
- Click-through to individual blog posts

### Blog Detail Pages (`/blog/[id]`)

- Server-side rendered for optimal SEO
- Dynamic route parameters using Next.js 15+ async params
- Full-width hero images with proper aspect ratios
- Formatted publication dates
- 404 handling for non-existent posts

### Dark Mode Support

The application includes CSS variable-based theming that automatically adapts to user preferences via `prefers-color-scheme` media query.

## 🧪 Testing

Currently, no testing framework is configured. For testing recommendations and setup instructions, see [TESTING.md](TESTING.md).

## 📚 Additional Documentation

- **[TECH_STACK.md](docs/design/TECH_STACK.md)**: Detailed technical specifications, dependencies, and configuration
- **[TESTING.md](docs/test/TESTING.md)**: Testing strategy, recommendations, and setup guide
- **[CONTRIBUTING.md](docs/development/CONTRIBUTING.md)**: Contribution guidelines and development workflow

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 License

This is an example project for learning and demonstration purposes.

---

**Last Updated**: December 2025  
**Next.js Version**: 16.0.6  
**React Version**: 19.2.0
