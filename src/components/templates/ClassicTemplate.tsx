import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ExternalLink, Quote, Award, Menu, X, User } from 'lucide-react';
import { PortfolioData } from '../../contexts/PortfolioContext';

interface ClassicTemplateProps {
  data: PortfolioData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-300 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-none flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-serif font-bold text-gray-900">{data.hero.name}</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-gray-900 font-medium font-serif transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-800 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-none hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-300 py-4"
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium font-serif transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 pt-16">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={data.hero.profileImage}
              alt={data.hero.name}
              className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-white shadow-2xl object-cover"
            />
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
              {data.hero.name}
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-300">
              {data.hero.title}
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
              {data.hero.tagline}
            </p>
          </motion.div>
        </div>
        
        {/* Classic border elements */}
        <div className="absolute inset-0">
          <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white opacity-30"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white opacity-30"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white opacity-30"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white opacity-30"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">About Me</h2>
            <div className="w-24 h-1 bg-gray-800 mx-auto mb-12"></div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <p className="text-lg text-gray-700 leading-relaxed mb-8 font-light">
                  {data.about.bio}
                </p>
                <div className="space-y-4">
                  {data.about.email && (
                    <div className="flex items-center border-b border-gray-200 pb-3">
                      <Mail className="w-5 h-5 text-gray-800 mr-4" />
                      <span className="text-gray-700">{data.about.email}</span>
                    </div>
                  )}
                  {data.about.phone && (
                    <div className="flex items-center border-b border-gray-200 pb-3">
                      <Phone className="w-5 h-5 text-gray-800 mr-4" />
                      <span className="text-gray-700">{data.about.phone}</span>
                    </div>
                  )}
                  {data.about.location && (
                    <div className="flex items-center border-b border-gray-200 pb-3">
                      <MapPin className="w-5 h-5 text-gray-800 mr-4" />
                      <span className="text-gray-700">{data.about.location}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-6">Professional Networks</h3>
                <div className="space-y-4">
                  {data.about.socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 border border-gray-300 rounded-none hover:bg-gray-50 transition-all duration-300 group"
                    >
                      <span className="font-medium text-gray-900">{social.platform}</span>
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">Core Competencies</h2>
            <div className="w-24 h-1 bg-gray-800 mx-auto mb-12"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 border border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  <span className="font-medium text-gray-900">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">Professional Services</h2>
            <div className="w-24 h-1 bg-gray-800 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {data.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 border border-gray-200 hover:border-gray-800 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gray-800 flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 text-center mb-2">Selected Works</h2>
            <div className="w-24 h-1 bg-gray-800 mx-auto mb-12"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              {data.portfolio.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-light">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 text-center mb-2">Client Testimonials</h2>
            <div className="w-24 h-1 bg-gray-800 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 border border-gray-200 relative"
                >
                  <Quote className="w-8 h-8 text-gray-400 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed font-light italic">"{testimonial.quote}"</p>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="font-serif font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 font-light">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      {data.blog.title && (
        <section id="blog" className="py-20 px-6 bg-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">Publications</h2>
              <div className="w-24 h-1 bg-gray-800 mx-auto mb-12"></div>
              <div className="bg-white p-8 border border-gray-200">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{data.blog.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{data.blog.summary}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold mb-2">Professional Inquiry</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">
              {data.contact.message}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${data.contact.email}`}
                className="px-8 py-4 bg-white text-gray-800 font-medium hover:bg-gray-100 transition-colors border"
              >
                {data.contact.email}
              </a>
              {data.contact.phone && (
                <a
                  href={`tel:${data.contact.phone}`}
                  className="px-8 py-4 bg-transparent border border-white text-white font-medium hover:bg-white hover:text-gray-800 transition-colors"
                >
                  {data.contact.phone}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-white text-center border-t border-gray-700">
        <p className="font-light">&copy; 2025 {data.hero.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ClassicTemplate;