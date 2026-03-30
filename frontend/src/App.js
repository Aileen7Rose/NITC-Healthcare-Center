import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import ReceptionDashboard from './pages/ReceptionDashboard';
import ViewDoctors from './pages/ViewDoctors';
import PreferenceForm from './pages/PreferenceForm';
import ViewReports from './pages/ViewReports';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/reception" element={<ReceptionDashboard />} />
        <Route path="/doctors" element={<ViewDoctors />} />
        <Route path="/preference" element={<PreferenceForm />} />
        <Route path="/reports" element={<ViewReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;