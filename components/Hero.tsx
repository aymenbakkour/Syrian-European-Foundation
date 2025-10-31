
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <header id="home" className="bg-primary-dark text-white pt-32 pb-24 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold border-b-4 border-secondary-gold inline-block pb-2 mb-6">
          توحيد الطاقات السورية لبناء المستقبل
        </h1>
        <p className="lead text-lg md:text-xl mt-4 mb-8 max-w-3xl mx-auto">
          المظلة الجامعة للسوريين في أوروبا ومركز التبادل المعرفي الأول مع الوطن.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
          <Link
            to="#development"
            className="bg-secondary-gold text-primary-dark hover:bg-yellow-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out flex items-center justify-center"
          >
            اكتشف برامجنا التنموية <i className="fas fa-chart-line mr-2"></i>
          </Link>
          <Link
            to="#services"
            className="border-2 border-white text-white hover:bg-white hover:text-primary-dark font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out flex items-center justify-center"
          >
            احصل على الدعم القانوني <i className="fas fa-shield-alt mr-2"></i>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Hero;
