import React, { useCallback, useState, useEffect } from 'react';
import TimePicker from './TimePicker.js';
import CinderellaCastle from './disneyicons/WDWicon_CinderellaCastle.svg';
import MillenniumFalcon from './disneyicons/WDWicon_MillenniumFalcon.svg';
import ExpeditionEverest from './disneyicons/WDWicon_ExpeditionEverest.svg';
import SpaceMountain from './disneyicons/WDWicon_SpaceMountain.svg';
import Entrance from './disneyicons/WDWicon_MagicKingdomEntrance.svg';
import Tree from './disneyicons/WDWicon_TreeofLife.svg';
import LogRide from './disneyicons/DLPicon_SplashMountain.svg';
import MickeyIceCream from './disneyicons/DLPicon_MickeyIceCream.svg';
import TowerofTerror from './disneyicons/WDWicon_TowerofTerror.svg';
import Monorail from './disneyicons/WDWicon_Monorail.svg';

export default function Trip({ trip, onTripDelete, onTripUpdate, location }) {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTime, setSelectedTime] = useState();

  function convertTimeFormat(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return formattedTime;
  }

  const enableEdit = () => {
    setIsEdit(true);
  };

  const disableEdit = () => {
    setIsEdit(false);
  };

  const handleEdit = useCallback(
    (time) => {
      const id = trip.eventId;
      const payload = { startTime: time };

      fetch(`/api/trip/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (response) => {
          if (response.ok) {
            const updatedEvent = await response.json();
            onTripUpdate(updatedEvent);
            disableEdit();
          } else {
            console.log('Failed to edit trip');
          }
        })
        .catch((error) => {
          console.log('An error occurred while editing the trip:', error);
        });
    },
    [trip.eventId]
  );

  const handleRemove = useCallback(() => {
    const id = trip.eventId;
    onTripDelete(trip);
  });

  const handleSelectedTime = (startTime) => {
    setSelectedTime(startTime);
  };

  return (
    <div>
      <div
        className="row border-bottom"
        style={{
          height: '100px',
        }}>
        <div
          className="col-2"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {location === 'Fantasyland' && (
            <img
              src={CinderellaCastle}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === "Star Wars: Galaxy's Edge" && (
            <img
              src={MillenniumFalcon}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Frontierland' && (
            <img
              src={ExpeditionEverest}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Tomorrowland' && (
            <img
              src={SpaceMountain}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Main Street, U.S.A.' && (
            <img src={Entrance} style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Adventureland' && (
            <img src={Tree} style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Critter Country' && (
            <img src={LogRide} style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === "Mickey's Toontown" && (
            <img
              src={MickeyIceCream}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'New Orleans Square' && (
            <img
              src={TowerofTerror}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Disneyland Park' && (
            <img src={Monorail} style={{ width: '60px', height: '60px' }}></img>
          )}
        </div>
        <div
          className="col-8"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <div style={{ flex: 1, whiteSpace: 'pre-wrap', fontSize: '18px' }}>
            {trip.eventName}
            <br />
            <div style={{ fontSize: '16px', paddingTop: '5px' }}>
              {location}
            </div>
          </div>
          {isEdit && (
            <TimePicker
              getSelectedTime={(startTime) => handleSelectedTime(startTime)}
            />
          )}
          {!isEdit && (
            <div
              style={{
                flexShrink: 0,
                whiteSpace: 'nowrap',
                textAlign: 'right',
              }}>
              {convertTimeFormat(trip.startTime)}
            </div>
          )}
        </div>

        <div
          className="col-2"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <div className="dots">
            <div></div>
          </div>
          {!isEdit && (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor: '#C3CDE6',
                  border: 'none',
                }}></button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#" onClick={enableEdit}>
                    Edit
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={handleRemove}>
                    Remove
                  </a>
                </li>
              </ul>
            </div>
          )}
          {isEdit && (
            <button
              onClick={() => handleEdit(selectedTime)}
              style={{
                backgroundColor: '#C3CDE6',
                color: 'white',
                fontSize: '16px',
                padding: '6px 14px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
