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