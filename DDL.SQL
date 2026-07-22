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
    addressStreet VARCHAR(50) NULL,
    addressCity TEXT NULL,
    addressState CHAR(2) NULL,
    addressZip INT NULL,
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
    ON DELETE RESTRICT -- Cannot delete from the Genres table if in BoxSets
    ON UPDATE CASCADE -- genreId is updated in the Genres table, update in the BoxSets table
);

-- StoreInventory Table: Intersection table between Stores and BoxSets
CREATE TABLE StoreInventory (
    inventoryId INT AUTO_INCREMENT NOT NULL,
    storeId INT NOT NULL,
    boxSetId INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,

    PRIMARY KEY (inventoryId),
    UNIQUE (storeId, boxSetId),

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

-- Invoices Table: Transaction table between Stores and Customers
CREATE TABLE Invoices (
    invoiceId INT AUTO_INCREMENT NOT NULL,
    customerId INT NOT NULL,
    storeId INT NOT NULL,
    invoiceDate DATETIME NOT NULL,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,

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
    ON UPDATE CASCADE -- storeId is updated in the Stores table, update in Invoices
);

-- InvoiceDetails Table: Intersection table between BoxSets and Invoices
CREATE TABLE InvoiceDetails (
    invoiceDetailId INT AUTO_INCREMENT NOT NULL,
    boxSetId INT NOT NULL,
    invoiceId INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,

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
INSERT INTO Stores (storeName, city, state, phone, email) VALUES

('ZZ Trading Co.', 'San Jose', 'CA', '408-324-7426', 'help@zztrading.com'),

('ZZ Trading Emporium', 'San Francisco', 'CA', '415-125-2314', 'help@zzemporium.com'),

('ZZ Trading Depot', 'Las Vegas', 'NV', '702-435-6267', 'help@zzdepot.com');

-- Customers
INSERT INTO Customers (firstName, lastName, addressStreet, addressCity, addressState, addressZip, phone, email) VALUES

('Alex', 'Nunez', '123 First St', 'San Jose', 'CA', 90210, '408-123-4567', 'nunealex@oregonstate.edu'),

('Emmanuel', 'Vazquez', '456 10th St', 'San Francisco', 'CA', 92131, '415-456-7890', 'emmanuel@oregonstate.edu'),

('Barry', 'Bonds', '231 Mission St', 'San Francisco', 'CA', 92132, '415-325-8723', 'bonds@giants.com'),

('Ash', 'Ketchum', '2 Pallet Dr', 'Pallet Town', 'NV', 56783, '617-842-3521', 'ash@gottacatchemall.com');

-- Genres
INSERT INTO Genres (genreName, description) VALUES 

('Basketball', 'Sports Genre'),

('Strategic', 'Turn-Based Strategy Game'),

('Build', 'Deck-Building Game'),

('Soccer', 'Sports Genre');

-- BoxSets

INSERT INTO BoxSets (genreId, name, edition, releaseYear, cost, salePrice) VALUES

(1, 'Legends: Basketball', '1st Edition', 1996, 195.99, 249.99),

(2, 'Pokemon', 'Pitch Black', 2026, 35.99, 59.99),

(3, 'Magic: The Gathering', 'Secrets of Strixhaven', 2026, 86.99, 149.99),

(4, 'FIFA World Cup', '2022', 2022, 57.99, 99.99);

-- StoreInventory

INSERT INTO StoreInventory (storeId, boxSetId, quantity) VALUES

(3, 1, 5), -- Store 3 has 5 units of Legends: Basketball

(1, 3, 25), -- Store 1 has 25 units of Magic: The Gathering Secrets of Strixhaven

(2, 4, 100), -- Store 2 has 100 units of Fifa World Cup 2022

(3, 2, 40), -- Store 3 has 40 units of Pokemon Pitch Black

(2, 3, 15); -- Store 2 has 15 units of Magic: The Gathering Secrets of Strixhaven

-- Invoices

INSERT INTO Invoices (customerId, storeId, invoiceDate, total) VALUES

(3, 1, '2026-05-13 13:43:58', 299.98), -- Barry Bonds bought 2 boxes of Secrets of Strixhaven

(1, 2, '2026-04-17 15:16:54', 449.97), -- Alex Nunez bought 3 boxes of Secrets of Strixhaven

(2, 3, '2025-09-24 11:33:55', 499.98); -- Emmanuel Vazquez bought 2 boxes of Legends: Basketball

-- InvoiceDetails

INSERT INTO InvoiceDetails (boxSetId, invoiceId, quantity, price, total) VALUES

(3, 1, 2, 149.99, 299.98),

(3, 2, 3, 149.99, 449.97),

(1, 3, 2, 249.99, 499.98);

-- Commits all changes to the database
COMMIT; 

-- Turns on foreign key checks and auto-commit
SET FOREIGN_KEY_CHECKS=1;
SET AUTOCOMMIT = 1;

