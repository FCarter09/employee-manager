const mysql = require('mysql2');

// Connect to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MYSQL username
        user: 'FCarter',
        // Your MySQL password
        password: 'Btown610',
        database: 'employee_manager'
    },
    console.log('Connected to the employee_manager database.')
);

module.exports = db;