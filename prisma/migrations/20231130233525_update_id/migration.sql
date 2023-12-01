-- Create a sequence
CREATE SEQUENCE customer_id_seq START 301;

-- Alter the table to set customer_id as auto-generated from the sequence
ALTER TABLE customers
    ALTER COLUMN customer_id SET DEFAULT nextval('customer_id_seq');
