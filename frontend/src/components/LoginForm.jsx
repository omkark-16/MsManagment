import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // --- Client-side validation for demonstration ---
    // In a real app, you'd send these credentials to your backend
    // and the backend would authenticate and return a token/success status.
    if (username === 'Omkar1652' && password === 'ms2025') {
      login(); // Update auth context
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login to Dashboard</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button">Login</button>
      <p className="hint-text">Hint: user / password</p>
    </form>
  );
}

export default LoginForm;