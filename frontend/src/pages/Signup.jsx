import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState(''); // Add this

  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/api'; // Add this

  async function handleSignup() {
    console.log('🔵 Signup button clicked!'); // Add this line
    setError('');
    
    try {
      console.log('📤 Sending data:', { name, email, role }); // Add this
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
        role
      });
      
      console.log('Signup response:', response.data);
      
      // Store user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userRole', response.data.role);
      
      // Redirect based on role
      if (role === 'patient') {
        navigate('/patient-profile');
      } else if (role === 'doctor') {
        navigate('/doctor');
      } else if (role === 'receptionist') {
        navigate('/reception');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      console.error('Signup error:', err);
    }
  }

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      
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