
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Removed HashRouter import
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import DevelopmentSection from './components/DevelopmentSection';
import ServicesSection from './components/ServicesSection';
import BranchesSection from './components/BranchesSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Chatbot from './components/Chatbot';
import { ORGANIZATIONAL_STRUCTURE_DETAILS } from './constants';
import { ExpertRegistrationForm, SupportRequestForm } from './types';

function App() {
  const [isStructureModalOpen, setIsStructureModalOpen] = useState(false);
  const [isExpertFormModalOpen, setIsExpertFormModalOpen] = useState(false);
  const [isSupportFormModalOpen, setIsSupportFormModalOpen] = useState(false);

  const location = useLocation();

  // Effect to handle smooth scrolling to anchor links
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); // Remove '#'
      if (element) {
        // Scroll with an offset to account for the fixed navbar
        const navbarHeight = document.querySelector('nav')?.clientHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navbarHeight - 20, // 20px extra padding
          behavior: 'smooth',
        });
      }
    } else {
      // For initial load or when hash is empty, scroll to top or specific default
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]); // Rerun when hash changes

  const handleExpertSubmit = (formData: ExpertRegistrationForm) => {
    console.log('Expert Registration Data:', formData);
    // Simulate API call
    return new Promise<string>(resolve => {
      setTimeout(() => resolve("شكراً لاهتمامك! تم تسجيل بياناتك بنجاح. سيقوم فريق إدارة المشاريع بالتواصل معك لتوثيق الخبرة."), 1500);
    });
  };

  const handleSupportSubmit = (formData: SupportRequestForm) => {
    console.log('Support Request Data:', formData);
    // Simulate API call
    return new Promise<string>(resolve => {
      const ticketNumber = Math.floor(1000 + Math.random() * 9000);
      setTimeout(() => resolve(`شكراً لك! تم استلام طلبك بنجاح. رقم التذكرة المرجعي هو: #${ticketNumber}. سيتم التواصل معك قريباً.`), 1500);
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenExpertFormModal={() => setIsExpertFormModalOpen(true)} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div className="container mx-auto px-4 py-8">
                <StatsSection />
                <hr className="my-12 border-primary-dark" />
                <AboutSection onOpenStructureModal={() => setIsStructureModalOpen(true)} />
                <hr className="my-12 border-primary-dark" />
                <DevelopmentSection onOpenExpertFormModal={() => setIsExpertFormModalOpen(true)} />
                <hr className="my-12 border-primary-dark" />
                <ServicesSection onOpenSupportFormModal={() => setIsSupportFormModalOpen(true)} />
                <hr className="my-12 border-primary-dark" />
                <BranchesSection />
              </div>
            </>
          } />
        </Routes>
        <Chatbot />
      </main>
      <Footer />

      {/* Organizational Structure Modal */}
      <Modal
        isOpen={isStructureModalOpen}
        onClose={() => setIsStructureModalOpen(false)}
        title="الهيكل التنظيمي للمؤسسة"
      >
        <div className="text-center">
          <p className="text-lg leading-relaxed text-gray-700">صورة أو رسم بياني يوضح التسلسل الهرمي:</p>
          <ul className="list-none mt-4 text-right space-y-2">
            {ORGANIZATIONAL_STRUCTURE_DETAILS.map((item, index) => (
              <li key={index} className="flex items-start">
                <i className="fas fa-check-circle text-success-green ml-2 mt-1"></i>
                <p className="text-gray-800"><strong className="text-primary-dark">{item.title}:</strong> {item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      {/* Expert Registration Form Modal */}
      <Modal
        isOpen={isExpertFormModalOpen}
        onClose={() => setIsExpertFormModalOpen(false)}
        title="انضمام لشبكة الخبراء"
      >
        <ExpertForm onSubmit={handleExpertSubmit} onClose={() => setIsExpertFormModalOpen(false)} />
      </Modal>

      {/* Support Request Form Modal */}
      <Modal
        isOpen={isSupportFormModalOpen}
        onClose={() => setIsSupportFormModalOpen(false)}
        title="نموذج طلب مساعدة عاجل"
      >
        <SupportForm onSubmit={handleSupportSubmit} onClose={() => setIsSupportFormModalOpen(false)} />
      </Modal>
    </div>
  );
}

interface ExpertFormProps {
  onSubmit: (formData: ExpertRegistrationForm) => Promise<string>;
  onClose: () => void;
}

const ExpertForm: React.FC<ExpertFormProps> = ({ onSubmit, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [expertise, setExpertise] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlertMessage(null);
    try {
      const message = await onSubmit({ fullName, country, expertise, linkedin });
      setAlertMessage(message);
      setFullName('');
      setCountry('');
      setExpertise('');
      setLinkedin('');
      setTimeout(() => {
        setAlertMessage(null);
        onClose();
      }, 5000);
    } catch (error) {
      setAlertMessage('حدث خطأ أثناء إرسال طلبك. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-right text-gray-700 text-sm font-bold mb-2">الاسم الكامل:</label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="country" className="block text-right text-gray-700 text-sm font-bold mb-2">دولة الإقامة الأوروبية:</label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="expertise" className="block text-right text-gray-700 text-sm font-bold mb-2">مجال الخبرة الرئيسية:</label>
        <select
          id="expertise"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          required
        >
          <option value="">-- اختر المجال --</option>
          <option value="admin">الإدارة والحوكمة</option>
          <option value="health">الصحة والرعاية</option>
          <option value="infra">البنية التحتية والخدمات</option>
          <option value="edu">التعليم والأكاديميا</option>
          <option value="other">أخرى</option>
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="linkedin" className="block text-right text-gray-700 text-sm font-bold mb-2">رابط صفحة LinkedIn (اختياري):</label>
        <input
          type="url"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
          id="linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-success-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'جاري الإرسال...' : 'إرسال طلب الانضمام'} <i className="fas fa-arrow-left mr-2"></i>
      </button>
      {alertMessage && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-right" role="alert">
          {alertMessage}
        </div>
      )}
    </form>
  );
};

interface SupportFormProps {
  onSubmit: (formData: SupportRequestForm) => Promise<string>;
  onClose: () => void;
}

const SupportForm: React.FC<SupportFormProps> = ({ onSubmit, onClose }) => {
  const [supportType, setSupportType] = useState('');
  const [issueSummary, setIssueSummary] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlertMessage(null);
    try {
      const message = await onSubmit({ supportType, issueSummary });
      setAlertMessage(message);
      setSupportType('');
      setIssueSummary('');
      setTimeout(() => {
        setAlertMessage(null);
        onClose();
      }, 8000);
    } catch (error) {
      setAlertMessage('حدث خطأ أثناء إرسال طلبك. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      <div className="mb-4">
        <label htmlFor="supportType" className="block text-right text-gray-700 text-sm font-bold mb-2">نوع الدعم المطلوب:</label>
        <select
          id="supportType"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
          value={supportType}
          onChange={(e) => setSupportType(e.target.value)}
          required
        >
          <option value="">-- اختر نوع الدعم --</option>
          <option value="legal">قانوني (لجوء/إقامة/جنسية)</option>
          <option value="social">اجتماعي (اندماج/تعليم)</option>
          <option value="other">أخرى</option>
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="issueSummary" className="block text-right text-gray-700 text-sm font-bold mb-2">ملخص المشكلة:</label>
        <textarea
          id="issueSummary"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
          rows={3}
          value={issueSummary}
          onChange={(e) => setIssueSummary(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-danger-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'جاري الإرسال...' : 'إرسال طلب الدعم'}
      </button>
      {alertMessage && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-right" role="alert">
          {alertMessage}
        </div>
      )}
    </form>
  );
};

export default App;
    