"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../model/user.model");
class UserController {
    static async createUser(ctx, next) {
        try {
            const user = await user_model_1.User.createUser(ctx.request.body);
            ctx.status = 201;
            ctx.body = user.response();
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
    static async authenticate(ctx, next) {
        try {
            const token = await user_model_1.User.authenticate(ctx.request.body.username, ctx.request.body.password);
            ctx.body = { token };
        }
        catch (e) {
            console.error(`error from authenticate call ${e}`);
            ctx.status = 401;
            ctx.body = "invalid username or password";
        }
        next();
    }
    static async getUsers(ctx, next) {
        try {
            const users = await user_model_1.User.getUsers();
            ctx.body = { users: users.map((user) => user.response()) };
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
exports.UserController = UserController;
//# sourceMappingURL=../../src/controller/user.controller.js.map