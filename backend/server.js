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

// Environmental Variable for password security
require('dotenv').config();

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
    res.send('Group 4 dev server is running!')
});

// Read data from Stores
app.get('/read-stores', async (req, res) => {
    const query = `SELECT
    Stores.storeID,
    Stores.storeName,
    Stores.street,
    Stores.city,
    Stores.state,
    Stores.zip,
    Stores.phone,
    Stores.email
    FROM Stores;`;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error("Error getting data from database.", error);
        res.status(500).send("An error occured while fetching data from database.");
    }
});

// Read data from Customers
app.get('/read-customers', async (req, res) => {
    const query = `SELECT
    Customers.customerID,
    Customers.firstName,
    Customers.lastName,
    Customers.street,
    Customers.city,
    Customers.state,
    Customers.zip,
    Customers.phone,
    Customers.email
    FROM Customers;`;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error("Error getting data from database.", error);
        res.status(500).send("An error occured while fetching data from database.");
    }
});

// Read data from InvoiceDetails
app.get('/read-invoice-details', async (req, res) => {
    const query = `SELECT
    InvoiceDetails.invoiceDetailID,
    CONCAT(BoxSets.name, ' - ', BoxSets.edition) AS BoxSet,
    CONCAT('Invoice #', Invoices.invoiceID,' ', Customers.lastName,' ', DATE(Invoices.invoiceDate)) AS Invoice,
    Invoices.invoiceID,
    InvoiceDetails.quantity,
    InvoiceDetails.price
    FROM InvoiceDetails
    INNER JOIN BoxSets ON InvoiceDetails.boxSetID = BoxSets.boxSetID
    INNER JOIN Invoices ON InvoiceDetails.invoiceID = Invoices.invoiceID
    INNER JOIN Customers ON Invoices.customerID = Customers.customerID
    ORDER BY InvoiceDetails.invoiceDetailID ASC;`;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error("Error getting data from database.", error);
        res.status(500).send("An error occured while fetching data from database.");
    }
});

// Read data from Store Inventory
app.get('/read-inventory', async (req, res) => {
    const query = `SELECT
    StoreInventory.inventoryID,
    Stores.storeName AS Store,
    CONCAT(BoxSets.name, ' - ', BoxSets.edition) AS BoxSet,
    StoreInventory.quantity
    FROM StoreInventory
    INNER JOIN Stores ON StoreInventory.storeID = Stores.storeID
    INNER JOIN BoxSets ON StoreInventory.boxSetID = BoxSets.boxSetID
    ORDER BY StoreInventory.inventoryID;`;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error("Error getting data from database.", error);
        res.status(500).send("An error occured while fetching data from database.");
    }
});

// Read specific Invoice
app.get('/read-invoice-detail/:id', async (req, res) => {
    const query = `SELECT 
    InvoiceDetails.invoiceDetailID,
    InvoiceDetails.boxSetID,
    InvoiceDetails.invoiceID,
    InvoiceDetails.quantity,
    InvoiceDetails.price
    FROM InvoiceDetails
    WHERE InvoiceDetails.invoiceDetailID = ?`;

    try {
        const [results] = await db.query(query, [req.params.id]);
        res.json(results);
    } catch (error) {
        console.error("Error getting data from database.", error);
        res.status(500).send("An error occured while fetching data from database.");
    }
});

// Read price for specific box set
app.get('/read-boxset-price/:id', async (req, res) => {
    const query = `SELECT 
    BoxSets.salePrice 
    FROM BoxSets
    WHERE BoxSets.boxSetID = ?;`;

    try {
        const [results] = await db.query(query, [req.params.id]);
        res.json(results);
    } catch (error) {
        console.error("Error getting data from database.", error);
        res.status(500).send("An error occured while fetching data from database.");
    }
});

