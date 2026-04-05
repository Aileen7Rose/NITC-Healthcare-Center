const { Pool } = require('pg');

// Use the same method that works with sudo -u postgres
const db = new Pool({
    user: 'postgres',
    database: 'nitc healthcare',
    // Use the default socket path
    host: '/var/run/postgresql',
    // No password
});

// Test connection
db.connect((err, client, release) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        console.error('   But server will continue running');
    } else {
        console.log('✅ Connected to PostgreSQL database');
        release();
    }
});

module.exports = db;