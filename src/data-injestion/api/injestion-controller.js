const myQueue = require("../../../lib/workers/injestion-workers");

const injestionController = async (req, res) => {
	try {
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).json({ error: 'No files uploaded' });
		}
		const results = await myQueue.add('ingestionJob', { files: req.files });
	
		res.status(200).json({
			message: 'files uploaded successfully,Processing started in the background.',
		});
	} catch (error) {
		res.status(500).json({ error: error.message})
        throw new Error(`internal server error: ${error.message}`);
	}
};

module.exports = {
	injestionController,
};