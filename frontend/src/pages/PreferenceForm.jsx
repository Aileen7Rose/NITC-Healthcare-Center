import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import

function PreferenceForm() {
  const [P_id, setPid] = useState('');
  const [Preference_date, setPreferenceDate] = useState('');
  const [Preference_time, setPreferenceTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  async function handleSubmit() {
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post(`${API_URL}/preferences`, {
        P_id: parseInt(P_id),
        Preference_date,
        Preference_time
      });
      
      console.log('Preference saved:', response.data);
      setSuccess('Preference booked successfully!');
      
      setTimeout(() => {
        navigate('/patient');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to book preference');
      console.error('Error:', err);
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-header">Book Appointment Preference</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <input
        type="number"
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