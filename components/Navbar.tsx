
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onOpenExpertFormModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenExpertFormModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavLinkClick = () => {
    setIsOpen(false); // Close mobile menu on link click
  };

  return (
    <nav className="bg-primary-dark fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold flex items-center" onClick={handleNavLinkClick}>
          <span className="ml-2">🇸🇾 المؤسسة السورية الأوروبية للتنمية والتواصل 🇪🇺</span>
        </Link>
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleNavbar}
          aria-label="تبديل التنقل"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`} id="navbarNav">
          <ul className="flex flex-col lg:flex-row lg:ml-auto mt-4 lg:mt-0 space-y-2 lg:space-y-0 lg:space-x-6 text-right lg:text-center">
            <li><Link to="#home" className="block lg:inline-block text-white hover:text-secondary-gold py-2 px-3 rounded-md" onClick={handleNavLinkClick}>الرئيسية</Link></li>
            <li><Link to="#about" className="block lg:inline-block text-white hover:text-secondary-gold py-2 px-3 rounded-md" onClick={handleNavLinkClick}>عن المؤسسة</Link></li>
            <li><Link to="#development" className="block lg:inline-block text-white hover:text-secondary-gold py-2 px-3 rounded-md" onClick={handleNavLinkClick}>نقل الخبرات</Link></li>
            <li><Link to="#services" className="block lg:inline-block text-white hover:text-secondary-gold py-2 px-3 rounded-md" onClick={handleNavLinkClick}>خدمات الجالية</Link></li>
            <li><Link to="#branches" className="block lg:inline-block text-white hover:text-secondary-gold py-2 px-3 rounded-md" onClick={handleNavLinkClick}>الفروع والشبكة</Link></li>
            <li>
              <button
                onClick={() => { onOpenExpertFormModal(); handleNavLinkClick(); }}
                className="block lg:inline-block bg-secondary-gold text-primary-dark hover:bg-yellow-600 font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out lg:mr-3 w-full lg:w-auto"
              >
                شارك معنا
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
