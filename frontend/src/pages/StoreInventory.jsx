function StoreInventory() {
    return (
        <>
            <h1>Inventory</h1>
            <div className="inventoryDescription">
                <p>Inventory</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Inventory ID</th>
                        <th>Store ID</th>
                        <th>Box Set ID</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>3</td>
                        <td>1</td>
                        <td>5</td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>1</td>
                        <td>3</td>
                        <td>25</td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>2</td>
                        <td>4</td>
                        <td>100</td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>3</td>
                        <td>2</td>
                        <td>40</td>
                    </tr>

                    <tr>
                        <td>5</td>
                        <td>2</td>
                        <td>3</td>
                        <td>15</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
} export default StoreInventory;