import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add this for error handling
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000/api'; // Add this

  async function handleLogin() {
    setError(''); // Clear previous errors
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      console.log('Login response:', response.data);
      
      // Store user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userRole', response.data.role);
      
      // Redirect based on role
      if (response.data.role === 'patient') {
        navigate('/patient');
      } else if (response.data.role === 'doctor') {
        navigate('/doctor');
      } else if (response.data.role === 'receptionist') {
        navigate('/reception');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.error('Login error:', err);
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>} {/* Add this */}
      
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

      <button onClick={handleLogin}>Login</button>

      <p>Don't have an account?
        <span onClick={() => navigate('/signup')}> Sign up</span>
      </p>
    </div>
  );
}

export default Login;