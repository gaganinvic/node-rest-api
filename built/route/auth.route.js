"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_controller_1 = require("../controller/user.controller");
class AuthRoute {
    constructor(router = new Router()) {
        router.post('/oauth/token', user_controller_1.UserController.authenticate);
    }
}
exports.AuthRoute = AuthRoute;
//# sourceMappingURL=../../src/route/auth.route.js.map