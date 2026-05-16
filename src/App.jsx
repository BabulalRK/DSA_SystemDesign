import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DSAPage from './pages/DSAPage';
import DSADetailPage from './pages/DSADetailPage';
import SystemDesignPage from './pages/SystemDesignPage';
import SystemDesignDetailPage from './pages/SystemDesignDetailPage';
import GenAIPage from './pages/GenAIPage';

function App() {
  return (
    <BrowserRouter basename="/DSA_SystemDesign">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dsa" element={<DSAPage />} />
          <Route path="dsa/:id" element={<DSADetailPage />} />
          <Route path="system-design" element={<SystemDesignPage />} />
          <Route path="system-design/:id" element={<SystemDesignDetailPage />} />
          <Route path="gen-ai" element={<GenAIPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;