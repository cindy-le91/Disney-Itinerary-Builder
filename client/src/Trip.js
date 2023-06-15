import React from 'react';

export default function Trip({ trip }) {
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
          <button
            onClick={handleClick}
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: '#C3CDE6',
              color: 'white',
              borderRadius: '50%',
              border: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <i className="bi bi-dash" style={{ fontSize: '24px' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
