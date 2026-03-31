import { useNavigate } from 'react-router-dom';

function ReceptionDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2 className="page-header">Reception Dashboard</h2>
      <p>Welcome, Receptionist!</p>

      <div className="nav-links">
        <button className="btn-slate" onClick={() => navigate('/doctors')}>View Doctors</button>
        <button className="btn-coffee" onClick={() => navigate('/view-preferences')}>View Preferences</button>
        <button className="btn-danger" onClick={() => navigate('/schedule-appointment')}>Schedule Appointment</button>
      </div>
    </div>
  );
}

export default ReceptionDashboard;