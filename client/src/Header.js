import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from './Tabs.js';

export default function Header({ authUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem('token');
      window.location.href = '/sign-in';
    } catch (error) {}
  };

  const handleLogin = async () => {
    window.location.href = '/sign-in';
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#C3CDE6',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <p
              class="navbar-brand"
              style={{
                backgroundColor: '#C3CDE6',
                fontFamily: 'Sacramento',
                fontSize: '40px',
              }}>
              {' '}
              Disney Itinerary Builder
            </p>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ justifyContent: 'right' }}>
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  {!authUser && (
                    <button
                      class="nav-link active"
                      aria-current="page"
                      href="#"
                      onClick={handleLogin}>
                      Login
                    </button>
                  )}
                  {authUser && (
                    <button
                      class="nav-link active"
                      aria-current="page"
                      href="#"
                      onClick={handleLogout}
                      style={{ float: 'right' }}>
                      Logout
                    </button>
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
