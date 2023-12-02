-- This is an empty migration.
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