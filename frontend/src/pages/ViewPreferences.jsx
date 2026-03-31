import { useState, useEffect } from 'react';

function ViewPreferences() {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    console.log('Will fetch preferences from backend here later');
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-header">Patient Preferences</h2>
      <table>
        <thead>
          <tr>
            <th>Preference ID</th>
            <th>Patient ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {preferences.map((pref) => (
            <tr key={pref.Preference_id}>
              <td>{pref.Preference_id}</td>
              <td>{pref.P_id}</td>
              <td>{pref.Preference_date}</td>
              <td>{pref.Preference_time}</td>
              <td>{pref.Preference_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewPreferences;