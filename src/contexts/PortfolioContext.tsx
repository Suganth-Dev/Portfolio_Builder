import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Social {
  platform: string;
  url: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface Project {
  title: string;
  image: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface PortfolioData {
  id: string;
  template: 'modern' | 'classic';
  hero: {
    name: string;
    title: string;
    tagline: string;
    profileImage: string;
  };
  about: {
    bio: string;
    email: string;
    phone: string;
    location: string;
    socials: Social[];
  };
  skills: string[];
  services: Service[];
  portfolio: Project[];
  testimonials: Testimonial[];
  blog: {
    title: string;
    summary: string;
  };
  contact: {
    message: string;
    email: string;
    phone: string;
  };
}

interface PortfolioContextType {
  portfolios: PortfolioData[];
  currentPortfolio: PortfolioData | null;
  addPortfolio: (portfolio: PortfolioData) => void;
  updatePortfolio: (id: string, portfolio: PortfolioData) => void;
  setCurrentPortfolio: (portfolio: PortfolioData | null) => void;
  getPortfolioById: (id: string) => PortfolioData | undefined;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState<PortfolioData | null>(null);

  const addPortfolio = (portfolio: PortfolioData) => {
    setPortfolios(prev => [...prev, portfolio]);
  };

  const updatePortfolio = (id: string, updatedPortfolio: PortfolioData) => {
    setPortfolios(prev => prev.map(p => p.id === id ? updatedPortfolio : p));
  };

  const getPortfolioById = (id: string) => {
    return portfolios.find(p => p.id === id);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolios,
        currentPortfolio,
        addPortfolio,
        updatePortfolio,
        setCurrentPortfolio,
        getPortfolioById,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};