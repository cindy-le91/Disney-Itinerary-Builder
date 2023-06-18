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
  }, []);

  const onHandleTripDelete = (tripToDelete) => {
    const updatedTrips = trips.filter(
      (trip) => trip.eventId !== tripToDelete.eventId
    );
    setTrips(updatedTrips);
  };

  const onHandleTripUpdate = (tripToUpdate) => {
    tripToUpdate = tripToUpdate.updatedEvent;
    const updatedTrips = trips.map((trip) =>
      trip.eventId === tripToUpdate.eventId ? tripToUpdate : trip
    );
    setTrips(updatedTrips);
  };

  return trips.map((trip) => (
    <Trip
      onTripDelete={onHandleTripDelete}
      onTripUpdate={onHandleTripUpdate}
      trip={trip}
    />
  ));
}
