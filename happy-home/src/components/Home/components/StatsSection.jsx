import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 1200, suffix: "+", label: "Happy Customers" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
  { value: 4.9, suffix: "/5", label: "Average Rating" },
  { value: 5, suffix: "+", label: "Years Experience" },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounts(
        stats.map((stat) => {
          const progress = step / steps;
          return Number((stat.value * progress).toFixed(stat.value % 1 !== 0 ? 1 : 0));
        })
      );
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="stats-section py-5">
      <div className="container">
        <div className="row g-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="col-6 col-lg-3 text-center"
            >
              <div className="stat-number">
                {counts[index]}
                {stat.suffix}
              </div>
              <p className="text-secondary fw-medium mb-0">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
