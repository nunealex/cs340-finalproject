import { useEffect, useState } from "react";
import Customers from "../pages/Customers";

function CustomerData() {
    const [customer, setCustomers] = useState([]);

    // Fetches the data to be added to the table
    useEffect(() => { async function fetchCustomers() {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-customers");
        const data = await res.json();
        setCustomers(data);
    }
    // Calls fetch function
    fetchCustomers();
    }, []);

    return (
        <>
            <Customers customer={customer}/>
        </>
    )
} export default CustomerData;