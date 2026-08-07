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