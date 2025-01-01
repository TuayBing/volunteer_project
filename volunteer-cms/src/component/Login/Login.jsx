import React from 'react';
import LoginForm from './LoginForm';
import Loginimage from './Loginimage';

const Login = () => {
  return (
    <div className="flex min-h-screen w-full">
      <LoginForm />
      <Loginimage />
    </div>
  );
};

export default Login;