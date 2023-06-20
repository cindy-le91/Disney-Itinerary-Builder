import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PalaRound from './disneyicons/DLPicon_PalaRound.svg';
import DoleWhip from './disneyicons/DLPicon_DoleWhip.svg';

export default function Tabs() {
  return (
    <div style={{}}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '2px solid #C3CDE6',
            padding: '10px',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '10px',
            marginTop: '2px',
          }}>
          <Link to="/trips" style={{ textDecoration: 'none', color: 'black' }}>
            Trips
          </Link>
        </div>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '2px solid #C3CDE6',
            padding: '10px',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '10px',
            marginTop: '2px',
          }}>
          <img
            src={PalaRound}
            style={{
              width: '40px',
              height: '40px',
              marginRight: '10px',
            }}></img>
          <Link
            to="/attractions"
            style={{ textDecoration: 'none', color: 'black' }}>
            Attractions
          </Link>
        </div>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '2px solid #C3CDE6',
            padding: '10px',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '10px',
            marginTop: '2px',
          }}>
          <img
            src={DoleWhip}
            style={{
              width: '40px',
              height: '40px',
              marginRight: '10px',
            }}></img>
          <Link
            to="/dinings"
            style={{ textDecoration: 'none', color: 'black' }}>
            Dining
          </Link>
        </div>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '2px solid #C3CDE6',
            padding: '10px',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '10px',
            marginTop: '2px',
          }}>
          <Link to="/map" style={{ textDecoration: 'none', color: 'black' }}>
            Map
          </Link>
        </div>
      </div>
    </div>
  );
}
