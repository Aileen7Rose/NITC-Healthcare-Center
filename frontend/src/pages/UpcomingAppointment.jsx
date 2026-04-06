import { useState, useEffect } from 'react';
import axios from 'axios';

function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:3001/api'; //5000

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${API_URL}/upcoming/${userId}`);
      console.log('Appointments:', response.data);
      setAppointments(response.data);
    } catch (err) {
      setError('Failed to load appointments');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h2 className="page-header">Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.appointment_id}>
                <td>{appt.appointment_id}</td>
                <td>{appt.doctor_name}</td>
                <td>{appt.doctor_spec || 'Not specified'}</td>
                <td>{appt.appointment_date}</td>
                <td>{appt.appointment_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UpcomingAppointments;