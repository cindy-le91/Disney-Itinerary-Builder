import React, { useState } from 'react';

function TimePicker() {
  const [selectedHour, setSelectedHour] = useState('');

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  return (
    <div>
      <select value={selectedHour} onChange={handleHourChange}>
        <option value="">Select Hour</option>
        {Array.from({ length: 5 }, (_, i) => (
          <option key={i} value={`${i + 8}`.padStart(2, '0')}>
            {`${i + 8} AM`}
          </option>
        ))}
        <option value="12">12 PM</option>
      </select>
      <p>Selected Hour: {selectedHour}</p>
    </div>
  );
}

export default TimePicker;
