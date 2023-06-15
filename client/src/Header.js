import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from './Tabs.js';

export default function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    function checkForLoggedInUser() {
      if (!sessionStorage.getItem('token')) {
        // navigate('/sign-in');
      }
    }

    checkForLoggedInUser();
  }, []);

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '10vh',
          backgroundColor: '#C3CDE6',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          fontFamily: 'Sacramento',
          fontSize: '48px',
          marginBottom: '20px',
        }}>
        Disney Itinerary Builder
      </div>
      <Tabs />
    </div>
  );
}
