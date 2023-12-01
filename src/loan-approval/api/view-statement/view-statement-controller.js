const { viewStatementFunction } = require('./view-statement-service');

const viewStatementController = async (req, res) => {
	try {
		const customerId = req.params.customerId;
		const loanId = req.params.loanId;

		const resDto = await viewStatementFunction(customerId, loanId);

		res.status(200).json(resDto);
	} catch (error) {
		res.status(500).json({ error: error.message });
		throw new Error(`internal server error: ${error.message}`);
	}
};

module.exports = {
    viewStatementController,
}
