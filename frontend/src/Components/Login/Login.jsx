import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import './Login.css'; // Import custom CSS for styling

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSuccess = async (response) => {
    // Handle successful Google login
    // You can perform further actions here, such as sending the token to the server for verification
    console.log('Google login successful', response);
    navigate('/home'); // Redirect to home page after successful login
  };

  const handleGoogleFailure = (error) => {
    // Handle failed Google login
    console.error('Google login failed', error);
    setError('Failed to login with Google');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const user = await response.json();
        // Redirect to home page or perform any other action on successful login
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <GoogleLogin
        clientId="your-google-client-id.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;
