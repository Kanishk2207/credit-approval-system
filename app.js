const express = require('express');
const dotenv = require('dotenv');
const injestionRouter = require('./data-injestion/api/injestion/injestion-router');

dotenv.config();
const app = express();


//middleware
app.use(express.json());


//routes
app.use('/api', injestionRouter)

const port = process.env.PORT || 8000;
app.listen(port, () => {
	try {
		console.log(`server is running on port ${port}`);
	} catch (err) {
		console.log(err);
	}
});
