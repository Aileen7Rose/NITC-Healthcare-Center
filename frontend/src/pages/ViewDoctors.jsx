import { useState, useEffect } from 'react';
import axios from 'axios'; // Add this import

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api'; // Add this

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      const response = await axios.get(`${API_URL}/doctors`);
      console.log('Doctors:', response.data);
      setDoctors(response.data);
    } catch (err) {
      setError('Failed to load doctors');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  
  if (loading) return <div className="loading">Loading doctors...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h2 className="page-header">Available Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Doctor Id</th>
              <th>Specialization</th>
              <th>Mail</th>
              <th>Latest Available Date</th>
              <th>Enter Time</th>
              <th>Leave Time</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.d_id}>
                <td>{doctor.d_name}</td>
                <td>{doctor.d_id}</td>
                <td>{doctor.d_spec || 'Not specified'}</td>
                <td>{doctor.d_mail || 'N/A'}</td>
                <td>{doctor.available_date || `N/A`}</td>
                <td>{doctor.enter_time || `N/A`}</td>
                <td>{doctor.leave_time || `N/A`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewDoctors;