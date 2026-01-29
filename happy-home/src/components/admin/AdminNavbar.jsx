import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Users, ShoppingCart, UserCircle, LayoutDashboard, Menu, X , LogOut  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
      // Clear user session or token here
      console.log('User logged out');
      sessionStorage.clear();
      toast.success('Logged out successfully');
      navigate('/');
    }
  const navItems = [
    { path: '/admin-home', label: 'Home', icon: Home },
    { path: '/admin-home/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin-home/service-listing', label: 'Services', icon: Package },
    { path: '/admin-home/add-service', label: 'Add Service', icon: Package },
    { path: '/admin-home/all-orders', label: 'Orders', icon: ShoppingCart },
    { path: '/admin-home/admin-panel', label: 'All Users', icon: UserCircle },
    { label: 'logout', icon: LogOut , onClick : handleLogout },

    // { path: '/admin-home/all-vendors', label: 'Vendors', icon: Users },
    // { path: '/admin-home/all-consumers', label: 'Consumers', icon: UserCircle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/admin-home" style={styles.brand}>
          <span style={styles.brandText}>HappyHome</span>
        </Link>

        {/* Desktop Navigation */}
        <div style={styles.desktopNav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path || '#'}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }} 
                style={{
                  ...styles.navLink,
                  ...(active ? styles.navLinkActive : {}),
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icon size={18} style={styles.icon} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={styles.menuButton}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div style={styles.mobileNav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                style={{
                  ...styles.mobileNavLink,
                  ...(active ? styles.mobileNavLinkActive : {}),
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icon size={18} style={styles.icon} />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#ffffff',
    borderBottom: '2px solid #000000',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
  },
  brand: {
    textDecoration: 'none',
    color: '#000000',
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  brandText: {
    color: '#0d6efd',
  },
  desktopNav: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#000000',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  navLinkActive: {
    backgroundColor: '#0d6efd',
    color: '#ffffff',
  },
  icon: {
    flexShrink: 0,
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#000000',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e0e0e0',
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: '#000000',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    marginBottom: '0.25rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  mobileNavLinkActive: {
    backgroundColor: '#0d6efd',
    color: '#ffffff',
  },
};

// Responsive behavior
if (typeof window !== 'undefined') {
  const updateStyles = () => {
    if (window.innerWidth <= 768) {
      styles.desktopNav.display = 'none';
      styles.menuButton.display = 'block';
    } else {
      styles.desktopNav.display = 'flex';
      styles.menuButton.display = 'none';
    }
  };
  
  updateStyles();
  window.addEventListener('resize', updateStyles);
}

export default AdminNavbar;