import { useEffect } from 'react';
import Tabs from './Tabs.js';

export default function Dining(props) {
  const { dining } = props;

  return (
    <div class="row">
      <div class="col-4">
        <i class="bi bi-emoji-smile"></i>
      </div>
      <div class="col-8">{dining.name}</div>
    </div>
  );
}
