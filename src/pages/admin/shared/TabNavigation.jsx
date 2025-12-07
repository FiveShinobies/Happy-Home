import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => (
  <div className="bg-white rounded-3 shadow-sm p-2 mb-4 d-inline-flex gap-2">
    <button
      type="button"
      onClick={() => onTabChange('consumers')}
      className={
        activeTab === 'consumers'
          ? 'btn btn-primary'
          : 'btn btn-outline-secondary'
      }
    >
      👥 Consumers
    </button>
    <button
      type="button"
      onClick={() => onTabChange('vendors')}
      className={
        activeTab === 'vendors'
          ? 'btn btn-primary'
          : 'btn btn-outline-secondary'
      }
    >
      🏢 Vendors
    </button>
  </div>
);

export default TabNavigation;
