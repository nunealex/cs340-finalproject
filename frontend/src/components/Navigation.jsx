{/*
// #Citation for the following JS file: Navigation.jsx
// #Date: 07/27/2026
// #Adapted from Dr.Curry exploration "Web Application Technology" to include the navigation links for our pages.
// #https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351
// #No AI tools were used
// #Contains the code for the naviagtion bar
*/}

function Navigation() {
    return (
        <nav className="navbar">
            <a href="/">Home</a>
            <a href="/customers">Customers</a>
            <a href="/stores">Stores</a>
            <a href="/storeinventory">Store Inventory</a>
            <a href="/invoices">Invoices</a>
            <a href="/details">Invoice Details</a>
            <a href="/boxsets">Box Sets</a>
            <a href="/genres">Genres</a>
        </nav>
    )
} export default Navigation;