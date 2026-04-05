const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '1h' }
    );
};

const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user exists (check all role tables)
        let existingUser = null;
        
        if (role === 'patient') {
            const result = await db.query(
                'SELECT P_id as id FROM patient WHERE P_mail = $1',
                [email]
            );
            existingUser = result.rows[0];
        } else if (role === 'doctor') {
            const result = await db.query(
                'SELECT D_id as id FROM doctor WHERE D_phone = $1',
                [email]
            );
            existingUser = result.rows[0];
        } else if (role === 'receptionist') {
            const result = await db.query(
                'SELECT R_id as id FROM receptionist WHERE R_mail = $1',
                [email]
            );
            existingUser = result.rows[0];
        }

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let result;
        let userId;

        // Insert into appropriate table
        if (role === 'patient') {
            result = await db.query(
                'INSERT INTO patient (P_name, P_mail, P_password) VALUES ($1, $2, $3) RETURNING P_id',
                [name, email, hashedPassword]
            );
            userId = result.rows[0].p_id;
        } else if (role === 'doctor') {
            result = await db.query(
                'INSERT INTO doctor (D_name, D_phone, D_password) VALUES ($1, $2, $3) RETURNING D_id',
                [name, email, hashedPassword]
            );
            userId = result.rows[0].d_id;
        } else if (role === 'receptionist') {
            result = await db.query(
                'INSERT INTO receptionist (R_name, R_mail, R_password) VALUES ($1, $2, $3) RETURNING R_id',
                [name, email, hashedPassword]
            );
            userId = result.rows[0].r_id;
        }

        res.status(201).json({
            id: userId,
            name,
            email,
            role,
            token: generateToken(userId, role)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check patient table
        let user = null;
        let role = null;
        
        let result = await db.query(
            'SELECT P_id as id, P_name as name, P_mail as email, P_password as password FROM patient WHERE P_mail = $1',
            [email]
        );
        
        if (result.rows.length > 0) {
            user = result.rows[0];
            role = 'patient';
        }
        
        // Check doctor table if not found
        if (!user) {
            result = await db.query(
                'SELECT D_id as id, D_name as name, D_phone as email, D_password as password FROM doctor WHERE D_phone = $1',
                [email]
            );
            if (result.rows.length > 0) {
                user = result.rows[0];
                role = 'doctor';
            }
        }
        
        // Check receptionist table if not found
        if (!user) {
            result = await db.query(
                'SELECT R_id as id, R_name as name, R_mail as email, R_password as password FROM receptionist WHERE R_mail = $1',
                [email]
            );
            if (result.rows.length > 0) {
                user = result.rows[0];
                role = 'receptionist';
            }
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: role,
            token: generateToken(user.id, role)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { signup, login };