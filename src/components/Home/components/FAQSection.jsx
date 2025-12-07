import { useState } from "react";

const faqs = [
  {
    question: "What cleaning products do you use?",
    answer: "We use eco-friendly, non-toxic cleaning products that are safe for your family and pets. All our products are certified green and effective against germs and bacteria.",
  },
  {
    question: "How do I book a cleaning service?",
    answer: "Booking is easy! Simply click the 'Book Now' button, select your preferred service, choose a date and time, and complete the booking. You'll receive a confirmation email immediately.",
  },
  {
    question: "Are your cleaners insured and background-checked?",
    answer: "Yes, absolutely. All our cleaning professionals are fully insured, bonded, and have passed comprehensive background checks. Your safety and peace of mind are our priorities.",
  },
  {
    question: "What if I'm not satisfied with the cleaning?",
    answer: "Your satisfaction is guaranteed! If you're not happy with any aspect of our service, contact us within 24 hours and we'll re-clean the area at no extra cost.",
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer: "No, you don't need to be home. Many of our clients provide us with a key or access code. We treat your home with the utmost respect and security.",
  },
  {
    question: "How long does a typical cleaning take?",
    answer: "A standard cleaning typically takes 2-4 hours depending on the size of your home. Deep cleaning may take 4-6 hours. We'll provide a time estimate when you book.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold text-uppercase small">
            FAQ
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-3">Got Questions?</h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: 600 }}>
            Find answers to commonly asked questions about our cleaning services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto" style={{ maxWidth: 768 }}>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-question"
              >
                <span className="fw-semibold">{faq.question}</span>
                <div className={`faq-toggle ${openIndex === index ? "active" : "bg-light"}`}>
                  <i className={`bi ${openIndex === index ? "bi-dash" : "bi-plus"}`}></i>
                </div>
              </button>
              <div
                className="overflow-hidden"
                style={{
                  maxHeight: openIndex === index ? 200 : 0,
                  transition: "max-height 0.3s ease",
                }}
              >
                <div className="faq-answer">
                  <p className="text-secondary mb-0">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
