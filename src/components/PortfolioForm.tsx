import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, User, Info, Code, Briefcase, FolderOpen, MessageSquare, Rss, Mail } from 'lucide-react';
import { PortfolioData, Social, Service, Project, Testimonial } from '../contexts/PortfolioContext';

interface PortfolioFormProps {
  selectedTemplate: 'modern' | 'classic';
  onSubmit: (data: PortfolioData) => void;
  initialData?: PortfolioData;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({
  selectedTemplate,
  onSubmit,
  initialData,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Omit<PortfolioData, 'id' | 'template'>>({
    hero: {
      name: initialData?.hero.name || '',
      title: initialData?.hero.title || '',
      tagline: initialData?.hero.tagline || '',
      profileImage: initialData?.hero.profileImage || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    about: {
      bio: initialData?.about.bio || '',
      email: initialData?.about.email || '',
      phone: initialData?.about.phone || '',
      location: initialData?.about.location || '',
      socials: initialData?.about.socials || [{ platform: 'LinkedIn', url: '' }],
    },
    skills: initialData?.skills || [''],
    services: initialData?.services || [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }],
    portfolio: initialData?.portfolio || [
      { title: '', image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600', description: '' },
      { title: '', image: 'https://images.pexels.com/photos/69432/pexels-photo-69432.jpeg?auto=compress&cs=tinysrgb&w=600', description: '' },
      { title: '', image: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=600', description: '' }
    ],
    testimonials: initialData?.testimonials || [{ name: '', role: '', quote: '' }],
    blog: {
      title: initialData?.blog.title || '',
      summary: initialData?.blog.summary || '',
    },
    contact: {
      message: initialData?.contact.message || '',
      email: initialData?.contact.email || '',
      phone: initialData?.contact.phone || '',
    },
  });

  const steps = [
    { title: 'Hero Section', icon: User, color: 'text-blue-600' },
    { title: 'About Me', icon: Info, color: 'text-green-600' },
    { title: 'Skills', icon: Code, color: 'text-purple-600' },
    { title: 'Services', icon: Briefcase, color: 'text-orange-600' },
    { title: 'Portfolio', icon: FolderOpen, color: 'text-indigo-600' },
    { title: 'Testimonials', icon: MessageSquare, color: 'text-pink-600' },
    { title: 'Blog', icon: Rss, color: 'text-teal-600' },
    { title: 'Contact', icon: Mail, color: 'text-red-600' },
  ];

  const handleInputChange = (section: string, field: string, value: any, index?: number) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (index !== undefined) {
        (newData as any)[section][index][field] = value;
      } else {
        (newData as any)[section][field] = value;
      }
      return newData;
    });
  };

  const handleArrayChange = (section: string, index: number, value: string) => {
    setFormData(prev => {
      const newData = { ...prev };
      (newData as any)[section][index] = value;
      return newData;
    });
  };

  const addArrayItem = (section: string, defaultValue: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...(prev as any)[section], defaultValue],
    }));
  };

  const removeArrayItem = (section: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: (prev as any)[section].filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSubmit = () => {
    const portfolioData: PortfolioData = {
      id: initialData?.id || Date.now().toString(),
      template: selectedTemplate,
      ...formData,
    };
    onSubmit(portfolioData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Hero Section
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.hero.name}
                onChange={(e) => handleInputChange('hero', 'name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
              <input
                type="text"
                value={formData.hero.title}
                onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Full Stack Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
              <input
                type="text"
                value={formData.hero.tagline}
                onChange={(e) => handleInputChange('hero', 'tagline', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="A brief, catchy description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
              <input
                type="url"
                value={formData.hero.profileImage}
                onChange={(e) => handleInputChange('hero', 'profileImage', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/your-photo.jpg"
              />
            </div>
          </div>
        );

      case 1: // About Me
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.about.bio}
                onChange={(e) => handleInputChange('about', 'bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.about.email}
                  onChange={(e) => handleInputChange('about', 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.about.phone}
                  onChange={(e) => handleInputChange('about', 'phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.about.location}
                onChange={(e) => handleInputChange('about', 'location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
              {formData.about.socials.map((social, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={social.platform}
                    onChange={(e) => handleInputChange('about', 'platform', e.target.value, index)}
                    placeholder="Platform (e.g., LinkedIn)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => handleInputChange('about', 'url', e.target.value, index)}
                    placeholder="URL"
                    className="flex-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('about.socials', index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('about.socials', { platform: '', url: '' })}
                className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg"
              >
                <Plus className="w-4 h-4" />
                Add Social Link
              </button>
            </div>
          </div>
        );

      case 2: // Skills
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                    placeholder="Enter a skill"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('skills', index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('skills', '')}
                className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </button>
            </div>
          </div>
        );

      case 3: // Services
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Services (3 Required)</label>
              {formData.services.map((service, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleInputChange('services', 'title', e.target.value, index)}
                      placeholder="Service title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={service.description}
                      onChange={(e) => handleInputChange('services', 'description', e.target.value, index)}
                      placeholder="Service description"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // Portfolio
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Portfolio Projects (3 Required)</label>
              {formData.portfolio.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleInputChange('portfolio', 'title', e.target.value, index)}
                      placeholder="Project title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      value={project.image}
                      onChange={(e) => handleInputChange('portfolio', 'image', e.target.value, index)}
                      placeholder="Project image URL"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) => handleInputChange('portfolio', 'description', e.target.value, index)}
                      placeholder="Project description"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5: // Testimonials
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Client Testimonials</label>
              {formData.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => handleInputChange('testimonials', 'name', e.target.value, index)}
                      placeholder="Client name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={(e) => handleInputChange('testimonials', 'role', e.target.value, index)}
                      placeholder="Client role/company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={testimonial.quote}
                      onChange={(e) => handleInputChange('testimonials', 'quote', e.target.value, index)}
                      placeholder="Testimonial quote"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('testimonials', index)}
                    className="mt-3 flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg"
                  >
                    <Minus className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('testimonials', { name: '', role: '', quote: '' })}
                className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg"
              >
                <Plus className="w-4 h-4" />
                Add Testimonial
              </button>
            </div>
          </div>
        );

      case 6: // Blog
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
              <input
                type="text"
                value={formData.blog.title}
                onChange={(e) => handleInputChange('blog', 'title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your blog title (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blog Summary</label>
              <textarea
                value={formData.blog.summary}
                onChange={(e) => handleInputChange('blog', 'summary', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief summary of your blog (optional)"
              />
            </div>
          </div>
        );

      case 7: // Contact
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Message</label>
              <textarea
                value={formData.contact.message}
                onChange={(e) => handleInputChange('contact', 'message', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Message for potential clients..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : isCompleted
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs mt-2 font-medium ${isActive ? step.color : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {steps[currentStep].title}
        </h2>
        {renderStepContent()}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>
        
        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            Create Portfolio
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioForm;