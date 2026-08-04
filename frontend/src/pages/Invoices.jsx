import CreateInvoiceForm from "../components/CreateInvoiceForm";
import { useNavigate } from "react-router-dom";

function Invoices() {
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
                        <th>Customer ID</th>
                        <th>Store ID</th>
                        <th>Invoice Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>3</td>
                        <td>1</td>
                        <td>2026-05-13 13:43:58 </td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>1</td>
                        <td>2</td>
                        <td>2026-04-17 15:16:54 </td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>2</td>
                        <td>3</td>
                        <td>2025-09-24 11:33:55  </td>
                    </tr>
                </tbody>
            </table>
            <button className="createButton" onClick={() => navigate('/newinvoice')}>Create New Invoice</button>
        </>
    )
} export default Invoices;