import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import

function PatientProfile() {
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [blood, setBlood] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/api'; // Add this
  const patientId = localStorage.getItem('userId'); // Get logged-in patient ID

  async function handleSubmit() {
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.put(`${API_URL}/patients/${patientId}`, {
        P_phone: phone,
        P_age: parseInt(age),
        P_blood: blood,
        P_address: address
      });
      
      console.log('Profile saved:', response.data);
      navigate('/patient');
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save profile');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <h2>Complete Your Profile</h2>
      <p>Please fill in your details to continue</p>
      
      {error && <div className="error-message">{error}</div>}

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        type="text"
        placeholder="Blood Group"
        value={blood}
        onChange={(e) => setBlood(e.target.value)}
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </div>
  );
}

export default PatientProfile;