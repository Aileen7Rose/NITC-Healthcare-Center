import { useState, useEffect } from 'react';
import axios from 'axios'; // Add this import

function ViewReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api'; // Add this
  const patientId = localStorage.getItem('userId'); // Get logged-in patient ID

  useEffect(() => {
    if (patientId) {
      fetchReports();
    }
  }, [patientId]);

  async function fetchReports() {
    try {
      const response = await axios.get(`${API_URL}/reports/${patientId}`);
      console.log('Reports:', response.data);
      setReports(response.data);
    } catch (err) {
      setError('Failed to load reports');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="loading">Loading reports...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h2 className="page-header">My Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Prescription</th>
              <th>Test Results</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.report_id}>
                <td>{report.report_id}</td>
                <td>{report.doctor_name}</td>
                <td>{report.diagnosis}</td>
                <td>{report.prescription}</td>
                <td>{report.test_results}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewReports;