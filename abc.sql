CREATE OR REPLACE FUNCTION update_current_debt()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "customers" c
    SET current_debt = (
        SELECT COALESCE(SUM(l.loan_amount), 0)
        FROM "loans" l
        WHERE l.customer_id = c.customer_id
        AND l.end_date > CURRENT_TIMESTAMP -- Consider only ongoing loans
    )
    WHERE c.customer_id = NEW.customer_id; -- Update the current_debt for the corresponding customer
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_current_debt_trigger
AFTER INSERT OR UPDATE OR DELETE ON "loans"
FOR EACH ROW
EXECUTE FUNCTION update_current_debt();






-- Create the sequence if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS customer_id_sequence START 1;

-- Function to reset the sequence and assign customer_id if missing
CREATE OR REPLACE FUNCTION reset_customer_id_sequence()
RETURNS TRIGGER AS $$
DECLARE
    max_customer_id INTEGER;
BEGIN
    -- Get the maximum customer_id from the customers table
    SELECT MAX(customer_id) INTO max_customer_id FROM customers;

    -- Reset the sequence to the next value after the maximum customer_id
    IF max_customer_id IS NOT NULL THEN
        EXECUTE format('ALTER SEQUENCE customer_id_sequence RESTART WITH %s', max_customer_id + 1);
    ELSE
        EXECUTE 'ALTER SEQUENCE customer_id_sequence RESTART WITH 1';
    END IF;

    -- Assign customer_id if it's missing in the NEW row
    IF NEW.customer_id IS NULL THEN
        NEW.customer_id := nextval('customer_id_sequence');
    END IF;

    -- Return the modified NEW row
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to reset sequence before insert
CREATE TRIGGER reset_sequence_trigger
BEFORE INSERT ON customers
FOR EACH ROW
EXECUTE FUNCTION reset_customer_id_sequence();

