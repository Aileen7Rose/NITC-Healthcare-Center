const express= require('express');
const cors = require('cors');
const db= require('./db'); // db contains MySQL so we can use it to run queries anywhere in this file
require('dotenv').config();
const app= express(); //creates server
app.use(cors());
app.use(express.json());// middleware applied to every request
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running');
});
app.get('/doctors', (req, res)=>{
    const query= 'SELECT D_id, D_name, D_spec, D_phone FROM doctor'; // stores sql query as a string
    db.query(query, (err, results)=>{
        if(err) return res.status(500).json({error: err.message});
        res.json(results); // query sends results back as json to whoever made the request
    });
});

app.post('/preference', (req, res)=>{
    const { P_id, Preference_date, Preference_time } = req.body; //destructuring= extracting values from an object
    if(!P_id || !Preference_date || !Preference_time){
        return res.status(400).json({error: 'Missing required fields'}); //input validation
    }
    const query=  `INSERT INTO preference (P_id, Preference_date, Preference_time, Preference_status) VALUES (?, ?, ?, 'Pending')`;
    db.query(query, [P_id, Preference_date, Preference_time], (err, results) => {
        if(err) return res.status(500).json({error: err.message });
        res.json({message: 'Preference added successfully', id: results.insertId }); // results.insertId is auto generated id of newly created row for frontend
    });
});
//view reports for a patient
app.get('/reports/:P_id', (req, res) => {
    const { P_id }= req.params;
    const query= 'SELECT * FROM reports WHERE P_id = ?';
    db.query(query, [P_id], (err, results) =>{
        if (err) return res.status(500).json({error: err.message});
        res.json(results);
    });
});
//view doc availability
app.get('/availability', (req, res)=> {
    const query= 'SELECT * FROM doctor_availability';
    db.query(query, (err, results)=>{
        if(err) return res.status(500).json({error: err.message});
        res.json(results);
    });
});
const PORT= process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); // app.listen starts the server