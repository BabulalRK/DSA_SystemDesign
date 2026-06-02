import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const DSAPage = lazy(() => import('./pages/DSAPage'));
const DSADetailPage = lazy(() => import('./pages/DSADetailPage'));
const SystemDesignPage = lazy(() => import('./pages/SystemDesignPage'));
const SystemDesignDetailPage = lazy(() => import('./pages/SystemDesignDetailPage'));
const GenAIPage = lazy(() => import('./pages/GenAIPage'));

function App() {
  return (
    <BrowserRouter basename="/DSA_SystemDesign">
      <Routes>
        <Route path="/" element={<Layout />}>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;