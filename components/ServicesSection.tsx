
import React, { useState } from 'react'; // Import useState
import { FAQ_ITEMS } from '../constants';

interface ServicesSectionProps {
  onOpenSupportFormModal: () => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenSupportFormModal }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null); // State to manage open FAQ item

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id); // Toggle open or close
  };

  return (
    <section id="services" className="my-10">
      <h2 className="section-title text-3xl sm:text-4xl font-bold text-secondary-gold border-b-4 border-primary-dark inline-block pb-2 mb-8">
        درع الجالية: الدعم القانوني والاجتماعي
      </h2>
      <p className="text-lg text-gray-600 text-center mb-8 max-w-4xl mx-auto">
        نقدم الدعم والاستشارة لمواجهة التحديات القانونية والاجتماعية في أوروبا.
      </p>

      <div className="card p-6 shadow-xl mb-8 bg-white rounded-lg">
        <h4 className="text-2xl font-bold text-danger-red mb-4 flex items-center justify-end">
          نموذج طلب مساعدة عاجل <i className="fas fa-exclamation-triangle ml-3"></i>
        </h4>
        <p className="text-gray-700 text-right mb-4">
          إذا كنت بحاجة إلى مساعدة عاجلة، يرجى ملء هذا النموذج وسنتواصل معك في أقرب وقت ممكن.
        </p>
        <button
          onClick={onOpenSupportFormModal}
          className="bg-danger-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out w-full sm:w-auto block mx-auto text-center"
        >
          املأ نموذج طلب الدعم
        </button>
      </div>

      <div className="w-full max-w-3xl mx-auto mt-12">
        <h4 className="text-2xl font-bold text-primary-dark mb-6 text-center">أسئلة شائعة</h4>
        <div id="faqAccordion" className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <h2 className="text-lg" id={`heading-${item.id}`}>
                <button
                  className="flex items-center justify-between w-full p-5 text-right font-semibold text-primary-dark bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-gold"
                  type="button"
                  aria-expanded={openFaqId === item.id}
                  aria-controls={item.id}
                  onClick={() => toggleFaq(item.id)}
                >
                  {item.question}
                  <i className={`fas fa-chevron-down transform transition-transform duration-300 ${openFaqId === item.id ? 'rotate-180' : ''}`}></i>
                </button>
              </h2>
              <div
                id={item.id}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ maxHeight: openFaqId === item.id ? '999px' : '0px' }} // Use a large max-height for smooth transition
                aria-labelledby={`heading-${item.id}`}
              >
                <div className="p-5 border-t border-gray-200 text-gray-700 text-right">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
    