// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team.
// AI Scope: AI tools were not used
// Contains the code for the Invoices page.
// Date: July 27, 2026

import CreateInvoiceForm from "../components/CreateInvoiceForm";
import InvoiceData from "../components/InvoiceData";
import { useNavigate } from "react-router-dom";

function Invoices({ invoice }) {
    const navigate = useNavigate();

    return (
        <>
            <h1>Invoices</h1>
            <div className="invoicesDescription">
                <p>Invoices</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Customer</th>
                        <th>Store</th>
                        <th>Invoice Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Maps data to a table*/}
                    {invoice.map(invoice => (
                        <tr key={invoice.invoiceID}>
                            <td>{invoice.invoiceID}</td>
                            <td>{invoice.Customer}</td>
                            <td>{invoice.Store}</td>
                            <td>{new Date(invoice.invoiceDate).toLocaleString("en-US", {timeZone: "PST"})}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="createButton" onClick={() => navigate('/newinvoice')}>Create New Invoice</button>
        </>
    )
} export default Invoices;