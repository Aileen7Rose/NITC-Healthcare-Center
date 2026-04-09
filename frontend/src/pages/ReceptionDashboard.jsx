import { useNavigate } from 'react-router-dom';

function ReceptionDashboard() {
  const navigate = useNavigate();
  const receptionistId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  return (
    <div className="dashboard-container">
      <h2 className="page-header">Reception Dashboard</h2>
      <div className="user-info">
      <p><strong>Name:</strong> {userName}</p>
        <p><strong>Receptionist ID:</strong> {receptionistId}</p>
    </div>
      <div className="nav-links">
        <button className="btn-slate" onClick={() => navigate('/doctors')}>View Doctors</button>
        <button className="btn-coffee" onClick={() => navigate('/view-preferences')}>View Preferences</button>
        <button className="btn-danger" onClick={() => navigate('/schedule-appointment')}>Schedule Appointment</button>
      </div>
    </div>
  );
}

export default ReceptionDashboard;