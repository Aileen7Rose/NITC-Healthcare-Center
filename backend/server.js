const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://your-frontend.vercel.app',
  credentials: true
}));
// Database connection
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        require: true,
        rejectUnauthorized: false,
    },
});

// Test database connection
db.connect()
    .then(client => {
        console.log('✅ Connected to Neon PostgreSQL');
        client.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err);
    });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============= AUTH ROUTES =============

// Signup route with bcrypt
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
    
    console.log('📝 Signup attempt:', { name, email, role });
    
    try {
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Check if user exists
        let existingUser = null;
        
        if (role === 'patient') {
            const result = await db.query(
                'SELECT P_id FROM patient WHERE P_mail = $1',
                [email]
            );
            existingUser = result.rows[0];
        } else if (role === 'doctor') {
            const result = await db.query(
                'SELECT D_id FROM doctor WHERE D_mail = $1',
                [email]
            );
            existingUser = result.rows[0];
        } else if (role === 'receptionist') {
            const result = await db.query(
                'SELECT R_id FROM receptionist WHERE R_mail = $1',
                [email]
            );
            existingUser = result.rows[0];
        }
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        let result;
        let userId;
        
        if (role === 'patient') {
            result = await db.query(
                'INSERT INTO patient (P_name, P_mail, P_password) VALUES ($1, $2, $3) RETURNING P_id',
                [name, email, hashedPassword]
            );
            userId = result.rows[0].p_id;
        } else if (role === 'doctor') {
            result = await db.query(
                'INSERT INTO doctor (D_name, D_mail, D_password) VALUES ($1, $2, $3) RETURNING D_id',
                [name, email, hashedPassword]
            );
            userId = result.rows[0].d_id;
        } else if (role === 'receptionist') {
            result = await db.query(
                'INSERT INTO receptionist (R_name, R_mail, R_password) VALUES ($1, $2, $3) RETURNING R_id',
                [name, email, hashedPassword]
            );
            userId = result.rows[0].r_id;
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }
        
        const jwt = require('jsonwebtoken');
        const token = jwt.sign(
            { id: userId, role: role },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '1h' }
        );
        
        res.status(201).json({
            success: true,
            id: userId,
            name,
            email,
            role,
            token
        });
        
    } catch (err) {
        console.error('❌ Signup error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Login route with bcrypt
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    
    console.log('🔐 Login attempt:', { email });
    
    try {
        const bcrypt = require('bcrypt');
        
        // Check patient table
        let result = await db.query(
            `SELECT P_id as id, P_name as name, P_mail as email, P_password as password, 'patient' as role 
             FROM patient WHERE P_mail = $1`,
            [email]
        );
        
        let user = result.rows[0];
        
        if (!user) {
            result = await db.query(
                `SELECT D_id as id, D_name as name, D_mail as email, D_password as password, 'doctor' as role 
                 FROM doctor WHERE D_mail = $1`,
                [email]
            );
            user = result.rows[0];
        }
        
        if (!user) {
            result = await db.query(
                `SELECT R_id as id, R_name as name, R_mail as email, R_password as password, 'receptionist' as role 
                 FROM receptionist WHERE R_mail = $1`,
                [email]
            );
            user = result.rows[0];
        }
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const jwt = require('jsonwebtoken');
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '1h' }
        );
        
        res.json({
            success: true,
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });
        
    } catch (err) {
        console.error('❌ Login error:', err);
        res.status(500).json({ message: err.message });
    }
});

// ============= OTHER API ROUTES =============

app.get('/', (req, res) => {
    res.send('API is running! 🚀');
});

