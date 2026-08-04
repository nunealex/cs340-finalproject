{/*
// #Citation for the following JS file: App.jsx
// #Date: 07/27/2026
// #Adapted from Dr.Curry exploration "Web Application Technology" to include our web pages and include routes to our pages.
// #https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
// #No AI tools were used
// #Contains the skeleton code for the REACT app
*/}

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Customers from './pages/Customers';
import Stores from './pages/Stores';
import StoreInventory from './pages/StoreInventory';
import Invoices from './pages/Invoices';
import InvoiceDetails from './pages/InvoiceDetails';
import BoxSets from './pages/BoxSets';
import Genres from './pages/Genres';
import UpdateDetails from './pages/UpdateDetails';
import CreateInvoiceDetails from './pages/CreateInvoiceDetails';

// Components
import Navigation from './components/Navigation';
import CreateInvoice from './pages/CreateInvoice';

// Define the backend port and URL for API requests
const backendPort = 4029;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="/storeinventory" element={<StoreInventory />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/details" element={<InvoiceDetails />} />
                <Route path="/boxsets" element={<BoxSets />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/updatedetails" element={<UpdateDetails />}/>
                <Route path="/createdetails" element={<CreateInvoiceDetails />}/>
                <Route path="/newinvoice" element={<CreateInvoice />}/>
            </Routes>
        </>
    );

} export default App;