import React from 'react';
import styles from '../styles/styles';
import utils from '../utils/utils';

const ViewVendorOrders = ({ vendors, onViewDetails, onViewOrders }) => (
  <div className={styles.card}>
    <div className={`${styles.gradientBlue} px-4 py-3`}>
      <h2 className="h5 mb-0">All Vendors</h2>
    </div>
    <div className="card-body">
      {vendors.map((vendor) => (
        <div key={vendor.vendorId} className={styles.listItem}>
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <div
                className={styles.avatar}
                style={{ width: 48, height: 48 }}
              >
                {utils.getInitial(vendor.name)}
              </div>
              <div>
                <h3 className="h6 fw-bold mb-1">{vendor.name}</h3>
                <p className="mb-0 text-muted small">
                  ✉️ {vendor.email} &nbsp; | &nbsp; 📍 {vendor.city}
                </p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => onViewDetails(vendor)}
                className={styles.button.primary}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => onViewOrders(vendor)}
                className={styles.button.secondary}
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ViewVendorOrders;
