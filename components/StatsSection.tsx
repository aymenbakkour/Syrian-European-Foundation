
import React, { useEffect, useRef, useState } from 'react';

interface StatItemProps {
  iconClass: string;
  target: number;
  label: string;
  bgColor: string;
  iconColor?: string;
  textColor?: string;
}

const StatItem: React.FC<StatItemProps> = ({ iconClass, target, label, bgColor, iconColor, textColor }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isCounting = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isCounting.current) {
            isCounting.current = true;
            let start = 0;
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const animateCount = (currentTime: DOMHighResTimeStamp) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const currentCount = Math.ceil(progress * target);
              setCount(currentCount);

              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                isCounting.current = false; // Reset for potential re-observation if element leaves/re-enters
              }
            };
            requestAnimationFrame(animateCount);
            observer.unobserve(entry.target); // Stop observing after counting once
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target]);

  return (
    <div ref={ref} className="w-full sm:w-1/2 md:w-1/4 p-2">
      <div className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-full ${bgColor} ${textColor ? textColor : 'text-white'}`}>
        <i className={`${iconClass} text-4xl mb-3 ${iconColor ? iconColor : ''}`}></i>
        <h3 className="text-3xl font-bold mb-1">{count}</h3>
        <p className="text-lg">{label}</p>
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="my-10 text-center">
      <h2 className="section-title text-3xl sm:text-4xl font-bold text-secondary-gold border-b-4 border-primary-dark inline-block pb-2 mb-8">
        إنجازاتنا بالأرقام
      </h2>
      <div className="flex flex-wrap justify-center -m-2">
        <StatItem
          iconClass="fas fa-users"
          target={1500}
          label="خبير مسجل"
          bgColor="bg-primary-dark"
        />
        <StatItem
          iconClass="fas fa-project-diagram"
          target={5}
          label="برنامج توأمة فعال"
          bgColor="bg-success-green"
        />
        <StatItem
          iconClass="fas fa-gavel"
          target={700}
          label="قضية تم التعامل معها"
          bgColor="bg-info-blue"
        />
        <StatItem
          iconClass="fas fa-map-marker-alt"
          target={9}
          label="فروع ونقاط اتصال"
          bgColor="bg-secondary-gold"
          iconColor="text-primary-dark"
          textColor="text-primary-dark"
        />
      </div>
    </section>
  );
};

export default StatsSection;
