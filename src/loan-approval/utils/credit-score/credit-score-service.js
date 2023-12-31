const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const creditScore = async (customerId) => {
  try {
    let creditScoreVal = 0;
    const customer = await prisma.customer.findUnique({
      where: {
        customer_id: customerId,
      },
      include: {
        Loan: true,
      },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }
    if (customer.Loan.length === 0) {
      creditScoreVal = 70;
      return creditScoreVal;
    }

    // Calculate past loans paid on time
    const pastLoansPaidOnTime = customer.Loan.reduce(
      (total, loan) => total + loan.EMIs_paid_on_time,
      0
    );

    const tenure = customer.Loan.reduce(
      (total, loan) => total + loan.tenure,
      0
    );

    const percentPastLoanPaidOnTime = Math.round(
      ((tenure - pastLoansPaidOnTime) / tenure) * 100
    );
    const emiWeight = 30 - (percentPastLoanPaidOnTime * 3) / 10;

    // Calculate number of loans taken in the past
    const numberOfLoansTaken = customer.Loan.length;
    const numOfLoanWeight = 10 - 10 / Math.log(numberOfLoansTaken + 1);

    // Get current year
    const currentYear = new Date().getFullYear();

    // Calculate loan activity in the current year
    const currentYearLoans = customer.Loan.filter(
      (loan) =>
        new Date(loan.start_date).getFullYear() === currentYear ||
        new Date(loan.end_date).getFullYear() === currentYear
    );

    const currentYearLoanWeight =
      30 * Math.exp(-(Math.log(30) / 4) * currentYearLoans.length);

    // Calculate loan approved volume
    const loanApprovedVolume = customer.approved_limit;

    const loanApprovedWeight = Math.max(
      0,
      Math.min(30, (30 / 100000) * loanApprovedVolume)
    );
    // Get the sum of current loans from the current_debt field
    const sumCurrentLoans = customer.current_debt || 0;

    if (sumCurrentLoans > loanApprovedVolume) {
      creditScoreVal = 0;
    } else {
      creditScoreVal = Math.round(
        emiWeight + numOfLoanWeight + currentYearLoanWeight + loanApprovedWeight
      );
    }
    
    return creditScoreVal;
  } catch (error) {
    throw new Error(`Error calculating credit score: ${error.message}`);
  }
};

// const findIds = async () => {
//   const customers = await prisma.customer.findMany();

//   const customerIds = customers.map((customer) => customer.customer_id);

//   customerIds.map(async (customerId) => await creditScore(customerId));

//   //   console.log(customerIds);
// };

// findIds();

module.exports = {
  creditScore,
};
