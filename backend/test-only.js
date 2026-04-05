const { Pool } = require('pg');

const db = new Pool({
    user: 'postgres',
    database: 'nitc healthcare',
    host: '/var/run/postgresql',
});

async function test() {
    try {
        const result = await db.query('SELECT NOW()');
        console.log('✅ Database works! Time:', result.rows[0].now);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

test();