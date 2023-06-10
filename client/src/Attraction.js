import { useEffect } from 'react';
import Tabs from './Tabs.js';

export default function Attraction(props) {
  const { attraction } = props;

  console.log(attraction);
  return (
    <div class="row">
      <div class="col-4">
        <i class="bi bi-emoji-smile"></i>
      </div>
      <div class="col-8">{attraction.name}</div>
    </div>
  );
}
