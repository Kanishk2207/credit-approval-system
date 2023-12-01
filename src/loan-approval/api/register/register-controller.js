const { RegisterReqDto, RegisterResDto } = require('./register-dto');
const { createCustomer } = require('./register-service');

const registerCustomer = async (req, res) => {
	try {
	const { first_name, last_name, age, monthly_income, phone_number } =
		req.body;

	const reqDto = new RegisterReqDto(
		first_name,
		last_name,
		age,
		monthly_income,
		phone_number,
	);

	const customer = await createCustomer(reqDto);

	const name = `${customer.first_name} ${customer.last_name}`;
	const phoneNumber = customer.phone_number.toString();
	const resDto = new RegisterResDto(
		customer.customer_id,
		name,
		customer.age,
		customer.monthly_salary,
		customer.approved_limit,
		phoneNumber,
	);

	res.status(200).json(resDto);
	} catch (error) {
		res.status(500)
		throw new Error(`internal server error: ${error.message}`);
	}
};

module.exports = {
	registerCustomer,
};
