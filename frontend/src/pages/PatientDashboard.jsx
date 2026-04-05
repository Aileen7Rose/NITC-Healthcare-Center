import { useNavigate } from 'react-router-dom';

function PatientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2 className="page-header">Patient Dashboard</h2>
      <p>Welcome, Patient!</p>

      <div className="nav-links">
        <button className="btn-slate" onClick={() => navigate('/doctors')}>View Doctors</button>
        <button className="btn-coffee" onClick={() => navigate('/preference')}>Book Preference</button>
        <button className="btn-danger" onClick={() => navigate('/reports')}>My Reports</button>
        <button className="btn-success" onClick={() => navigate('/upcoming')}>Upcoming Appointments</button>
      </div>
    </div>
  );
}

export default PatientDashboard;