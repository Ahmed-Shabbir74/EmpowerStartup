const express = require('express');
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const UpdateCandidate=require("../../controllers/user/update-candidate");
const upload=require("../../helpers/multerHelper");

const router = express.Router();

router.put('/update-candidate', authMiddleware, upload.fields([{ name: 'CNICFront', maxCount: 1 }, { name: 'CNICBack', maxCount: 1 }, { name: 'Electricitybill', maxCount: 1 },{ name: 'Utilitybill', maxCount: 1 }]), UpdateCandidate);

module.exports = router;



