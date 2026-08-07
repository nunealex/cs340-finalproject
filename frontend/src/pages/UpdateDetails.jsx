import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { UpdateInvoiceDetailsForm } from "../components/UpdateInvoiceDetails";

// Work in progress
function UpdateDetails() {
    const { id } = useParams();
    const [invoiceDetail, setInvoiceDetail] = useState(null);

    useEffect(() => {
        fetch(`http://classwork.engr.oregonstate.edu:4029/read-invoice-detail/${id}`)
            .then(res => res.json())
            .then(data => setInvoiceDetail(data[0]));
    }, [id]);

    if (!invoiceDetail) return <p>Loading...</p>;
    
    return (
        <>
            <UpdateInvoiceDetailsForm invoiceDetail={invoiceDetail}/>
        </>
    )
} export default UpdateDetails;