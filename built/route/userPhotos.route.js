"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const userPhotos_controller_1 = require("../controller/userPhotos.controller");
class UserPhotosRoute {
    constructor(router = new Router()) {
        router.post('/user/:username/photos', userPhotos_controller_1.UserPhotosController.createUserPhotos);
        router.get('/user/:username/photos', userPhotos_controller_1.UserPhotosController.getUserPhotos);
        router.put('/user/:username/photos/:id', userPhotos_controller_1.UserPhotosController.updateUserPhoto);
        router.delete('/user/:username/photos/:id', userPhotos_controller_1.UserPhotosController.deleteUserPhoto);
    }
}
exports.UserPhotosRoute = UserPhotosRoute;
//# sourceMappingURL=../../src/route/userPhotos.route.js.map