import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Forgot from './component/Forgot/Forgot';
import Activity from './component/Activity/Activity';
import Profile from './component/Profile/Profile';
import Contact from './component/Contact/Contact';
import ProtectedRoute from './Layout/Modal/ProtectedRoute';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/activity" element={<Activity />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default Router;