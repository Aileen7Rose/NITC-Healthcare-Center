import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import

function ScheduleAppointment() {
  const [P_id, setPid] = useState('');
  const [D_id, setDid] = useState('');
  const [R_id, setRid] = useState('');
  const [Appointment_date, setAppointmentDate] = useState('');
  const [Appointment_time, setAppointmentTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/api'; // Add this

  async function handleSubmit() {
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post(`${API_URL}/appointments`, {
        P_id: parseInt(P_id),
        D_id: parseInt(D_id),
        R_id: parseInt(R_id),
        Appointment_date,
        Appointment_time
      });
      
      console.log('Appointment scheduled:', response.data);
      setSuccess('Appointment scheduled successfully!');
      
      setTimeout(() => {
        navigate('/reception');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to schedule appointment');
      console.error('Error:', err);
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-header">Schedule Appointment</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <input
        type="number"
        placeholder="Patient ID"
        value={P_id}
        onChange={(e) => setPid(e.target.value)}
      />

      <input
        type="number"
        placeholder="Doctor ID"
        value={D_id}
        onChange={(e) => setDid(e.target.value)}
      />

      <input
        type="number"
        placeholder="Receptionist ID"
        value={R_id}
        onChange={(e) => setRid(e.target.value)}
      />

      <input
        type="date"
        value={Appointment_date}
        onChange={(e) => setAppointmentDate(e.target.value)}
      />

      <input
        type="time"
        value={Appointment_time}
        onChange={(e) => setAppointmentTime(e.target.value)}
      />

      <button onClick={handleSubmit}>Schedule Appointment</button>
    </div>
  );
}

export default ScheduleAppointment;