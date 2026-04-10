import { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:3001/api';
  const doctorId = localStorage.getItem('userId');

  useEffect(() => {
    if (!doctorId) return;
    async function fetchAppointments() {
      try {
        const response = await axios.get(`${API_URL}/appointments/${doctorId}`);
        setAppointments(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Failed to load appointments');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [doctorId]);

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h2 className="page-header">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.appointment_id}>
                <td>{apt.appointment_id}</td>
                <td>{apt.patient_name}</td>
                <td>{apt.patient_id}</td>
                <td>{apt.appointment_date}</td>
                <td>{apt.appointment_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DoctorAppointments;