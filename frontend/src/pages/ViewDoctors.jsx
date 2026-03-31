import { useState, useEffect } from 'react';

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    console.log('Will fetch doctors from backend here later');
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-header">Available Doctors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.D_id}>
              <td>{doctor.D_name}</td>
              <td>{doctor.D_spec}</td>
              <td>{doctor.D_phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewDoctors;