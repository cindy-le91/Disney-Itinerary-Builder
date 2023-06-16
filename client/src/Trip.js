import React, { useCallback } from 'react';

export default function Trip({ trip, onTripDelete }) {
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

  const handleEdit = useCallback(() => {
    console.log('edit');
  }, []);

  const handleRemove = useCallback(() => {
    const id = trip.eventId;

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
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontSize: '20px',
          }}>
          {trip.eventName}
          <br></br>
          {convertTimeFormat(trip.startTime)}
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
                <a className="dropdown-item" href="#" onClick={handleEdit}>
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
        </div>
      </div>
    </div>
  );
}
