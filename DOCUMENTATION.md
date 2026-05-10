# StudyHub - DSA & System Design Learning Platform

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Tech Stack](#tech-stack)
4. [Installation & Setup](#installation--setup)
5. [Running the Application](#running-the-application)
6. [Project Architecture](#project-architecture)
7. [Features](#features)
8. [Building & Deployment](#building--deployment)

---

## Overview

**StudyHub** is a modern web application designed to help developers master Data Structures & Algorithms (DSA) patterns and System Design concepts. The platform provides interactive learning resources with real-world problem examples, code explanations, and visual diagrams.

### Key Features
- **DSA Patterns**: Learn essential algorithm patterns with code examples and real-world applications
- **System Design**: Understand scalable system architecture and design principles
- **Interactive UI**: Responsive design that works on desktop and mobile devices
- **Navigation**: Easy navigation between learning modules

---

## Project Structure

```
DSA & system design/
├── src/
│   ├── components/
│   │   └── Layout.jsx              # Main layout wrapper with navbar
│   ├── pages/
│   │   ├── Home.jsx                # Landing page
│   │   ├── DSAPage.jsx             # DSA patterns listing page
│   │   ├── DSADetailPage.jsx       # Individual DSA pattern detail page
│   │   ├── SystemDesignPage.jsx    # System design topics listing page
│   │   └── SystemDesignDetailPage.jsx # Individual system design detail page
│   ├── data/
│   │   ├── dsaPatterns.js          # DSA patterns data and examples
│   │   └── systemDesignData.js     # System design topics data
│   ├── hooks/
│   │   └── useProgress.js          # Custom hook for tracking user progress
│   ├── assets/                     # Images and static files
│   ├── App.jsx                     # Main app component with routing
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles
├── public/                         # Public assets
├── package.json                    # Project dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
└── index.html                      # HTML entry point
```

---

## Tech Stack

### Frontend Framework
- **React 18.2.0**: UI library for building interactive components
- **React Router DOM 6.30.3**: Client-side routing for multi-page navigation

### Build Tool
- **Vite 4.4.5**: Fast build tool and development server with Hot Module Replacement (HMR)

### Styling
- **Tailwind CSS 3.4.19**: Utility-first CSS framework for responsive design
- **PostCSS 8.5.14**: CSS transformation tool
- **Autoprefixer 10.5.0**: Automatically adds vendor prefixes to CSS

### Development Tools
- **ESLint 8.45.0**: Code quality and style linting
- **Babel**: JavaScript compiler for React Fast Refresh

---

## Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js)

### Step 1: Install Dependencies
Open your terminal and navigate to the project directory, then run:

```bash
npm install
```

This will install all dependencies listed in `package.json`:
- React and React DOM
- React Router
- Vite and build tools
- Tailwind CSS and PostCSS
- ESLint and development dependencies

### Step 2: Verify Installation
After installation, you should see a `node_modules` folder created in your project directory.

```bash
# Check if node_modules exists
dir node_modules
```

---

## Running the Application

### Development Server
Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

**Output:**
```
  VITE v4.4.5  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Press q to stop
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

**Features:**
- Hot reload: Changes reflect instantly without page refresh
- Fast startup time
- Optimized development experience

### Linting
Check your code for style issues and potential errors:

```bash
npm run lint
```

This runs ESLint with React-specific rules and will report any warnings or errors.

### Preview Production Build
Preview the optimized production build locally:

```bash
npm run preview
```

Opens a local server showing the production-optimized version of your application.

---

## Project Architecture

### Component Hierarchy

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

### Key Components

#### Layout.jsx
The main layout wrapper that provides:
- **Navbar**: Navigation with home, DSA, and System Design links
- **Mobile menu**: Hamburger menu for responsive design
- **Footer**: Copyright information
- **Outlet**: Placeholder for nested route content

#### Pages
- **Home**: Landing page introducing StudyHub
- **DSAPage**: Lists all available DSA patterns
- **DSADetailPage**: Shows detailed explanation of a specific pattern
- **SystemDesignPage**: Lists system design topics
- **SystemDesignDetailPage**: Detailed system design content

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

---

## Features

### 1. DSA Pattern Learning
- Comprehensive collection of algorithm patterns
- Real-world problem examples for each pattern
- Working code implementations
- Complexity analysis (Time & Space)
- Visual diagrams explaining concepts
- Pros and cons for each pattern

### 2. System Design Resources
- Scalability principles
- Architecture patterns
- Design best practices

### 3. Responsive Design
- Mobile-first approach using Tailwind CSS
- Desktop and tablet support
- Hamburger navigation on mobile
- Optimized for all screen sizes

### 4. Progress Tracking
- Custom hook `useProgress` for tracking learning progress
- Store user's completed topics

---

## Building & Deployment

### Create Production Build
Generate an optimized production build:

```bash
npm run build
```

**Output:**
- Creates a `dist/` folder with optimized files
- JavaScript is minified and bundled
- CSS is optimized
- Assets are optimized for performance

### Folder Structure After Build
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # Bundled & minified JavaScript
│   └── index-[hash].css     # Bundled & minified CSS
└── ...
```

### Deployment Options

#### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite and deploys automatically

#### Deploy to Netlify
1. Run `npm run build` locally
2. Drag and drop the `dist/` folder to Netlify

#### Deploy to Other Platforms
1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Set up server to redirect all routes to `index.html` (for React Router)

---

## Common Commands Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## Environment & Browser Support

- **Node Version**: v14+
- **Browsers**: Chrome, Firefox, Safari, Edge (all modern versions)
- **Mobile**: iOS Safari, Chrome Mobile, Firefox Mobile

---

## Troubleshooting

### Issue: Port 5173 already in use
**Solution**: 
```bash
# Use a different port
npm run dev -- --port 3000
```

### Issue: Dependencies not installing
**Solution**:
```bash
# Clear npm cache
npm cache clean --force
# Remove node_modules and package-lock.json
rm -r node_modules package-lock.json
# Reinstall
npm install
```

### Issue: Changes not reflecting in browser
**Solution**:
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check console for errors (F12)

---

## Learning Resources

### Included in the Application
- DSA Pattern examples with code
- System Design concepts
- Real-world problem scenarios
- Visual diagrams and explanations

### External Resources
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

---

## Next Steps

1. **Start the development server**: `npm run dev`
2. **Explore the application**: Visit http://localhost:5173
3. **Add more DSA patterns**: Edit `src/data/dsaPatterns.js`
4. **Add System Design topics**: Edit `src/data/systemDesignData.js`
5. **Customize styling**: Modify `src/index.css` or `tailwind.config.js`
6. **Build for production**: `npm run build`

---

## Support

For questions or issues, please refer to the code comments and documentation within each component file.

**Happy Learning!** 🚀
