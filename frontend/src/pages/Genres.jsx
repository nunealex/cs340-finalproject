function Genres() {
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
                    <tr>
                        <td>1</td>
                        <td>Basketball</td>
                        <td>Sports Genre</td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>Strategic</td>
                        <td>Turn-Based Strategy Game</td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>Build</td>
                        <td>Deck-Building Game</td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>Soccer</td>
                        <td>Sports Genre</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
} export default Genres;