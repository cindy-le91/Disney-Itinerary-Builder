import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PalaRound from './disneyicons/DLPicon_PalaRound.svg';
import DoleWhip from './disneyicons/DLPicon_DoleWhip.svg';

export default function Tabs() {
  const navigate = useNavigate();

  const handleLinkClick = (to) => {
    navigate(to);
  };

  const tabStyle = {
    flexGrow: 1,
    textAlign: 'center',
    border: '2px solid #C3CDE6',
    padding: '10px',
    fontSize: '20px',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: '10px',
    marginTop: '2px',
    cursor: 'pointer',
  };

  return (
    <div style={{}}>
      <div style={{ display: 'flex' }}>
        <div style={tabStyle} onClick={() => handleLinkClick('/trips')}>
          Trips
        </div>
        <div style={tabStyle} onClick={() => handleLinkClick('/attractions')}>
          <img
            src={PalaRound}
            style={{
              width: '40px',
              height: '40px',
              marginRight: '10px',
            }}
            alt="Pala Round"
          />
          Attractions
        </div>
        <div style={tabStyle} onClick={() => handleLinkClick('/dinings')}>
          <img
            alt="dole whip"
            src={DoleWhip}
            style={{
              width: '40px',
              height: '40px',
              marginRight: '10px',
            }}
          />
          Dining
        </div>
        <div style={tabStyle} onClick={() => handleLinkClick('/map')}>
          Map
        </div>
      </div>
    </div>
  );
}
