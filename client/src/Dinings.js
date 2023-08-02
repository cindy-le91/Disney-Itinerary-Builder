import { useEffect, useState } from 'react';
import Dining from './Dining.js';
import TimePicker from './TimePicker.js';

export default function Dinings({ authUser }) {
  const restaurants = [
    { name: 'Alien Pizza Planet', location: 'Tomorrowland' },
    { name: 'Bengal Barbecue', location: 'Adventureland' },
    { name: 'Blue Bayou Restaurant', location: 'New Orleans Square' },
    { name: 'Café Daisy', location: "Mickey's Toontown" },
    { name: 'Café Orleans', location: 'New Orleans Square' },
    { name: 'Carnation Café', location: 'Main Street, U.S.A.' },
    {
      name: 'Docking Bay 7 Food and Cargo',
      location: "Star Wars: Galaxy's Edge",
    },
    { name: 'Eidelweiss Snacks', location: 'Fantasyland' },
    { name: 'Galactic Grill', location: 'Tomorrowland' },
    { name: 'Gibson Girl Ice Cream Parlor', location: 'Main Street, U.S.A.' },
    { name: 'The Golden Horseshoe', location: 'Frontierland' },
    { name: 'Good Boy! Grocers', location: "Mickey's Toontown" },
    { name: 'Harbour Galley', location: 'Critter Country' },
    { name: 'Hungry Bear Restaurant', location: 'Critter Country' },
    { name: 'Jolly Holiday Bakery Cafe', location: 'Main Street, U.S.A.' },
    { name: "Kat Saka's Kettle", location: "Star Wars: Galaxy's Edge" },
    { name: 'Market House', location: 'Main Street, U.S.A.' },
    { name: "Maurice's Treats", location: 'Fantasyland' },
    { name: 'Milk Stand', location: "Star Wars: Galaxy's Edge" },
    { name: "Oga's Cantina", location: "Star Wars: Galaxy's Edge" },
    { name: 'Plaza Inn', location: 'Main Street, U.S.A.' },
    { name: 'Rancho del Zocalo Restaurante', location: 'Frontierland' },
    { name: 'Red Rose Taverne', location: 'Fantasyland' },
    { name: 'River Belle Terrace', location: 'Frontierland' },
    { name: 'Ronto Roasters', location: "Star Wars: Galaxy's Edge" },
    { name: 'Royal Street Veranda', location: 'New Orleans Square' },
    { name: 'Stage Door Café', location: 'Frontierland' },
    { name: 'Tiki Juice Bar', location: 'Adventureland' },
    { name: 'Tropical Imports', location: 'Adventureland' },
    { name: 'Tomorrowland Skyline Terrace', location: 'Tomorrowland' },
    { name: 'The Tropical Hideaway', location: 'Adventureland' },
    { name: 'Troubadour Tavern', location: 'Fantasyland' },
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

      setDinings([...restaurants]);
    }

    fetchDining();
  });

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
    const token = sessionStorage.getItem('token');
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';

    try {
      const response = await fetch('/api/trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: authUser.userId,
          eventName: selectedAttraction.name,
          startTime: selectedTime,
        }),
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
            <div className="modal-header text-center">
              <h5 className="modal-title mx-auto">Event Time</h5>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <TimePicker getSelectedTime={handleSelectedTime} />
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                onClick={addToTrip}
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: '#C3CDE6',
                  color: 'white',
                  border: 'none',
                }}>
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
          location={dining.location}
          onSelectAttraction={handleSelectedAttraction}
        />
      ))}
    </div>
  );
}
