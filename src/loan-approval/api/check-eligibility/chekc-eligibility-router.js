const {
	checkEligibilityController,
} = require('./chekc-eligibility-controller');

const checkEligibilityRouter = require('express').Router();

checkEligibilityRouter.post('/checkEligibility', checkEligibilityController);

module.exports = checkEligibilityRouter;
