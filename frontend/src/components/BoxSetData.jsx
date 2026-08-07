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