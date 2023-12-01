class CustomerDto {
	first_name;
	last_name;
	phone_number;
	age;
	constructor(first_name, last_name, phone_number, age) {
		this.first_name = first_name;
		this.last_name = last_name;
		this.phone_number = phone_number;
		this.age = age;
	}
}

class ViewLoanDto {
	loan_id;
	customer;
	loan_amount;
	interest_rate;
	monthly_installment;
	tenure;

	constructor(
		loan_id,
		customer,
		loan_amount,
		interest_rate,
		monthly_installment,
		tenure,
	) {
		this.loan_id = loan_id;
		this.customer = customer;
		this.loan_amount = loan_amount;
		this.interest_rate = interest_rate;
		this.monthly_installment = monthly_installment;
		this.tenure = tenure;
	}
}

module.exports = {
	ViewLoanDto,
    CustomerDto,
};
