import { useState, useEffect } from 'react';

function ViewReports() {
  const [reports, setReports] = useState([]);
  const [P_id, setPid] = useState('');

  useEffect(() => {
    console.log('Will fetch reports from backend here later');
  }, []);

  return (
    <div>
      <h2>My Reports</h2>

      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Diagnosis</th>
            <th>Prescription</th>
            <th>Test Results</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.Report_id}>
              <td>{report.Report_id}</td>
              <td>{report.Diagnosis}</td>
              <td>{report.Prescription}</td>
              <td>{report.Test_results}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewReports;