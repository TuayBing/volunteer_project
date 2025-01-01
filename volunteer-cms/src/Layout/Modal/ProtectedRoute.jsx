import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const ProtectedRoute = ({ children }) => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  if (!user) {
    return (
      <>
        <AuthModal 
          isOpen={showModal} 
          onClose={handleClose}
        />
        <div className="filter blur-sm">
          {children}
        </div>
      </>
    );
  }

  return children;
};

export default ProtectedRoute;