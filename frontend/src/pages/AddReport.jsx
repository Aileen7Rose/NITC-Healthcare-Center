import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import

function AddReport() {
  const [P_id, setPid] = useState('');
  const [D_id, setDid] = useState('');
  const [Diagnosis, setDiagnosis] = useState('');
  const [Prescription, setPrescription] = useState('');
  const [Test_results, setTestResults] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const API_URL =  process.env.REACT_APP_API_URL;
  async function handleSubmit() {
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post(`${API_URL}/api/reports`, {
        P_id: parseInt(P_id),
        D_id: parseInt(D_id),
        Diagnosis,
        Prescription,
        Test_results
      });
      
      console.log('Report saved:', response.data);
      setSuccess('Report added successfully!');
      
      setTimeout(() => {
        navigate('/doctor');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add report');
      console.error('Error:', err);
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-header">Add Patient Report</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <input
        type="number"
        placeholder="Patient ID"
        value={P_id}
        onChange={(e) => setPid(e.target.value)}
      />

      <input
        type="number"
        placeholder="Doctor ID"
        value={D_id}
        onChange={(e) => setDid(e.target.value)}
      />

      <textarea
        placeholder="Diagnosis"
        value={Diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        rows="3"
      />

      <textarea
        placeholder="Prescription"
        value={Prescription}
        onChange={(e) => setPrescription(e.target.value)}
        rows="3"
      />

      <textarea
        placeholder="Test Results"
        value={Test_results}
        onChange={(e) => setTestResults(e.target.value)}
        rows="3"
      />

      <button onClick={handleSubmit}>Submit Report</button>
    </div>
  );
}

export default AddReport;