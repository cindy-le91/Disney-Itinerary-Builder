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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <h2>Register</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Username"
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <input
          placeholder="Password"
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
      </form>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleSignUp}
        style={{ backgroundColor: '#C3CDE6', color: 'white', border: 'none' }}>
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
