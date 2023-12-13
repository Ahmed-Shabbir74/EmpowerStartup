const express = require('express');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const InputinventoryController = require('../../controllers/Inputinventory/Inputinventory'); // Import the place order controller

const router = express.Router();

// Assuming you have defined a separate controller for placing orders
router.post('/Input-inventory', authMiddleware, InputinventoryController);

module.exports = router;
