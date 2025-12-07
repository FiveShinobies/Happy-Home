import serviceHomeCleaning from "../../../assets/service-home-cleaning.jpg";
import serviceDeepCleaning from "../../../assets/service-deep-cleaning.jpg";
import serviceMoveOut from "../../../assets/service-move-out.jpg";

const services = [
  {
    id: 1,
    title: "Standard Home Cleaning",
    description: "Regular maintenance cleaning to keep your home fresh and tidy. Perfect for busy families.",
    image: serviceHomeCleaning,
    price: "From $99",
  },
  {
    id: 2,
    title: "Deep Cleaning",
    description: "Thorough cleaning that reaches every corner. Ideal for spring cleaning or special occasions.",
    image: serviceDeepCleaning,
    price: "From $199",
  },
  {
    id: 3,
    title: "Move-In/Move-Out Cleaning",
    description: "Complete cleaning service for moving transitions. Leave or enter a spotless space.",
    image: serviceMoveOut,
    price: "From $249",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-5 bg-white">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold text-uppercase small letter-spacing-2">
            Our Services
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-3">Our Cleaning Services</h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: 600 }}>
            Professional cleaning solutions tailored to your needs. We offer a wide range of services
            to make your home shine.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div className="card service-card h-100 border-0">
                {/* Image Container */}
                <div className="card-img-top-wrapper position-relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="card-img-top service-card-img"
                  />
                  <span className="service-price-badge">{service.price}</span>
                </div>

                {/* Content */}
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-3">{service.title}</h5>
                  <p className="card-text text-secondary mb-3">{service.description}</p>
                  <a href="#" className="text-primary fw-semibold text-decoration-none d-inline-flex align-items-center gap-2">
                    Learn More
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-5">
          <a href="#" className="btn btn-primary btn-lg px-5 d-inline-flex align-items-center gap-2">
            View All Services
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
