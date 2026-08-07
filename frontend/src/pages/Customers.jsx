import CustomerData from "../components/CustomerData";

function Customers({customer}) {
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
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zipcode</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Maps data to a table*/}
                    {customer.map(customer => (
                        <tr key={customer.customerID}>
                            <td>{customer.customerID}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.street}</td>
                            <td>{customer.city}</td>
                            <td>{customer.state}</td>
                            <td>{customer.zip}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
} export default Customers;