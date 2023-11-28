const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();


//middleware
app.use(express.json());



const port = process.env.PORT || 8000;
app.listen(port, () => {
	try {
		console.log(`server is running on port ${port}`);
	} catch (err) {
		console.log(err);
	}
});
