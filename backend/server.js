// #Citation for the following JS file: server.js
// #Date: 07/27/2026
// #Copied from Dr.Curry exploration "Web Application Technology" and updated with our desired port number
// #https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
// #No AI tools were used
// #Contains the code to start and run the web server

// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 4029;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/', async (req, res) => {
    res.send('Group 4 server is running!')
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});