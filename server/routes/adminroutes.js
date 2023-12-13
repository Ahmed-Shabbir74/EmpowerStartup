// adminRoutes.js

const express = require('express');
const router = express.Router();
const { getUsersForAdmin } = require('../controllers/adminController');

// Add a new route to get user list for admin
router.get('/admin/users', getUsersForAdmin);

module.exports = router;
