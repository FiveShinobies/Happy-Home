import React, { useState } from 'react';
import { styles } from './styles';

const EditOrderDetails = ({ order, onSave, onCancel }) => {
  const [editForm, setEditForm] = useState({ ...order });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSave = () => {
    onSave(editForm);
  };

  return (
    <div style={styles.detailsCard}>
      <div className="text-center mb-4">
        <div style={styles.serviceIcon}>✏️</div>
        <h2 style={{fontWeight: '700', color: '#1a1a2e'}}>Edit Order #{editForm.id}</h2>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <label className="form-label" style={{fontWeight: '600', color: '#1a1a2e'}}>
            Service Type
          </label>
          <select 
            className="form-select form-select-lg"
            name="service"
            value={editForm.service}
            onChange={handleInputChange}
            style={{borderRadius: '10px', border: '2px solid #e0e0e0'}}
          >
            <option>Pest Control</option>
            <option>AC Servicing</option>
            <option>Deep Cleaning</option>
            <option>Plumbing</option>
            <option>Electrical</option>
          </select>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label" style={{fontWeight: '600', color: '#1a1a2e'}}>
            Status
          </label>
          <select 
            className="form-select form-select-lg"
            name="status"
            value={editForm.status}
            onChange={handleInputChange}
            style={{borderRadius: '10px', border: '2px solid #e0e0e0'}}
          >
            <option>Scheduled</option>
            <option>Completed</option>
            <option>Cancelled</option>
            <option>In Progress</option>
          </select>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label" style={{fontWeight: '600', color: '#1a1a2e'}}>
            📅 Date
          </label>
          <input 
            type="date"
            className="form-control form-control-lg"
            name="date"
            value={editForm.date}
            onChange={handleInputChange}
            style={{borderRadius: '10px', border: '2px solid #e0e0e0'}}
          />
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label" style={{fontWeight: '600', color: '#1a1a2e'}}>
            🕐 Time
          </label>
          <input 
            type="text"
            className="form-control form-control-lg"
            name="time"
            value={editForm.time}
            onChange={handleInputChange}
            placeholder="e.g., 10:00 AM"
            style={{borderRadius: '10px', border: '2px solid #e0e0e0'}}
          />
        </div>

        <div className="col-12 mb-4">
          <label className="form-label" style={{fontWeight: '600', color: '#1a1a2e'}}>
            📍 Address
          </label>
          <textarea 
            className="form-control form-control-lg"
            name="address"
            value={editForm.address}
            onChange={handleInputChange}
            rows="3"
            style={{borderRadius: '10px', border: '2px solid #e0e0e0'}}
          />
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label" style={{fontWeight: '600', color: '#1a1a2e'}}>
            👨‍🔧 Technician
          </label>
          <input 
            type="text"
            className="form-control form-control-lg"
            name="technician"
            value={editForm.technician}
            onChange={handleInputChange}
            style={{borderRadius: '10px', border: '2px solid #e0e0e0'}}
          />
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label" style={{fontWeight: '600', color: '#1a1a2e'}}>
            💰 Price (₹)
          </label>
          <input 
            type="number"
            className="form-control form-control-lg"
            name="price"
            value={editForm.price}
            onChange={handleInputChange}
            style={{borderRadius: '10px', border: '2px solid #e0e0e0'}}
          />
        </div>

        <div className="col-12 mb-4">
          <label className="form-label" style={{fontWeight: '600', color: '#1a1a2e'}}>
            📝 Description
          </label>
          <textarea 
            className="form-control form-control-lg"
            name="description"
            value={editForm.description}
            onChange={handleInputChange}
            rows="3"
            style={{borderRadius: '10px', border: '2px solid #e0e0e0'}}
          />
        </div>
      </div>

      <div className="mt-4 d-flex gap-3 justify-content-center">
        <button 
          style={styles.button}
          onClick={handleSave}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          💾 Save Changes
        </button>
        <button 
          style={{...styles.buttonSecondary, background: '#6c757d'}}
          onClick={onCancel}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditOrderDetails;