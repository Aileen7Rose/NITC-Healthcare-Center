import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');

  const navigate = useNavigate();

  function handleSignup() {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);

    if (role === 'patient') {
      navigate('/patient-profile');
    } else if (role === 'doctor') {
      navigate('/doctor');
    } else if (role === 'receptionist') {
      navigate('/reception');
    }
  }

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="receptionist">Receptionist</option>
      </select>

      <button onClick={handleSignup}>Sign Up</button>

      <p>Already have an account?
        <span onClick={() => navigate('/')}> Login</span>
      </p>
    </div>
  );
}

export default Signup;