import React from 'react';
import styles from '../styles/styles';

const FormField = ({ label, value }) => (
  <div className="mb-3">
    <label className="form-label fw-semibold small">{label}</label>
    <input type="text" value={value} readOnly className={styles.input} />
  </div>
);

export default FormField;
