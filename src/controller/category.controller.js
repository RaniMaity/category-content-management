const CategoryService = require("../services/category.service");
const CategoryValidator = require("../validation/category.validation");

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }

  createCategory = (req, res) => {
    try {
      const { name, description, imageurl } = req.body;

      CategoryValidator.validateCategory(name, description, imageurl);

      const category = this.categoryService.createCategory(
        name,
        description,
        imageurl,
      );

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  getAllCategories = (req, res) => {
    try {
      const categories = this.categoryService.getAllCategories();

      res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        count: categories.length,
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  getCategoryById = (req, res) => {
    try {
      const category = this.categoryService.getCategoryById(req.params.id);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Category details fetched successfully",
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  updateCategory = (req, res) => {
    try {
      const { name, description, imageurl } = req.body;

      CategoryValidator.validateCategory(name, description, imageurl);

      const category = this.categoryService.updateCategory(
        req.params.id,
        name,
        description,
        imageurl,
      );

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      let status = 400;

      if (error.message === "Category not found") {
        status = 404;
      }

      res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  };

  deleteCategory = (req, res) => {
    try {
      const category = this.categoryService.deleteCategory(req.params.id);

      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data: category,
      });
    } catch (error) {
      let status = 400;

      if (error.message === "Category not found") {
        status = 404;
      }

      res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports = CategoryController;
