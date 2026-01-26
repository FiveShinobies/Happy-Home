import React from 'react';
import { styles } from './styles';
import { getStatusBadge, getServiceIcon } from './utils';

const ViewOrderDetails = ({ order, onBack, onEdit }) => {
  return (
    <div style={styles.detailsCard}>
      <div className="text-center mb-4">
        <div style={styles.serviceIcon}>{getServiceIcon(order.service)}</div>
        <h2 style={{fontWeight: '700', color: '#1a1a2e'}}>{order.service}</h2>
        <span 
          className={`badge bg-${getStatusBadge(order.status)} mt-2`}
          style={styles.statusBadge}
        >
          {order.status}
        </span>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 mb-3">
          <div style={styles.infoRow}>
            <h6 style={{color: '#6c757d', marginBottom: '10px'}}>Order ID</h6>
            <h5 style={{fontWeight: '700', color: '#1a1a2e'}}>#{order.id}</h5>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div style={styles.infoRow}>
            <h6 style={{color: '#6c757d', marginBottom: '10px'}}>Price</h6>
            <h5 style={{fontWeight: '700', color: '#0d6efd'}}>₹{order.price}</h5>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div style={styles.infoRow}>
            <h6 style={{color: '#6c757d', marginBottom: '10px'}}>📅 Date</h6>
            <h5 style={{fontWeight: '700', color: '#1a1a2e'}}>{order.date}</h5>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div style={styles.infoRow}>
            <h6 style={{color: '#6c757d', marginBottom: '10px'}}>🕐 Time</h6>
            <h5 style={{fontWeight: '700', color: '#1a1a2e'}}>{order.time}</h5>
          </div>
        </div>
        <div className="col-12 mb-3">
          <div style={styles.infoRow}>
            <h6 style={{color: '#6c757d', marginBottom: '10px'}}>📍 Address</h6>
            <h5 style={{fontWeight: '700', color: '#1a1a2e'}}>{order.address}</h5>
          </div>
        </div>
        <div className="col-12 mb-3">
          <div style={styles.infoRow}>
            <h6 style={{color: '#6c757d', marginBottom: '10px'}}>👨‍🔧 Technician</h6>
            <h5 style={{fontWeight: '700', color: '#1a1a2e'}}>{order.technician}</h5>
          </div>
        </div>
        <div className="col-12 mb-3">
          <div style={styles.infoRow}>
            <h6 style={{color: '#6c757d', marginBottom: '10px'}}>📝 Description</h6>
            <p style={{marginBottom: '0', color: '#1a1a2e'}}>{order.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 d-flex gap-3 justify-content-center">
        <button 
          style={styles.buttonSecondary}
          onClick={() => onEdit(order)}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ✏️ Edit Order
        </button>
        <button 
          style={styles.button}
          onClick={onBack}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default ViewOrderDetails;