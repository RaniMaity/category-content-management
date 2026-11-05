const AppError = require("../utils/AppError");

class CategoryValidator {

    static validateName(name) {
        if (!name || typeof name !== "string" || !name.trim()) {
            throw new AppError("Category name is required", 400);
        }

        if (name.trim().length < 3) {
            throw new AppError(
                "Category name must contain at least 3 characters",
                400
            );
        }

        return true;
    }

    static validateDescription(description) {
        if (
            !description ||
            typeof description !== "string" ||
            !description.trim()
        ) {
            throw new AppError("Category description is required", 400);
        }

        if (description.trim().length < 10) {
            throw new AppError(
                "Description must contain at least 10 characters",
                400
            );
        }

        return true;
    }

    static validateImageUrl(imageurl) {
        if (
            !imageurl ||
            typeof imageurl !== "string" ||
            !imageurl.trim()
        ) {
            throw new AppError("Category image URL is required", 400);
        }

        try {
            const url = new URL(imageurl);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error();
            }
        } catch {
            throw new AppError("Enter a valid category image URL", 400);
        }

        return true;
    }

    static validateCategory(name, description, imageurl) {
        this.validateName(name);
        this.validateDescription(description);
        this.validateImageUrl(imageurl);

        return true;
    }
}

module.exports = CategoryValidator;