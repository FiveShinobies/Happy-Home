import React from 'react';
import styles from '../styles/styles';

const Header = ({ activeTab, totalCount }) => (
  <div className={styles.gradientHeader}>
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h3 fw-bold mb-1">Admin Dashboard</h1>
          <p className="text-secondary mb-0">Manage consumers and vendors</p>
        </div>
        <div>
          <div className="bg-light bg-opacity-10 rounded px-3 py-2">
            <span className="text-white small fw-semibold">{totalCount} Total</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
