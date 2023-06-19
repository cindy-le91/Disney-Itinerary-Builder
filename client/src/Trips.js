import { useEffect, useState } from 'react';
import Trip from './Trip.js';
import DeleteModal from './DeleteModal.js'; // Import your modal component

export default function Trips({ authUser }) {
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false); // State variable for modal visibility

  useEffect(() => {
    async function fetchTrips() {
      if (!authUser) {
        return;
      }
      const response = await fetch(`/api/trip?userId=${authUser.userId}`);
      const trips = await response.json();
      setTrips(trips);
    }

    fetchTrips();
  }, []);

  const deleteTrip = (tripToDelete) => {
    fetch(`/api/trip/${tripToDelete.eventId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedTrips = trips.filter(
            (trip) => trip.eventId !== tripToDelete.eventId
          );
          setTrips(updatedTrips);
          console.log('Trip removed successfully');
        } else {
          console.log('Failed to remove trip');
        }
      })
      .catch((error) => {
        console.log('An error occurred while removing the trip:', error);
      });
  };

  const onHandleTripUpdate = (tripToUpdate) => {
    tripToUpdate = tripToUpdate.updatedEvent;
    const updatedTrips = trips.map((trip) =>
      trip.eventId === tripToUpdate.eventId ? tripToUpdate : trip
    );
    setTrips(updatedTrips);
  };

  const onHandleTripDelete = () => {
    console.log('show modal');
    setShowModal(true); // Show the modal when the delete action is triggered
  };

  const closeModal = () => {
    setShowModal(false); // Hide the modal when it is closed
  };

  return (
    <>
      {/* Render the modal component when showModal is true */}
      {showModal && <DeleteModal visible={showModal} closeModal={closeModal} />}

      {trips.map((trip) => (
        <Trip
          onTripDelete={onHandleTripDelete}
          onTripUpdate={onHandleTripUpdate}
          trip={trip}
        />
      ))}
    </>
  );
}
