-- Project Title: Trading Card Box Set Sales Management System
-- Project Team name: ZZ Trading Co.
-- Project Group: 4
-- Team Members: Alexander Nunez and Emmanuel Vazquez
-- Originality: Procedures were created by the team.
-- AI Scope: Used Claude to review the work against the rubric.
-- Source: https://claude.ai
-- Date: August 2026

-- ---------------------
-- Create / Insert into Invoices
-- Creates a new invoice for a customer at a store with the current date and time.
-- ---------------------
DROP PROCEDURE IF EXISTS sp_create_invoice;
DELIMITER //

CREATE PROCEDURE sp_create_invoice(IN cr_customerID INT, IN cr_storeID INT)
BEGIN

    INSERT INTO Invoices (customerID, storeID, invoiceDate) 
    VALUES (cr_customerID, cr_storeID, NOW());

END //
DELIMITER ;
-- Use the following statement to call SP to create an invoice.
-- CALL sp_create_invoice(1,2);

-- --------------------------
-- Create / Insert into InvoiceDetails
-- Create a new invoice detail for an existing invoice, records the box set, quantity and price.
-- --------------------------
DROP PROCEDURE IF EXISTS sp_create_invoicedetail;
DELIMITER //

CREATE PROCEDURE sp_create_invoicedetail(IN cr_boxSetID INT, IN cr_invoiceID INT, IN cr_quantity INT, IN cr_price DECIMAL(10,2))
BEGIN

    INSERT INTO InvoiceDetails (boxSetID, invoiceID, quantity, price) 
    VALUES (cr_boxSetID, cr_invoiceID, cr_quantity, cr_price);

END //
DELIMITER ;
-- Use the following statement to call SP to create an invoice detail.
-- CALL sp_create_invoicedetail(2, 2, 3, 39.99);

-- -------------------------
-- UPDATE - InvoiceDetails -
-- Updates an existing invoice detail with new values for box set, which invoice, quantity, or price.
-- -------------------------
DROP PROCEDURE IF EXISTS sp_update_invoicedetail;
DELIMITER //

CREATE PROCEDURE sp_update_invoicedetail(IN up_invoiceDetailID INT, IN up_boxSetID INT, IN up_invoiceID INT, IN up_quantity INT, IN up_price DECIMAL (10,2))
BEGIN

    UPDATE InvoiceDetails 
    SET boxSetID = up_boxSetID, invoiceID = up_invoiceID, quantity = up_quantity, price = up_price 
    WHERE invoiceDetailID= up_invoiceDetailID;

END //
DELIMITER ;
-- Use the following statement to call SP to update an invoice detail.
-- CALL sp_update_invoicedetail(1, 1, 2, 3, 19.99);

-- --------------------------
-- DELETE - InvoiceDetails --
-- Deletes a single line item from InvoiceDetails, the intersection table between BoxSets and Invoices.
-- DELETE on M:N relationship. Does not create a data anomaly since BoxSets and Invoices are not impacted.
-- --------------------------
DROP PROCEDURE IF EXISTS sp_delete_invoicedetail;
DELIMITER //

CREATE PROCEDURE sp_delete_invoicedetail(IN del_invoiceDetailID INT)
BEGIN

    DELETE FROM InvoiceDetails
    WHERE invoiceDetailID = del_invoiceDetailID;

END //
DELIMITER ;
-- Use the following statement to call SP to delete an invoice detail by its ID:
-- CALL sp_delete_invoicedetail(1);

-- ---------------------
-- RESET DB
-- When this Stored Procedure is called, it will drop and recreate the tables and reload the sample data.
-- ---------------------
-- The RESET DB procedure, sp_load_trading_card_box_set_system, is defined in the DDL.SQL file.
-- CALL sp_load_trading_card_box_set_system();