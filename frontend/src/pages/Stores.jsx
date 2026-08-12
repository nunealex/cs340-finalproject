// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Original work by team.
// AI Scope: AI tools were not used
// Contains the code for the Stores page.
// Date: July 27, 2026

import StoresData from "../components/StoresData";

function Stores({ store }) {
    
    return (
        <>
            <h1>Stores</h1>
            <div className="storesDescription">
                <p>Locations</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Store ID</th>
                        <th>Store Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zipcode</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Maps data to a table*/}
                    {store.map(store => (
                        <tr key={store.storeID}>
                            <td>{store.storeID}</td>
                            <td>{store.storeName}</td>
                            <td>{store.street}</td>
                            <td>{store.city}</td>
                            <td>{store.state}</td>
                            <td>{store.zip}</td>
                            <td>{store.phone}</td>
                            <td>{store.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
} export default Stores;