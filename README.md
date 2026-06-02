# DSA & System Design StudyHub

A highly optimized React + Vite application for learning Data Structures & Algorithms patterns and System Design concepts. Features real-time progress tracking, secure authentication, and cloud data storage.

## Live Demo
Your app is available at:

https://BabulalRK.github.io/DSA_SystemDesign/

---

## 🚀 Features

- **Comprehensive Learning Content:** Browse and study DSA patterns, System Design topics, and GenAI concepts.
- **Secure Authentication (Firebase):** 
  - Complete Sign-up and Sign-in flows.
  - Mandatory Email Verification for new users.
  - Admin bypass for specific registered users via Firestore roles.
- **Cloud Database (Firestore):** 
  - All content is fetched dynamically from Firebase Firestore.
  - User progress (checkboxes) is saved securely to the cloud and synced across devices.
- **High Performance:** 
  - In-memory data caching to minimize database read costs and achieve 0ms load times on returning page visits.
  - Manual chunk splitting (Vite) to separate the heavy Firebase SDK from the main application bundle.
- **Modern CI/CD:** Fully automated deployments to GitHub pages via GitHub Actions, with secure Environment Variables injection.

---

## 🛠 Tech Stack

### Frontend Framework
- **React 18.2.0**: UI library for building interactive components
- **React Router DOM 6.30.3**: Client-side routing with v7 future flags enabled

### Backend & Cloud Services (Firebase)
- **Firebase Authentication**: Secure JWT-based user session management and email verification.
- **Cloud Firestore**: NoSQL document database for application content and user progress tracking.

### Build Tool & Styling
- **Vite 5.0.0**: High-speed build tool and dev server (Optimized for Node 18 compatibility)
- **Tailwind CSS 3.4.19**: Utility-first CSS framework for responsive design

---

## 💻 Getting Started (Local Development)

### 1. Prerequisites
- **Node.js** (v18.16.0 or higher recommended)

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
You **must** create a `.env` file in the root of the project to connect to Firebase. Do not commit this file.

```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
VITE_FIREBASE_DATABASE_URL="your-database-url"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
```

### 4. Run locally
```bash
npm run dev
```
Visit `http://localhost:5173/DSA_SystemDesign/`.

---

## 🌐 Deployment (GitHub Actions)

This project is configured for automated deployment to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).

### Important Configuration Note:
Because the `.env` file is excluded from version control, you must configure **GitHub Secrets** for the pipeline to build successfully:

1. Go to your GitHub Repository -> **Settings** -> **Environments**.
2. Create an environment named exactly **`Firebase Config`**.
3. Add all 7 Firebase environment variables (e.g., `VITE_FIREBASE_API_KEY`) as **Environment Secrets**.

When you push to the `main` branch, the GitHub Action will automatically inject these secrets during the `npm run build` step and deploy the optimized bundle to GitHub Pages.

---

## 📁 Project Structure

```
DSA & system design/
├── .github/workflows/     # CI/CD deployment pipeline
├── src/
│   ├── components/        # Reusable UI components & Layouts
│   ├── context/           # React Context (AuthContext.jsx)
│   ├── hooks/             # Custom hooks (useData.js, useProgress.js)
│   ├── lib/               # Utility libraries (firebase.js)
│   ├── pages/             # Route-level components (Login, DSA, SystemDesign)
│   ├── App.jsx            # Main router configuration
│   └── main.jsx           # Application entry point
├── .env                   # Local Firebase credentials (Git ignored)
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind design system config
└── vite.config.js         # Build optimization and chunking configuration
```
