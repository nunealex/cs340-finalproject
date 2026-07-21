-- Project Title: Trading Card Box Set Sales Management System
-- Project Team name: ZZ Trading Co.
-- Project Group: 4
-- Team Members: Alexander Nunez and Emmanuel Vazquez

-- Disables foreign key checks and auto-commits
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop tables in reverse order of creation to avoid constraint errors
DROP TABLE IF EXISTS `InvoiceDetails`;
DROP TABLE IF EXISTS `Invoices`;
DROP TABLE IF EXISTS `StoreInventory`;
DROP TABLE IF EXISTS `BoxSets`;
DROP TABLE IF EXISTS `Genres`;
DROP TABLE IF EXISTS `Customers`;
DROP TABLE IF EXISTS `Stores`;

-- Stores Table
CREATE TABLE Stores (
    storeId INT AUTO_INCREMENT NOT NULL,
    storeName VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state CHAR(2) NOT NULL,
    email VARCHAR(50) NULL UNIQUE,
    phone VARCHAR(20) NULL,
    PRIMARY KEY (storeId)
);

-- Customers Table
CREATE TABLE Customers (
    customerId INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    addressStreet VARCHAR(255) NULL,
    addressCity TEXT NULL,
    addressState CHAR(2) NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(20) NULL,
    PRIMARY KEY (customerId)
);

-- Genres Table
CREATE TABLE Genres (
    genreId INT AUTO_INCREMENT NOT NULL,
    genreName VARCHAR(50) NOT NULL UNIQUE,
    description TEXT NULL,
    PRIMARY KEY (genreId)
);

-- BoxSets Table
CREATE TABLE BoxSets (
    boxSetId INT AUTO_INCREMENT NOT NULL,
    genreId INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    edition VARCHAR(50) NULL,
    releaseYear YEAR NULL,
    cost DECIMAL(10,2) NOT NULL,
    salePrice DECIMAL(10,2) NOT NULL,

    PRIMARY KEY (boxSetId),

    CONSTRAINT BoxSetsGenres
    FOREIGN KEY (genreId)
    REFERENCES Genres(genreId)
    ON DELETE CASCADE -- genreId is deleted in the Genres table, delete from the BoxSets table
    ON UPDATE CASCADE -- genreId is updated in the Genres table, update in the BoxSets table
);

-- StoreInventory Table: Intersection table between Stores and BoxSets
CREATE TABLE StoreInventory (
    inventoryId INT AUTO_INCREMENT NOT NULL,
    storeId INT NOT NULL,
    boxSetId INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,

    PRIMARY KEY (inventoryId),

    CONSTRAINT InventoryStores
    FOREIGN KEY (storeId)
    REFERENCES Stores(storeId)
    ON DELETE RESTRICT -- Cannot delete from the Stores table if in StoreInventory 
    ON UPDATE CASCADE, -- storeId is updated in the Stores table, update in StoreInventory

    CONSTRAINT InventoryBoxSets
    FOREIGN KEY (boxSetId)
    REFERENCES BoxSets(boxSetId)
    ON DELETE RESTRICT -- Cannot delete from the BoxSets table if in StoreInventory 
    ON UPDATE CASCADE -- boxSetId is updated in the BoxSets table, update in StoreInventory 
);

-- Invoices Table: Intersection table between Stores and Customers
CREATE TABLE Invoices (
    invoiceId INT AUTO_INCREMENT NOT NULL,
    customerId INT NOT NULL,
    storeId INT NOT NULL,
    invoiceDate DATETIME NOT NULL,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.0,

    PRIMARY KEY (invoiceId),

    CONSTRAINT InvoicesCustomers
    FOREIGN KEY (customerId)
    REFERENCES Customers(customerId)
    ON DELETE RESTRICT -- Cannot delete from the Customers table if in Invoices 
    ON UPDATE CASCADE, -- customerId is updated in the Customers table, update in Invoices
    
    CONSTRAINT InvoicesStores
    FOREIGN KEY (storeId)
    REFERENCES Stores(storeId)
    ON DELETE RESTRICT -- Cannot delete from the Stores table if in Invoices 
    ON UPDATE CASCADE -- inventoryId is updated in the Stores table, update in Invoices
);

-- Invoices Table: Intersection table between Stores and Customers
CREATE TABLE InvoiceDetails (
    invoiceDetailId INT AUTO_INCREMENT NOT NULL,
    boxSetId INT NOT NULL,
    invoiceId INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.0,

    PRIMARY KEY (invoiceDetailId),

    CONSTRAINT InvoiceBoxSetsDetails
    FOREIGN KEY (boxSetId)
    REFERENCES BoxSets(boxSetId)
    ON DELETE RESTRICT -- Cannot delete from the BoxSets table if in InvoiceDetails 
    ON UPDATE CASCADE, -- boxSetId is updated in the BoxSets table, update in InvoiceDetails

    CONSTRAINT InvoiceInvoicesDetails
    FOREIGN KEY (invoiceId)
    REFERENCES Invoices(invoiceId)
    ON DELETE RESTRICT -- Cannot delete from the Invoices table if in InvoiceDetails 
    ON UPDATE CASCADE -- invoiceId is updated in the Invoices table, update in InvoiceDetails
);

-- Example Data (3-5 rows per table)

-- Stores

-- Customers

-- Genres

-- BoxSets

-- StoreInventory

-- Invoices

-- InvoiceDetails

-- Turns on foreign key checks and does a final commit
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

