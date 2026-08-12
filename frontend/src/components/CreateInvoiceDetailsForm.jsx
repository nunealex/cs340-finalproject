// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Adapted from Dr.Curry exploration "Web Application Technology". Made a new function called CreateInvoiceDetailsForm and used Dr.Curry's form as a template for ours.
// Source: https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351 
// AI Scope: AI tools were used for debugging.
// Prompt Overview: ""
// Contains the code for the Create Invoice Details Form component.
// Date: July 27 2026

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateInvoiceDetailsForm = ({}) => {

    const [invoice, setInvoices] = useState([]);
    const [boxset, setBoxSet] = useState([]);
    const [qty, setQty] = useState();
    const [price, setPrice] = useState();
    const [selectedInvoice, setSelInvoice] = useState();
    const [selectedBoxSet, setSelBoxSet] = useState();

    //Fetches Invoice data for drop down
    const loadInvoices = async () => {
    const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-invoices");
    setInvoices(await res.json());
    };

    //Fetches Box Set data for drop down
    const loadBoxSets = async () => {
    const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-boxsets");
    setBoxSet(await res.json());
    };

    //Handles the change in Box Set value from drop down menu
    const handleBoxSetChange = async (idVal) => {
        setSelBoxSet(idVal);
        //Fetches price for selected box set to pre-fill price
        const res = await fetch(`http://classwork.engr.oregonstate.edu:4029/read-boxset-price/${idVal}`);
        const boxSetPrice = await res.json();
        //Sets the price value when a box set is selected
        setPrice(boxSetPrice[0].salePrice);
    }

    //Stops user from entering a negative number for price
    const handlePriceChange = () => {
        if (price.charAt(0) === "-" || !price){
            window.alert("Invalid price")
            navigate("/details");
        } else {
            setPrice(price);
        }
    };

     //Stops user from entering a negative number for quantity
    const handleQtyChange = () => {
        if (qty.charAt(0) === "-" || !qty){
            window.alert("Invalid quantity")
            navigate("/details");
        } else {
            setQty(qty);
        }
    };

    // Loads drop downs
    useEffect(() => {
        loadInvoices();
        loadBoxSets();
    }, []);

    //Handles the update procedure when the button is clicked and navigates back to invoice details
    const CreateInvoiceDetails = async (event) => {
        event.preventDefault();
        const newDetails = {price: price, quantity: qty, invoiceID: selectedInvoice, boxsetID: selectedBoxSet};
        const res = await fetch (
            "http://classwork.engr.oregonstate.edu:4029/create-invoice-details", {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newDetails)
            }
        );
        navigate("/details");
    }
    
    const navigate = useNavigate();
    return (
        <>
        <h2>Enter Details for a new Invoice</h2>

        <form className='cuForm' type="button">

            <label htmlFor="invoice_id">Invoices: </label>
            <select
                name="invoice_id"
                id="invoice_id"
                onChange={(e) => {setSelInvoice(e.target.value)}}
            >
                <option value="">Select an Invoice</option>

                {invoice.map(invoice => (
                    <option 
                        key={invoice.invoiceID}
                        value={invoice.invoiceID}
                    >
                        Invoice #{invoice.invoiceID} {invoice.lastName} {new Date(invoice.invoiceDate).toLocaleString("en-US", {timeZone: "PST"})}
                    </option>
                ))}
                
            </select>

            <label htmlFor="invoice_detail_boxset">Box Set: </label>
            <select
                name="invoice_detail_boxset"
                id="invoice_detail_boxset"
                onChange={(e) => {handleBoxSetChange(e.target.value)}}
            >
                <option value="">Select a Box Set</option>
                {boxset.map(boxset => (
                    <option 
                    key={boxset.boxSetID}
                    value={boxset.boxSetID}
                    >
                        {boxset.name} - {boxset.edition}
                    </option>
                ))}
            </select>

            <label htmlFor="invoice_detail_qty">Quantity: </label>
            <input
                type="number"
                name="invoice_detail_quantity"
                id="invoice_detail_quantity"
                value={qty}
                //Updates quantity in quantity field live
                onChange={(e) => {setQty(e.target.value)}}
                 //Runs quantity validation to check for negative or empty values
                onBlur={(e) => handleQtyChange(qty)}
            />

            <label htmlFor="invoice_detail_price">Price: </label>
            <input
                type="number"
                name="invoice_detail_price"
                id="invoice_detail_price"
                value={price}
                //Updates price in price field live
                onChange={(e) => setPrice(e.target.value)}
                //Runs price validation to check for negative or empty values
                onBlur={(e) => handlePriceChange(price)}
            />

            <button className="createButton" onClick={(e) => {CreateInvoiceDetails(e)}}>Create</button>
            <button className="cancelButton" onClick={(e) => {navigate("/details")}}>Cancel</button>
        </form>
        </>
    );
};

export default CreateInvoiceDetailsForm;