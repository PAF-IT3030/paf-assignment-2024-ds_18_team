import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleOAuth } from '@react-oauth/google';

const GoogleCallback = () => {
  const { handleCallback } = useGoogleOAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleCallback().then(() => {
      // Redirect to the home page after successful Google OAuth2 callback
      navigate('/home');
    });
  }, [handleCallback, navigate]);

  return (
    <div>
      <p>Processing Google OAuth2 callback...</p>
    </div>
  );
};

export default GoogleCallback;