app.get('/api/test', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({ success: true, time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all doctors
app.get('/api/doctors', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                d.D_id, 
                d.D_name, 
                d.D_spec, 
                d.D_mail, 
                TO_CHAR(da.available_date, 'DD Mon YYYY') as available_date,  
                da.enter_time, 
                da.leave_time 
            FROM doctor d
            JOIN doctor_availability da ON da.D_id = d.D_id
            WHERE da.available_date > (NOW() AT TIME ZONE 'Asia/Kolkata')::date
                OR (da.available_date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date 
                AND da.leave_time > (NOW() AT TIME ZONE 'Asia/Kolkata')::time)
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error in /api/doctors:', err);
        res.status(500).json({ error: err.message });
    }
});
// Get patient reports
app.get('/api/reports/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const result = await db.query(
            `SELECT r.report_id, r.diagnosis, r.prescription, r.test_results, d.d_name as doctor_name
             FROM reports r
             JOIN doctor d ON r.d_id = d.d_id
             WHERE r.p_id = $1
             ORDER BY r.report_id DESC`,
            [patientId]
        );
        console.log('Rows found:', result.rows);
        //res.json(patientId);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching reports:', err);
        res.status(500).json({ error: err.message });
    }
});

// Add report
app.post('/api/reports', async (req, res) => {
    try {
        const { P_id, D_id, Diagnosis, Prescription, Test_results } = req.body;
        const result = await db.query(
            `INSERT INTO reports (P_id, D_id, Diagnosis, Prescription, Test_results)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING report_id`,
            [P_id, D_id, Diagnosis, Prescription, Test_results]
        );
        res.json({ success: true, report_id: result.rows[0].report_id });
    } catch (err) {
        console.error('Error adding report:', err);
        res.status(500).json({ error: err.message });
    }
});

// Log availability
app.post('/api/availability', async (req, res) => {
    try {
        const { D_id, Available_date, Enter_time, Leave_time } = req.body;
        const result = await db.query(
            `INSERT INTO doctor_availability (D_id, Available_date, Enter_time, Leave_time)
             VALUES ($1, $2, $3, $4)
             RETURNING availability_id`,
            [D_id, Available_date, Enter_time, Leave_time]
        );
        res.json({ success: true, availability_id: result.rows[0].availability_id });
    } catch (err) {
        console.error('Error logging availability:', err);
        res.status(500).json({ error: err.message });
    }
});


