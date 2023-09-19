import { useEffect, useState } from 'react';
import Attraction from './Attraction.js';
import TimePicker from './TimePicker.js';

export default function Attractions({ authUser }) {
  const overlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Place it at the forefront
  };

  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [selectedTime, setSelectedTime] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const locationMap = {
    matterhornbobsleds: 'Fantasyland',
    waltdisneysenchantedtikiroom: 'Adventureland',
    pirateslairontomsawyerisland: 'Frontierland',
    splashmountain: 'Critter Country',
    null: "Mickey's Toontown",
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
    fortunetellers: 'Main Street, U.S.A.',
    autopia: 'Tomorrowland',
    indianajonesadventure: 'Adventureland',
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

  useEffect(() => {
    async function fetchAttractions() {
      setIsLoading(true);
      const disneyLandResortId = '7340550b-c14d-4def-80bb-acdb51d49a66';

      const response = await fetch(
        `https://api.themeparks.wiki/v1/entity/${disneyLandResortId}/children`
      );
      const jsonData = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const attractions = jsonData['children'].filter((x) => {
        return x.entityType === 'ATTRACTION';
      });

      setAttractions(attractions);

      setIsLoading(false);
    }

    fetchAttractions();
  }, []);

  function findLocation(attraction) {
    return locationMap[attraction.slug];
  }

  const openModal = (data) => {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
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
          eventSlug: selectedAttraction.slug,
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

  const handleSelectedTime = (selectedTime) => {
    setSelectedTime(selectedTime);
  };

  const handleSelectedAttraction = (attraction) => {
    setSelectedAttraction(attraction);
  };

  return (
    <div>
      {isLoading && ( // Use curly braces to wrap the condition
        <div style={overlay}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

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

      {attractions.map((attraction) => (
        <Attraction
          key={attraction.id}
          attraction={attraction}
          location={findLocation(attraction)}
          onSelectAttraction={handleSelectedAttraction}
          openModal={openModal}
        />
      ))}
    </div>
  );
}
