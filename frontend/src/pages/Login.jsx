import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add this for error handling
  const navigate = useNavigate();

  const API_URL =  process.env.REACT_APP_API_URL;

  async function handleLogin() {
    setError(''); // Clear previous errors
    
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
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

  // return (
  //   <div className="auth-container">
  //     <h2>Login</h2>
  //     {error && <div className="error-message">{error}</div>} {/* Add this */}
      
  //     <input
  //       type="text"
  //       placeholder="Email"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //     />

  //     <input
  //       type="password"
  //       placeholder="Password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //     />

  //     <button onClick={handleLogin}>Login</button>

  //     <p>Don't have an account?
  //       <span onClick={() => navigate('/signup')}> Sign up</span>
  //     </p>
  //   </div>
  // );
  return (
    <div className="auth-container">
      
      {/* Hospital photo */}
      <div style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', height: '140px' }}>
        <img
          src="https://nitc.ac.in/imgserver/uploads/attachments/Ed__a551639b-9eea-4e07-a978-0d2ed0715b85_.jpg"
          alt="NITC Healthcare"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
  
      {/* Logo + Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/a/ae/Correct_Logo_of_NIT_Calicut.svg"
          alt="NITC Logo"
          style={{ width: '48px', height: '48px' }}
        />
        <div>
          <h2 style={{ margin: 0, fontSize: '20px' }}>NITC Healthcare</h2>
          <p style={{ margin: 0, fontSize: '12px', color: '#1d4ed8' }}>Hospital Management System</p>
        </div>
      </div>
  
      {error && <div className="error-message">{error}</div>}
  
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
  
      <p>Don't have an account?
        <span onClick={() => navigate('/signup')}> Sign up</span>
      </p>
    </div>
  );
}

export default Login;