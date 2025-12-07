const utils = {
  getStatusColor: (status) => {
    const statusColors = {
      'Delivered': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      'Completed': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      'Shipped': 'bg-blue-100 text-blue-700 border border-blue-200',
      'In Progress': 'bg-blue-100 text-blue-700 border border-blue-200',
      'Processing': 'bg-amber-100 text-amber-700 border border-amber-200',
      'Confirmed': 'bg-amber-100 text-amber-700 border border-amber-200',
      'Pending': 'bg-gray-100 text-gray-700 border border-gray-200'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-700';
  },
  getInitial: (name) => name.charAt(0).toUpperCase()
};

export default utils;