const { PrismaClient } = require('@prisma/client');
const { ViewLoanDto, CustomerDto } = require('./view-loan-dto');

const prisma = new PrismaClient();

const viewLoanFunction = async (loanId) => {
	try {
		const intLoanId = Number(loanId);

		const loan = await prisma.loan.findUnique({
			where: {
				loan_id: intLoanId,
			},
			include: {
				customer: true,
			},
		});

		if (!loan) {
			throw new Error('Loan not found');
		}

		const customer = new CustomerDto(
			loan.customer.first_name,
			loan.customer.last_name,
			loan.customer.phone_number.toString(),
			loan.customer.age,
		);
		
		const resDto = new ViewLoanDto(
			loan.loan_id,
			customer,
			loan.loan_amount,
			loan.interest_rate,
			loan.monthly_payment,
			loan.tenure,
		);
		// console.log('working');
		return resDto;
	} catch (error) {
		res.status(500);
		throw new Error(`Error while creating loan: ${error.message}`);
	}
};

module.exports = {
	viewLoanFunction,
};
