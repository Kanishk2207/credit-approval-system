const { injestData } = require("./injestion-service");

const injestionController = async (req, res) => {
	try {
		if (!req.body) {
			return res.status(400).json({ error: 'No file content provided' });
		}
		const data = req.files;

		const results = await injestData(data);

		res.status(200).json({
			message: 'files uploaded successfully',
			data: results,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	injestionController,
};