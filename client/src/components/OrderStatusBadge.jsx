import React from 'react';

const OrderStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;
