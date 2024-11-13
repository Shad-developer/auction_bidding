const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {protected, isAdmin, isSeller} = require('../middleware/authMiddleware');
const upload = require("../utils/fileUpload");


router.get("/", productController.getAllProduct);
router.get("/user", protected, productController.getUserProduct);
router.get("/won-products", protected, productController.getWonedProducts);

// for seller
router.get("/sold", protected, isSeller, productController.getSellerSoldProducts);

router.get("/:id", productController.getProduct);

// seller routes
router.post("/", protected, isSeller, upload.single('image'), productController.createProduct);
router.put("/:id", protected, isSeller, upload.single('image'), productController.updateProduct);
router.delete("/:id", protected, isSeller, productController.deleteProduct);

// admin routes
router.get("/admin/sold-products", protected, isAdmin, productController.getAllSoldProducts);
router.get("/admin/product", protected, isAdmin, productController.getAllProductByAdmin);
router.patch("/admin/product-verify/:id", protected, isAdmin, productController.verifyAndAddCommission);
router.delete("/admin/product/:id", protected, isAdmin, productController.deleteProductByAdmin);

module.exports = router;
