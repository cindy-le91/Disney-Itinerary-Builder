import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSignUp = async () => {
    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Error signing in');
      }

      // Handle successful sign-in, e.g., set token in local storage, update state, etc.
      navigate('/sign-in');

    } catch (error) {
      // Handle error during sign-in
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
        <button type="submit" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
