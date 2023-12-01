const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createCustomer = async (reqDto) => {
	try {
	const { first_name, last_name, age, monthly_income, phone_number } = reqDto;

	const approvedLoanLimit =
		Math.round((36 * monthly_income) / 100000) * 100000;

	const customers = await prisma.customer.findMany();

	const customerIds = customers.map((customer) => customer.customer_id);

	const maxId = Math.max(...customerIds);

	const customerId = maxId + 1;

	const newCustomer = await prisma.customer.create({
		data: {
			customer_id: customerId,
			first_name: first_name,
			last_name: last_name,
			age: age,
			monthly_salary: monthly_income,
			phone_number: phone_number,
			approved_limit: approvedLoanLimit,
		},
	});

	return newCustomer;
		
	} catch (error) {
		throw new Error(`Error while registering customer: ${error.message}`);
	}
};

module.exports = {
	createCustomer,
};
