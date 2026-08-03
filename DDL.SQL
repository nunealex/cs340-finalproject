-- Project Title: Trading Card Box Set Sales Management System
-- Project Team name: ZZ Trading Co.
-- Project Group: 4
-- Team Members: Alexander Nunez and Emmanuel Vazquez
-- Originality: Schema, procedure, constraints, and sample data were created by the team.
-- AI Scope: Debugged SQL import errors with assistance from Claude.
-- Source: https://claude.ai
-- Date: August 2026

DROP PROCEDURE IF EXISTS sp_load_trading_card_box_set_system;
DELIMITER //
CREATE PROCEDURE sp_load_trading_card_box_set_system()
BEGIN
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
        street VARCHAR(50) NOT NULL,
        city VARCHAR(50) NOT NULL,
        state CHAR(2) NOT NULL,
        zip CHAR(5) NOT NULL,
        email VARCHAR(50) NULL UNIQUE,
        phone VARCHAR(20) NULL,
        PRIMARY KEY (storeID)
    );

    -- Customers Table
    CREATE TABLE Customers (
        customerID INT AUTO_INCREMENT NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        street VARCHAR(50) NULL,
        city VARCHAR(50) NULL,
        state CHAR(2) NULL,
        zip CHAR(5) NULL,
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
        UNIQUE (name, edition),

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

    -- ------------------
    -- Sample Data
    -- ------------------

    -- Stores
    INSERT INTO Stores (storeName, street, city, state, zip, phone, email) VALUES

    ('ZZ Trading Co.', '422 Main St', 'San Jose', 'CA', '90213', '408-324-7426', 'help@zztrading.com'),

    ('ZZ Trading Emporium', '7321 Jacobs Ave', 'San Francisco', 'CA', '92137', '415-125-2314', 'help@zzemporium.com'),

    ('ZZ Trading Depot', '1234 Tech Rd', 'Las Vegas', 'NV', '56784', '702-435-6267', 'help@zzdepot.com');

    -- Customers
    INSERT INTO Customers (firstName, lastName, street, city, state, zip, phone, email) VALUES

    ('Alex', 'Nunez', '123 First St', 'San Jose', 'CA', '90210', '408-123-4567', 'nunealex@oregonstate.edu'),

    ('Emmanuel', 'Vazquez', '456 10th St', 'San Francisco', 'CA', '92131', '415-456-7890', 'emmanuel@oregonstate.edu'),

    ('Barry', 'Bonds', '231 Mission St', 'San Francisco', 'CA', '92132', '415-325-8723', 'bonds@giants.com'),

    ('Ash', 'Ketchum', '2 Pallet Dr', 'Pallet Town', 'NV', '56783', '617-842-3521', 'ash@gottacatchemall.com');

    -- Genres
    INSERT INTO Genres (genreName, description) VALUES 

    ('Basketball', 'Basketball Cards'),

    ('Strategic', 'Turn-Based Strategy Game'),

    ('Build', 'Deck-Building Game'),

    ('Soccer', 'Soccer Cards');

    -- BoxSets

    INSERT INTO BoxSets (genreID, name, edition, releaseYear, cost, salePrice) VALUES

    ((SELECT genreID FROM Genres WHERE genreName = 'Basketball'), 'Legends: Basketball', '1st Edition', 1996, 195.99, 249.99),

    ((SELECT genreID FROM Genres WHERE genreName = 'Basketball'), 'Legends: Basketball', '2nd Edition', 1999, 201.99, 254.99),

    ((SELECT genreID FROM Genres WHERE genreName = 'Strategic'), 'Pokemon', 'Pitch Black', 2026, 35.99, 59.99),

    ((SELECT genreID FROM Genres WHERE genreName = 'Build'), 'Magic: The Gathering', 'Secrets of Strixhaven', 2026, 86.99, 149.99),

    ((SELECT genreID FROM Genres WHERE genreName = 'Soccer'), 'FIFA World Cup', '2022', 2022, 57.99, 99.99);

    -- StoreInventory

    INSERT INTO StoreInventory (storeID, boxSetID, quantity) VALUES

    ((SELECT storeID FROM Stores WHERE storeName = 'ZZ Trading Depot'), (SELECT boxSetID FROM BoxSets WHERE name = 'Legends: Basketball' AND edition = '1st Edition'), 25), -- ZZ Trading Depot has 25 units of Legends: Basketball

    ((SELECT storeID FROM Stores WHERE storeName = 'ZZ Trading Depot'), (SELECT boxSetID FROM BoxSets WHERE name = 'Legends: Basketball' AND edition = '2nd Edition'), 35), -- ZZ Trading Depot has 35 units of Legends: Basketball

    ((SELECT storeID FROM Stores WHERE storeName = 'ZZ Trading Co.'), (SELECT boxSetID FROM BoxSets WHERE name = 'Magic: The Gathering' AND edition = 'Secrets of Strixhaven'), 25), -- ZZ Trading Co. has 25 units of Magic: The Gathering Secrets of Strixhaven

    ((SELECT storeID FROM Stores WHERE storeName = 'ZZ Trading Emporium'), (SELECT boxSetID FROM BoxSets WHERE name = 'FIFA World Cup' AND edition = '2022'), 100), -- ZZ Trading Emporium has 100 units of Fifa World Cup 2022

    ((SELECT storeID FROM Stores WHERE storeName = 'ZZ Trading Depot'), (SELECT boxSetID FROM BoxSets WHERE name = 'Pokemon' AND edition = 'Pitch Black'), 40), -- ZZ Trading Depot has 40 units of Pokemon Pitch Black

    ((SELECT storeID FROM Stores WHERE storeName = 'ZZ Trading Emporium'), (SELECT boxSetID FROM BoxSets WHERE name = 'Magic: The Gathering' AND edition = 'Secrets of Strixhaven'), 15); -- ZZ Trading Emporium has 15 units of Magic: The Gathering Secrets of Strixhaven

    -- Invoices

    INSERT INTO Invoices (customerID, storeID, invoiceDate) VALUES

    ((SELECT customerID FROM Customers WHERE email = 'bonds@giants.com'), (SELECT storeID FROM Stores WHERE storeName = 'ZZ Trading Co.'), '2026-05-13 13:43:58'), -- Barry Bonds made a purchase on May 13 at ZZ Trading Co

    ((SELECT customerID FROM Customers WHERE email = 'bonds@giants.com'), (SELECT storeID FROM Stores WHERE storeName = 'ZZ Trading Co.'), '2026-06-02 10:15:00'), -- Barry Bonds' second purchase on June 2 at ZZ Trading Co

    ((SELECT customerID FROM Customers WHERE email = 'nunealex@oregonstate.edu'), (SELECT storeID FROM Stores WHERE storeName = 'ZZ Trading Emporium'), '2026-07-17 15:16:54'), -- Alex Nunez made a purchase on July 17 at ZZ Trading Emporium

    ((SELECT customerID FROM Customers WHERE email = 'emmanuel@oregonstate.edu'), (SELECT storeID FROM Stores WHERE storeName = 'ZZ Trading Depot'), '2026-07-29 11:33:55'); -- Emmanuel Vazquez made a purchase on July 29 at ZZ Trading Depot

    -- InvoiceDetails

    INSERT INTO InvoiceDetails (boxSetID, invoiceID, quantity, price) VALUES

    ((SELECT boxSetID FROM BoxSets WHERE name = 'Magic: The Gathering' AND edition = 'Secrets of Strixhaven'), (SELECT invoiceID FROM Invoices WHERE invoiceDate = '2026-05-13 13:43:58'), 2, 149.99), -- 2 of Box Set Magic was purchased on May 13.

    ((SELECT boxSetID FROM BoxSets WHERE name = 'Legends: Basketball' AND edition = '2nd Edition'), (SELECT invoiceID FROM Invoices WHERE invoiceDate = '2026-06-02 10:15:00'), 1, 254.99), -- 1 of Box Set 2nd Edition Legends: Basketball was purchased on June 2.

    ((SELECT boxSetID FROM BoxSets WHERE name = 'Magic: The Gathering' AND edition = 'Secrets of Strixhaven'), (SELECT invoiceID FROM Invoices WHERE invoiceDate = '2026-06-02 10:15:00'), 3, 149.99), -- 3 of Box Set Magic was purchased on June 2.

    ((SELECT boxSetID FROM BoxSets WHERE name = 'FIFA World Cup' AND edition = '2022'), (SELECT invoiceID FROM Invoices WHERE invoiceDate = '2026-07-17 15:16:54'), 2, 99.99), -- 2 of Box Set FIFA 2022 was purchased on July 17.

    ((SELECT boxSetID FROM BoxSets WHERE name = 'Legends: Basketball' AND edition = '1st Edition'), (SELECT invoiceID FROM Invoices WHERE invoiceDate = '2026-07-29 11:33:55'), 2, 249.99); -- 2 of Box Set 1st Edition Legends: Basketball was purchased on July 29.

END //

DELIMITER ;

-- Use the following statement to call the SP to load the Trading Card Box Set database.
-- Will be used for the RESET.
-- CALL sp_load_trading_card_box_set_system();