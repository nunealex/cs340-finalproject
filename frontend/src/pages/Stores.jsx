function Stores() {
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
                        <th>City</th>
                        <th>State</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>ZZ Trading Co.</td>
                        <td>San Jose</td>
                        <td>CA</td>
                        <td>408-324-7426</td>
                        <td>help@zztrading.com</td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>ZZ Trading Emporium</td>
                        <td>San Francisco</td>
                        <td>CA</td>
                        <td>415-125-2314</td>
                        <td>help@zzemporium.com</td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>ZZ Trading Depot</td>
                        <td>Las Vegas</td>
                        <td>NV</td>
                        <td>702-435-6267</td>
                        <td>help@zzdepot.com</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
} export default Stores;