// #Citation for the following JS file: reactServer.js
// #Date: 07/27/2026
// #Adapted from Dr.Curry exploration "Web Application Technology" and updated to work with Express 5.2.1
// #https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
// #AI tools were used to get the router handler to properly work in Express 5.2.1
// #Contains the code to start and run the front end REACT server

// ########################################
// ########## SETUP

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = 5183;

// ########################################
// ########## ROUTE HANDLERS

// Handles any requests that don't match the ones above to return the React app
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// ########################################
// ########## LISTENER

app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});