const { creatLoanController } = require('./create-loan-controller');

const creatLoanRouter = require('express').Router();

creatLoanRouter.post('/create-loan', creatLoanController);

module.exports = creatLoanRouter;
