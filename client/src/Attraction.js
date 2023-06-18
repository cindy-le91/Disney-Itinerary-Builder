import { useEffect } from 'react';

export default function Attraction(props) {
  const { attraction, openModal, onSelectAttraction } = props;

  function handleClick() {
    openModal();
    onSelectAttraction(attraction);
  }

  return (
    <div>
      <div
        className="row border-bottom"
        style={{
          height: '100px',
        }}>
        <div
          className="col-2"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <i className="bi bi-emoji-smile"></i>
        </div>
        <div
          className="col-8"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontSize: '16px',
          }}>
          {attraction.name}
        </div>
        <div
          className="col-2"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <button
            onClick={handleClick}
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: '#C3CDE6',
              color: 'white',
              borderRadius: '50%',
              border: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <i className="bi bi-plus" style={{ fontSize: '24px' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
