import React, { useCallback, useState, useEffect } from 'react';
import TimePicker from './TimePicker.js';
export default function Trip({ trip, onTripDelete, onTripUpdate }) {
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

  const handleClick = () => {
    console.log('test');
  };

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

    fetch(`/api/trip/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Trip removed successfully');
          onTripDelete(trip);
        } else {
          console.log('Failed to remove trip');
        }
      })
      .catch((error) => {
        console.log('An error occurred while removing the trip:', error);
      });
  }, [trip.eventId]);

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
          <i className="bi bi-emoji-smile"></i>
        </div>
        <div
          className="col-8"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '16px',
          }}>
          <div style={{ flex: 1, whiteSpace: 'pre-wrap' }}>
            {trip.eventName}
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
