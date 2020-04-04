"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_controller_1 = require("../controller/user.controller");
class UserRoute {
    constructor(router = new Router()) {
        router.post('/user', user_controller_1.UserController.createUser);
        router.get('/user', user_controller_1.UserController.getUsers);
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=../../src/route/user.route.js.map