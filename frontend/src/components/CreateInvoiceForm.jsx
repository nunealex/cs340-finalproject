// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Adapted from Dr.Curry exploration "Web Application Technology". Made a new function called CreateInvoiceForm and used Dr.Curry's form as a template for ours.
// Source: https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351 
// AI Scope: AI tools were used for debugging.
// Prompt Overview: ""
// Contains the code for the Create Invoice Form component.
// Date: July 27 2026

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CreateInvoiceForm = ({ }) => {

    const [customer, setCustomer] = useState([]);
    const [store, setStore] = useState([]);

    const [newCustomer, setNewCustomer] = useState();
    const [newStore, setNewStore] = useState();
    
    //Fetches the Customer data for drop down
    const loadCustomer = async () => {
    const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-customers");
    setCustomer(await res.json());
    };
    
    //Fetches the Stores data for drop down
    const loadStores = async () => {
    const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-stores");
    setStore(await res.json());
    };
    
    //Loads Customer and Store Data for the drop downs
    useEffect(() => {
        loadCustomer();
        loadStores();
    }, []);

    //Handles the create procedure when the button is clicked and navigates back to invoices
    const CreateInvoice = async (event) => {
        event.preventDefault();
        const newInvoice = {customerID: newCustomer, storeID: newStore};
        const res = await fetch(
            "http://classwork.engr.oregonstate.edu:4029/create-invoice", {
                method: 'POST', 
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newInvoice)
            });
        navigate("/invoices");
    }

    const navigate = useNavigate();
    return (
        <>
        <h2>Create an Invoice</h2>

        <form className='cuForm'>

            <label htmlFor="invoice_customer">Customers: </label>
            <select
                name="invoice_customer"
                id="invoice_customer"
                onChange={(e) => setNewCustomer(e.target.value)}
            >
                <option value="">Select a Customer</option>
                {customer.map(customer => (
                    <option 
                        key={customer.customerID}
                        value={customer.customerID}
                    >
                        {customer.firstName} {customer.lastName}
                    </option>
                ))}
            </select>

            <label htmlFor="invoice_store">Stores: </label>
            <select
                name="invoice_store"
                id="invoice_store"
                onChange={(e) => setNewStore(e.target.value)}
            >
                <option value="">Select a Store</option>
                {store.map(store => (
                    <option 
                        key={store.storeID}
                        value={store.storeID}
                    >
                        {store.storeName}
                    </option>
                ))}
            </select>

            <button onClick={(e) => {CreateInvoice(e)}}>Create</button>
        </form>
        </>
    );
};

export default CreateInvoiceForm;