const fs = require("fs");
const path = require("path");
const Category = require("../model/category.model");

class CategoryService {
  constructor() {
    this.filePath = path.join(__dirname, "../../data/categories.json");
    this.contentFilePath = path.join(__dirname, "../../data/contents.json");
  }

  getAllCategories() {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  createCategory(name, description, imageurl) {
    const categories = this.getAllCategories();

    const exists = categories.some(
      (category) => category.name.toLowerCase() === name.trim().toLowerCase(),
    );

    if (exists) {
      throw new Error("Category already exists");
    }

    const category = new Category(name, description, imageurl);

    categories.push(category);

    fs.writeFileSync(this.filePath, JSON.stringify(categories, null, 2));

    return category;
  }

  getCategoryById(id) {
    const categories = this.getAllCategories();

    return categories.find((category) => category.id === id);
  }

  updateCategory(id, name, description, imageurl) {
    const categories = this.getAllCategories();

    const index = categories.findIndex((category) => category.id === id);

    if (index === -1) {
      throw new Error("Category not found");
    }

    const duplicate = categories.some(
      (category) =>
        category.id !== id &&
        category.name.toLowerCase() === name.trim().toLowerCase(),
    );

    if (duplicate) {
      throw new Error("Another category already uses this name");
    }

    categories[index].name = name.trim();
    categories[index].description = description.trim();
    categories[index].imageurl = imageurl.trim();

    fs.writeFileSync(this.filePath, JSON.stringify(categories, null, 2));

    return categories[index];
  }

  deleteCategory(id) {
    const categories = this.getAllCategories();

    const category = categories.find((item) => item.id === id);

    if (!category) {
      throw new Error("Category not found");
    }

    const contents = JSON.parse(fs.readFileSync(this.contentFilePath, "utf-8"));

    const hasContents = contents.some((content) => content.categoryId === id);

    if (hasContents) {
      throw new Error(
        "Delete the category's contents before deleting the category",
      );
    }

    const updatedCategories = categories.filter((item) => item.id !== id);

    fs.writeFileSync(this.filePath, JSON.stringify(updatedCategories, null, 2));

    return category;
  }
}

module.exports = CategoryService;
