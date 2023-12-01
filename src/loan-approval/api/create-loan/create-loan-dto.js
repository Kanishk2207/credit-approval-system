class CreatLoanReqDto {
	customer_id;
	loan_amount;
	interest_rate;
	tenure;
	constructor(customer_id, loan_amount, interest_rate, tenure) {
		this.customer_id = customer_id;
		this.loan_amount = loan_amount;
		this.interest_rate = interest_rate;
		this.tenure = tenure;
	}
}

class CreatLoanResDto {
	loan_id;
	customer_id;
	loan_approved;
	message;
	monthly_installment;
	constructor(
		loan_id,
		customer_id,
		loan_approved,
		message,
		monthly_installment,
	) {
		this.loan_id = loan_id;
		this.customer_id = customer_id;
		this.loan_approved = loan_approved;
		this.message = message;
		this.monthly_installment = monthly_installment;
	}
}

module.exports = {
	CreatLoanReqDto,
	CreatLoanResDto,
};
