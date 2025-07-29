import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './contexts/PortfolioContext';
import HomePage from './pages/HomePage';
import CreatePortfolioPage from './pages/CreatePortfolioPage';
import ProfessionalsList from './components/ProfessionalsList';
import PortfolioViewPage from './pages/PortfolioViewPage';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePortfolioPage />} />
            <Route path="/professionals" element={<ProfessionalsList />} />
            <Route path="/portfolio/:id" element={<PortfolioViewPage />} />
          </Routes>
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;