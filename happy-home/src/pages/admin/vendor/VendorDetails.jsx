import React from 'react';
import styles from '../styles/styles';
import FormField from '../shared/FormField';

const VendorDetails = ({ vendor, onBack, onViewOrders }) => (
  <div className={styles.card}>
    <div className={`${styles.gradientBlue} px-4 py-3 d-flex justify-content-between align-items-center`}>
      <h2 className="h5 mb-0">Vendor Details</h2>
      <button type="button" onClick={onBack} className={styles.button.light}>
        ← Back
      </button>
    </div>
    <div className="card-body">
      <div className="row">
        <div className="col-md-6">
          <FormField label="Company Name" value={vendor.name} />
        </div>
        <div className="col-md-6">
          <FormField label="Email" value={vendor.email} />
        </div>
        <div className="col-md-6">
          <FormField label="Phone" value={vendor.phone} />
        </div>
        <div className="col-md-6">
          <FormField label="City" value={vendor.city} />
        </div>
        <div className="col-md-6">
          <FormField label="Address" value={vendor.address} />
        </div>
        <div className="col-md-6">
          <FormField label="Rating" value={`${vendor.rating} ⭐`} />
        </div>
        {/* <div className="col-md-6">
          <FormField label="Join Date" value={vendor.joinDate} />
        </div> */}
      </div>
      <div className="mt-3">
        <button
          type="button"
          onClick={() => onViewOrders(vendor)}
          className={styles.button.secondary}
        >
          View Orders →
        </button>
      </div>
    </div>
  </div>
);

export default VendorDetails;
