class CheckEligibilityReqDto {
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

class CheckEligibilityResDto {
	customer_id;
	approval;
	interest_rate;
	corrected_interest_rate;
	tenure;
	monthly_installment;
    constructor(customer_id, approval, interest_rate, corrected_interest_rate, tenure, monthly_installment) {
        this.customer_id = customer_id;
        this.approval = approval;
        this.interest_rate = interest_rate;
        this.corrected_interest_rate = corrected_interest_rate;
        this.tenure = tenure;
        this.monthly_installment = monthly_installment;
    }
}

module.exports = {
	CheckEligibilityReqDto,
	CheckEligibilityResDto,
}
