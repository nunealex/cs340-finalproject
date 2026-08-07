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
                            <td>{invoice.invoiceDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="createButton" onClick={() => navigate('/newinvoice')}>Create New Invoice</button>
        </>
    )
} export default Invoices;