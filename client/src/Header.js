import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    function checkForLoggedInUser() {
      if (!sessionStorage.getItem('token')) {
        navigate('/sign-in');
      }
    }

    checkForLoggedInUser();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '10vh',
        backgroundColor: '#C3CDE6',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        fontFamily: 'Sacramento',
        fontSize: '32px',
      }}>
      Disney Itinerary Builder
    </div>
  );
}
