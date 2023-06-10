import { useEffect, useState } from 'react';
import Tabs from './Tabs.js';
import Attraction from './Attraction.js';

export default function Attractions() {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    async function fetchAttractions() {
      const disneyLandResortId = 'bfc89fd6-314d-44b4-b89e-df1a89cf991e';

      const response = await fetch(
        'https://api.themeparks.wiki/v1/entity/bfc89fd6-314d-44b4-b89e-df1a89cf991e/children'
      );
      const jsonData = await response.json();

      const attractions = jsonData['children'].filter((x) => {
        return x.entityType === 'ATTRACTION';
      });

      setAttractions(attractions);
    }

    fetchAttractions();
  }, []);

  return (
    <div>
      <Tabs />
      {attractions.map((attraction) => (
        <Attraction key={attraction.id} attraction={attraction} />
      ))}
    </div>
  );
}
