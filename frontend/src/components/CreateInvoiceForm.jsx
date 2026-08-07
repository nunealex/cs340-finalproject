{/* // #Citation for the following JS file: CreatInvoiceForm.jsx
// #Date: 07/27/2026
// #Adapted from Dr.Curry exploration "Web Application Technology". Made a new function called CreateInvoiceForm and used Dr.Curry's form as a template for ours.
// #https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
// #No AI tools were used
// #Contains the code for the Create Invoice form.
*/}

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CreateInvoiceForm = ({ }) => {

    const [customer, setCustomer] = useState([]);
    const [store, setStore] = useState([]);
    
    const loadCustomer = async () => {
    const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-customers");
    setCustomer(await res.json());
    };
    
    const loadStores = async () => {
    const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-stores");
    setStore(await res.json());
    };
    
    useEffect(() => {
        loadCustomer();
        loadStores();
    }, []);

    const navigate = useNavigate();
    return (
        <>
        <h2>Create an Invoice</h2>

        <form className='cuForm'>
            <label htmlFor="invoice_date">Date</label>
            <input
                type="date"
                name="invoice_date"
                id="incoide_date"
            />

            <label htmlFor="invoice_customer">Customers: </label>
            <select
                name="invoice_customer"
                id="invoice_customer"
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

            <button onClick={() => navigate('/invoices')}>Create</button>
        </form>
        </>
    );
};

export default CreateInvoiceForm;