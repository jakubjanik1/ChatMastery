const express = require('express');
const router = express.Router();

const UploadController = require('../controllers/UploadController');
const multipart = require('connect-multiparty')();
const { catchAsync } = require('../middlewares/errors');

router.post('/image', multipart, catchAsync(UploadController.uploadImage));

module.exports = router;