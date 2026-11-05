const fs = require("fs");
const path = require("path");
const Content = require("../model/content.model");

class ContentService {
  constructor() {
    this.filePath = path.join(__dirname, "../../data/contents.json");
    this.categoryFilePath = path.join(__dirname, "../../data/categories.json");
  }

  getAllContents() {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  createContent(title, description, body, thumbnail, categoryId, status) {
    const categories = JSON.parse(
      fs.readFileSync(this.categoryFilePath, "utf-8"),
    );

    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    const contents = this.getAllContents();

    const content = new Content(
      title,
      description,
      body,
      thumbnail,
      categoryId,
      status,
    );

    contents.push(content);

    fs.writeFileSync(this.filePath, JSON.stringify(contents, null, 2));

    return {
      ...content,
      category: {
        id: category.id,
        name: category.name,
      },
    };
  }

  getContentById(id) {
    const contents = this.getAllContents();

    return contents.find((content) => content.id === id);
  }

  updateContent(id, title, description, body, thumbnail, categoryId, status) {
    const contents = this.getAllContents();

    const index = contents.findIndex((content) => content.id === id);

    if (index === -1) {
      throw new Error("Content not found");
    }

    const categories = JSON.parse(
      fs.readFileSync(this.categoryFilePath, "utf-8"),
    );

    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    contents[index] = {
      ...contents[index],
      title: title.trim(),
      description: description.trim(),
      body: body.trim(),
      thumbnail: thumbnail.trim(),
      categoryId,
      status,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(this.filePath, JSON.stringify(contents, null, 2));

    return {
      ...contents[index],
      category: {
        id: category.id,
        name: category.name,
      },
    };
  }

  deleteContent(id) {
    const contents = this.getAllContents();

    const content = contents.find((item) => item.id === id);

    if (!content) {
      throw new Error("Content not found");
    }

    const updatedContents = contents.filter((item) => item.id !== id);

    fs.writeFileSync(this.filePath, JSON.stringify(updatedContents, null, 2));

    return content;
  }

  getPublishedContents() {
    const contents = this.getAllContents();

    return contents.filter((content) => content.status === "published");
  }

  getPublishedContentsByCategory(categoryId) {
    const contents = this.getAllContents();

    return contents.filter(
      (content) =>
        content.categoryId === categoryId && content.status === "published",
    );
  }
}

module.exports = ContentService;
