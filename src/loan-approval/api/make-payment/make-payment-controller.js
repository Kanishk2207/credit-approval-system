const { MakePaymentReqDto } = require("./make-payment-dto");
const { paymentFunction } = require("./make-payment-service");


const makePaymentController = async (req, res) => {
    try {
        const payment_amount = req.body;
        const customerId = req.params.customerId
        const loanId = req.params.loanId

        const reqDto = new MakePaymentReqDto(customerId, loanId, payment_amount);

        const resMessage = await paymentFunction(reqDto);

        res.status(200).json(resMessage);
    } catch (error) {
        res.status(500).json({ error: error.message})
        throw new Error(`internal server error: ${error.message}`);
    }
}

module.exports = {
    makePaymentController,
}