// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team. Referenced previous student projects from CS290 as a REACT refresher. 
// AI Scope: AI tools were not used
// Contains the code for the Invoice Data Component.
// Date: July 28 2026

import { useEffect, useState } from "react";
import Invoices from "../pages/Invoices";

function InvoiceData() {
    const [invoice, setInvoices] = useState([]);

    // Fetches the data to be added to the table
    useEffect(() => { async function fetchInvoice() {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-invoices");
        const data = await res.json();
        setInvoices(data);
    }
    // Calls fetch function
    fetchInvoice();
    }, []);

    return (
        <>
            <Invoices invoice={invoice}/>
        </>
    )
} export default InvoiceData;