import { useState } from 'react';

function PreferenceForm() {
  const [P_id, setPid] = useState('');
  const [Preference_date, setPreferenceDate] = useState('');
  const [Preference_time, setPreferenceTime] = useState('');

  function handleSubmit() {
    console.log('P_id:', P_id);
    console.log('Preference_date:', Preference_date);
    console.log('Preference_time:', Preference_time);
  }

  return (
    <div>
      <h2>Book Appointment Preference</h2>

      <input
        type="text"
        placeholder="Patient ID"
        value={P_id}
        onChange={(e) => setPid(e.target.value)}
      />

      <input
        type="date"
        value={Preference_date}
        onChange={(e) => setPreferenceDate(e.target.value)}
      />

      <input
        type="time"
        value={Preference_time}
        onChange={(e) => setPreferenceTime(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit Preference</button>
    </div>
  );
}

export default PreferenceForm;