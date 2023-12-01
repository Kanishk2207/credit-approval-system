const { CreatLoanReqDto } = require("./create-loan-dto");
const { creatLoanFunction } = require("./create-loan-service");


const creatLoanController = async (req, res) => {
    try {
    const { customer_id, loan_amount, interest_rate, tenure } = req.body;
    
    const reqDto = new CreatLoanReqDto(customer_id, loan_amount, interest_rate, tenure);

    const eligibilityCheck = await creatLoanFunction(reqDto);

    res.status(200).json(eligibilityCheck);
        
    } catch (error) {
        res.status(500).json({error: error.message})
		throw new Error(`internal server error: ${error.message}`);
    }
}

module.exports = {
    creatLoanController,
}