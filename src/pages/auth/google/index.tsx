import React from 'react'
import { signIn } from 'next-auth/react';

const GoogleLogin = () => {
  React.useEffect(() => {
    signIn('google');
  }, []);

  return <p>Redirecting to Google login...</p>;
};

export default GoogleLogin;