// Read data from Invoices
app.get('/read-invoices', async (req, res) => {
    const query = `SELECT
    Invoices.invoiceID,
    CONCAT(Customers.lastName, ', ', Customers.firstName) AS Customer,
    Customers.lastName,
    Stores.storeName AS Store,
    Invoices.invoiceDate
    FROM Invoices
    INNER JOIN Customers ON Invoices.customerID = Customers.customerID
    INNER JOIN Stores ON Invoices.storeID = Stores.storeID;`;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error("Error getting data from database.", error);
        res.status(500).send("An error occured while fetching data from database.");
    }
});

// Read data from BoxSets
app.get('/read-boxsets', async (req, res) => {
    const query = `SELECT
    BoxSets.boxSetID,
    Genres.genreName AS genre,
    BoxSets.name,
    BoxSets.edition,
    BoxSets.releaseYear,
    BoxSets.cost,
    BoxSets.salePrice
    FROM BoxSets
    INNER JOIN Genres ON BoxSets.genreID = Genres.genreID;`;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error("Error getting data from database.", error);
        res.status(500).send("An error occured while fetching data from database.");
    }
});

// Read data from Genres
app.get('/read-genre', async (req, res) => {
    const query = `SELECT
    Genres.genreID,
    Genres.genreName,
    Genres.description
    FROM Genres;`;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error("Error getting data from database.", error);
        res.status(500).send("An error occured while fetching data from database.");
    }
});

// Delete Invoice Detail
app.get('/delete-invoice-detail/:invoiceID', async function (req, res) {
    try {
        const query = `CALL sp_delete_invoicedetail(${req.params.invoiceID});`
      await db.query(query);
      res.status(200).send("Invoice Detail Deleted Successfully.");
    } catch (error) {
      console.error("Error deleting Invoice Detail", error);
        // Send a generic error message to the browser
      res.status(500).send("An error occurred while deleting the invoice detail.");
    }
});

// Reset query route
app.get('/reset', async function (req, res) {
    try {
        const reset = 'CALL sp_load_trading_card_box_set_system();'
        await db.query(reset);

        res.status(200).send("Database reset successful.");
    } catch (error) {
        console.error("Error executing reset procedure.", error)
        // Send message to browser
        res.status(500).send("An error occured while executing reset procedure.")
    }

});

// Create new invoice route
app.post('/create-invoice', async function (req, res) {
    try {
        const newCustID = req.body.customerID;
        const store = req.body.storeID;
        const createInvoice = `CALL sp_create_invoice(${newCustID}, ${store});`
        await db.query(createInvoice);

        res.status(200).send("New invoice created successfully.");
    } catch (error) {
        console.error("Error executing create invoice procedure.", error)
        // Send message to browser
        res.status(500).send("An error occured while creating new invoice.")
    }

});

// Create new invoice detail route
app.post('/create-invoice-details', async function (req, res) {
    try {
        const price = req.body.price;
        const qty = req.body.quantity;
        const selectedInvoice = req.body.invoiceID;
        const selectedBoxSet = req.body.boxsetID;
        const createInvoiceDetail = `CALL sp_create_invoicedetail(${selectedBoxSet}, ${selectedInvoice}, ${qty}, ${price});`
        await db.query(createInvoiceDetail);

        res.status(200).send("New invoice details created successfully.");
    } catch (error) {
        console.error("Error executing create invoice detail procedure.", error)
        // Send message to browser
        res.status(500).send("An error occured while creating new invoice details.")
    }

});

// Create new invoice detail route
app.post('/update-details', async function (req, res) {
    try {
        const price = req.body.price;
        const qty = req.body.quantity;
        const selectedInvoice = req.body.invoiceID;
        const selectedBoxSet = req.body.boxsetID;
        const selectedInvoiceDetail = req.body.invoiceDetailID;
        const updateInvoiceDetail = `CALL sp_update_invoicedetail(${selectedInvoiceDetail}, ${selectedBoxSet}, ${selectedInvoice}, ${qty}, ${price});`
        await db.query(updateInvoiceDetail);

        res.status(200).send("Updated invoice details successfully.");
    } catch (error) {
        console.error("Error executing update invoice detail procedure.", error)
        // Send message to browser
        res.status(500).send("An error occured while updating invoice details.")
    }

});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});