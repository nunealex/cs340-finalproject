// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Adapted from Dr.Curry exploration "Web Application Technology". Made a new function called UpdateInvoiceDetailsForm and used Dr.Curry's form as a template for ours.
// Source: https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351 
// AI Scope: AI tools were used for debugging.
// Prompt Overview: ""
// Contains the code for the Update Invoice Details Form component.
// Date: July 27 2026

import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

export const UpdateInvoiceDetailsForm = ({invoiceDetail}) => {

    const navigate = useNavigate();
    const [quantity, setQty] = useState(invoiceDetail.quantity);
    const [price, setPrice] = useState(invoiceDetail.price);
    const [selectedBoxSet, setSelectedBoxSet] = useState(invoiceDetail.boxSetID);
    const [invoiceDetailID, setInvoiceDetailID] = useState(invoiceDetail.invoiceDetailID);
    const [invoiceID, setInvoiceID] = useState(invoiceDetail.invoiceID);

    //Stores the arrays of invoices and box sets to fill drop down menus
    const [invoiceArr, setInvoices] = useState([]);
    const [boxSetArr, setBoxSet] = useState([]);
    
    //Fetches the invoice data for the drop down menus
    const loadInvoices = async () => {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-invoices");
        setInvoices(await res.json());
    };
    
    //Fetches the box set data for drop down menus
    const loadBoxSet = async () => {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-boxsets");
        setBoxSet(await res.json());
    };
    
    //Handles the change in Box Set value from drop down menu
    const handleBoxSetChange = async (idVal) => {
        setSelectedBoxSet(idVal);
        //Fetches price for selected box set to pre-fill price
        const res = await fetch(`http://classwork.engr.oregonstate.edu:4029/read-boxset-price/${idVal}`);
        const boxSetPrice = await res.json();
        //Sets the price value when a box set is selected
        setPrice(boxSetPrice[0].salePrice);
    }

    //Stops user from entering a negative number
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
        if (quantity.charAt(0) === "-" || !quantity){
            window.alert("Invalid quantity")
            navigate("/details");
        } else {
            setQty(quantity);
        }
    };

    //Loads the data for the drop down menus
    useEffect(() => {
        loadInvoices();
        loadBoxSet();
    }, []);

    //Handles update procedure when the button is pressed and navigates back to the invoice details page.
    const UpdateInvoiceDetails = async (event) => {
        event.preventDefault();
        const updatedDetails = {invoiceDetailID: invoiceDetailID, price: price, quantity: quantity, invoiceID: invoiceID, boxsetID: selectedBoxSet};
        const res = await fetch (
            "http://classwork.engr.oregonstate.edu:4029/update-details", {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(updatedDetails)
            }
        );
        navigate("/details");
    }

    return (
        <>
            <h2>Update Invoice Details</h2>

            <form className="cuForm" type='button'>

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
                            Invoice #{invoice.invoiceID} {invoice.lastName} {new Date(invoice.invoiceDate).toLocaleString("en-US", {timeZone: "PST"})}
                        </option>
                    ))}
                    
                </select>

                <label htmlFor="invoice_detail_boxset">Box Set: </label>
                <select
                    name="invoice_detail_boxset"
                    value={selectedBoxSet}
                    id="invoice_detail_boxset"
                    onChange={(e) => handleBoxSetChange(e.target.value)}
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

                <label htmlFor="invoice_detail_qty">Quantity: </label>
                <input
                    type="number"
                    min="0"
                    value={quantity}
                    name="invoice_detail_quantity"
                    id="invoice_detail_quantity"
                    value={quantity}
                    //Updates quantity in quantity field live
                    onChange={(e) => {setQty(e.target.value)}}
                    //Runs quantity validation to check for negative or empty values
                    onBlur={(e) => handleQtyChange(quantity)}
                />

                <label htmlFor="invoice_detail_price">Price: </label>
                <input
                    type="number"
                    min="0"
                    value={price}
                    name="invoice_detail_price"
                    id="invoice_detail_price"
                    //Updates price in price field live
                    onChange={(e) => setPrice(e.target.value)}
                    //Runs price validation to check for negative or empty values
                    onBlur={(e) => handlePriceChange(price)}
                />
                <button onClick={(e) => {UpdateInvoiceDetails(e)}}>Update</button>
                <button className="cancelButton" onClick={(e) => {navigate("/details")}}>Cancel</button>
            </form>
        </>
    )

}