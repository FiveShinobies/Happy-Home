import React from 'react';
import styles from '../styles/styles';
import utils from '../utils/utils';

const ConsumerOrderDetails = ({ orderDetail, onBack }) => (
  <div className={styles.card}>
    <div className={`${styles.gradientBlue} px-4 py-3 d-flex justify-content-between align-items-center`}>
      <h2 className="h5 mb-0">Consumer Order Details</h2>
      <button type="button" onClick={onBack} className={styles.button.light}>
        ← Back
      </button>
    </div>
    <div className="card-body">
      <div className="mb-4 p-3 bg-light rounded">
        <h3 className="h6 fw-bold mb-3">Order Information</h3>
        <p className="mb-1">
          <strong>Order Number:</strong> {orderDetail.orderNumber}
        </p>
        <p className="mb-1">
          <strong>Customer:</strong> {orderDetail.customer}
        </p>
        <p className="mb-1">
          <strong>Date:</strong> {orderDetail.date}
        </p>
        <p className="mb-0">
          <strong>Status:</strong>{' '}
          <span className="badge bg-secondary">{orderDetail.status}</span>
        </p>
      </div>

      <h3 className="h6 fw-bold mb-3">Order Items</h3>
      <div className="table-responsive mb-4">
        <table className="table table-hover align-middle">
          <thead className={styles.tableHeader}>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th className="text-end">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.items.map((item, index) => (
              <tr key={index}>
                <td className="fw-medium">{item.name}</td>
                <td>{item.quantity}</td>
                <td className="text-end fw-semibold">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end">
        <div className="border rounded p-3" style={{ minWidth: 260 }}>
          <div className="d-flex justify-content-between mb-1">
            <span>Subtotal:</span>
            <span>{orderDetail.subtotal}</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <span>Shipping:</span>
            <span>{orderDetail.shipping}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Tax:</span>
            <span>{orderDetail.tax}</span>
          </div>
          <hr className="my-2" />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span className="text-primary">{orderDetail.total}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ConsumerOrderDetails;
