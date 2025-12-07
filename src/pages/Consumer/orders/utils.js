export const getStatusBadge = (status) => {
  const colors = {
    'Scheduled': 'primary',
    'Completed': 'success',
    'Cancelled': 'danger',
    'In Progress': 'warning'
  };
  return colors[status] || 'secondary';
};

export const getServiceIcon = (service) => {
  const icons = {
    'Pest Control': '🐛',
    'AC Servicing': '❄️',
    'Deep Cleaning': '🧹',
    'Plumbing': '🔧',
    'Electrical': '⚡'
  };
  return icons[service] || '🏠';
};