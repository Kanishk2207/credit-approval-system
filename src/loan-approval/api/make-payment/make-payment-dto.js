class MakePaymentReqDto {
	customer_id;
	loan_id;
	payment_amount;

	constructor(customer_id, loan_id, payment_amount) {
		this.customer_id = customer_id;
		this.loan_id = loan_id;
		this.payment_amount = payment_amount;
	}
}


module.exports = {
	MakePaymentReqDto,
}