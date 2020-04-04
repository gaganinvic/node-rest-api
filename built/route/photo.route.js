"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const photo_controller_1 = require("../controller/photo.controller");
class PhotoRoute {
    constructor(router = new Router()) {
        router.get('/photo', photo_controller_1.PhotoController.getPhotos);
    }
}
exports.PhotoRoute = PhotoRoute;
//# sourceMappingURL=../../src/route/photo.route.js.map