const { PrismaClient } = require('@prisma/client');
const {
	creditScore,
} = require('../../utils/credit-score/credit-score-service');
const { CheckEligibilityResDto } = require('./chekc-eligibility-dto');

const prisma = new PrismaClient();

const checkElegiblityfunction = async (checkEleReq) => {
    try {
	const { customer_id, loan_amount, interest_rate, tenure } = checkEleReq;

	let approval = false;
	let corrected_interest_rate = interest_rate;

	const creditScoreVal = await creditScore(customer_id);

	if (creditScoreVal > 50) {
		approval = true;
	}
	if (creditScoreVal > 30 && creditScoreVal < 50) {
		approval = true;
		corrected_interest_rate = 12;
	}
	if (creditScoreVal > 10 && creditScoreVal < 30) {
		approval = true;
		corrected_interest_rate = 16;
	}
	if (creditScoreVal < 30) {
		approval = false;
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
		(total, loan) => total + loan.monthly_payment, 0
	);

	const salery = currentCustomer.monthly_salary;
		
	if (totalEmi > salery) {
		approval = false;
	}

	let monthly_installment = loan_amount / tenure;

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


module.exports = {
    checkElegiblityfunction,
}