// Add preference
app.post('/api/preferences', async (req, res) => {
    try {
        const { P_id, Preference_date, Preference_time } = req.body;
        const result = await db.query(
            `INSERT INTO preference (P_id, Preference_date, Preference_time, Preference_status)
             VALUES ($1, $2, $3, 'pending')
             RETURNING preference_id`,
            [P_id, Preference_date, Preference_time]
        );
        res.json({ success: true, preference_id: result.rows[0].preference_id });
    } catch (err) {
        console.error('Error adding preference:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get preferences with patient names
app.get('/api/preferences', async (req, res) => {
    try {
        const result = await db.query(
            `SELECT p.preference_id, pt.P_id, TO_CHAR(p.preference_date, 'DD Mon YYYY') as preference_date , p.preference_time, p.preference_status,
                    pt.P_name as patient_name,
                    pt.P_id as patient_id
             FROM preference p
             JOIN patient pt ON p.P_id = pt.P_id
             WHERE p.preference_status = 'pending'
             ORDER BY p.preference_date, p.preference_time`
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching preferences:', err);
        res.status(500).json({ error: err.message });
    }
});

// Schedule appointment
app.post('/api/appointments', async (req, res) => {
    try {
        const { P_id, D_id, R_id, Appointment_date, Appointment_time } = req.body;
        const result = await db.query(
            `INSERT INTO appointment (P_id, D_id, R_id, Appointment_date, Appointment_time)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING Appointment_id`,
            [P_id, D_id, R_id, Appointment_date, Appointment_time]
        );
        
        // Update preference status to completed
        await db.query(
            `UPDATE preference 
             SET Preference_status = 'completed'
             WHERE P_id = $1`,
            [P_id]
        );
        
        res.json({ success: true, appointment_id: result.rows[0].appointment_id });
    } catch (err) {
        console.error('Error scheduling appointment:', err);
        res.status(500).json({ error: err.message });
    }
});

//get scheduled appointment info
app.get('/api/upcoming/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const result = await db.query(
            `SELECT a.appointment_id, 
                    TO_CHAR(a.appointment_date, 'DD Mon YYYY') as appointment_date,
                    a.appointment_time,
                    d.D_name as doctor_name,
                    d.D_spec as doctor_spec
             FROM appointment a
             JOIN doctor d ON a.D_id = d.D_id
             WHERE a.P_id = $1
             AND (a.appointment_date > (NOW() AT TIME ZONE 'Asia/Kolkata')::date
                    OR (a.appointment_date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date 
                    AND a.appointment_time > (NOW() AT TIME ZONE 'Asia/Kolkata')::time))
             AND a.appointment_status = 'Scheduled'
             ORDER BY a.appointment_date, a.appointment_time;`,
            [patientId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching upcoming appointments:', err);
        res.status(500).json({ error: err.message });
    }
});

// Update patient profile
app.put('/api/patients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { P_phone, P_age, P_blood, P_address } = req.body;
        
        // Check if patient exists
        const checkResult = await db.query('SELECT P_id FROM patient WHERE P_id = $1', [id]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        
        const result = await db.query(
            `UPDATE patient 
             SET P_phone = COALESCE($1, P_phone),
                 P_age = COALESCE($2, P_age),
                 P_blood = COALESCE($3, P_blood),
                 P_address = COALESCE($4, P_address)
             WHERE P_id = $5
             RETURNING P_id`,
            [P_phone, P_age, P_blood, P_address, id]
        );
        
        res.json({ success: true, patient_id: result.rows[0].p_id });
    } catch (err) {
        console.error('Error updating patient:', err);
        res.status(500).json({ error: err.message });
    }
});

// Update patient profile
app.put('/api/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { d_phone, d_spec } = req.body;
        
        // Check if patient exists
        const checkResult = await db.query('SELECT d_id FROM doctor WHERE d_id = $1', [id]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        
        const result = await db.query(
            `UPDATE Doctor 
             SET d_phone = COALESCE($1, d_phone),
                 d_spec = COALESCE($2, d_spec)
             WHERE d_id = $3
             RETURNING d_id`,
            [d_phone, d_spec, id]
        );
        
        res.json({ success: true, doctor_id: result.rows[0].d_id });
    } catch (err) {
        console.error('Error updating Doctor:', err);
        res.status(500).json({ error: err.message });
    }
});
//upcoming appointments for doctor
app.get('/api/appointments/:doctorId', async (req, res)=>{
    try{
        const { doctorId } = req.params;
        const result = await db.query(
            `SELECT a.appointment_id,
            TO_CHAR(a.appointment_date, 'DD Mon YYYY') as appointment_date,
            a.appointment_time,
            p.P_name as patient_name,
            p.P_id as patient_id
     FROM appointment a
     JOIN patient p ON a.P_id = p.P_id
     WHERE a.D_id = $1
     AND (a.appointment_date > (NOW() AT TIME ZONE 'Asia/Kolkata')::date
        OR (a.appointment_date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date 
        AND a.appointment_time > (NOW() AT TIME ZONE 'Asia/Kolkata')::time) )
     ORDER BY a.appointment_date, a.appointment_time`,
    [doctorId]

        );
        res.json(result.rows);
    } catch (err){
        console.error('Error fetching doctor appointments:', err);
        res.status(500).json({error: err.message });
    }
});
const PORT = process.env.PORT || 5000;

// Error handling for the server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`✅ Test: http://localhost:${PORT}/`);
    console.log(`✅ DB Test: http://localhost:${PORT}/api/test`);
    console.log(`✅ Auth endpoints available at /api/auth/signup and /api/auth/login`);
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please kill the process using this port or use a different port.`);
        process.exit(1);
    } else {
        console.error('❌ Server error:', error);
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server shut down');
        db.end(() => {
            console.log('✅ Database connection closed');
            process.exit(0);
        });
    });
});