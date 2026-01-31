import React from 'react';
import styles from '../styles/styles';
import utils from '../utils/utils';

const VendorOrderDetails = ({ orderDetail, onBack, consumers, consumer }) => {
  // Add null check to prevent errors if orderDetail is undefined
  if (!orderDetail) {
    return (
      <div className={styles.card}>
        <div className="card-body text-center">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  // Get consumer name from consumers array or orderDetail
  const name = consumers?.find(c => c.consumerId === orderDetail.consumerId)?.name ||
    orderDetail.consumerName ||
    'Unknown Consumer';

  return (
    <div className={styles.card}>
      <div className={`${styles.gradientBlue} px-4 py-3 d-flex justify-content-between align-items-center`}>
        <h2 className="h5 mb-0">Vendor Order Details</h2>
        <button type="button" onClick={onBack} className={styles.button.light}>
          ← Back
        </button>
      </div>
      <div className="card-body">
        <div className="mb-4 p-3 bg-light rounded">
          <h3 className="h6 fw-bold mb-3">Order Information</h3>
          <p className="mb-1">
            <strong>Order Number:</strong> {orderDetail.orderId}
          </p>
          <p className="mb-1">
            <strong>Customer:</strong> {name}
          </p>
          <p className="mb-1">
            <strong>Order Date:</strong> {new Date(orderDetail.orderDateTime).toLocaleString()}
          </p>
          <p className="mb-1">
            <strong>Time Slot:</strong> {new Date(orderDetail.timeSlot).toLocaleString()}
          </p>
          <p className="mb-1">
            <strong>Status:</strong>{' '}
            <span className={`badge ${orderDetail.status === 'COMPLETED' ? 'bg-success' :
              orderDetail.status === 'INPROGRESS' ? 'bg-warning' :
                orderDetail.status === 'CANCELLED' ? 'bg-danger' :
                  'bg-secondary'
              }`}>
              {orderDetail.status}
            </span>
          </p>
          <p className="mb-0">
            <strong>Payment Status:</strong>{' '}
            <span className={`badge ${orderDetail.paymentStatus === 'SUCCESS' ? 'bg-success' :
              orderDetail.paymentStatus === 'FAILED' ? 'bg-danger' :
                'bg-warning'
              }`}>
              {orderDetail.paymentStatus}
            </span>
          </p>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="p-3 bg-light rounded">
              <h3 className="h6 fw-bold mb-3">Service Details</h3>
              <p className="mb-1">
                <strong>Service:</strong> {orderDetail.serviceName}
              </p>
              <p className="mb-1">
                <strong>Description:</strong> {orderDetail.serviceShortDesc}
              </p>
              <p className="mb-0">
                <strong>Priority:</strong> {orderDetail.priority}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded">
              <h3 className="h6 fw-bold mb-3">Customer Address</h3>
              <p className="mb-1">
                <strong>Home No:</strong> {orderDetail.homeNo}
              </p>
              <p className="mb-1">
                <strong>Town:</strong> {orderDetail.town}
              </p>
              <p className="mb-1">
                <strong>City:</strong> {orderDetail.city}, {orderDetail.state}
              </p>
              <p className="mb-0">
                <strong>Pincode:</strong> {orderDetail.pincode}
              </p>
            </div>
          </div>
        </div>

        {orderDetail.rating && (
          <div className="mb-4 p-3 bg-light rounded">
            <h3 className="h6 fw-bold mb-3">Customer Review</h3>
            <p className="mb-1">
              <strong>Rating:</strong> {orderDetail.rating} / 5 ⭐
            </p>
            <p className="mb-0">
              <strong>Review:</strong> {orderDetail.reviewDescription}
            </p>
          </div>
        )}

        <h3 className="h6 fw-bold mb-3">Service Item</h3>
        <div className="table-responsive mb-4">
          <table className="table table-hover align-middle">
            <thead className={styles.tableHeader}>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th className="text-end">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-medium">{orderDetail.serviceName}</td>
                <td>{orderDetail.serviceShortDesc}</td>
                <td className="text-end fw-semibold">₹{orderDetail.servicePrice}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end">
          <div className="border rounded p-3" style={{ minWidth: 260 }}>
            <div className="d-flex justify-content-between mb-1">
              <span>Service Price:</span>
              <span>₹{orderDetail.servicePrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Tax (18%):</span>
              <span>₹{(orderDetail.servicePrice * 0.18).toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total Amount:</span>
              <span className="text-primary">₹{orderDetail.orderPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOrderDetails;