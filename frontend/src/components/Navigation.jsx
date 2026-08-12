// Project Title: Trading Card Box Set Sales Management System
// Group 4: Alexander Nunez and Emmanuel Vazquez
// Originality: Adapted from Dr.Curry exploration "Web Application Technology". Used Dr.Curry's navigation bar as a template for ours with the routes rwquired to make our project correctly navigate.
// Source: https://canvas.oregonstate.edu/courses/2051721/pages/exploration-web-application-technology-2?module_item_id=26923351 
// AI Scope: AI tools were not used
// Contains the code for the Navigation bar component.
// Date: July 27 2026

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