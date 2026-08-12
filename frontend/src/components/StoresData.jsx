// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team. Referenced previous student projects from CS290 as a REACT refresher. 
// AI Scope: AI tools were not used
// Contains the code for the Stores Data Component.
// Date: July 28 2026

import { useEffect, useState } from "react";
import Stores from "../pages/Stores";

function StoresData() {
    const [store, setStores] = useState([]);

    // Fetches the data to be added to the table
    useEffect(() => { async function fetchStores() {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-stores");
        const data = await res.json();
        setStores(data);
    }
    // Calls fetch function
    fetchStores();
    }, []);

    return (
        <>
            <Stores store={store}/>
        </>
    )
} export default StoresData;