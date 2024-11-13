const express = require('express')
const router = express.Router();
const {protected, isAdmin, isSeller} = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');


router.post("/", protected, isAdmin, categoryController.createCategory);
router.get("/",  categoryController.getAllCategory);
router.get("/:id", protected, isAdmin, categoryController.getCategroy);
router.put("/:id", protected, isAdmin, categoryController.updateCategory);
router.delete("/:id", protected, isAdmin, categoryController.deleteCategory);



module.exports = router;