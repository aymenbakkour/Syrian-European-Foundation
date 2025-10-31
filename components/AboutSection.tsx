
import React from 'react';

interface AboutSectionProps {
  onOpenStructureModal: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onOpenStructureModal }) => {
  return (
    <section id="about" className="my-10">
      <h2 className="section-title text-3xl sm:text-4xl font-bold text-secondary-gold border-b-4 border-primary-dark inline-block pb-2 mb-8">
        عن المؤسسة السورية الأوروبية للتنمية والتواصل
      </h2>
      <p className="lead text-lg text-gray-700 text-center mb-8 max-w-4xl mx-auto">
        نحن منظمة مؤسسية مستقلة تعمل على تعزيز دور الكفاءات السورية في أوروبا في عملية التنمية الوطنية.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
        <div className="w-full md:w-1/2">
          <div className="card p-6 h-full shadow-md rounded-lg border-r-8 border-secondary-gold transition transform hover:-translate-y-1 hover:shadow-xl bg-white">
            <h4 className="text-xl font-semibold text-primary-dark mb-3 flex items-center justify-end">
              رؤيتنا ورسالتنا <i className="fas fa-bullseye ml-2"></i>
            </h4>
            <p className="text-gray-800 text-right mb-2">
              <strong className="text-primary-dark">الرؤية:</strong> أن نكون المظلة الجامعة والرائدة للسوريين في أوروبا، ومركز التبادل المعرفي الأول.
            </p>
            <p className="text-gray-800 text-right">
              <strong className="text-primary-dark">الرسالة:</strong> توحيد الجهود، تجسير العلاقة مع الوطن، ودعم وحماية مصالح السوريين في القارة.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="card p-6 h-full shadow-md rounded-lg border-r-8 border-secondary-gold transition transform hover:-translate-y-1 hover:shadow-xl bg-white">
            <h4 className="text-xl font-semibold text-primary-dark mb-3 flex items-center justify-end">
              الهيكل التنظيمي <i className="fas fa-sitemap ml-2"></i>
            </h4>
            <p className="text-gray-700 text-right mb-4">اضغط لمعرفة التفاصيل حول هيكلنا التنظيمي.</p>
            <button
              onClick={onOpenStructureModal}
              className="mt-auto px-6 py-3 border border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white rounded-md transition duration-300 ease-in-out block w-full text-center"
            >
              عرض الهيكل التنظيمي التفاعلي
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
