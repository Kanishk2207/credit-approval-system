const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createTrigger() {
    console.log('working');
  const query = `
  CREATE OR REPLACE FUNCTION update_customer_debt()
  RETURNS TRIGGER AS $$
  DECLARE
      total_debt NUMERIC := 0;
  BEGIN
      IF TG_OP = 'DELETE' THEN
          total_debt := (
              SELECT COALESCE(SUM(loan_amount), 0)
              FROM loans
              WHERE customer_id = OLD.customer_id
          );
          total_debt := GREATEST(total_debt - OLD.loan_amount, 0);
      ELSE
          total_debt := (
              SELECT COALESCE(SUM(loan_amount), 0)
              FROM loans
              WHERE customer_id = NEW.customer_id
          );
      END IF;

      UPDATE customers
      SET current_debt = total_debt
      WHERE customer_id = COALESCE(NEW.customer_id, OLD.customer_id);

      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

CREATE TRIGGER loan_trigger
AFTER INSERT OR UPDATE OR DELETE ON loans
FOR EACH ROW
EXECUTE FUNCTION update_customer_debt();
  `

  await prisma.$executeRaw`CREATE OR REPLACE FUNCTION update_customer_debt()
  RETURNS TRIGGER AS $$
  DECLARE
      total_debt NUMERIC := 0;
  BEGIN
      IF TG_OP = 'DELETE' THEN
          total_debt := (
              SELECT COALESCE(SUM(loan_amount), 0)
              FROM loans
              WHERE customer_id = OLD.customer_id
          );
          total_debt := GREATEST(total_debt - OLD.loan_amount, 0);
      ELSE
          total_debt := (
              SELECT COALESCE(SUM(loan_amount), 0)
              FROM loans
              WHERE customer_id = NEW.customer_id
          );
      END IF;

      UPDATE customers
      SET current_debt = total_debt
      WHERE customer_id = COALESCE(NEW.customer_id, OLD.customer_id);

      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

CREATE TRIGGER loan_trigger
AFTER INSERT OR UPDATE OR DELETE ON loans
FOR EACH ROW
EXECUTE FUNCTION update_customer_debt();`
}

createTrigger()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
module.exports = {
    createTrigger,
}