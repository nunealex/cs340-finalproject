{/*
// #Citation for the following JS file: UpdateInvoiceDetailsForm.jsx
// #Date: 07/27/2026
// #Adapted from Dr.Curry exploration "Web Application Technology". Made a new function called UpdateInvoiceDetailsForm and used Dr.Curry's form as a template for ours.
// #https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
// #No AI tools were used
// #Contains the code for the Update Invoice Details form.
*/}

import {useState} from 'react';
import { useNavigate } from 'react-router-dom'

export const UpdateInvoiceDetailsForm = ({invoiceDetail}) => {

    const navigate = useNavigate();
    // const [quantity, setQty] = useState(invoiceDetailsToUpdate.qty);
    // const [price, setPrice] = useState(invoiceDetailsToUpdate.price);
    // const [total, setTotal] = useState(invoiceDetailsToUpdate.total);
    // const [boxSet, setBoxSet] = useState(invoiceDetailsToUpdate.boxset);
    // const [invoice, setInvoice] = useState(invoiceDetailsToUpdate.invoice);


    return (
        <>
            <h2>Update Invoice Details</h2>

            <form className="cuForm" type='button'>
                <label htmlFor="invoice_date">Date</label>
                <input
                    type="date"
                    name="invoice_date"
                    id="incoide_date"
                />

                <label htmlFor="invoice_detail_qty">Quantity: </label>
                <input
                    type="number"
                    name="invoice_detail_quantity"
                    id="invoice_detail_quantity"
                />

                <label htmlFor="invoice_detail_price">Price: </label>
                <input
                    type="number"
                    name="invoice_detail_price"
                    id="invoice_detail_price"
                />

                <label htmlFor="invoice_id">Invoices: </label>
                <select
                    name="invoice_id"
                    id="invoice_id"
                >
                    <option value="">Select an Invoice</option>
                    <option value="NULL">&lt; None &gt;</option>
                    {/* {homeworlds.map((homeworld, index) => (
                        <option value={homeworld.id} key={index}>{homeworld.name}</option>
                    ))} */}
                </select>

                <label htmlFor="invoice_detail_boxset">Box Set: </label>
                <select
                    name="invoice_detail_boxset"
                    id="invoice_detail_boxset"
                >
                    <option value="">Select a Box Set</option>
                    <option value="NULL">&lt; None &gt;</option>
                </select>
                <button onClick={() => navigate('/details')}>Update</button>
            </form>
        </>
    )

}