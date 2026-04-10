import { useState, useEffect } from 'react';
import axios from 'axios';

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'https://nitc-healthcare-center-1cyp.onrender.com/api'; //5000


  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await axios.get(`${API_URL}/doctors`);
        setDoctors(response.data);
      } catch (err) {
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, [API_URL]);

  if (loading) return <div className="loading">Loading doctors...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Available Doctors</h2>
        <p>{doctors.length} doctor{doctors.length !== 1 ? 's' : ''} on record</p>
      </div>

      {doctors.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Specialization</th>
                <th>Email</th>
                <th>Available Date</th>
                <th>Enter</th>
                <th>Leave</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.d_id}>
                  <td className="td-name">{doctor.d_name}</td>
                  <td><span className="id-badge">#{doctor.d_id}</span></td>
                  <td><span className="tag">{doctor.d_spec || 'General'}</span></td>
                  <td className="td-email">{doctor.d_mail || 'N/A'}</td>
                  <td>{doctor.available_date || 'N/A'}</td>
                  <td><span className="time-chip">{doctor.enter_time || 'N/A'}</span></td>
                  <td><span className="time-chip">{doctor.leave_time || 'N/A'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewDoctors;