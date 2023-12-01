const { PrismaClient } = require('@prisma/client');
const {
	checkElegiblityfunction,
} = require('../check-eligibility/check-eligibility-service');
const { CreatLoanResDto } = require('./create-loan-dto');

const prisma = new PrismaClient();

const creatLoanFunction = async (reqDto) => {
	try {
		const { customer_id, loan_amount, interest_rate, tenure } = reqDto;

		const eligibilityCheck = await checkElegiblityfunction(reqDto);
		const now = new Date();

		const futureDate = new Date(
			now.getFullYear(),
			now.getMonth() + tenure,
			now.getDate(),
			now.getHours(),
			now.getMinutes(),
			now.getSeconds(),
		);

		const loans = await prisma.loan.findMany();

		const loanIds = loans.map((loan) => loan.loan_id);

		const maxId = Math.max(...loanIds);

		const loanId = maxId + 1;

		const newLoan = await prisma.loan.create({
			data: {
				loan_id: loanId,
				loan_amount: loan_amount,
				tenure: tenure,
				interest_rate: eligibilityCheck.corrected_interest_rate,
				monthly_payment: eligibilityCheck.monthly_installment,
				EMIs_paid_on_time: 0,
				start_date: now,
				end_date: futureDate,
				customer_id: customer_id,
			},
		});

		const resDto = new CreatLoanResDto(
			newLoan.loan_id,
			newLoan.customer_id,
			eligibilityCheck.approval,
			eligibilityCheck.message,
			eligibilityCheck.monthly_installment,
		);

		return resDto;
	} catch (error) {
		throw new Error(`Error while creating loan: ${error.message}`);
	}
};

module.exports = {
	creatLoanFunction,
};
