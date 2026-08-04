import CreateInvoiceDetailsForm from "../components/CreateInvoiceDetailsForm";
import { UpdateInvoiceDetailsForm } from "../components/UpdateInvoiceDetails";
import {useNavigate} from 'react-router-dom'

function InvoiceDetails() {
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
                        <th>Box Set ID</th>
                        <th>Invoice ID</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>3</td>
                        <td>1</td>
                        <td>2</td>
                        <td>149.99</td>
                        <td><button className="update" onClick={() => navigate('/updatedetails')}>Update</button></td>
                        <td><button className="delete">Delete</button></td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>3</td>
                        <td>2</td>
                        <td>3</td>
                        <td>149.99</td>
                        <td><button className="update" onClick={() => navigate('/updatedetails')}>Update</button></td>
                        <td><button className="delete">Delete</button></td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>4</td>
                        <td>3</td>
                        <td>2</td>
                        <td>99.99</td>
                        <td><button className="update" onClick={() => navigate('/updatedetails')}>Update</button></td>
                        <td><button className="delete">Delete</button></td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>1</td>
                        <td>3</td>
                        <td>2</td>
                        <td>249.99</td>
                        <td><button className="update" onClick={() => navigate('/updatedetails')}>Update</button></td>
                        <td><button className="delete">Delete</button></td>
                    </tr>
                </tbody>
            </table>
            <button className="createButton" onClick={() => navigate('/createdetails')}>Create New Invoice Details</button>

        </>
    )
} export default InvoiceDetails;