import { useEffect, useState } from 'react';
import Dining from './Dining.js';
import TimePicker from './TimePicker.js';

export default function Dinings({ authUser }) {
  const restaurants = [
    { name: 'Alien Pizza Planet' },
    { name: 'Bengal Barbecue' },
    { name: 'Blue Bayou Restaurant' },
    { name: 'Café Daisy' },
    { name: 'Cafe Orleans' },
    { name: 'Carnation Cafe' },
    { name: 'Docking Bay 7 Food and Cargo' },
    { name: 'Galactic Grill' },
    { name: 'Gibson Girl Ice Cream Parlor' },
    { name: 'The Golden Horseshoe' },
    { name: 'Harbour Galley' },
    { name: 'Hungry Bear Restaurant' },
    { name: 'Jolly Holiday Bakery Cafe' },
    { name: "Kat Saka's Kettle" },
    { name: 'Market House' },
    { name: "Maurice's Treats" },
    { name: 'Milk Stand' },
    { name: "Oga's Cantina" },
    { name: 'Plaza Inn' },
    { name: 'Rancho del Zocalo Restaurante' },
    { name: 'Red Rose Taverne' },
    { name: 'River Belle Terrace' },
    { name: 'Ronto Roasters' },
    { name: 'Royal Street Veranda' },
    { name: 'Stage Door Café' },
    { name: 'Tiki Juice Bar' },
    { name: 'Tomorrowland Skyline Terrace' },
    { name: 'The Tropical Hideaway' },
    { name: 'Troubadour Tavern' },
  ];

  const [dinings, setDinings] = useState(restaurants);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedAttraction, setSelectedAttraction] = useState(null);

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

      setDinings([...dinings, ...restaurants]);
    }

    fetchDining();
  }, []);

  const openModal = (data) => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  };

  const handleSelectedTime = (selectedTime) => {
    setSelectedTime(selectedTime);
  };

  const handleSelectedAttraction = (attraction) => {
    setSelectedAttraction(attraction);
  };

  const addToTrip = async () => {
    const token = sessionStorage.getItem('token'); // Retrieve the bearer token from session storage
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';

    try {
      const response = await fetch('/api/trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // Add any additional headers if required
        },
        body: JSON.stringify({
          userId: authUser.userId,
          eventName: selectedAttraction.name,
          startTime: selectedTime,
        }), // Convert data to JSON format
      });

      if (response.ok) {
        console.log('Trip added successfully');
      } else {
        console.error('Error adding trip');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div id="myModal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Event Time</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  const modal = document.getElementById('myModal');
                  modal.style.display = 'none';
                }}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <TimePicker getSelectedTime={handleSelectedTime} />
            </div>
            <div className="modal-footer">
              <button
                onClick={addToTrip}
                type="button"
                className="btn btn-primary">
                Add to Trip
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => {
                  const modal = document.getElementById('myModal');
                  modal.style.display = 'none';
                }}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {dinings.map((dining) => (
        <Dining
          dining={dining}
          openModal={openModal}
          onSelectAttraction={handleSelectedAttraction}
        />
      ))}
    </div>
  );
}
