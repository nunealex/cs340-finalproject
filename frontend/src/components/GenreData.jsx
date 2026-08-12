// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team. Referenced previous student projects from CS290 as a REACT refresher. 
// AI Scope: AI tools were not used
// Contains the code for the Genre Data Component.
// Date: July 28 2026

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