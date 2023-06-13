import { useEffect, useState } from 'react';
import Dining from './Dining.js';

export default function Dinings() {
  const restaurants = [
    'Alien Pizza Planet',
    'Bengal Barbecue',
    'Blue Bayou Restaurant',
    'Café Daisy',
    'Cafe Orleans',
    'Carnation Cafe',
    'Docking Bay 7 Food and Cargo',
    'Galactic Grill',
    'Gibson Girl Ice Cream Parlor',
    'The Golden Horseshoe',
    'Harbour Galley',
    'HUngry Bear Restaurant',
    'Jolly Holiday Bakery Cafe',
    "Kat Saka's Kettle",
    'Market House',
    "Maurice's Treats",
    'Milk Stand',
    "Oga's Cantina",
    'Plaza Inn',
    'Rancho del Zocalo Restaurante',
    'Red Rose Taverne',
    'River Belle Terrace',
    'Ronto Roasters',
    'Royal Street Veranda',
    'Stage Door Café',
    'Tiki Juice Bar',
    'Tomorrowland Skyline Terrace',
    'The Tropical Hideaway',
    'Troubadour Tavern',
  ];
  const [dinings, setDinings] = useState(restaurants);

  useEffect(() => {
    async function fetchDining() {
      const disneyLandResortId = '7340550b-c14d-4def-80bb-acdb51d49a66';

      const response = await fetch(
        `https://api.themeparks.wiki/v1/entity/${disneyLandResortId}/children`
      );
      const jsonData = await response.json();

      const dinings = jsonData['children'].filter((x) => {
        return x.entityType === 'RESTAURANT';
      });

      setDinings(dinings);
    }

    fetchDining();
  }, []);

  return (
    <div>
      {dinings.map((dining) => (
        <Dining dining={dining} />
      ))}
      {/* <Dining/> */}
    </div>
  );
}
