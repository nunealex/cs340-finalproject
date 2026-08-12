// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Adapted from Dr.Curry exploration "Web Application Technology" to include our web pages and include routes to them.
// Source: https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351 
// AI Scope: AI tools were not used
// Contains the skeleton code for the React app.
// Date: July 27 2026

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
import StoresData from './components/StoresData';
import CustomerData from './components/CustomerData';
import InvoiceDetailsData from './components/InvoiceDetailsData';
import StoreInventoryData from './components/StoreInventoryData';
import InvoiceData from './components/InvoiceData';
import BoxSetData from './components/BoxSetData';
import GenreData from './components/GenreData';

// Define the backend port and URL for API requests
const backendPort = 4029;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customers" element={<CustomerData />} />
                <Route path="/stores" element={<StoresData />} />
                <Route path="/storeinventory" element={<StoreInventoryData />} />
                <Route path="/invoices" element={<InvoiceData />} />
                <Route path="/details" element={<InvoiceDetailsData />} />
                <Route path="/boxsets" element={<BoxSetData />} />
                <Route path="/genres" element={<GenreData />} />
                <Route path="/updatedetails/:id" element={<UpdateDetails />}/>
                <Route path="/createdetails" element={<CreateInvoiceDetails />}/>
                <Route path="/newinvoice" element={<CreateInvoice />}/>
            </Routes>
        </>
    );

} export default App;