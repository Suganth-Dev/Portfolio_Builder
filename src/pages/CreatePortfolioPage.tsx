import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TemplateSelector from '../components/TemplateSelector';
import PortfolioForm from '../components/PortfolioForm';
import { usePortfolio } from '../contexts/PortfolioContext';
import { PortfolioData } from '../contexts/PortfolioContext';

const CreatePortfolioPage: React.FC = () => {
  const [step, setStep] = useState<'template' | 'form'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | null>(null);
  const { addPortfolio, updatePortfolio, currentPortfolio, setCurrentPortfolio } = usePortfolio();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPortfolio) {
      setSelectedTemplate(currentPortfolio.template);
      setStep('form');
    }
  }, [currentPortfolio]);

  const handleTemplateSelect = (template: 'modern' | 'classic') => {
    setSelectedTemplate(template);
    setStep('form');
  };

  const handleFormSubmit = (data: PortfolioData) => {
    if (currentPortfolio) {
      updatePortfolio(currentPortfolio.id, data);
    } else {
      addPortfolio(data);
    }
    setCurrentPortfolio(null);
    navigate('/professionals');
  };

  const handleBackToTemplate = () => {
    setStep('template');
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto px-6">
            <div className={`flex items-center ${step === 'template' ? 'text-blue-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step === 'template' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-green-600 border-green-600 text-white'
              }`}>
                1
              </div>
              <span className="ml-3 font-medium">Choose Template</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${step === 'form' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step === 'form' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step === 'form' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-3 font-medium">Fill Information</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 'template' ? (
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateSelect={handleTemplateSelect}
            />
          ) : selectedTemplate ? (
            <div>
              <div className="text-center mb-6">
                <button
                  onClick={handleBackToTemplate}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to Template Selection
                </button>
              </div>
              <PortfolioForm
                selectedTemplate={selectedTemplate}
                onSubmit={handleFormSubmit}
                initialData={currentPortfolio || undefined}
              />
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePortfolioPage;