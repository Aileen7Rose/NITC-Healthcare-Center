import { useState } from 'react';

function LogAvailability() {
  const [D_id, setDid] = useState('');
  const [Available_date, setAvailableDate] = useState('');
  const [Enter_time, setEnterTime] = useState('');
  const [Leave_time, setLeaveTime] = useState('');

  function handleSubmit() {
    console.log('D_id:', D_id);
    console.log('Available_date:', Available_date);
    console.log('Enter_time:', Enter_time);
    console.log('Leave_time:', Leave_time);
  }

  return (
    <div className="page-container">
      <h2 className="page-header">Log Availability</h2>

      <input
        type="text"
        placeholder="Doctor ID"
        value={D_id}
        onChange={(e) => setDid(e.target.value)}
      />

      <input
        type="date"
        value={Available_date}
        onChange={(e) => setAvailableDate(e.target.value)}
      />

      <input
        type="time"
        placeholder="Enter Time"
        value={Enter_time}
        onChange={(e) => setEnterTime(e.target.value)}
      />

      <input
        type="time"
        placeholder="Leave Time"
        value={Leave_time}
        onChange={(e) => setLeaveTime(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit Availability</button>
    </div>
  );
}

export default LogAvailability;