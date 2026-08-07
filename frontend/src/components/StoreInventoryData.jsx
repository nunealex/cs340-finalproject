import { useEffect, useState } from "react";
import StoreInventory from "../pages/StoreInventory";

function StoreInventoryData() {
    const [inventory, setInventory] = useState([]);

    // Fetches the data to be added to the table
    useEffect(() => { async function fetchStoreInventory() {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-inventory");
        const data = await res.json();
        setInventory(data);
    }
    // Calls fetch function
    fetchStoreInventory();
    }, []);

    return (
        <>
            <StoreInventory inventory={inventory}/>
        </>
    )
} export default StoreInventoryData;