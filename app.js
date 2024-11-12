const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;
// Enable CORS for all origins or configure specific origins
app.use(cors()); // Allows all origins by default

// Middleware to parse JSON requests
app.use(express.json());

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // MySQL username
  password: 'root', // MySQL password
  database: 'devansh'    // Database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
  console.log('Welcome to Devansh Web Server....');
});

// API endpoint to insert a student record
app.post('/add-student', (req, res) => {
  const { enrollNo, name, marks, age } = req.body;
  console.log('Enrollment No:',enrollNo);
  console.log('Name:',name);
  console.log('Marks:',marks);
  console.log('Age:',age);
  
  if (!enrollNo || !name || !marks || !age) {
    return res.status(400).json({ error: 'Please provide name, marks, and age.' });
  }

  const query = 'INSERT INTO student (student_id,student_name, marks, age) VALUES (?,?, ?, ?)';
  db.query(query, [enrollNo, name, marks, age], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).json({ error: 'Database error.' });
    }
    console.log('Student record added in mySQL Database');
    res.status(201).json({ message: 'Student record added successfully.', studentId: result.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
