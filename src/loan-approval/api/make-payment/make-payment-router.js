const { makePaymentController } = require('./make-payment-controller');

const makePaymentRouter = require('express').Router();

makePaymentRouter.post('/make-payment/:customerId/:loanId', makePaymentController),

module.exports = makePaymentRouter;
