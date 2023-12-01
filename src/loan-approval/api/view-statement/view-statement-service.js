const { PrismaClient } = require('@prisma/client');
const { ViewStatementResDto } = require('./view-statement-dto');
const { differenceInCalendarMonths } = require('date-fns');

const prisma = new PrismaClient();

const viewStatementFunction = async (customerId, loanId) => {
	try {

        customerId = Number(customerId);
        loanId = Number(loanId)

		const customer = await prisma.customer.findUnique({
			where: {
				customer_id: customerId,
			},
		});

		const loan = await prisma.loan.findUnique({
			where: {
				loan_id: loanId,
			},
		});

        if(!loan) {
            return { message: 'statement generation failed, no loan found' };
        }

		if (loan.customer_id != customerId) {
			return {
				message:
					'statement generation failed, customer and customerId does not match',
			};
		}
        const now = new Date();
        
		const monthsPassed = Math.abs(
			differenceInCalendarMonths(loan.start_date, now),
		);
		const repaymentsLeft = loan.tenure - monthsPassed;
		const AmountPaid = loan.monthly_payment * monthsPassed;

		const resDto = new ViewStatementResDto(
			customerId,
			loanId,
			loan.loan_amount,
			loan.interest_rate,
			AmountPaid,
			loan.monthly_payment,
			repaymentsLeft,
		);

		return resDto;
	} catch (error) {
		throw new Error(`Error while making statement: ${error.message}`);
	}
};

module.exports = {
	viewStatementFunction,
};
