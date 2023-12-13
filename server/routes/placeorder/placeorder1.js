const express = require('express');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const placeOrderController = require('../../controllers/Placeorder/order'); // Import the place order controller

const router = express.Router();

// Assuming you have defined a separate controller for placing orders
router.post('/place-order', authMiddleware, placeOrderController);

module.exports = router;
