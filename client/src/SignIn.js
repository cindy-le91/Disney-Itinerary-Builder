import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();


  const handleSignIn = async () => {
    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Error signing in');
      }

      const { token, user } = await response.json();
      // Handle successful sign-in, e.g., set token in local storage, update state, etc.
      sessionStorage.setItem('token', token);
      navigate('/');

      console.log('Sign-in successful:', token, user);
    } catch (error) {
      // Handle error during sign-in
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
