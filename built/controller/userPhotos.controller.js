"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userPhotos_model_1 = require("../model/userPhotos.model");
const fs = require('fs');
class UserPhotosController {
    static async createUserPhotos(ctx, next) {
        try {
            const photos = Object.assign({
                username: ctx.params.username,
                imageData: fs.readFileSync(ctx.request.files.photo.path),
                imageType: ctx.request.files.photo.type,
                imageSize: ctx.request.files.photo.size,
                imageName: ctx.request.files.photo.name
            }, ctx.request.body);
            console.log("photos:IUserPhotos : ", photos);
            const userPhotos = await userPhotos_model_1.UserPhotos.uploadUserPhotos(photos);
            console.log("userPhotos : ", userPhotos);
            ctx.status = 201;
            ctx.body = userPhotos.response();
            console.log("userPhotos : ", userPhotos);
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
    static async getUserPhotos(ctx, next) {
        try {
            const userPhotos = await userPhotos_model_1.UserPhotos.getUserPhotos(ctx.params.username);
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
    static async updateUserPhoto(ctx, next) {
        try {
            const userPhotos = await userPhotos_model_1.UserPhotos.updateUserPhoto(ctx.params.username, ctx.params.id, ctx.request.body);
            ctx.body = userPhotos.response();
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
    static async deleteUserPhoto(ctx, next) {
        try {
            await userPhotos_model_1.UserPhotos.deleteUserPhoto(ctx.params.username, ctx.params.id);
            ctx.status = 204;
            ctx.body = { success: true };
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
exports.UserPhotosController = UserPhotosController;
//# sourceMappingURL=../../src/controller/userPhotos.controller.js.map