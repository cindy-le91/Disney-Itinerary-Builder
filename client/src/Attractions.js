import { useEffect, useState } from 'react';
import Attraction from './Attraction.js';
import TimePicker from './TimePicker.js';

export default function Attractions() {
  const [attractions, setAttractions] = useState([]);
  const [selectedTime, setSelectedTime] = useState();

  useEffect(() => {
    const locationMap = {
      matterhornbobsleds: 'Fantasyland',
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
    // Implement the logic to find the location of the attraction
  }

  const openModal = (data) => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  };

  const addToTrip = () => {
    console.log('adds to trip');
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  return (
    <div>
      <div id="myModal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
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
              <TimePicker />
            </div>
            <div className="modal-footer">
              <button
                onClick={addToTrip}
                type="button"
                className="btn btn-primary">
                Save changes
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

      {attractions.map((attraction) => (
        <Attraction
          key={attraction.id}
          attraction={attraction}
          location={findLocation()}
          openModal={openModal}
        />
      ))}
    </div>
  );
}
