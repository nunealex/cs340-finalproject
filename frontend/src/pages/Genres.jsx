// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team.
// AI Scope: AI tools were not used
// Contains the code for the Genres page.
// Date: July 27, 2026

import GenreData from "../components/GenreData";

function Genres({ genre }) {
    return (
        <> 
            <h1>Genres</h1>
            <div className="genreDescription">
                <p>Genres</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Genre ID</th>
                        <th>Genre Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Maps data to a table*/}
                    {genre.map(genre => (
                        <tr key={genre.genreID}>
                            <td>{genre.genreID}</td>
                            <td>{genre.genreName}</td>
                            <td>{genre.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
} export default Genres;