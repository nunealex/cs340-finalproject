{/*
// #Citation for the following JS file: UpdateInvoiceDetailsForm.jsx
// #Date: 07/27/2026
// #Adapted from Dr.Curry exploration "Web Application Technology". Made a new function called UpdateInvoiceDetailsForm and used Dr.Curry's form as a template for ours.
// #https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
// #No AI tools were used
// #Contains the code for the Update Invoice Details form.
*/}

import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

export const UpdateInvoiceDetailsForm = ({invoiceDetail}) => {

    const navigate = useNavigate();
    const [quantity, setQty] = useState(invoiceDetail.quantity);
    const [price, setPrice] = useState(invoiceDetail.price);
    const [selectedBoxSet, setSelectedBoxSet] = useState(invoiceDetail.boxSetID);
    const [invoiceID, setInvoiceID] = useState(invoiceDetail.invoiceID);

    const [invoiceArr, setInvoices] = useState([]);
    const [boxSetArr, setBoxSet] = useState([]);
    
    const loadInvoices = async () => {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-invoices");
        setInvoices(await res.json());
    };
    
    const loadBoxSet = async () => {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-boxsets");
        setBoxSet(await res.json());
    };
    
    useEffect(() => {
        loadInvoices();
        loadBoxSet();
    }, []);

    return (
        <>
            <h2>Update Invoice Details</h2>

            <form className="cuForm" type='button'>

                <label htmlFor="invoice_detail_qty">Quantity: </label>
                <input
                    type="number"
                    value={quantity}
                    name="invoice_detail_quantity"
                    id="invoice_detail_quantity"
                    onChange={(e) => setQty(e.target.value)}
                />

                <label htmlFor="invoice_detail_price">Price: </label>
                <input
                    type="number"
                    value={price}
                    name="invoice_detail_price"
                    id="invoice_detail_price"
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label htmlFor="invoice_id">Invoices: </label>
            <select
                name="invoice_id"
                value={invoiceID}
                id="invoice_id"
                onChange={(e) => setInvoiceID(e.target.value)}
            >
                <option value="">Select an Invoice</option>

                {invoiceArr.map(invoice => (
                    <option 
                        key={invoice.invoiceID}
                        value={invoice.invoiceID}
                    >
                        {invoice.invoiceID}
                    </option>
                ))}
                
            </select>

            <label htmlFor="invoice_detail_boxset">Box Set: </label>
            <select
                name="invoice_detail_boxset"
                value={selectedBoxSet}
                id="invoice_detail_boxset"
                onChange={(e) => setSelectedBoxSet(e.target.value)}
            >
                <option value="">Select a Box Set</option>
                {boxSetArr.map(boxset => (
                    <option 
                    key={boxset.boxSetID}
                    value={boxset.boxSetID}
                    >
                        {boxset.name} - {boxset.edition}
                    </option>
                ))}
            </select>
                <button onClick={() => navigate('/details')}>Update</button>
            </form>
        </>
    )

}