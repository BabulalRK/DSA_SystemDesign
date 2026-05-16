import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

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
              <Home />
            </Suspense>
          } />
          <Route path="dsa" element={
            <Suspense fallback={<LoadingSpinner />}>
              <DSAPage />
            </Suspense>
          } />
          <Route path="dsa/:id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <DSADetailPage />
            </Suspense>
          } />
          <Route path="system-design" element={
            <Suspense fallback={<LoadingSpinner />}>
              <SystemDesignPage />
            </Suspense>
          } />
          <Route path="system-design/:id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <SystemDesignDetailPage />
            </Suspense>
          } />
          <Route path="gen-ai" element={
            <Suspense fallback={<LoadingSpinner />}>
              <GenAIPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;