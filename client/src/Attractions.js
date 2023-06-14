import { useEffect, useState } from 'react';
import Attraction from './Attraction.js';
import TimePicker from './TimePicker.js';

export default function Attractions({ authUser }) {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [selectedTime, setSelectedTime] = useState();

  useEffect(() => {
    const locationMap = {
      matterhornbobsleds: 'Fantasyland',
      waltdisneysenchantedtikiroom: 'Adventureland',
      pirateslairontomsawyerisland: 'Frontierland',
      splashmountain: 'Critter Country',
      frontierlandshootinexposition: 'Frontierland',
      rogerrabbitscartoonspin: "Mickey's Toontown",
      millenniumfalconsmugglersrun: "Star Wars: Galaxy's Edge",
      bigthundermountainrailroad: 'Frontierland',
      starwarsriseoftheresistance: "Star Wars: Galaxy's Edge",
      astroorbitor: 'Tomorrowland',
      caseyjrcircustrain: 'Fantasyland',
      chipndaletreehouse: "Mickey's Toontown",
      findingnemosubmarinevoyage: 'Tomorrowland',
      disneylandmonorail: 'Tomorrowland',
      dumbotheflyingelephant: 'Fantasyland',
      junglecruise: 'Adventureland',
      mainstreetcinema: 'Main Street, U.S.A.',
      madteaparty: 'Fantasyland',
      marktwainriverboat: 'Frontierland',
      peterpansflight: 'Fantasyland',
      pinocchiosdaringjourney: 'Fantasyland',
      piratesofthecaribbean: 'New Orleans Square',
      sailingshipcolumbia: 'Frontierland',
      sleepingbeautycastlewalkthrough: 'Fantasyland',
      snowwhitesenchantedwish: 'Fantasyland',
      storybooklandcanalboats: 'Fantasyland',
      tarzanstreehouse: 'Adventureland',
      themanyadventuresofwinniethepooh: 'Critter Country',
      thedisneylandstorypresentinggreatmomentswithmrlincoln:
        'Main Street, U.S.A.',
      mainstreetvehicles: 'Main Street, U.S.A.',
      buzzlightyearastroblasters: 'Tomorrowland',
      aliceinwonderland: 'Fantasyland',
      fortunetellers: 'Main Street, U.S.A. - New Orleans Square',
      autopia: 'Tomorrowland',
      indianajonesadventure: 'Adventureland',
      davycrockettsexplorercanoes: 'Critter Country',
      thedisneygallery: 'Main Street, U.S.A.',
      kingarthurcarrousel: 'Fantasyland',
      minnieshouse: "Mickey's Toontown",
      mrtoadswildride: 'Fantasyland',
      itsasmallworld: 'Fantasyland',
      disneylandrailroad: 'Disneyland Park',
      starwarslaunchbay: 'Tomorrowland',
      startourstheadventurescontinue: 'Tomorrowland',
      starwarsgalaxysedge: "Star Wars: Galaxy's Edge",
      hauntedmansion: 'New Orleans Square',
      spacemountain: 'Tomorrowland',
      gadgetsgocoaster: "Mickey's Toontown",
      goofysplayhouse: "Mickey's Toontown",
      donaldsboat: "Mickey's Toontown",
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

  const addToTrip = async () => {
    const token = sessionStorage.getItem('token'); // Retrieve the bearer token from session storage

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

  const handleSelectedTime = (selectedTime) => {
    setSelectedTime(selectedTime);
  };

  const handleSelectedAttraction = (attraction) => {
    setSelectedAttraction(attraction);
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

      {attractions.map((attraction) => (
        <Attraction
          key={attraction.id}
          attraction={attraction}
          location={findLocation()}
          onSelectAttraction={handleSelectedAttraction}
          openModal={openModal}
        />
      ))}
    </div>
  );
}
