import {  Suspense, lazy  } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage'));
const Home = lazy(() => import('./pages/Home'));
const DSAPage = lazy(() => import('./pages/DSAPage'));
const DSADetailPage = lazy(() => import('./pages/DSADetailPage'));
const SystemDesignPage = lazy(() => import('./pages/SystemDesignPage'));
const SystemDesignDetailPage = lazy(() => import('./pages/SystemDesignDetailPage'));
const GenAIPage = lazy(() => import('./pages/GenAIPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter 
        basename="/DSA_SystemDesign"
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={
            <Suspense fallback={<LoadingSpinner />}>
              <LoginPage />
            </Suspense>
          } />
          <Route path="/signup" element={
            <Suspense fallback={<LoadingSpinner />}>
              <SignupPage />
            </Suspense>
          } />
          <Route path="/verify-email" element={
            <Suspense fallback={<LoadingSpinner />}>
              <VerifyEmailPage />
            </Suspense>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary><Home /></ErrorBoundary>
            </Suspense>
          } />
          <Route path="dsa" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary><DSAPage /></ErrorBoundary>
            </Suspense>
          } />
          <Route path="dsa/:id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary><DSADetailPage /></ErrorBoundary>
            </Suspense>
          } />
          <Route path="system-design" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary><SystemDesignPage /></ErrorBoundary>
            </Suspense>
          } />
          <Route path="system-design/:id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary><SystemDesignDetailPage /></ErrorBoundary>
            </Suspense>
          } />
          <Route path="gen-ai" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary><GenAIPage /></ErrorBoundary>
            </Suspense>
          } />
          <Route path="blogs" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary><BlogsPage /></ErrorBoundary>
            </Suspense>
          } />
          <Route path="blogs/:id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary><BlogDetailPage /></ErrorBoundary>
            </Suspense>
          } />
          <Route path="playground" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary><PlaygroundPage /></ErrorBoundary>
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;