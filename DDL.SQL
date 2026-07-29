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
    storeID INT AUTO_INCREMENT NOT NULL,
    storeName VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state CHAR(2) NOT NULL,
    email VARCHAR(50) NULL UNIQUE,
    phone VARCHAR(20) NULL,
    PRIMARY KEY (storeID)
);

-- Customers Table
CREATE TABLE Customers (
    customerID INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    addressStreet VARCHAR(50) NULL,
    addressCity TEXT NULL,
    addressState CHAR(2) NULL,
    addressZip INT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(20) NULL,
    PRIMARY KEY (customerID)
);

-- Genres Table
CREATE TABLE Genres (
    genreID INT AUTO_INCREMENT NOT NULL,
    genreName VARCHAR(50) NOT NULL UNIQUE,
    description TEXT NULL,
    PRIMARY KEY (genreID)
);

-- BoxSets Table
CREATE TABLE BoxSets (
    boxSetID INT AUTO_INCREMENT NOT NULL,
    genreID INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    edition VARCHAR(50) NOT NULL,
    releaseYear YEAR NULL,
    cost DECIMAL(10,2) NOT NULL,
    salePrice DECIMAL(10,2) NOT NULL,

    PRIMARY KEY (boxSetID),

    CONSTRAINT BoxSetsGenres
    FOREIGN KEY (genreID)
    REFERENCES Genres(genreID)
    ON DELETE RESTRICT -- Cannot delete from the Genres table if in BoxSets
    ON UPDATE CASCADE -- genreID is updated in the Genres table, update in the BoxSets table
);

-- StoreInventory Table: Intersection table between Stores and BoxSets
CREATE TABLE StoreInventory (
    inventoryID INT AUTO_INCREMENT NOT NULL,
    storeID INT NOT NULL,
    boxSetID INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,

    PRIMARY KEY (inventoryID),
    UNIQUE (storeID, boxSetID),

    CONSTRAINT InventoryStores
    FOREIGN KEY (storeID)
    REFERENCES Stores(storeID)
    ON DELETE RESTRICT -- Cannot delete from the Stores table if in StoreInventory 
    ON UPDATE CASCADE, -- storeID is updated in the Stores table, update in StoreInventory

    CONSTRAINT InventoryBoxSets
    FOREIGN KEY (boxSetID)
    REFERENCES BoxSets(boxSetID)
    ON DELETE RESTRICT -- Cannot delete from the BoxSets table if in StoreInventory 
    ON UPDATE CASCADE -- boxSetID is updated in the BoxSets table, update in StoreInventory 
);

-- Invoices Table: Transaction table between Stores and Customers
CREATE TABLE Invoices (
    invoiceID INT AUTO_INCREMENT NOT NULL,
    customerID INT NOT NULL,
    storeID INT NOT NULL,
    invoiceDate DATETIME NOT NULL,

    PRIMARY KEY (invoiceID),

    CONSTRAINT InvoicesCustomers
    FOREIGN KEY (customerID)
    REFERENCES Customers(customerID)
    ON DELETE RESTRICT -- Cannot delete from the Customers table if in Invoices 
    ON UPDATE CASCADE, -- customerID is updated in the Customers table, update in Invoices
    
    CONSTRAINT InvoicesStores
    FOREIGN KEY (storeID)
    REFERENCES Stores(storeID)
    ON DELETE RESTRICT -- Cannot delete from the Stores table if in Invoices 
    ON UPDATE CASCADE -- storeID is updated in the Stores table, update in Invoices
);

-- InvoiceDetails Table: Intersection table between BoxSets and Invoices
CREATE TABLE InvoiceDetails (
    invoiceDetailID INT AUTO_INCREMENT NOT NULL,
    boxSetID INT NOT NULL,
    invoiceID INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    PRIMARY KEY (invoiceDetailID),

    CONSTRAINT InvoiceBoxSetsDetails
    FOREIGN KEY (boxSetID)
    REFERENCES BoxSets(boxSetID)
    ON DELETE RESTRICT -- Cannot delete from the BoxSets table if in InvoiceDetails 
    ON UPDATE CASCADE, -- boxSetID is updated in the BoxSets table, update in InvoiceDetails

    CONSTRAINT InvoiceInvoicesDetails
    FOREIGN KEY (invoiceID)
    REFERENCES Invoices(invoiceID)
    ON DELETE RESTRICT -- Cannot delete from the Invoices table if in InvoiceDetails 
    ON UPDATE CASCADE -- invoiceID is updated in the Invoices table, update in InvoiceDetails
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

INSERT INTO BoxSets (genreID, name, edition, releaseYear, cost, salePrice) VALUES

(1, 'Legends: Basketball', '1st Edition', 1996, 195.99, 249.99),

(2, 'Pokemon', 'Pitch Black', 2026, 35.99, 59.99),

(3, 'Magic: The Gathering', 'Secrets of Strixhaven', 2026, 86.99, 149.99),

(4, 'FIFA World Cup', '2022', 2022, 57.99, 99.99);

-- StoreInventory

INSERT INTO StoreInventory (storeID, boxSetID, quantity) VALUES

(3, 1, 5), -- Store 3 has 5 units of Legends: Basketball

(1, 3, 25), -- Store 1 has 25 units of Magic: The Gathering Secrets of Strixhaven

(2, 4, 100), -- Store 2 has 100 units of Fifa World Cup 2022

(3, 2, 40), -- Store 3 has 40 units of Pokemon Pitch Black

(2, 3, 15); -- Store 2 has 15 units of Magic: The Gathering Secrets of Strixhaven

-- Invoices

INSERT INTO Invoices (customerID, storeID, invoiceDate) VALUES

(3, 1, '2026-05-13 13:43:58'), -- Barry Bonds made a purchase on May 13

(1, 2, '2026-04-17 15:16:54'), -- Alex Nunez made a purchase on April 17

(2, 3, '2025-09-24 11:33:55'); -- Emmanuel Vazquez made a purchase on September 24

-- InvoiceDetails

INSERT INTO InvoiceDetails (boxSetID, invoiceID, quantity, price) VALUES

(3, 1, 2, 149.99), -- 2 of Box Set 3 were purchased on Invoice 1

(3, 2, 3, 149.99), -- 3 of Box Set 3 were purchased on Invoice 2

(4, 2, 2, 99.99), -- 2 of Box Set 4 were purchased on Invoice 2

(1, 3, 2, 249.99); -- 2 of Box Set 1 were purchased on Invoice 3

-- Commits all changes to the database
COMMIT; 

-- Turns on foreign key checks and auto-commit
SET FOREIGN_KEY_CHECKS=1;
SET AUTOCOMMIT = 1;

