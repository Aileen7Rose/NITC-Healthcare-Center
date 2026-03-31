import { useState } from 'react';

function AddReport() {
  const [P_id, setPid] = useState('');
  const [D_id, setDid] = useState('');
  const [Diagnosis, setDiagnosis] = useState('');
  const [Prescription, setPrescription] = useState('');
  const [Test_results, setTestResults] = useState('');

  function handleSubmit() {
    console.log('P_id:', P_id);
    console.log('D_id:', D_id);
    console.log('Diagnosis:', Diagnosis);
    console.log('Prescription:', Prescription);
    console.log('Test_results:', Test_results);
  }

  return (
    <div>
      <h2>Add Patient Report</h2>

      <input
        type="text"
        placeholder="Patient ID"
        value={P_id}
        onChange={(e) => setPid(e.target.value)}
      />

      <input
        type="text"
        placeholder="Doctor ID"
        value={D_id}
        onChange={(e) => setDid(e.target.value)}
      />

      <input
        type="text"
        placeholder="Diagnosis"
        value={Diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />

      <input
        type="text"
        placeholder="Prescription"
        value={Prescription}
        onChange={(e) => setPrescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Test Results"
        value={Test_results}
        onChange={(e) => setTestResults(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit Report</button>
    </div>
  );
}

export default AddReport;