const express = require('express');
const dotenv = require('dotenv');
const dataInjestRouter = require('./src/data-injestion/api/injestion/injestion-router');
const registerRouter = require('./src/loan-approval/api/register/register-router');
const checkEligibilityRouter = require('./src/loan-approval/api/check-eligibility/check-eligibility-router');
const creatLoanRouter = require('./src/loan-approval/api/create-loan/create-loan-router');

dotenv.config();
const app = express();

//middleware
app.use(express.json());

//routes
app.use('/api', dataInjestRouter);
app.use('/api', registerRouter);
app.use('/api', checkEligibilityRouter);
app.use('/api', creatLoanRouter);


const port = process.env.PORT || 8000;
app.listen(port, () => {
	try {
		console.log(`server is running on port ${port}`);
	} catch (err) {
		console.log(err);
	}
});
