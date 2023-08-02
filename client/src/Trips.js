import { useEffect, useState } from 'react';
import Trip from './Trip.js';
import DeleteModal from './DeleteModal.js';

export default function Trips({ authUser }) {
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState();

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
  }, [authUser]);

  function findLocation(trip) {
    let location = locationMap[trip.eventSlug];
    if (!location) {
      const restaurant = restaurants.find((restaurant) => {
        return restaurant.name === trip.eventName;
      });

      if (restaurant) {
        location = restaurant.location;
      }
    }

    return location;
  }

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

    updatedTrips.sort((tripA, tripB) => {
      if (tripA.startTime < tripB.startTime) {
        return -1;
      } else if (tripA.startTime > tripB.startTime) {
        return 1;
      }
      return 0;
    });

    setTrips(updatedTrips);
  };

  const onHandleTripDelete = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <DeleteModal
          deleteTrip={deleteTrip}
          selectedTrip={selectedTrip}
          visible={showModal}
          closeModal={closeModal}
        />
      )}

      {trips.map((trip) => (
        <Trip
          onTripDelete={onHandleTripDelete}
          onTripUpdate={onHandleTripUpdate}
          location={findLocation(trip)}
          trip={trip}
        />
      ))}
    </>
  );
}
