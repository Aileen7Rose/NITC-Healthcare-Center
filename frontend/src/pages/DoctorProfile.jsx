import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DoctorProfile() {
  const [phone, setPhone] = useState('');
  const [spec, setSpec] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = 'http://localhost:3001/api'; //5000
  const doctorId = localStorage.getItem('userId'); // doctor id

  async function handleSubmit() {
    setError('');
    setLoading(true);

    try {
      const response = await axios.put(`${API_URL}/doctors/${doctorId}`, {
  d_phone: phone,
  d_spec: spec
});

      console.log('Doctor profile saved:', response.data);
      navigate('/doctor'); // redirect after save

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save profile');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <h2>Complete Doctor Profile</h2>
      <p>Please fill in your details</p>

      {error && <div className="error-message">{error}</div>}

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="text"
        placeholder="Specialization"
        value={spec}
        onChange={(e) => setSpec(e.target.value)}
      />

      <button type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </div>
  );
}

export default DoctorProfile;