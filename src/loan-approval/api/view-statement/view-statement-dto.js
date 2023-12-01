class ViewStatementResDto {
	customer_id;
	loan_id;
	principal;
	interest_rate;
	Amount_paid;
	monthly_installment;
	repayments_left;

	constructor(
		customer_id,
		loan_id,
		principal,
		interest_rate,
		Amount_paid,
		monthly_installment,
		repayments_left,
	) {
		this.customer_id = customer_id;
		this.loan_id = loan_id;
		this.principal = principal;
		this.interest_rate = interest_rate;
		this.Amount_paid = Amount_paid;
		this.monthly_installment = monthly_installment;
		this.repayments_left = repayments_left;
	}
}

module.exports = {
    ViewStatementResDto,
}