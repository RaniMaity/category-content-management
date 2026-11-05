const ContentService = require("../services/content.service");
const ContentValidator = require("../validation/content.validation");

class ContentController {
  constructor() {
    this.contentService = new ContentService();
  }

  createContent = (req, res) => {
    try {
      const { title, description, body, thumbnail, categoryId, status } =
        req.body;

      ContentValidator.validateContent(
        title,
        description,
        body,
        thumbnail,
        categoryId,
        status,
      );

      const content = this.contentService.createContent(
        title,
        description,
        body,
        thumbnail,
        categoryId,
        status,
      );

      res.status(201).json({
        success: true,
        message: "Content created successfully",
        data: content,
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

  getAllContents = (req, res) => {
    try {
      const contents = this.contentService.getAllContents();

      res.status(200).json({
        success: true,
        message: "Content fetched successfully",
        count: contents.length,
        data: contents,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  getContentById = (req, res) => {
    try {
      const content = this.contentService.getContentById(req.params.id);

      if (!content) {
        return res.status(404).json({
          success: false,
          message: "Content not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Content details fetched successfully",
        data: content,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  updateContent = (req, res) => {
    try {
      const { title, description, body, thumbnail, categoryId, status } =
        req.body;

      ContentValidator.validateContent(
        title,
        description,
        body,
        thumbnail,
        categoryId,
        status,
      );

      const content = this.contentService.updateContent(
        req.params.id,
        title,
        description,
        body,
        thumbnail,
        categoryId,
        status,
      );

      res.status(200).json({
        success: true,
        message: "Content updated successfully",
        data: content,
      });
    } catch (error) {
      let status = 400;

      if (
        error.message === "Content not found" ||
        error.message === "Category not found"
      ) {
        status = 404;
      }

      res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  };

  deleteContent = (req, res) => {
    try {
      const content = this.contentService.deleteContent(req.params.id);

      res.status(200).json({
        success: true,
        message: "Content deleted successfully",
        data: content,
      });
    } catch (error) {
      let status = 400;

      if (error.message === "Content not found") {
        status = 404;
      }

      res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  };

  getPublishedContents = (req, res) => {
    try {
      const contents = this.contentService.getPublishedContents();

      res.status(200).json({
        success: true,
        message: "Published contents fetched successfully",
        count: contents.length,
        data: contents,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  getPublishedContentsByCategory = (req, res) => {
    try {
      const contents = this.contentService.getPublishedContentsByCategory(
        req.params.categoryId,
      );

      res.status(200).json({
        success: true,
        message: "Published contents fetched successfully",
        count: contents.length,
        data: contents,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports = ContentController;
