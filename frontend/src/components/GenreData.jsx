import { useEffect, useState } from "react";
import Genres from "../pages/Genres";

function GenreData() {
    const [genre, setGenre] = useState([]);

    // Fetches the data to be added to the table
    useEffect(() => { async function fetchGenres() {
        const res = await fetch("http://classwork.engr.oregonstate.edu:4029/read-genre");
        const data = await res.json();
        setGenre(data);
    }
    // Calls fetch function
    fetchGenres();
}, []);

    return (
        <>
            <Genres genre={genre}/>
        </>
    )
} export default GenreData;