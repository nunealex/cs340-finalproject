function BoxSets() {
    return (
        <>
            <h1>Box Sets</h1>
            <div className="boxsetDescription">
                <p>Box Sets</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Box Set ID</th>
                        <th>Genre ID</th>
                        <th>Name</th>
                        <th>Edition</th>
                        <th>Release Year</th>
                        <th>Cost</th>
                        <th>Sales Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>Legends: Basketball</td>
                        <td>1st Edition</td>
                        <td>1996</td>
                        <td>195.99</td>
                        <td>249.99</td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>2</td>
                        <td>Pokemon</td>
                        <td>Pitch Black</td>
                        <td>2026</td>
                        <td>35.99</td>
                        <td>59.99</td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>3</td>
                        <td>Magic: The Gathering</td>
                        <td>Secrets of Strixhaven</td>
                        <td>2026</td>
                        <td>86.99</td>
                        <td>149.99</td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>4</td>
                        <td>FIFA World Cup</td>
                        <td>2022</td>
                        <td>2022</td>
                        <td>57.99</td>
                        <td>99.99</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
} export default BoxSets;