import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Clock, Search, Filter, Package, DollarSign } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import service1 from "../../../src/assets/service1.jpg.jpeg";
import service2 from "../../assets/service2.jpg.jpeg";
import service3 from "../../assets/service3.jpg.jpeg";
import service4 from "../../assets/service4.avif";
import service5 from "../../assets/service5.avif";
import service6 from "../../assets/service6.avif";
import api from "../../api/api";

const imageData =
  [service1, service2, service3, service4, service5, service6];

const ConsumerServicesListing = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;
  const navigate = useNavigate();

  // Service categories based on backend enum
  // const categories = [
  //   "CLEANING",
  //   "REPAIR",
  //   "GARDENING",
  //   "PLUMBLING",
  //   "ELECTRICAL",
  //   "BEAUTYANDWELLNESS",
  //   "SPA"
  // ];

  let min = 1;
  let max = imageData.length - 1;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;


  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services'); // Update with actual endpoint
        const categoryResponse = await api.get('/services/categories');
        setServices(response.data);
        setCategories(["ALL", ...categoryResponse.data]);
        setLoading(false);
        console.log('Fetched services:', response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services
  const filteredServices = services
    .filter((service) => {
      const matchesCategory =
        selectedCategory === "ALL" || service.category === selectedCategory;
      const matchesSearch =
        service.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDesc?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        service.price >= priceRange[0] && service.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  // Pagination
  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => setCurrentPage(1), [selectedCategory, searchTerm]);

  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setSearchTerm("");
  };

  const getCategoryIcon = (category) => {
    const icons = {
      CLEANING: "🧹",
      PLUMBLING: "🔧",
      ELECTRICAL: "💡",
      REPAIR: "🛠️",
      SPA: "💆",
      PAINTING: "🎨",
      GARDENING: "🌿",
      PEST_CONTROL: "🐛",
      ALL: "⭐"
    };
    return icons[category] || "📦";
  };

  const formatCategoryName = (category) => {
    return category.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: '#ffffff'
    },
    heroSection: {
      background: 'linear-gradient(135deg, #f0f7ff, #ffffff)',
      borderBottom: '1px solid #e0e0e0',
      padding: '3rem 0'
    },
    searchInput: {
      borderRadius: '12px',
      border: '2px solid #e0e0e0',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      paddingLeft: '2.5rem',
      transition: 'border-color 0.2s ease'
    },
    categoryPill: {
      padding: '0.5rem 1.25rem',
      borderRadius: '2rem',
      border: '2px solid #e0e0e0',
      background: '#ffffff',
      color: '#000000',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    categoryPillActive: {
      background: '#1e40af',
      color: '#ffffff',
      border: '2px solid #1e40af',
      boxShadow: '0 2px 8px rgba(30, 64, 175, 0.3)'
    },
    serviceCard: {
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      background: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      overflow: 'hidden'
    },
    serviceImage: {
      width: '100%',
      height: '200px',
      background: '#f0f7ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '1px solid #e0e0e0'
    },
    filterCard: {
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      background: '#ffffff'
    },
    filterBtn: {
      padding: '0.5rem 1.25rem',
      borderRadius: '0.5rem',
      border: '2px solid #e0e0e0',
      background: '#ffffff',
      color: '#000000',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease'
    },
    priceTag: {
      color: '#1e40af',
      fontWeight: 'bold',
      fontSize: '1.25rem'
    },
    pagination: {
      borderRadius: '0.5rem',
      border: '1px solid #e0e0e0'
    },
    paginationActive: {
      background: '#1e40af',
      color: '#ffffff',
      border: '1px solid #1e40af'
    }
  };

  if (loading) {
    return (
      <div style={styles.pageBackground}>
        <div className="container text-center py-5">
          <div className="spinner-border" style={{ color: '#1e40af' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div className="container">
          <div className="text-center mb-4">
            <h1 className="fw-bold mb-2" style={{ fontSize: '2.5rem', color: '#000000' }}>
              Find Trusted Home Service Experts
            </h1>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>
              From cleaning to repairs — book your next service in minutes ✨
            </p>
          </div>

          {/* Search Bar */}
          <div className="position-relative mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Search
              size={20}
              className="position-absolute"
              style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#1e40af' }}
            />
            <input
              type="text"
              className="form-control"
              style={styles.searchInput}
              placeholder="Search for cleaning, plumbing, painting..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#1e40af'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          {/* Category Pills */}
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  ...styles.categoryPill,
                  ...(selectedCategory === cat ? styles.categoryPillActive : {})
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.borderColor = '#1e40af';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.borderColor = '#e0e0e0';
                  }
                }}
              >
                <span>{getCategoryIcon(cat)}</span>
                <span>{formatCategoryName(cat)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-4">
        {/* Section Title */}
        <h4 className="fw-bold mb-4 text-center" style={{ color: '#000000' }}>
          {selectedCategory === "ALL"
            ? "All Available Services"
            : `${formatCategoryName(selectedCategory)} Services`}
        </h4>

        {/* Filters & Sort */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            style={styles.filterBtn}
            onClick={() => setShowFilters(!showFilters)}
            onMouseOver={(e) => e.target.style.borderColor = '#1e40af'}
            onMouseOut={(e) => e.target.style.borderColor = '#e0e0e0'}
          >
            <Filter size={18} />
            Filters
          </button>

          <select
            className="form-select"
            style={{ width: 'auto', borderColor: '#e0e0e0' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="card mb-4" style={styles.filterCard}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-bold" style={{ color: '#000000' }}>Filters</h6>
                <button
                  className="btn btn-link text-decoration-none"
                  style={{ color: '#1e40af' }}
                  onClick={resetFilters}
                >
                  Reset All
                </button>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold" style={{ color: '#000000' }}>
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    style={{ accentColor: '#1e40af' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="row g-4">
          {currentServices.map((service) => (
            <div key={service.serviceID} className="col-md-6 col-lg-4">
              <div
                style={styles.serviceCard}
                onClick={() => navigate(`/consumer-home/service-details/${service.serviceID}`)}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Image Placeholder */}
                <div style={styles.serviceImage}>
                  {imageData.length > 0 || (service.serviceImages && service.serviceImages.length) > 0 ? (
                    <img
                      src={imageData[Math.floor(Math.random() * (max - min + 1)) + min]}
                      alt={service.serviceName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Package size={48} style={{ color: '#1e40af', opacity: 0.3 }} />
                  )}
                  <div
                    className="position-absolute top-0 end-0 m-2"
                    style={{
                      background: '#1e40af',
                      color: '#ffffff',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {getCategoryIcon(service.category)} {formatCategoryName(service.category)}
                  </div>
                  {service.rating > 0 && (
                    <div
                      className="position-absolute top-0 start-0 m-2"
                      style={{
                        background: '#ffffff',
                        color: '#000000',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <Star size={12} fill="#ffc107" style={{ color: '#ffc107' }} />
                      {service.rating}
                    </div>
                  )}
                </div>

                <div className="card-body p-3">
                  <h5 className="fw-bold mb-2" style={{ color: '#000000' }}>
                    {service.serviceName}
                  </h5>
                  <p className="text-muted small mb-3" style={{ minHeight: '40px' }}>
                    {service.shortDesc}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div style={styles.priceTag}>₹{service.price.toLocaleString()}</div>
                      <div className="small text-muted">per service</div>
                    </div>
                    <button
                      className="btn"
                      style={{
                        background: '#1e40af',
                        color: '#ffffff',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/consumer-home/checkout/${service.serviceID}`);
                      }}
                      onMouseOver={(e) => e.target.style.background = '#1e3a8a'}
                      onMouseOut={(e) => e.target.style.background = '#1e40af'}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-5">
            <Package size={64} style={{ color: '#e0e0e0' }} />
            <h3 className="mt-3" style={{ color: '#000000' }}>No services found</h3>
            <p className="text-muted">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => goToPage(currentPage - 1)}
                    style={{ color: '#1e40af', borderColor: '#e0e0e0' }}
                  >
                    ← Prev
                  </button>
                </li>

                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(i + 1)}
                      style={
                        currentPage === i + 1
                          ? styles.paginationActive
                          : { color: '#1e40af', borderColor: '#e0e0e0' }
                      }
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => goToPage(currentPage + 1)}
                    style={{ color: '#1e40af', borderColor: '#e0e0e0' }}
                  >
                    Next →
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerServicesListing;