import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <div className="navbar-brand-logo">H</div>
          <span className="fw-bold fs-5">Happy Homes</span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"} fs-4`}></i>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.name}>
                <a
                  className="nav-link px-3 text-secondary"
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="d-flex align-items-center gap-3">
            <a href="tel:+1234567890" className="text-dark text-decoration-none d-none d-lg-flex align-items-center gap-2">
            </a>
            <a href="#contact" className="btn btn-primary px-4">
              Book Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
