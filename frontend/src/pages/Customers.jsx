function Customers() {
    return (
        <>
            <h1>Customer Page</h1>
            <div className="customerDescription">
                <p>Customers</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zipcode</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Alex</td>
                        <td>Nunez</td>
                        <td>123 First St</td>
                        <td>San Jose</td>
                        <td>CA</td>
                        <td>90210</td>
                        <td>408-123-4567</td>
                        <td>nunealex@oregonstate.edu</td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>Emmanuel</td>
                        <td>Vazquez</td>
                        <td>456 10th St</td>
                        <td>San Francisco</td>
                        <td>CA</td>
                        <td>92131</td>
                        <td>415-325-8723</td>
                        <td>emmanuel@oregonstate.edu</td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>Barry</td>
                        <td>Bonds</td>
                        <td>231 Mission st</td>
                        <td>San Francisco</td>
                        <td>CA</td>
                        <td>92132</td>
                        <td>415-325-8723</td>
                        <td>bonds@giants.com</td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>Ash</td>
                        <td>Ketchum</td>
                        <td>2 Pallet Dr</td>
                        <td>Pallet Town</td>
                        <td>NV</td>
                        <td>56783</td>
                        <td>617-842-3521</td>
                        <td>ash@gottacatchemall.com</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
} export default Customers;