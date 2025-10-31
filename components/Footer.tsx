
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-white p-6 mt-12">
      <div className="container mx-auto text-center">
        <p className="mb-4 text-sm">
          &copy; 2025 المؤسسة السورية الأوروبية للتنمية والتواصل. جميع الحقوق محفوظة.
        </p>
        <div className="social-links flex justify-center space-x-6 space-x-reverse">
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary-gold transition duration-300">
            <i className="fab fa-facebook-f fa-lg"></i>
          </a>
          <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary-gold transition duration-300">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary-gold transition duration-300">
            <i className="fab fa-linkedin-in fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
