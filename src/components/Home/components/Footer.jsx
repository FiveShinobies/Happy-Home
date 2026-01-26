const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Home Cleaning", href: "#" },
      { name: "Deep Cleaning", href: "#" },
      { name: "Move-In/Out", href: "#" },
      { name: "Office Cleaning", href: "#" },
      { name: "Carpet Cleaning", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Partners", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Booking", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: "bi-facebook", href: "#", label: "Facebook" },
    { icon: "bi-twitter-x", href: "#", label: "Twitter" },
    { icon: "bi-instagram", href: "#", label: "Instagram" },
    { icon: "bi-linkedin", href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand Column */}
          <div className="col-lg-4">
            <a href="#" className="d-flex align-items-center gap-2 text-decoration-none mb-4">
              <div className="navbar-brand-logo">H</div>
              <span className="fw-bold fs-5 text-white">Happy Homes</span>
            </a>
            <p className="text-white-50 mb-4">
              Professional home cleaning services that transform your living space.
              Trusted by thousands of happy homes across the country.
            </p>

            {/* Newsletter */}
            <p className="fw-semibold text-white mb-3">Subscribe to our newsletter</p>
            <div className="input-group">
              <input
                type="email"
                className="form-control bg-dark border-secondary text-white"
                placeholder="Enter your email"
              />
              <button className="btn btn-primary px-4">Subscribe</button>
            </div>
          </div>

          {/* Services Links */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold text-white mb-4">Services</h6>
            <ul className="list-unstyled">
              {footerLinks.services.map((link) => (
                <li key={link.name} className="mb-2">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold text-white mb-4">Company</h6>
            <ul className="list-unstyled">
              {footerLinks.company.map((link) => (
                <li key={link.name} className="mb-2">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold text-white mb-4">Support</h6>
            <ul className="list-unstyled">
              {footerLinks.support.map((link) => (
                <li key={link.name} className="mb-2">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold text-white mb-4">Contact</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="tel:+1234567890" className="d-flex align-items-center gap-2">
                  <i className="bi bi-telephone"></i>
                  +1 (234) 567-890
                </a>
              </li>
              <li className="mb-2">
                <a href="mailto:hello@homecleanpro.com" className="d-flex align-items-center gap-2">
                  <i className="bi bi-envelope"></i>
                  hello@homecleanpro.com
                </a>
              </li>
              <li className="mb-2">
                <span className="d-flex align-items-start gap-2 text-white-50">
                  <i className="bi bi-geo-alt"></i>
                  123 Clean Street, City, State 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top border-secondary pt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <p className="text-white-50 small mb-0">
              © {currentYear} HomeHappy Pro. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="d-flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="social-icon"
                >
                  <i className={`bi ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
