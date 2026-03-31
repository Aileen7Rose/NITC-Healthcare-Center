import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2 className="page-header">Doctor Dashboard</h2>
      <p>Welcome, Doctor!</p>

      <div className="nav-links">
        <button className="btn-coffee" onClick={() => navigate('/log-availability')}>Log Availability</button>
        <button className="btn-slate" onClick={() => navigate('/add-report')}>Add Report</button>
      </div>
    </div>
  );
}

export default DoctorDashboard;