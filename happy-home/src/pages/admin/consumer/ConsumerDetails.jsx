import React from 'react';
import styles from '../styles/styles';
import FormField from '../shared/FormField';

const ConsumerDetails = ({ consumer, onBack, onViewOrders }) => (
  <div className={styles.card}>
    <div className={`${styles.gradientBlue} px-4 py-3 d-flex justify-content-between align-items-center`}>
      <h2 className="h5 mb-0">Consumer Details</h2>
      <button type="button" onClick={onBack} className={styles.button.light}>
        ← Back
      </button>
    </div>
    <div className="card-body">
      <div className="row">
        <div className="col-md-6">
          <FormField label="Name" value={consumer.firstName + " " + consumer.lastName} />
        </div>
        <div className="col-md-6">
          <FormField label="Email" value={consumer.email} />
        </div>
        <div className="col-md-6">
          <FormField label="Phone" value={consumer.phone} />
        </div>
        <div className="col-md-6">
          <FormField label="City" value={consumer.address[0].city} />
        </div>
        <div className="col-md-6">
          <FormField label="Address" value={consumer.address[0].homeNo + ", " + consumer.address[0].town + ", " + consumer.address[0].city + ", " + consumer.address[0].state + ", " + consumer.address[0].pincode} />
        </div>
        <div className="col-md-6">
          <FormField label="Reward points" value={consumer.rewardPoints} />
        </div>
      </div>
      <div className="mt-3">
        <button
          type="button"
          onClick={() => onViewOrders(consumer)}
          className={styles.button.secondary}
        >
          View Orders →
        </button>
      </div>
    </div>
  </div>
);

export default ConsumerDetails;
