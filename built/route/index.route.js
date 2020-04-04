"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const auth_mw_1 = require("../middleware/auth.mw");
const user_route_1 = require("./user.route");
const photo_route_1 = require("./photo.route");
const auth_route_1 = require("./auth.route");
const userPhotos_route_1 = require("./userPhotos.route");
exports.router = new Router();
const authMw = new auth_mw_1.AuthMw(exports.router);
new auth_route_1.AuthRoute(exports.router);
new user_route_1.UserRoute(exports.router);
new userPhotos_route_1.UserPhotosRoute(exports.router);
new photo_route_1.PhotoRoute(exports.router);
//# sourceMappingURL=../../src/route/index.route.js.map