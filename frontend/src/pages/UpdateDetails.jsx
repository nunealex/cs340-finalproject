// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team.
// AI Scope: AI tools were not used
// Contains the code for the Update Details page.
// Date: July 27, 2026

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { UpdateInvoiceDetailsForm } from "../components/UpdateInvoiceDetails";

function UpdateDetails() {
    const { id } = useParams();
    const [invoiceDetail, setInvoiceDetail] = useState(null);

    //Fetches data for the specific invoice detail being updated
    const loadDetails = async () => {
        const res = await fetch(`http://classwork.engr.oregonstate.edu:4029/read-invoice-detail/${id}`);
        const data = await res.json();
        setInvoiceDetail(data[0]);
    }
    useEffect(() => {
        loadDetails();
    }, [id]);

    // Presents "Loading..." if invoiceDetail is null so that it doesn't render a null invoiceDetail
    if (!invoiceDetail) return <p>Loading...</p>;
    
    return (
        <>
            <UpdateInvoiceDetailsForm invoiceDetail={invoiceDetail}/>
        </>
    )
} export default UpdateDetails;