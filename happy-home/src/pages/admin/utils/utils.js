const utils = {
  getStatusColor: (status) => {
    const statusColors = {
      'CANCELLED': 'bg-danger',
      'COMPLETED': 'bg-success',
      'REFUNDED': 'bg-secondary',
      'INPROGRESS': 'bg-warning text-dark',
      'Processing': 'bg-warning text-dark',
      'ASSIGNED': 'bg-info',
      'UNASSIGNED': 'bg-secondary'
    };
    return statusColors[status] || 'bg-secondary';
  },
  getInitial: (name) => name.charAt(0).toUpperCase()
};

export default utils;