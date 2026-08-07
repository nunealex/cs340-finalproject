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