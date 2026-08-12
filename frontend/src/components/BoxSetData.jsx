// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team. Referenced previous student projects from CS290 as a REACT refresher. 
// AI Scope: AI tools were not used
// Contains the code for the Box Set Data Component.
// Date: July 28 2026

import { useEffect, useState } from "react";
import BoxSets from "../pages/BoxSets";

function BoxSetData() {
    const [boxset, setBoxSet] = useState([]);

    // Fetches the data to be added to the table
    useEffect(() => { async function fetchBoxSets() {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-boxsets");
        const data = await res.json();
        setBoxSet(data);
    }
    // Calls fetch function
    fetchBoxSets();
    }, []);

    return (
        <>
            <BoxSets boxset={boxset}/>
        </>
    )
} export default BoxSetData;