import { useEffect, useState } from 'react';
import Tabs from './Tabs.js';
import Dining from './Dining.js';

export default function Dinings() {
  const [dinings, setDinings] = useState([]);

  useEffect(() => {
    async function fetchDining() {
      const disneyLandResortId = 'bfc89fd6-314d-44b4-b89e-df1a89cf991e';

      const response = await fetch(
        'https://api.themeparks.wiki/v1/entity/bfc89fd6-314d-44b4-b89e-df1a89cf991e/children'
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
      <Tabs />
      {dinings.map((dining) => (
        <Dining dining={dining} />
      ))}
      {/* <Dining/> */}
    </div>
  );
}
