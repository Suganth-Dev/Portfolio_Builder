import React from 'react';
import { motion } from 'framer-motion';
import { Check, Palette, Briefcase } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: 'modern' | 'classic' | null;
  onTemplateSelect: (template: 'modern' | 'classic') => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect,
}) => {
  const templates = [
    {
      id: 'modern' as const,
      name: 'Modern Portfolio',
      description: 'Clean, minimal design with gradient accents and modern typography',
      icon: Palette,
      preview: 'bg-gradient-to-br from-blue-500 to-purple-600',
      features: ['Gradient Backgrounds', 'Card-based Layout', 'Modern Icons', 'Smooth Animations']
    },
    {
      id: 'classic' as const,
      name: 'Classic Portfolio',
      description: 'Professional, elegant design with clean lines and traditional layout',
      icon: Briefcase,
      preview: 'bg-gradient-to-br from-gray-700 to-gray-900',
      features: ['Clean Typography', 'Professional Layout', 'Elegant Design', 'Timeless Appeal']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Choose Your Portfolio Template
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600"
        >
          Select a design that best represents your professional style
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {templates.map((template, index) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative cursor-pointer group ${
                isSelected ? 'ring-4 ring-blue-500' : ''
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                {/* Preview Section */}
                <div className={`h-48 ${template.preview} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-white opacity-80" />
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 bg-green-500 rounded-full p-2"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {template.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Features:</h4>
                    <ul className="space-y-1">
                      {template.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;