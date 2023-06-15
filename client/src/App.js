import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Header from './Header.js';
import Attractions from './Attractions.js';
import Dinings from './Dinings.js';
import Trips from './Trips.js';

import './App.css';

const App = () => {
  const [authUser, setAuthUser] = useState(null); // State to store the signed-in user

  useEffect(() => {
    function checkForLoggedInUser() {
      if (!sessionStorage.getItem('token')) {
      }
    }

    checkForLoggedInUser();
  }, []);

  const handleLogin = (user) => {
    setAuthUser(user);
  };

  const containerStyle = {
    width: '100%',
  };

  return (
    <Router>
      <Header />
      <div className="container" style={containerStyle}>
        <Routes>
          <Route
            path="/attractions"
            element={<Attractions authUser={authUser} />}
          />
          <Route path="/trips" element={<Trips authUser={authUser} />} />
          <Route path="/dinings" element={<Dinings authUser={authUser} />} />
          <Route path="/sign-in" element={<SignIn onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
