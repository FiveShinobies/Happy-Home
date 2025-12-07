import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "Absolutely amazing service! The team was professional, thorough, and left my home spotless. I've tried many cleaning services, but HomeClean Pro is by far the best.",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    content: "We use HomeClean Pro for our office space and couldn't be happier. They're reliable, efficient, and always go above and beyond. Highly recommend!",
    rating: 5,
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Busy Parent",
    content: "As a working mom of three, this service has been a lifesaver. Coming home to a clean house after a long day is priceless. Thank you, HomeClean Pro!",
    rating: 5,
    avatar: "ER",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Real Estate Agent",
    content: "I use HomeClean Pro for all my property listings. They always deliver exceptional results that impress my clients. A true partner in my business.",
    rating: 5,
    avatar: "DT",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentIndex + 1) % testimonials.length);
  const prevSlide = () => goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold text-uppercase small">
            Testimonials
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-3">What Our Clients Are Saying</h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: 600 }}>
            Don't just take our word for it. Here's what our happy customers have to say.
          </p>
        </div>

        {/* Carousel */}
        <div className="position-relative mx-auto" style={{ maxWidth: 800 }}>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="btn btn-light rounded-circle position-absolute top-50 start-0 translate-middle-y shadow-sm d-none d-lg-flex align-items-center justify-content-center"
            style={{ width: 48, height: 48, zIndex: 2, marginLeft: -60 }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            onClick={nextSlide}
            className="btn btn-light rounded-circle position-absolute top-50 end-0 translate-middle-y shadow-sm d-none d-lg-flex align-items-center justify-content-center"
            style={{ width: 48, height: 48, zIndex: 2, marginRight: -60 }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>

          {/* Testimonial Card */}
          <div className="testimonial-card text-center">
            {/* Quote Icon */}
            <div className="quote-icon">
              <i className="bi bi-quote fs-2 text-primary"></i>
            </div>

            {/* Stars */}
            <div className="mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <i key={i} className="bi bi-star-fill text-warning mx-1"></i>
              ))}
            </div>

            {/* Content */}
            <p className="fs-5 text-dark mb-4 px-lg-5">
              "{testimonials[currentIndex].content}"
            </p>

            {/* Author */}
            <div className="d-flex align-items-center justify-content-center gap-3">
              <div className="testimonial-avatar">
                {testimonials[currentIndex].avatar}
              </div>
              <div className="text-start">
                <h6 className="fw-bold mb-0">{testimonials[currentIndex].name}</h6>
                <small className="text-secondary">{testimonials[currentIndex].role}</small>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="d-flex justify-content-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`btn p-0 rounded-pill ${
                  index === currentIndex ? "bg-primary" : "bg-secondary bg-opacity-25"
                }`}
                style={{
                  width: index === currentIndex ? 32 : 12,
                  height: 12,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
