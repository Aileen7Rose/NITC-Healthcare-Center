import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PatientProfile() {
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [blood, setBlood] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  function handleSubmit() {
    console.log('Phone:', phone);
    console.log('Age:', age);
    console.log('Blood:', blood);
    console.log('Address:', address);
    navigate('/patient');
  }

  return (
    <div className="auth-container">
      <h2>Complete Your Profile</h2>
      <p>Please fill in your details to continue</p>

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

      <button onClick={handleSubmit}>Save Profile</button>
    </div>
  );
}

export default PatientProfile;