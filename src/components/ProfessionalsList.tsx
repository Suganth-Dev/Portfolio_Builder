import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Filter, Search, MapPin, Mail, Phone, Edit } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useNavigate } from 'react-router-dom';

const ProfessionalsList: React.FC = () => {
  const { portfolios, setCurrentPortfolio } = usePortfolio();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  // Get unique roles and skills for filtering
  const allRoles = [...new Set(portfolios.map(p => p.hero.title))];
  const allSkills = [...new Set(portfolios.flatMap(p => p.skills))];

  const filteredPortfolios = portfolios.filter(portfolio => {
    const matchesSearch = portfolio.hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         portfolio.hero.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         portfolio.about.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = !selectedRole || portfolio.hero.title === selectedRole;
    const matchesSkill = !selectedSkill || portfolio.skills.includes(selectedSkill);

    return matchesSearch && matchesRole && matchesSkill;
  });

  const handleViewPortfolio = (portfolio: any) => {
    setCurrentPortfolio(portfolio);
    navigate(`/portfolio/${portfolio.id}`);
  };

  const handleEditProfile = (portfolio: any) => {
    setCurrentPortfolio(portfolio);
    navigate('/create');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Professional Portfolios
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600"
        >
          Discover talented professionals and their work
        </motion.p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search professionals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              {allRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Professionals Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPortfolios.map((portfolio, index) => (
          <motion.div
            key={portfolio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {/* Profile Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
              <img
                src={portfolio.hero.profileImage}
                alt={portfolio.hero.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white absolute bottom-4 left-6"
              />
            </div>

            {/* Content */}
            <div className="p-6 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {portfolio.hero.name}
              </h3>
              <p className="text-blue-600 font-semibold mb-2">
                {portfolio.hero.title}
              </p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {portfolio.about.bio}
              </p>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                {portfolio.about.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {portfolio.about.location}
                  </div>
                )}
                {portfolio.about.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {portfolio.about.email}
                  </div>
                )}
                {portfolio.about.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {portfolio.about.phone}
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {portfolio.skills.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{portfolio.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleViewPortfolio(portfolio)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  View Portfolio
                </button>
                <button
                  onClick={() => handleEditProfile(portfolio)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPortfolios.length === 0 && (
        <div className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-gray-500"
          >
            <Filter className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No professionals found</h3>
            <p>Try adjusting your search criteria or create a new portfolio</p>
          </motion.div>
        </div>
      )}

      {/* Create New Portfolio Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8"
      >
        <button
          onClick={() => navigate('/create')}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Create Portfolio
        </button>
      </motion.div>
    </div>
  );
};

export default ProfessionalsList;