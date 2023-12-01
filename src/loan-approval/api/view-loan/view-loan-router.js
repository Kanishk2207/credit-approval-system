const { viewLoanConroller } = require('./view-loan-controller');

const viewLoanRouter = require('express').Router();

viewLoanRouter.post('/view-loan/:loanId', viewLoanConroller);

module.exports = viewLoanRouter;
