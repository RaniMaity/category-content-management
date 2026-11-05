
// Core modules
const path = require("path");

// NPM modules
const express = require("express");

// Routes
const categoryRoutes = require("./src/routes/category.routes");
const contentRoutes = require("./src/routes/content.routes");

// Services
const CategoryService = require("./src/services/category.service");
const ContentService = require("./src/services/content.service");

const app = express();

const categoryService = new CategoryService();
const contentService = new ContentService();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Public folder access
app.use(express.static(path.join(__dirname, "public")));

// Home Page
app.get("/", (req, res) => {
  const categories = categoryService.getAllCategories();
  const contents = contentService.getPublishedContents();

  res.render("home", {
    categories,
    contents,
  });
});

// Category Pages
app.get("/categories-page", (req, res) => {
  const categories = categoryService.getAllCategories();

  res.render("categories", {
    categories,
  });
});

app.get("/categories/create", (req, res) => {
  res.render("create-category");
});

app.get("/categories/:id/view", (req, res) => {
  const category = categoryService.getCategoryById(req.params.id);

  if (!category) {
    return res.status(404).send("Category not found");
  }

  const contents =
    contentService.getPublishedContentsByCategory(req.params.id);

  res.render("category-details", {
    category,
    contents,
  });
});

app.get("/categories/:id/edit", (req, res) => {
  const category = categoryService.getCategoryById(req.params.id);

  if (!category) {
    return res.status(404).send("Category not found");
  }

  res.render("edit-category", {
    category,
  });
});

// Content Pages
app.get("/contents-page", (req, res) => {
  const contents = contentService.getAllContents();
  const categories = categoryService.getAllCategories();

  res.render("contents", {
    contents,
    categories,
  });
});

app.get("/content/create", (req, res) => {
  const categories = categoryService.getAllCategories();

  res.render("create-content", {
    categories,
  });
});

app.get("/content/:id/view", (req, res) => {
  const content = contentService.getContentById(req.params.id);

  if (!content) {
    return res.status(404).send("Content not found");
  }

  const category = categoryService.getCategoryById(content.categoryId);

  res.render("content-details", {
    content,
    category,
  });
});

app.get("/content/:id/edit", (req, res) => {
  const content = contentService.getContentById(req.params.id);

  if (!content) {
    return res.status(404).send("Content not found");
  }

  const categories = categoryService.getAllCategories();

  res.render("edit-content", {
    content,
    categories,
  });
});

// API Routes (Keep these after EJS page routes)
app.use("/categories", categoryRoutes);
app.use("/content", contentRoutes);

// Server
app.listen(5000, () => {
  console.log("Express server running on http://localhost:5000");
});
