const xlsx = require('xlsx');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const injestData = async (dataArray) => {
	var uniqueCustomerData = [];
	var uniqueLoanData = [];

	for (const file of dataArray) {
		try {
			// customer data injestion
			if (file.originalname === 'customer_data.xlsx') {

				const bufferCustomerData = Buffer.from(file.buffer.data);

				const customerData = sheetToJson(bufferCustomerData);

				// filter duplicate data in customer data
				const uniqueCustomerIds = new Set();

				const nonDuplicateCustomerData = customerData.filter((obj) => {
					if (!uniqueCustomerIds.has(obj.customer_id)) {
						uniqueCustomerIds.add(obj.customer_id);
						return true;
					}
					return false;
				});

				// filter existing data
				const existingCustomerRecords = await prisma.customer.findMany({
					where: {
						customer_id: {
							in: customerData.map((item) => item.customer_id),
						},
					},
					select: { customer_id: true },
				});

				const existingCustomerIds = existingCustomerRecords.map(
					(record) => record.customer_id,
				);

				uniqueCustomerData = nonDuplicateCustomerData.filter(
					(item) => !existingCustomerIds.includes(item.customer_id),
				);

				if (uniqueCustomerData.length === 0) {
					console.error({
						error: 'provided customer data already exists',
					});
					break;
				}

				await prisma.customer.createMany({
					data: customerData,
				});
			}
		} catch (error) {
			throw error;
		}

		// loan data injestion
		if (file.originalname === 'loan_data.xlsx') {
			const bufferLoanData = Buffer.from(file.buffer.data);
			const loanData = sheetToJson(bufferLoanData);

			// filter duplicate data in loan data
			const uniqueLoanIds = new Set();
			const nonDuplicateLoanData = loanData.filter((obj) => {
				if (!uniqueLoanIds.has(obj.loan_id) || obj.loan_id === null) {
					uniqueLoanIds.add(obj.loan_id);
					return true;
				}
				return false;
			});

			// filter existing data
			const existingLoanRecords = await prisma.loan.findMany({
				where: {
					loan_id: {
						in: loanData.map((item) => item.loan_id),
					},
				},
				select: { loan_id: true },
			});

			const existingLoanIds = existingLoanRecords.map(
				(record) => record.loan_id,
			);

			uniqueLoanData = nonDuplicateLoanData.filter(
				(item) => !existingLoanIds.includes(item.loan_id),
			);

			if (uniqueLoanData.length === 0) {
				console.error({
					error: 'provided loan data already exists',
				});
				break;
			}

			await prisma.loan.createMany({
				data: uniqueLoanData,
			});
		}
	}

	const dataInjested = [...uniqueCustomerData, ...uniqueLoanData];
	return dataInjested;
};

const sheetToJson = (sheetData) => {
	const workbook = xlsx.read(sheetData.buffer, {
		type: 'buffer',
		cellDates: true,
	});

	const sheetName = workbook.SheetNames[0];

	const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

	return jsonData;
};

module.exports = {
	injestData,
};
