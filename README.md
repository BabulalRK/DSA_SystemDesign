# DSA & System Design StudyHub

A React + Vite application for learning Data Structures & Algorithms patterns and System Design concepts.

## Live Demo
Your app is available at:

https://BabulalRK.github.io/DSA_SystemDesign/

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`.

## Build for Production

```bash
npm run build
```

This creates the `dist/` folder for static deployment.

## Deployment

### GitHub Pages

The app is configured to run under the repository path `/DSA_SystemDesign/`.

To deploy manually:

1. Build the app:
   ```bash
   npm run build
   ```
2. Commit and push your changes.
3. Ensure GitHub Pages is configured to use the `gh-pages` branch (or GitHub Actions deployment).

### Local preview of production build

```bash
npm run preview
```

## Notes

- `vite.config.js` sets `base: '/DSA_SystemDesign/'`
- `src/App.jsx` uses `BrowserRouter basename="/DSA_SystemDesign"`

This ensures routing works correctly when the app is served from GitHub Pages.

## Project Documentation

### Overview

**StudyHub** is a modern web application designed to help developers master Data Structures & Algorithms (DSA) patterns and System Design concepts. The platform provides interactive learning resources with real-world problem examples, code explanations, and visual diagrams.

### Tech Stack

#### Frontend Framework
- **React 18.2.0**: UI library for building interactive components
- **React Router DOM 6.30.3**: Client-side routing for multi-page navigation

#### Build Tool
- **Vite 4.4.5**: Fast build tool and development server with Hot Module Replacement (HMR)

#### Styling
- **Tailwind CSS 3.4.19**: Utility-first CSS framework for responsive design
- **PostCSS 8.5.14**: CSS transformation tool
- **Autoprefixer 10.5.0**: Automatically adds vendor prefixes to CSS

#### Development Tools
- **ESLint 8.45.0**: Code quality and style linting

### Project Structure

```
DSA & system design/
├── src/
│   ├── components/
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── DSAPage.jsx
│   │   ├── DSADetailPage.jsx
│   │   ├── SystemDesignPage.jsx
│   │   └── SystemDesignDetailPage.jsx
│   ├── data/
│   │   ├── dsaPatterns.js
│   │   └── systemDesignData.js
│   ├── hooks/
│   │   └── useProgress.js
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

### Project Architecture

#### Component Hierarchy

```
App
├── BrowserRouter (React Router)
│   └── Routes
│       └── Layout (Shared component)
│           ├── Home (/)
│           ├── DSAPage (/dsa)
│           ├── DSADetailPage (/dsa/:id)
│           ├── SystemDesignPage (/system-design)
│           └── SystemDesignDetailPage (/system-design/:id)
```

#### Key Components

- `Layout.jsx`: Main layout wrapper with navbar, mobile menu, footer, and `Outlet`
- `Home.jsx`: Landing page
- `DSAPage.jsx`: DSA patterns listing page
- `DSADetailPage.jsx`: DSA pattern detail page
- `SystemDesignPage.jsx`: System design topics listing page
- `SystemDesignDetailPage.jsx`: System design detail page

### Data Structure

#### DSA Patterns Format
Each DSA pattern contains:

```javascript
{
  id: 'pattern-id',
  name: 'Pattern Name',
  summary: 'Brief description',
  realWorldProblem: 'Practical application',
  code: 'Code example',
  codeExplanation: 'How the code works',
  diagram: 'Visual representation',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  complexityExplanation: 'Why this complexity',
  pros: ['Advantage 1', 'Advantage 2'],
  cons: ['Disadvantage 1']
}
```

### Routing

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page |
| `/dsa` | DSAPage | Browse DSA patterns |
| `/dsa/:id` | DSADetailPage | View pattern details |
| `/system-design` | SystemDesignPage | Browse system design topics |
| `/system-design/:id` | SystemDesignDetailPage | View topic details |

### Features

- Comprehensive DSA patterns
- System design resource pages
- Responsive Tailwind CSS UI
- Routing with React Router

### Deployment Notes

- `npm run dev` starts the development server
- `npm run build` creates the production-ready `dist/` folder
- `npm run preview` serves the built `dist/` locally
- `vite.config.js` uses `base: '/DSA_SystemDesign/'`
- `src/App.jsx` uses `BrowserRouter basename="/DSA_SystemDesign"`

### Live App URL

https://BabulalRK.github.io/DSA_SystemDesign/

### Common Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build production files |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |
