
const express = require("express");
const ContentController = require("../controller/content.controller");

const router = express.Router();
const contentController = new ContentController();


router.post("/", contentController.createContent);
router.get("/", contentController.getAllContents);
router.get("/published", contentController.getPublishedContents);
router.get( "/published/category/:categoryId",contentController.getPublishedContentsByCategory);
router.get("/:id", contentController.getContentById);

router.put("/:id", contentController.updateContent);
router.delete("/:id", contentController.deleteContent);



module.exports = router;
