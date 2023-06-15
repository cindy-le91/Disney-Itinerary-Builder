import { useEffect, useState } from 'react';
import Trip from './Trip.js';

export default function Trips({ authUser }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function fetchTrips() {
      const response = await fetch(`/api/trip?userId=${authUser.userId}`);

      const trips = await response.json();
      setTrips(trips);
    }

    fetchTrips();
  });
  return trips.map((trip) => <Trip trip={trip} />);
}
