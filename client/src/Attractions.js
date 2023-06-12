import { useEffect, useState } from 'react';
import Attraction from './Attraction.js';

export default function Attractions() {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const locationMap = {
      matterhornbobsleds: 'FantasyLand',
    };
    async function fetchAttractions() {
      const disneyLandResortId = '7340550b-c14d-4def-80bb-acdb51d49a66';

      const response = await fetch(
        `https://api.themeparks.wiki/v1/entity/${disneyLandResortId}/children`
      );
      const jsonData = await response.json();

      const attractions = jsonData['children'].filter((x) => {
        return x.entityType === 'ATTRACTION';
      });

      setAttractions(attractions);
    }

    fetchAttractions();
  }, []);

  function findLocation() {
    console.log('test');
  }

  return (
    <div>
      {attractions.map((attraction) => (
        <Attraction
          key={attraction.id}
          attraction={attraction}
          location={findLocation()}
        />
      ))}
    </div>
  );
}
