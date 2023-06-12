import { useEffect } from 'react';
import Tabs from './Tabs.js';

export default function Dining(props) {
  const { dining } = props;

  return (
    <div className="row">
      <div className="col-4">
        <i className="bi bi-emoji-smile"></i>
      </div>
      <div className="col-8">{dining.name}</div>
    </div>
  );
}
