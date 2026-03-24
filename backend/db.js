const mysql= require('mysql2');
require('dotenv').config(); // config activates the dotenv package that reads our .env file
const db= mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'nitc_healthcare'
});
db.connect((err)=> { // err is a callback fn- code that runs after the db connection attempt is over
    if(err){
        console.error('DB connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL database');
});
module.exports= db; //share db connection w other files