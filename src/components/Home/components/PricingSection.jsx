const pricingPlans = [
  {
    id: 1,
    name: "Basic Clean",
    icon: "bi-house",
    price: 99,
    description: "Perfect for regular maintenance",
    features: [
      "Standard surface cleaning",
      "Dusting & vacuuming",
      "Bathroom sanitization",
      "Kitchen cleaning",
      "Trash removal",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Deep Clean",
    icon: "bi-stars",
    price: 199,
    description: "Thorough cleaning for every corner",
    features: [
      "Everything in Basic",
      "Inside cabinet cleaning",
      "Appliance deep clean",
      "Window cleaning",
      "Carpet shampooing",
      "Grout & tile scrubbing",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Premium",
    icon: "bi-building",
    price: 349,
    description: "Complete home transformation",
    features: [
      "Everything in Deep Clean",
      "Upholstery cleaning",
      "Wall spot cleaning",
      "Garage organization",
      "Priority scheduling",
      "Dedicated team",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-5 bg-light">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold text-uppercase small">
            Pricing
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-3">
            Get A Sparkling Clean Home
            <br />
            At A Special Price!
          </h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: 600 }}>
            Choose the perfect cleaning package for your home. No hidden fees, just transparent pricing.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="row g-4 justify-content-center">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="col-md-6 col-lg-4">
              <div className={`pricing-card position-relative bg-white h-100 ${plan.popular ? "popular" : ""}`}>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}

                {/* Icon */}
                <div className={`pricing-icon mb-4 ${plan.popular ? "bg-primary" : "bg-primary bg-opacity-10"}`}>
                  <i className={`bi ${plan.icon} fs-3 ${plan.popular ? "text-white" : "text-primary"}`}></i>
                </div>

                {/* Plan Name */}
                <h4 className="fw-bold mb-2">{plan.name}</h4>
                <p className="text-secondary mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-4">
                  <span className="display-5 fw-bold">${plan.price}</span>
                  <span className="text-secondary">/session</span>
                </div>

                {/* Features */}
                <ul className="list-unstyled mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="d-flex align-items-center gap-3 mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 20, height: 20 }}>
                        <i className="bi bi-check text-primary small"></i>
                      </div>
                      <span className="text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`btn w-100 py-3 ${plan.popular ? "btn-primary" : "btn-outline-secondary"}`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
