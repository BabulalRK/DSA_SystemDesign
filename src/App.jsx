import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DSAPage from './pages/DSAPage';
import DSADetailPage from './pages/DSADetailPage';
import SystemDesignPage from './pages/SystemDesignPage';
import SystemDesignDetailPage from './pages/SystemDesignDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dsa" element={<DSAPage />} />
          <Route path="dsa/:id" element={<DSADetailPage />} />
          <Route path="system-design" element={<SystemDesignPage />} />
          <Route path="system-design/:id" element={<SystemDesignDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;