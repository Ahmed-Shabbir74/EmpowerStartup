const express = require('express');

const signupController = require('../../controllers/auth/signupController');
const loginController=require('../../controllers/auth/loginController');
const upload=require("../../helpers/multerHelper");


const forgetPassword=require("../../controllers/auth/authController/resetPassword");
const {validateSignup,validateLogin}=require("../../validators/auth/auth-validation");
const {validateResetPassword,validateNewPasswordReset}=require("../../validators/auth/forgotpass-validation");
const validate=require("../../middlewares/validator/validator.js")

const router = express.Router();

router.post('/signup', upload.single('image'),validateSignup,validate,signupController.addUser);
router.post('/login',validateLogin,validate,loginController.checkLogin)
router.post("/reset-password",validateResetPassword,validate,forgetPassword.ResetPasswordSend);
router.post("/reset-password/new-password",validateNewPasswordReset,validate,forgetPassword.ResetPassword);

module.exports = router;



