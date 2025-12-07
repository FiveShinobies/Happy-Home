import React from 'react';
import styles from '../styles/styles';
import utils from '../utils/utils';

const ConsumerOrders = ({ consumer, orders, onBack, onViewOrderDetails }) => (
  <div className={styles.card}>
    <div className={`${styles.gradientBlue} px-4 py-3 d-flex justify-content-between align-items-center`}>
      <div>
        <h2 className="h5 mb-0">Consumer Orders</h2>
        <small className="text-light">{consumer.name}</small>
      </div>
      <button type="button" onClick={onBack} className={styles.button.light}>
        ← Back
      </button>
    </div>
    <div className="card-body">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className={styles.tableHeader}>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className={styles.tableRow}>
                <td className="fw-semibold">{order.orderNumber}</td>
                <td>{order.date}</td>
                <td>{order.items} items</td>
                <td className="fw-bold text-primary">{order.total}</td>
                <td>
                  <span className="badge bg-secondary">
                    {/* you can map utils.getStatusColor to Bootstrap badge variants if you want */}
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => onViewOrderDetails(order)}
                    className={styles.button.primary}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default ConsumerOrders;
