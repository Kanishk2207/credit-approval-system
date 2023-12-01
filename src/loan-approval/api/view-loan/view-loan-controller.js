const { viewLoanFunction } = require('./view-loan-service');

const viewLoanConroller = async (req, res) => {
	try {
		const loanId = req.params.loanId;
		const resDto = await viewLoanFunction(loanId);
        // console.log('working');
		res.status(200).json(resDto);
	} catch (error) {
        res.status(500).json({ error: error.message})
        throw new Error(`internal server error: ${error.message}`);
    }
};

module.exports = {
	viewLoanConroller,
};
