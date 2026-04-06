import { useState, useEffect } from 'react';
import axios from 'axios'; // Add this import

function ViewPreferences() {
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:3001/api'; //5000

  useEffect(() => {
    fetchPreferences();
  }, []);

  async function fetchPreferences() {
    try {
      const response = await axios.get(`${API_URL}/preferences`);
      console.log('Preferences:', response.data);
      setPreferences(response.data);
    } catch (err) {
      setError('Failed to load preferences');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="loading">Loading preferences...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h2 className="page-header">Patient Preferences</h2>
      {preferences.length === 0 ? (
        <p>No pending preferences</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Preference ID</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {preferences.map((pref) => (
              <tr key={pref.preference_id}>
                <td>{pref.preference_id}</td>
                <td>{pref.patient_id}</td>
                <td>{pref.patient_name}</td>
                <td>{pref.preference_date}</td>
                <td>{pref.preference_time}</td>
                <td>{pref.preference_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewPreferences;