// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Initial function was created by the team and structure was updated based on info received from AI.
// AI Scope: Used AI to debug reset and deleteRow to ensure that everything loads in real-time.
// Prompt Overview: "I have a reset and deleteRow that are working but do not update in real-time. Can you please point me in the right direction logically. Do not just provide a solution."
// Source: https://claude.ai
// Date: July 29 2026

import { useEffect, useState } from "react";
import InvoiceDetails from "../pages/InvoiceDetails";

function InvoiceDetailsData() {
    const [invoiceDetail, setInvoiceDetails] = useState([]);

    // Fetches the data to be added to the table
    const loadData = async () => {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-invoice-details");
        const data = await res.json();
        setInvoiceDetails(data);
    };
    // Calls fetch function
    useEffect(() => {
        loadData();
    }, []);

    //Handles deletion of the specified row when the button is clicked and reloads the table data
    const deleteRow = async (id) => {
        await fetch(`http://classwork.engr.oregonstate.edu:4029/delete-invoice-detail/${id}`);
        await loadData();
    }

    //Handles the resetting of the database when the button is clicked and reloads table data
    const reset = async () => {
        await fetch("http://classwork.engr.oregonstate.edu:4029/reset");
        await loadData();
    }

    return (
        <>
            <InvoiceDetails 
            invoiceDetail={invoiceDetail}
            deleteRow={deleteRow}
            reset={reset}/>
        </>
    )
} export default InvoiceDetailsData;