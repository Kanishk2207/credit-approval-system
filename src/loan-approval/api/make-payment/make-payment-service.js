const { PrismaClient } = require('@prisma/client');
const { calculateMonthlyInstallment } = require('../check-eligibility/check-eligibility-service');
const { differenceInCalendarMonths } = require('date-fns');

const prisma = new PrismaClient();

const paymentFunction = async (reqDto) => {
	try {
		var { customer_id, loan_id, payment_amount } = reqDto;

		customer_id = Number(customer_id);
		loan_id = Number(loan_id);

		const customer = await prisma.customer.findUnique({
			where: {
				customer_id: customer_id,
			},
		});
		const now = new Date();

		const loan = await prisma.loan.findUnique({
			where: {
				loan_id: loan_id,
			},
		});
		if (loan.end_date < now) {
			return { message: 'payment failed, loan tenure complete' };
		}

		if (payment_amount == loan.monthly_payment) {
			return { message: 'payment successful' };
		}

		const monthsPassed = Math.abs(
			differenceInCalendarMonths(loan.start_date, now),
		);
		const monthsRemaning = Math.abs(
			differenceInCalendarMonths(now, loan.end_date),
		);

		const futureValue =
			loan.loan_amount *
			Math.pow(1 + loan.interest_rate / 100 / 1, 1 * (loan.tenure / 12));
		const remainingAmount = Math.round(
			futureValue *
				Math.pow(
					1 + loan.interest_rate / 100 / 1,
					-(1 * (monthsPassed / 12)),
				),
		);

        console.log(loan.interest_rate);
		const newInstallment = calculateMonthlyInstallment(remainingAmount, loan.interest_rate, monthsRemaning)

		await prisma.loan.update({
			where: {
				loan_id: loan_id,
			},
			data: {
				monthly_payment: newInstallment,
			},
		});

		return {
			message: 'payment successful',
			newInstallment: newInstallment,
		};
	} catch (error) {
		throw new Error(`Error while making payment: ${error.message}`);
	}
};

module.exports = {
	paymentFunction,
};
