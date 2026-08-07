import StoreInventoryData from "../components/StoreInventoryData";

function StoreInventory({ inventory }) {
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
                        <th>Store</th>
                        <th>Box Set</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Maps data to a table*/}
                    {inventory.map(inventory => (
                        <tr key={inventory.inventoryID}>
                            <td>{inventory.inventoryID}</td>
                            <td>{inventory.Store}</td>
                            <td>{inventory.BoxSet}</td>
                            <td>{inventory.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
} export default StoreInventory;