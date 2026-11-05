const crypto = require("crypto");

class Content {
    constructor(title, description, body, thumbnail, categoryId, status) {
        this.id = crypto.randomUUID();
        this.categoryId = categoryId;
        this.title = title.trim();
        this.description = description.trim();
        this.body = body.trim();
        this.thumbnail = thumbnail.trim();
        this.status = status;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }
}

module.exports = Content;