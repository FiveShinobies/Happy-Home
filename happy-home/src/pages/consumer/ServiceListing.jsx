import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Clock, DollarSign, Search, Filter } from "lucide-react";
import { servicesData, categories } from "./servicesData";

const ConsumerServicesListing = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [minRating, setMinRating] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("popular");
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 6;
    const navigate = useNavigate();

    // Filter services
    const filteredServices = servicesData
        .filter((service) => {
            const matchesCategory =
                selectedCategory === "All" || service.category === selectedCategory;
            const matchesSearch =
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice =
                service.price >= priceRange[0] && service.price <= priceRange[1];
            const matchesRating = service.rating >= minRating;
            return matchesCategory && matchesSearch && matchesPrice && matchesRating;
        })
        .sort((a, b) => {
            if (sortBy === "popular") return b.reviews - a.reviews;
            if (sortBy === "rating") return b.rating - a.rating;
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

    useEffect(() => setCurrentPage(1), [selectedCategory, searchTerm, minRating]);

    const resetFilters = () => {
        setPriceRange([0, 200]);
        setMinRating(0);
        setSearchTerm("");
    };

    return (
        <div className="min-vh-100 bg-light">
            {/* Header */}
            {/* Hero Section (no <header>) */}
            <div
                className="text-center text-dark py-5"
                style={{
                    background: "linear-gradient(135deg, #f3f2ff, #ffffff)",
                    borderBottom: "1px solid #eee",
                }}
            >
                <h1 className="fw-bold mb-2" style={{ fontSize: "2rem" }}>
                    Find Trusted Home Service Experts
                </h1>
                <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
                    From cleaning to repairs — book your next service in minutes ✨
                </p>

                {/* Search Bar */}
                <div className="container position-relative mb-3" style={{ maxWidth: "600px" }}>

                    <input
                        type="text"
                        className="form-control search-input py-3 ps-5"
                        placeholder="Search for cleaning, plumbing, painting..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            borderRadius: "12px",
                            fontSize: "1rem",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        }}
                    />
                    <Search
                        size={22}
                        className="position-absolute"
                        style={{ right: "40px", top: "14px", color: "#6c757d" }}
                    />
                </div>

                {/* Category Pills */}
                <div className="category-pills-container d-flex justify-content-center gap-2 flex-wrap mt-3 px-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`category-pill ${selectedCategory === cat ? "active" : ""
                                } d-flex align-items-center gap-2`}
                            style={{
                                border: "1px solid #dee2e6",
                                boxShadow:
                                    selectedCategory === cat
                                        ? "0 2px 6px rgba(0,0,0,0.15)"
                                        : "0 1px 3px rgba(0,0,0,0.05)",
                            }}
                        >
                            {/* Small visual icons */}
                            {cat === "Cleaning" && "🧹"}
                            {cat === "Plumbing" && "🔧"}
                            {cat === "Electrical" && "💡"}
                            {cat === "Gardening" && "🌿"}
                            {cat === "Repair" && "🛠️"}
                            {cat === "Painting" && "🎨"}
                            {cat === "All" && "⭐"} {cat}
                        </button>
                    ))}
                </div>
            </div>
            <h4 className="fw-semibold mb-4 text-center mt-4">
                {selectedCategory === "All"
                    ? "All Available Services"
                    : `${selectedCategory} Services`}
            </h4>


            {/* Body */}
            <div className="container py-4">
                {/* Filters */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <button
                        className="btn btn-outline-dark d-flex align-items-center gap-2"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={18} /> Filters
                    </button>

                    <select
                        className="form-select w-auto"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="popular">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                    </select>
                </div>

                {showFilters && (
                    <div className="card filter-card mb-4 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="mb-0">Filters</h6>
                                <button
                                    className="btn btn-link text-dark p-0 text-decoration-none"
                                    onClick={resetFilters}
                                >
                                    Reset
                                </button>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small">
                                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                                    </label>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="0"
                                        max="200"
                                        value={priceRange[1]}
                                        onChange={(e) =>
                                            setPriceRange([0, parseInt(e.target.value)])
                                        }
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small">Minimum Rating</label>
                                    <select
                                        className="form-select"
                                        value={minRating}
                                        onChange={(e) => setMinRating(parseFloat(e.target.value))}
                                    >
                                        <option value="0">Any Rating</option>
                                        <option value="4">4+ Stars</option>
                                        <option value="4.5">4.5+ Stars</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Services Grid */}
                <div className="row g-4">
                    {currentServices.map((service) => (
                        <div key={service.id} className="col-md-6 col-lg-4">
                            <div
                                className="card service-card shadow-sm"
                                onClick={() => navigate(`/consumer-home/service-details/${service.id}`)}
                            >
                                {service.popular && (
                                    <div className="position-absolute top-0 end-0 m-2">
                                        <span className="badge badge-popular">Popular</span>
                                    </div>
                                )}

                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="service-img"
                                />
                                <div className="card-body">
                                    <h5 className="fw-semibold mb-1">{service.name}</h5>
                                    <p className="text-muted small mb-2">{service.provider}</p>

                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Star size={16} className="star-filled" />
                                        <span className="small fw-bold">{service.rating}</span>
                                        <span className="text-muted small">
                                            ({service.reviews} reviews)
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-1">
                                            <DollarSign size={16} />
                                            <span className="fw-bold">${service.price}</span>
                                        </div>
                                        <Clock size={16} className="text-muted" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredServices.length === 0 && (
                    <div className="text-center py-5 text-muted">
                        No services found matching your criteria.
                    </div>
                )}

                {/* pagination */}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-5">
                        <nav>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => goToPage(currentPage - 1)}
                                    >
                                        ← Prev
                                    </button>
                                </li>

                                {[...Array(totalPages)].map((_, i) => (
                                    <li
                                        key={i}
                                        className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                                    >
                                        <button className="page-link" onClick={() => goToPage(i + 1)}>
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