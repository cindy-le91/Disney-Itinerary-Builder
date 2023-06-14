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
          <button onClick={handleClick} type="button" class="btn btn-primary">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
