import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CaseManagement from './pages/CaseManagement';
import Configuration from './pages/Configuration';
import BlockchainExplorer from './pages/BlockchainExplorer';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cases" element={<CaseManagement />} />
          <Route path="/explorer" element={<BlockchainExplorer />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Configuration />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
