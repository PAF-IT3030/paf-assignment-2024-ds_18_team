
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
        // Authentication successful, redirect the user to the home page or any other page
        navigate('/home');
      } else {
        // Authentication failed, set error message
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Google OAuth2 response handler
  const responseGoogle = (response) => {
    console.log(response);
    // Handle Google OAuth2 response
    // For example, you can send the Google OAuth2 token to your backend for verification
  };

  const handleSignup = () => {
    // Navigate to the signup page
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-content">
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
        <div className="signup-link">
          <button onClick={handleSignup} className="signup-button">Sign Up</button>
        </div>
        <div className="google-login">
          <GoogleLogin
            clientId="255847001730-p284moskphraui764jj1nh97asndp6ik.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
