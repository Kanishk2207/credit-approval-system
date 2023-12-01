const {
	checkEligibilityController,
} = require('./check-eligibility-controller');

const checkEligibilityRouter = require('express').Router();

checkEligibilityRouter.post('/checkEligibility', checkEligibilityController);

module.exports = checkEligibilityRouter;
