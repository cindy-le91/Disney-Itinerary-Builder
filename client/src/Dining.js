import { useEffect } from 'react';
import Tabs from './Tabs.js';

export default function Dining(props) {
  const { dining, openModal, onSelectAttraction } = props;

  function handleClick() {
    openModal();
    onSelectAttraction(dining);
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
          {dining.name}
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
