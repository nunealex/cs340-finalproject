-- Project Title: Trading Card Box Set Sales Management System
-- Group 4: Alexander Nunez and Emmanuel Vazquez
-- ':' will be our designator for variable passed in
-- CREATE, UPDATE, and DELETE operations will be executed in the application through stored procedures.
-- Originality: Queries and operations were created by the team.
-- AI Scope: Used Claude to review the work against the rubric.
-- Source: https://claude.ai
-- Date: August 2026

-- ----------------
-- Stores --
-- ----------------
-- READ - Stores --
SELECT
    Stores.storeID,
    Stores.storeName,
    Stores.street,
    Stores.city,
    Stores.state,
    Stores.zip,
    Stores.phone,
    Stores.email
FROM Stores;

-- -----------------
-- Customers --
-- -----------------
-- READ - Customers --
SELECT
    Customers.customerID,
    Customers.firstName,
    Customers.lastName,
    Customers.street,
    Customers.city,
    Customers.state,
    Customers.zip,
    Customers.phone,
    Customers.email
FROM Customers;

-- ----------------
-- Genres --
-- ----------------
-- READ - Genres --
SELECT
    Genres.genreID,
    Genres.genreName,
    Genres.description
FROM Genres;

-- -----------------
-- BoxSets --
-- -----------------
-- READ - BoxSets --
SELECT
    BoxSets.boxSetID,
    Genres.genreName AS genre,
    BoxSets.name,
    BoxSets.edition,
    BoxSets.releaseYear,
    BoxSets.cost,
    BoxSets.salePrice
FROM BoxSets
INNER JOIN Genres ON BoxSets.genreID = Genres.genreID;

-- -----------------
-- StoreInventory --
-- -----------------
-- READ - StoreInventory --
SELECT
    StoreInventory.inventoryID,
    Stores.storeName AS Store,
    CONCAT(BoxSets.name, ' - ', BoxSets.edition) AS BoxSet,
    StoreInventory.quantity
FROM StoreInventory
INNER JOIN Stores ON StoreInventory.storeID = Stores.storeID
INNER JOIN BoxSets ON StoreInventory.boxSetID = BoxSets.boxSetID
ORDER BY StoreInventory.inventoryID;

-- -----------------
-- Invoices --
-- -----------------
-- READ - Invoices --
SELECT
    Invoices.invoiceID,
    CONCAT(Customers.lastName, ', ', Customers.firstName) AS Customer,
    Customers.lastName,
    Stores.storeName AS Store,
    Invoices.invoiceDate
FROM Invoices
INNER JOIN Customers ON Invoices.customerID = Customers.customerID
INNER JOIN Stores ON Invoices.storeID = Stores.storeID;


-- CREATE - Invoices --
-- get all Customer IDs and Names to populate the Customers Dropdown
SELECT 
    Customers.customerID, 
    CONCAT(Customers.lastName,', ', Customers.firstName) AS Name 
FROM Customers
ORDER BY Customers.lastName;

-- get all Store IDs and Names to populate the Stores Dropdown
SELECT 
    Stores.storeID, 
    Stores.storeName 
FROM Stores
ORDER BY Stores.storeName;

-- Insert into Invoices
INSERT INTO Invoices (customerID, storeID, invoiceDate) 
VALUES (:customerID_dropdown_Input, :storeID_dropdown_Input, NOW());

-- -----------------
-- InvoiceDetails --
-- -----------------
-- READ - InvoiceDetails --
SELECT
    InvoiceDetails.invoiceDetailID,
    CONCAT(BoxSets.name, ' - ', BoxSets.edition) AS BoxSet,
    CONCAT('Invoice #', Invoices.invoiceID,' ', Customers.lastName,' ', DATE(Invoices.invoiceDate)) AS Invoice,
    Invoices.invoiceID,
    InvoiceDetails.quantity,
    InvoiceDetails.price
FROM InvoiceDetails
INNER JOIN BoxSets ON InvoiceDetails.boxSetID = BoxSets.boxSetID
INNER JOIN Invoices ON InvoiceDetails.invoiceID = Invoices.invoiceID
INNER JOIN Customers ON Invoices.customerID = Customers.customerID
ORDER BY InvoiceDetails.invoiceDetailID ASC;


-- CREATE - InvoiceDetails --
-- get all BoxSets IDs and Names to populate the BoxSets Dropdown
SELECT 
    BoxSets.boxSetID, 
    CONCAT(BoxSets.name, ' - ', BoxSets.edition) AS BoxSet 
FROM BoxSets
ORDER BY BoxSets.name;

-- get all Invoice Information for Invoice dropdown
SELECT 
    Invoices.invoiceID, 
    CONCAT('Invoice #', Invoices.invoiceID,' ', Customers.lastName,' ', DATE(Invoices.invoiceDate)) AS Invoice
FROM Invoices
INNER JOIN Customers ON Invoices.customerID = Customers.customerID
ORDER BY Invoices.invoiceID;

-- get the salePrice of a BoxSet to pre-fill the price field
SELECT 
    BoxSets.salePrice 
FROM BoxSets
WHERE BoxSets.boxSetID = :selected_boxSetID_from_dropdown_Input;

-- Insert into InvoiceDetails
INSERT INTO InvoiceDetails (boxSetID, invoiceID, quantity, price) 
VALUES (:boxSetID_dropdown_Input, :invoiceID_dropdown_Input, :quantity_input, :price_input);


-- DELETE - InvoiceDetails --
DELETE FROM InvoiceDetails
WHERE invoiceDetailID = :invoiceDetailID_to_be_deleted;


-- UPDATE - InvoiceDetails --
-- get the current values of an invoice detail to pre-fill the update form
SELECT 
    InvoiceDetails.invoiceDetailID,
    InvoiceDetails.boxSetID,
    InvoiceDetails.invoiceID,
    InvoiceDetails.quantity,
    InvoiceDetails.price
FROM InvoiceDetails
WHERE InvoiceDetails.invoiceDetailID = :invoiceDetailID_from_the_update_form;

-- update the InvoiceDetails for a specific invoice detail
UPDATE InvoiceDetails 
SET boxSetID = :boxSetID_dropdown_Input, invoiceID = :invoiceID_dropdown_Input, quantity = :quantity_update, price = :price_update 
WHERE invoiceDetailID= :invoiceDetailID_from_the_update_form;