const mongoose = require('mongoose');
const Employees = require('./employee');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const port = 3000;

//Replace the password in the line below
const uri =  "mongodb://root:0CnSO2cDKhasUDwOhg8motFf@172.21.240.209:27017";

mongoose.connect(uri,{'dbName':'employeeDB'});

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use("*",bodyParser.json());

// GET endpoint
app.get('/api/employees', async (req, res) => {
    const documents = await Employees.find();
    res.json(documents);
});

app.post('/api/add_employee', async (req, res) => {
    console.log(req);
    const data = req.body;
    const emp = new Employees({
      "emp_name": data['name'],
      "age": data['age'],
      "location": data['location'],
      "email": data['email']
    });
    // Save the employee to the database
    await emp.save();
    res.json({ message: 'Employee added successfully' });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});