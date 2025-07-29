import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import ModernTemplate from '../components/templates/ModernTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';

const PortfolioViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPortfolioById, setCurrentPortfolio } = usePortfolio();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    if (id) {
      const portfolioData = getPortfolioById(id);
      if (portfolioData) {
        setPortfolio(portfolioData);
      } else {
        navigate('/professionals');
      }
    }
  }, [id, getPortfolioById, navigate]);

  const handleEdit = () => {
    if (portfolio) {
      setCurrentPortfolio(portfolio);
      navigate('/create');
    }
  };

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/professionals')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Professionals
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {portfolio.hero.name} • {portfolio.template === 'modern' ? 'Modern' : 'Classic'} Template
            </span>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Portfolio
            </button>
          </div>
        </div>
      </motion.div>

      {/* Portfolio Content */}
      <div className="pt-20">
        {portfolio.template === 'modern' ? (
          <ModernTemplate data={portfolio} />
        ) : (
          <ClassicTemplate data={portfolio} />
        )}
      </div>
    </div>
  );
};

export default PortfolioViewPage;