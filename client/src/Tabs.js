import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Tabs() {
  return (
    <div style={{}}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '10px',
            color: 'black',
          }}>
          <Link to="/trips" style={{ textDecoration: 'none', color: 'black' }}>
            Trips
          </Link>
        </div>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '10px',
          }}>
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
            border: '1px solid #ccc',
            padding: '10px',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '10px',
          }}>
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
            border: '1px solid #ccc',
            padding: '10px',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '10px',
          }}>
          <Link to="/map" style={{ textDecoration: 'none', color: 'black' }}>
            Map
          </Link>
        </div>
      </div>
    </div>
  );
}
