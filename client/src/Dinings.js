import { useEffect, useState } from 'react';
import Dining from './Dining.js';

export default function Dinings() {
  const [dinings, setDinings] = useState([]);

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
