const steps = [
  {
    icon: "bi-calendar-check",
    title: "Book Online",
    description: "Choose your preferred date, time, and service type through our easy booking system.",
    step: "01",
  },
  {
    icon: "bi-people",
    title: "Meet Your Cleaner",
    description: "We match you with a vetted, professional cleaner who fits your specific needs.",
    step: "02",
  },
  {
    icon: "bi-stars",
    title: "Get Cleaning Done",
    description: "Sit back and relax while our experts transform your space to sparkling clean.",
    step: "03",
  },
  {
    icon: "bi-check-circle",
    title: "Enjoy Your Home",
    description: "Love your freshly cleaned home. We guarantee your satisfaction every time.",
    step: "04",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold text-uppercase small">
            How It Works
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-3">How We Can Help</h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: 600 }}>
            Getting your home professionally cleaned is as easy as 1-2-3-4.
            Here's how our simple process works.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="row g-4">
          {steps.map((step, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="step-card position-relative bg-white rounded-4 p-4 text-center border h-100">
                {/* Step Number */}
                <div className="step-number">{step.step}</div>

                {/* Icon */}
                <div className="step-icon mt-3">
                  <i className={`bi ${step.icon}`}></i>
                </div>

                {/* Content */}
                <h5 className="fw-bold mb-2">{step.title}</h5>
                <p className="text-secondary small mb-0">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
