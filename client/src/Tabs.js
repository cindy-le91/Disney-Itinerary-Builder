import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Tabs() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px',
            borderBottom: '1px solid transparent',
          }}>
          <Link to="/trips">Trips</Link>
        </div>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px',
          }}>
          <Link to="/attractions">Attractions</Link>
        </div>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px',
          }}>
          <Link to="/dinings">Dining</Link>
        </div>
        <div
          style={{
            flexGrow: 1,
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '10px',
          }}>
          <Link to="/map">Map</Link>
        </div>
      </div>

      {/* <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul> */}
    </div>
  );
}
