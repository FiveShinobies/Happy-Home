import React from 'react';
import { styles } from './styles';

const Header = ({ title, subtitle, icon, onBack }) => {
  return (
    <div style={styles.header}>
      {onBack ? (
        <button 
          style={styles.backButton}
          onClick={onBack}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          ← Back to Orders
        </button>
      ) : (
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h1 className="mb-2" style={{fontSize: '2.5rem', fontWeight: '700'}}>{title}</h1>
            <p className="mb-0" style={{fontSize: '1.1rem', opacity: '0.9'}}>
              {subtitle}
            </p>
          </div>
          <div style={{fontSize: '3rem'}}>{icon}</div>
        </div>
      )}
    </div>
  );
};

export default Header;