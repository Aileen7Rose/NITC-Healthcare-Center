import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  return (
    <div className="dashboard-container">
      <h2 className="page-header">Doctor Dashboard</h2>
      <p><strong>Name:</strong> {userName}</p>
      <p><strong>ID:</strong> {userId}</p>

      <div className="nav-links">
        <button className="btn-coffee" onClick={() => navigate('/log-availability')}>Log Availability</button>
        <button className="btn-slate" onClick={() => navigate('/add-report')}>Add Report</button>
        <button className="btn-slate" onClick={() => navigate('/doctor-appointments')}>View Appointments</button>
      </div>
    </div>
  );
}

export default DoctorDashboard;