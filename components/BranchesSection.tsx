
import React from 'react';
import { BRANCHES_INFO } from '../constants';

const BranchesSection: React.FC = () => {
  return (
    <section id="branches" className="my-10">
      <h2 className="section-title text-3xl sm:text-4xl font-bold text-secondary-gold border-b-4 border-primary-dark inline-block pb-2 mb-8">
        فروعنا ونقاط التواصل في أوروبا
      </h2>
      <p className="lead text-center text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
        سيتم هنا دمج خريطة تفاعلية (باستخدام مكتبة مثل Leaflet.js) لتحديد مواقع الفروع وممثلي المدن الكبرى.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {BRANCHES_INFO.map((branch) => (
          <div key={branch.id} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <div className="card p-6 shadow-md rounded-lg bg-white h-full flex flex-col justify-between items-end text-right">
              <h5 className="text-xl font-semibold text-primary-dark mb-3 flex items-center">
                {branch.name} <i className="fas fa-flag ml-3"></i>
              </h5>
              <p className="text-gray-700">
                <strong className="text-primary-dark">المدينة:</strong> {branch.city}
              </p>
              <p className="text-gray-700 mt-1">
                <strong className="text-primary-dark">التواصل:</strong>{' '}
                <a href={`mailto:${branch.contact}`} className="text-blue-600 hover:underline">
                  {branch.contact}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BranchesSection;
