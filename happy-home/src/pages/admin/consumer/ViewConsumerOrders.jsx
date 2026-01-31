import React from 'react';
import styles from '../styles/styles';
import utils from '../utils/utils';

const ViewConsumerOrders = ({ consumers, onViewDetails, onViewOrders }) => (
  <div className={styles.card}>
    <div className={`${styles.gradientBlue} px-4 py-3`}>
      <h2 className="h5 mb-0">All Consumers</h2>
    </div>
    <div className="card-body">
      {consumers.map((consumer) => (
        <div key={consumer.consumerId} className={styles.listItem}>
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <div
                className={styles.avatar}
                style={{ width: 48, height: 48 }}
              >
                {utils.getInitial(consumer.name)}
              </div>
              <div>
                <h3 className="h6 fw-bold mb-1">{consumer.name}</h3>
                <p className="mb-0 text-muted small">
                  ✉️ {consumer.email} &nbsp; | &nbsp; 📍 {consumer.city}
                </p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => onViewDetails(consumer)}
                className={styles.button.primary}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => onViewOrders(consumer)}
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

export default ViewConsumerOrders;
