const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { protected, isAdmin } = require('../middleware/authMiddleware');
const upload = require("../utils/fileUpload");


router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/seller', userController.sellerLogin);
router.get('/loggedin', userController.loginStatus);
router.get('/logout', userController.logout);

router.post('/forgot-password', userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.get('/getuser', protected, userController.getUser);
router.get('/sell-amount', protected, userController.getUserBalance);

router.put('/update-profile', protected, upload.single('image'), userController.updateProfile);

// only accessible by admin
router.get('/users', protected, isAdmin, userController.getAllUsers);
router.get('/estimate-income', protected, isAdmin, userController.estimateIncome);


module.exports = router;