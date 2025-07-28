const express = require('express');
const { processPayment, getKey, paymentVerification } = require('../controllers/productController');

const router = express.Router();


router.post('/payment-process', processPayment)
router.get('/getkey', getKey);
router.post('/payment-verification', paymentVerification)

module.exports = router;