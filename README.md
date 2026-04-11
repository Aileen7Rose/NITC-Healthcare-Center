# NITC-Healthcare-Center
Currently, students at the NITC Health Centre must manually search for their roll number in physical record sheets before consulting the doctor, which is time-consuming and inefficient. A database system can store and retrieve student records digitally, making patient identification and record management faster and more organized.

The deployed site is on https://nitc-healthcare-center-murex.vercel.app :)

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT, bcrypt

## Team

| Name | Roll No | 
|------|---------|
| Kavitha Raghuram | B240060CS | 
| Kalpana Raghuram | B240056CS | 
| Aileen Rose Albin | B240122CS | 

## Setup Instructions

### Prerequisites
- Node.js
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Aileen7Rose/NITC-Healthcare-Center.git
cd NITC-Healthcare-Center
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder (use `.env.example` as a template):

```
DB_USER=your_postgres_username
DB_NAME=nitc healthcare
DB_HOST=localhost
DB_PORT=5432
DB_PASS=your_postgres_password
PORT=3001
JWT_SECRET=your_secret_key
```

### 3. Database setup

Open PostgreSQL and run:

```sql
CREATE DATABASE "nitc healthcare";
\c "nitc healthcare"
```

Then create the tables:

```sql
CREATE TABLE patient (
    P_id SERIAL PRIMARY KEY,
    P_name VARCHAR(100),
    P_phone VARCHAR(15),
    P_mail VARCHAR(100),
    P_password VARCHAR(255),
    P_blood VARCHAR(5),
    P_age INT,
    P_address VARCHAR(255)
);

CREATE TABLE doctor (
    D_id SERIAL PRIMARY KEY,
    D_name VARCHAR(100),
    D_phone VARCHAR(15),
    D_mail VARCHAR(100),
    D_spec VARCHAR(100),
    D_password VARCHAR(255)
);

CREATE TABLE receptionist (
    R_id SERIAL PRIMARY KEY,
    R_name VARCHAR(100),
    R_phone VARCHAR(15),
    R_mail VARCHAR(100),
    R_password VARCHAR(255)
);

CREATE TABLE doctor_availability (
    Availability_id SERIAL PRIMARY KEY,
    D_id INT REFERENCES doctor(D_id),
    Available_date DATE,
    Enter_time TIME,
    Leave_time TIME
);

CREATE TABLE preference (
    Preference_id SERIAL PRIMARY KEY,
    P_id INT REFERENCES patient(P_id),
    Preference_date DATE,
    Preference_time TIME,
    Preference_status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE appointment (
    Appointment_id SERIAL PRIMARY KEY,
    P_id INT REFERENCES patient(P_id),
    D_id INT REFERENCES doctor(D_id),
    R_id INT REFERENCES receptionist(R_id),
    Appointment_date DATE,
    Appointment_time TIME,
    Appointment_status VARCHAR(20) DEFAULT 'Scheduled'
);

CREATE TABLE reports (
    Report_id SERIAL PRIMARY KEY,
    P_id INT REFERENCES patient(P_id),
    D_id INT REFERENCES doctor(D_id),
    Diagnosis VARCHAR(255),
    Prescription VARCHAR(255),
    Test_results VARCHAR(255)
);
```

### 4. Start the backend

```bash
cd backend
node server.js
```

Server runs on `http://localhost:3001`

### 5. Frontend setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user (patient, doctor, receptionist) |
| POST | `/api/auth/login` | Login and receive JWT token |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all available doctors with availability |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/:patientId` | Get all reports for a patient |
| POST | `/api/reports` | Add a new report (doctor only) |

### Availability
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/availability` | Log doctor availability |

### Preferences
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/preferences` | Get all pending patient preferences |
| POST | `/api/preferences` | Add a patient preference |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments` | Schedule an appointment |
| GET | `/api/upcoming/:patientId` | Get upcoming appointments for a patient |

### Patients
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/patients/:id` | Update patient profile |

---

## Note for teammates

Each team member runs their own local PostgreSQL instance. Clone the repo, create the database and tables using the SQL above, and fill in your own `.env` file with your local credentials. The `.env` file is gitignored and will never be pushed.
