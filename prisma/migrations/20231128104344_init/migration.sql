-- CreateTable
CREATE TABLE "customers" (
    "customer_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phone_number" BIGINT NOT NULL,
    "monthly_salary" INTEGER NOT NULL,
    "approved_limit" INTEGER NOT NULL,
    "current_debt" INTEGER,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "loans" (
    "loan_id" SERIAL NOT NULL,
    "loan_amount" DOUBLE PRECISION NOT NULL,
    "tenure" INTEGER NOT NULL,
    "interest_rate" DOUBLE PRECISION NOT NULL,
    "monthly_payment" INTEGER NOT NULL,
    "EMIs_paid_on_time" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("loan_id")
);

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
