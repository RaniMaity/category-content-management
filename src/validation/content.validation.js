const AppError = require("../utils/AppError");

class ContentValidator {

    static validateTitle(title) {
        if (!title || typeof title !== "string" || !title.trim()) {
            throw new AppError("Content title is required", 400);
        }

        if (title.trim().length < 3) {
            throw new AppError(
                "Title must contain at least 3 characters",
                400
            );
        }

        return true;
    }

    static validateDescription(description) {
        if (
            !description || typeof description !== "string" ||!description.trim()
        ) {
            throw new AppError("Content description is required", 400);
        }

        return true;
    }

    static validateBody(body) {
        if (!body || typeof body !== "string" || !body.trim()) {
            throw new AppError("Content body is required", 400);
        }

        return true;
    }

    static validateThumbnail(thumbnail) {
        if (
            !thumbnail || typeof thumbnail !== "string" || !thumbnail.trim()
        ) {
            throw new AppError("Thumbnail URL is required", 400);
        }

        try {
            const url = new URL(thumbnail);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error();
            }
        } catch {
            throw new AppError("Enter a valid thumbnail URL", 400);
        }

        return true;
    }

    static validateCategoryId(categoryId) {
        if (
            !categoryId ||
            typeof categoryId !== "string" ||
            !categoryId.trim()
        ) {
            throw new AppError("Please select a category", 400);
        }

        return true;
    }

    static validateStatus(status) {
        if (!["draft", "published"].includes(status)) {
            throw new AppError(
                "Status must be draft or published",
                400
            );
        }

        return true;
    }

    static validateContent(
        title,
        description,
        body,
        thumbnail,
        categoryId,
        status
    ) {
        this.validateTitle(title);
        this.validateDescription(description);
        this.validateBody(body);
        this.validateThumbnail(thumbnail);
        this.validateCategoryId(categoryId);
        this.validateStatus(status);

        return true;
    }
}

module.exports = ContentValidator;