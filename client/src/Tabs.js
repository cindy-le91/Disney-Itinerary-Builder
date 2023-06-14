import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Tabs() {
  const navigate = useNavigate();

  return (
    <div style={{}}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px',
            borderBottom: '1px solid transparent',
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
          }}>
          <Link to="/trips">Trips</Link>
        </div>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px',
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
          }}>
          <Link to="/attractions">Attractions</Link>
        </div>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px',
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
          }}>
          <Link to="/dinings">Dining</Link>
        </div>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px',
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
          }}>
          <Link to="/map">Map</Link>
        </div>
      </div>
    </div>
  );
}
