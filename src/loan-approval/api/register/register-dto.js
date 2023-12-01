class RegisterReqDto {
	first_name;
	last_name;
	age;
	monthly_income;
	phone_number;

	constructor(first_name, last_name, age, monthly_income, phone_number) {
		this.first_name = first_name;
		this.last_name = last_name;
		this.age = age;
		this.monthly_income = monthly_income;
		this.phone_number = phone_number;
	}
}

class RegisterResDto {
	customer_id;
	name;
	age;
	monthly_income;
	approved_limit;
	phone_number;

	constructor(
		customer_id,
		name,
		age,
		monthly_income,
		approved_limit,
		phone_number,
	) {
		this.customer_id = customer_id;
		this.name = name;
		this.age = age;
		this.monthly_income = monthly_income;
		this.approved_limit = approved_limit;
		this.phone_number = phone_number;
	}
}

module.exports = {
	RegisterReqDto,
	RegisterResDto,
};
