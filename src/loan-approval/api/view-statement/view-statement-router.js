const { viewStatementController } = require('./view-statement-controller');

const viewStatementRouter = require('express').Router();

viewStatementRouter.get('/view-statement/:customerId/:loanId', viewStatementController);

module.exports = viewStatementRouter;
