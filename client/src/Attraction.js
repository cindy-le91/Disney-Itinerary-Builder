import { useEffect } from 'react';

export default function Attraction(props) {
  const { attraction, openModal } = props;

  function handleClick() {
    openModal('test');
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
          <button onClick={handleClick} type="button" class="btn btn-primary">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
