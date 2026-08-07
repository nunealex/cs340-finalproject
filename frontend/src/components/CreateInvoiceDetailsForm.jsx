{/*
// #Citation for the following JS file: CreatInvoiceDetailsForm.jsx
// #Date: 07/27/2026
// #Adapted from Dr.Curry exploration "Web Application Technology". Made a new function called CreateInvoiceDetailsForm and used Dr.Curry's form as a template for ours.
// #https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
// #No AI tools were used
// #Contains the code for the Create Invoice Details form.
*/}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateInvoiceDetailsForm = ({}) => {

    const [invoice, setInvoices] = useState([]);
    const [boxset, setBoxSet] = useState([]);

    const loadInvoices = async () => {
    const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-invoices");
    setInvoices(await res.json());
    };

    const loadBoxSets = async () => {
    const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-boxsets");
    setBoxSet(await res.json());
    };

    useEffect(() => {
        loadInvoices();
        loadBoxSets();
    }, []);
    
    const navigate = useNavigate();
    return (
        <>
        <h2>Enter Details for a new Invoice</h2>

        <form className='cuForm' type="button">

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

                {invoice.map(invoice => (
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
                id="invoice_detail_boxset"
            >
                <option value="">Select a Box Set</option>
                {boxset.map(boxset => (
                    <option 
                    key={boxset.boxSetID}
                    value={boxset.boxSetID}
                    >
                        {boxset.name}
                    </option>
                ))}
            </select>

            <button className="createButton" onClick={() => navigate('/details')}>Create</button>
        </form>
        </>
    );
};

export default CreateInvoiceDetailsForm;