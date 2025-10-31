
import React from 'react';

interface DevelopmentSectionProps {
  onOpenExpertFormModal: () => void;
}

const DevelopmentSection: React.FC<DevelopmentSectionProps> = ({ onOpenExpertFormModal }) => {
  return (
    <section id="development" className="my-10">
      <h2 className="section-title text-3xl sm:text-4xl font-bold text-secondary-gold border-b-4 border-primary-dark inline-block pb-2 mb-8">
        نقل التجارب والخبرات الأوروبية
      </h2>
      <p className="text-lg text-gray-600 text-center mb-8 max-w-4xl mx-auto">
        نعمل على بناء برامج "توأمة معرفية" لسد الفجوات التنموية بالتعاون مع الجهات السورية المعنية.
      </p>

      <div className="flex flex-col lg:flex-row justify-center gap-6 mt-8">
        {/* Expert Network Card */}
        <div className="w-full lg:w-1/3">
          <div className="card p-6 h-full bg-light-bg shadow-md rounded-lg flex flex-col items-center text-center">
            <i className="fas fa-handshake text-primary-dark text-5xl mb-4"></i>
            <h4 className="text-xl font-semibold text-primary-dark mb-3">كن جزءاً من شبكة الخبراء</h4>
            <p className="text-gray-700 mb-4 flex-grow">
              سجل خبرتك في القطاعات الحيوية للمساهمة في بناء سوريا المستقبل.
            </p>
            <button
              onClick={onOpenExpertFormModal}
              className="mt-auto bg-success-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out flex items-center justify-center w-full"
            >
              سجل الآن <i className="fas fa-arrow-left mr-2"></i>
            </button>
          </div>
        </div>

        {/* Municipal Governance Project Card */}
        <div className="w-full lg:w-1/3">
          <div className="card p-6 h-full shadow-md rounded-lg border-r-8 border-secondary-gold transition transform hover:-translate-y-1 hover:shadow-xl bg-white flex flex-col items-center text-center">
            <i className="fas fa-city text-primary-dark text-5xl mb-4"></i>
            <h4 className="text-xl font-semibold text-primary-dark mb-3">مشروع الحوكمة البلدية</h4>
            <p className="text-gray-700 mb-4 flex-grow">
              نقل نماذج الإدارة المحلية اللامركزية الناجحة في ألمانيا إلى المدن السورية.
            </p>
            <span className="mt-auto bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
              قطاع الإدارة والخدمات
            </span>
          </div>
        </div>

        {/* Primary Healthcare Program Card */}
        <div className="w-full lg:w-1/3">
          <div className="card p-6 h-full shadow-md rounded-lg border-r-8 border-secondary-gold transition transform hover:-translate-y-1 hover:shadow-xl bg-white flex flex-col items-center text-center">
            <i className="fas fa-heartbeat text-primary-dark text-5xl mb-4"></i>
            <h4 className="text-xl font-semibold text-primary-dark mb-3">برنامج الرعاية الصحية الأولية</h4>
            <p className="text-gray-700 mb-4 flex-grow">
              تطوير أنظمة الرعاية الصحية الأولية وتدريب الكوادر الطبية على المعايير الأوروبية.
            </p>
            <span className="mt-auto bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
              قطاع الصحة
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentSection;
