const { checkElegiblityfunction } = require("./check-eligibility-service");
const { CheckEligibilityReqDto } = require("./check-eligibility-dto");



const checkEligibilityController = async (req, res) => {
    try {
        
        const { customer_id, loan_amount, interest_rate, tenure } = req.body
        
        const reqDto = new CheckEligibilityReqDto(customer_id, loan_amount, interest_rate, tenure)
        
        const checkEliRes = await checkElegiblityfunction(reqDto);
        
        res.status(200).json(checkEliRes);
    } catch (error) {
        res.status(500).json({ error: error.message})
        throw new Error(`internal server error: ${error.message}`);
    }
}

module.exports = {
    checkEligibilityController,
}