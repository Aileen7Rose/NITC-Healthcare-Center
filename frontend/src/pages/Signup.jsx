import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [blood, setBlood] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  function handleSignup() {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Phone:', phone);
    console.log('Age:', age);
    console.log('Blood:', blood);
    console.log('Address:', address);
  }

  return (
    <div>
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

      <button onClick={handleSignup}>Sign Up</button>

      <p>Already have an account?
        <span onClick={() => navigate('/')}> Login</span>
      </p>
    </div>
  );
}

export default Signup;