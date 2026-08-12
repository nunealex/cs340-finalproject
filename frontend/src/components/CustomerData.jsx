// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team. Referenced previous student projects from CS290 as a REACT refresher. 
// AI Scope: AI tools were not used
// Contains the code for the Customer Data Component.
// Date: July 28 2026

import { useEffect, useState } from "react";
import Customers from "../pages/Customers";

function CustomerData() {
    const [customer, setCustomers] = useState([]);

    // Fetches the data to be added to the table
    useEffect(() => { async function fetchCustomers() {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-customers");
        const data = await res.json();
        setCustomers(data);
    }
    // Calls fetch function
    fetchCustomers();
    }, []);

    return (
        <>
            <Customers customer={customer}/>
        </>
    )
} export default CustomerData;