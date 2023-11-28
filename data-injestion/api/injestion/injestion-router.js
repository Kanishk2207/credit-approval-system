const router = require('express').Router();
const multer = require('multer');
const { injestionController } = require('./injestion-controller');



const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 10, // 10 MB limit per file
	},
});

router.post('/upload', upload.array('abc', 12), injestionController);

module.exports = router;
