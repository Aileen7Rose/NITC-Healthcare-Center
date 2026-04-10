import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import

function LogAvailability() {
  const [D_id, setDid] = useState('');
  const [Available_date, setAvailableDate] = useState('');
  const [Enter_time, setEnterTime] = useState('');
  const [Leave_time, setLeaveTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const API_URL = 'https://nitc-healthcare-center-1cyp.onrender.com/api'; //5000

  async function handleSubmit() {
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post(`${API_URL}/availability`, {
        D_id: parseInt(D_id),
        Available_date,
        Enter_time,
        Leave_time
      });
      
      console.log('Availability saved:', response.data);
      setSuccess('Availability logged successfully!');
      
      setTimeout(() => {
        navigate('/doctor');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to log availability');
      console.error('Error:', err);
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-header">Log Availability</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <input
        type="number"
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