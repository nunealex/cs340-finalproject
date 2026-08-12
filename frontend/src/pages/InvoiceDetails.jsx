// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team.
// AI Scope: AI tools were not used
// Contains the code for the Invoice Details page.
// Date: July 27, 2026

import CreateInvoiceDetailsForm from "../components/CreateInvoiceDetailsForm";
import { UpdateInvoiceDetailsForm } from "../components/UpdateInvoiceDetails";
import {Link, useNavigate} from 'react-router-dom'

function InvoiceDetails({ invoiceDetail, deleteRow, reset }) {
    const navigate = useNavigate();

    return (
        <>
            <h1>Invoice Details</h1>
            <div className="invoiceDetailsDescription">
                <p>Invoice Details</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Invoice Detail ID</th>
                        <th>Box Set</th>
                        <th>Invoice</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Maps data to a table*/}
                    {invoiceDetail.map(invoiceDetail => (
                        <tr key={invoiceDetail.invoiceDetailID}>
                            <td>{invoiceDetail.invoiceDetailID}</td>
                            <td>{invoiceDetail.BoxSet}</td>
                            <td>{invoiceDetail.Invoice}</td>
                            <td>{invoiceDetail.quantity}</td>
                            <td>{invoiceDetail.price}</td>
                            <td><button className="update" onClick={() => navigate(`/updatedetails/${invoiceDetail.invoiceDetailID}`)}>Update</button></td>
                            <td><button className="delete" onClick={() => deleteRow(invoiceDetail.invoiceDetailID)} >Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="createButton" onClick={() => navigate('/createdetails')}>Add New Details to Invoice</button>
            <button className="resetButton" onClick={() => reset()}>Reset Database</button>


        </>
    )
} export default InvoiceDetails;