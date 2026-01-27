import React from 'react';
import { styles } from './styles';
import { getStatusBadge, getServiceIcon } from './utils';

const OrdersList = ({ orders, onViewOrder, onEditOrder }) => {
  return (
    <div style={styles.orderListContainer}>
      <h4 className="mb-4" style={{fontWeight: '700', color: '#1a1a2e'}}>
        All Orders ({orders.length})
      </h4>
      <div className="row">
        {orders.map(order => (
          <div key={order.id} className="col-md-6 col-lg-4 mb-4">
            <div 
              className="card h-100"
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}
            >
              <div 
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '20px',
                  textAlign: 'center'
                }}
              >
                <div style={{fontSize: '48px'}}>{getServiceIcon(order.service)}</div>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3" style={{fontWeight: '700', color: '#1a1a2e'}}>
                  {order.service}
                </h5>
                <p className="mb-2" style={{color: '#6c757d'}}>
                  📅 {order.date}
                </p>
                <p className="mb-2" style={{color: '#6c757d'}}>
                  🕐 {order.time}
                </p>
                <div className="mb-3">
                  <span 
                    className={`badge bg-${getStatusBadge(order.status)}`}
                    style={styles.statusBadge}
                  >
                    {order.status}
                  </span>
                </div>
                <h4 className="mb-3" style={{color: '#0d6efd', fontWeight: '700'}}>
                  ₹{order.price}
                </h4>
                <div className="d-grid gap-2">
                  <button 
                    className="btn"
                    style={styles.button}
                    onClick={() => onViewOrder(order)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn"
                    style={styles.buttonSecondary}
                    onClick={() => onEditOrder(order)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Edit Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;