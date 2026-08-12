// #Citation for the following JS file: db-connector.js
// #Date: 07/27/2026
// #Copied from Dr.Curry exploration "Web Application Technology" and will be adapted with our database details once we connect the database
// #https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
// #No AI tools were used
// #Contains the code to connect our backend to our database

// Environmental Variable for Database Key
const database_key = require('dotenv').config();

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : process.env.DB_USERNAME,
    password          : process.env.DB_PASSWORD,
    database          : process.env.DB_USERNAME
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;