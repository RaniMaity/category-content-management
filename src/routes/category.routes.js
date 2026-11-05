
const express = require("express");
const CategoryController = require("../controller/category.controller");

const router = express.Router();
const categoryController = new CategoryController();


router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
