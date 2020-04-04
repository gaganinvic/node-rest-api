"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userPhotos_model_1 = require("../model/userPhotos.model");
class PhotoController {
    static async getPhotos(ctx, next) {
        try {
            const userPhotos = await userPhotos_model_1.UserPhotos.getPhotos();
            ctx.body = { photos: userPhotos.map((photos) => photos.response()) };
        }
        catch (e) {
            console.error(e);
            ctx.status = 400;
            ctx.body = {
                message: `Invalid request, ${e.message}`,
                errors: e.errors
            };
        }
        next();
    }
}
exports.PhotoController = PhotoController;
//# sourceMappingURL=../../src/controller/photo.controller.js.map