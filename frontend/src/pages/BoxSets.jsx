import BoxSetData from "../components/BoxSetData";

function BoxSets({ boxset }) {
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
                        <th>Genre</th>
                        <th>Name</th>
                        <th>Edition</th>
                        <th>Release Year</th>
                        <th>Cost</th>
                        <th>Sales Price</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Maps data to a table*/}
                    {boxset.map(boxset => (
                        <tr key={boxset.boxSetID}>
                            <td>{boxset.boxSetID}</td>
                            <td>{boxset.genre}</td>
                            <td>{boxset.name}</td>
                            <td>{boxset.edition}</td>
                            <td>{boxset.releaseYear}</td>
                            <td>{boxset.cost}</td>
                            <td>{boxset.salePrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
} export default BoxSets;