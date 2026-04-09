import { useNavigate } from 'react-router-dom';

function PatientDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  return (
    <div className="dashboard-container">
      <h2 className="page-header">Patient Dashboard</h2>
      <p><strong>Name:</strong> {userName}</p>
      <p><strong>ID:</strong> {userId}</p>

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