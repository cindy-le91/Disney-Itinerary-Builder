import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Tabs from './Tabs.js';
import Header from './Header.js';
import Attractions from './Attractions.js';
import Dinings from './Dinings.js';

import './App.css';

const App = () => {
  const [serverData, setServerData] = useState('');

  useEffect(() => {
    async function readServerData() {
      const resp = await fetch('/api/hello');
      const data = await resp.json();

      console.log('Data from server:', data);

      setServerData(data.message);
    }

    function checkForLoggedInUser() {
      if (!sessionStorage.getItem('token')) {
      }
    }

    readServerData();
    checkForLoggedInUser();
  }, []);

  const containerStyle = {
    width: '100%',
  };

  return (
    <Router>
      <Header />
      <div className="container" style={containerStyle}>
        <Routes>
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/dinings" element={<Dinings />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
