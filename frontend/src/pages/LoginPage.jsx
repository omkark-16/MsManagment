import React from 'react';
import LoginForm from '../components/LoginForm';
import '../App.css'; // Make sure the login form styling is available

function LoginPage() {
  return (
    <div className="login-page-container">
      <LoginForm />
    </div>
  );
}

export default LoginPage;