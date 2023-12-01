const { PrismaClient } = require('@prisma/client');
const {
	creditScore,
} = require('../../utils/credit-score/credit-score-service');
const { CheckEligibilityResDto } = require('./check-eligibility-dto');

const prisma = new PrismaClient();

const checkElegiblityfunction = async (checkEleReq) => {
	try {
		const { customer_id, loan_amount, interest_rate, tenure } = checkEleReq;

		let approval = false;
		let corrected_interest_rate = interest_rate;

		const creditScoreVal = await creditScore(customer_id);

		if (creditScoreVal >= 50) {
			approval = true;
		}
		if (creditScoreVal >= 30 && creditScoreVal < 50) {
			approval = true;
			corrected_interest_rate = 12;
		}
		if (creditScoreVal > 10 && creditScoreVal < 30) {
			approval = true;
			corrected_interest_rate = 16;
		}
		if (creditScoreVal <= 10) {
			approval = false;
			return {
				message:
					'your loan is not approved because your credit score is less than 30',
			};
		}

		const currentCustomer = await prisma.customer.findUnique({
			where: {
				customer_id: customer_id,
			},
			include: {
				Loan: true,
			},
		});

		const totalEmi = currentCustomer.Loan.reduce(
			(total, loan) => total + loan.monthly_payment,
			0,
		);

		const salery = currentCustomer.monthly_salary;

		if (totalEmi > salery) {
			approval = false;
			return {
				message:
					'your loan is not approved because your total EMI is more han half of your salery',
			};
		}

		let monthly_installment = calculateMonthlyInstallment(loan_amount, corrected_interest_rate, tenure);

		const checkEliRes = new CheckEligibilityResDto(
			customer_id,
			approval,
			interest_rate,
			corrected_interest_rate,
			tenure,
			monthly_installment,
		);

		return checkEliRes;
	} catch (error) {
		throw new Error(`Error while checking eligibility: ${error.message}`);
	}
};

const calculateMonthlyInstallment = (
	loanAmount,
	interestRate,
	tenureMonths,
) => {
	const monthlyInterestRate = interestRate / 12 / 100;

    // Calculate monthly installment using the formula for EMI in compound interest
    const denominator = Math.pow((1 + monthlyInterestRate), tenureMonths) - 1;
    const emi = loanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), tenureMonths) / denominator;

    return emi;
};



module.exports = {
	checkElegiblityfunction,
	calculateMonthlyInstallment
};
