import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from './Tabs.js';

export default function Header({ authUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem('token');
      window.location.href = '/sign-in';

      // Perform any additional client-side cleanup or redirection if needed
    } catch (error) {
      // Handle error, e.g., show an error message
    }
  };

  const handleLogin = async () => {
    window.location.href = '/sign-in';
  };

  return (
    <div style={{ backgroundColor: '#C3CDE6' }}>
      <div>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <a
              class="navbar-brand"
              href="#"
              style={{
                backgroundColor: '#C3CDE6',
                fontFamily: 'Sacramento',
                fontSize: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {' '}
              Disney Itinerary Builder
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ backgroundColor: '#C3CDE6', fontFamily: 'Sacramento' }}>
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  {!authUser && (
                    <a
                      class="nav-link active"
                      aria-current="page"
                      href="#"
                      onClick={handleLogin}>
                      Login
                    </a>
                  )}
                  {authUser && (
                    <a
                      class="nav-link active"
                      aria-current="page"
                      href="#"
                      onClick={handleLogout}>
                      Logout
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {authUser && <Tabs />}
    </div>
  );
}
