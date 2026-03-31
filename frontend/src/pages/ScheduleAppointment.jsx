import { useState } from 'react';

function ScheduleAppointment() {
  const [P_id, setPid] = useState('');
  const [D_id, setDid] = useState('');
  const [R_id, setRid] = useState('');
  const [Appointment_date, setAppointmentDate] = useState('');
  const [Appointment_time, setAppointmentTime] = useState('');

  function handleSubmit() {
    console.log('P_id:', P_id);
    console.log('D_id:', D_id);
    console.log('R_id:', R_id);
    console.log('Appointment_date:', Appointment_date);
    console.log('Appointment_time:', Appointment_time);
  }

  return (
    <div className="page-container">
      <h2 className="page-header">Schedule Appointment</h2>

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
        placeholder="Receptionist ID"
        value={R_id}
        onChange={(e) => setRid(e.target.value)}
      />

      <input
        type="date"
        value={Appointment_date}
        onChange={(e) => setAppointmentDate(e.target.value)}
      />

      <input
        type="time"
        value={Appointment_time}
        onChange={(e) => setAppointmentTime(e.target.value)}
      />

      <button onClick={handleSubmit}>Schedule Appointment</button>
    </div>
  );
}

export default ScheduleAppointment;