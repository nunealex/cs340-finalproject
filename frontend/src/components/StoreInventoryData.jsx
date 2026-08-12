// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team. Referenced previous student projects from CS290 as a REACT refresher. 
// AI Scope: AI tools were not used
// Contains the code for the Store Inventory Data Component.
// Date: July 28 2026

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