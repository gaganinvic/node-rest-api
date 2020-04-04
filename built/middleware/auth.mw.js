"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("koa-jwt");
const env_1 = require("../config/env");
class AuthMw {
    constructor(router) {
        this.router = router;
        this.jwt = jwt;
        this.unlessOptions = {
            path: [
                /^\/oauth\/token/,
                /^\/user/
            ]
        };
        const env = new env_1.NodeAPIEnv(process.env.NODE_ENV);
        this.secret = env.jwtSecret;
        this.initMiddleware();
        this.initJwt();
    }
    initMiddleware() {
        this.errorHandler();
    }
    initJwt() {
        this.router.use(this.jwt({ secret: this.secret }).unless(this.unlessOptions));
    }
    errorHandler() {
        this.router.use((ctx, next) => {
            return next().catch((err) => {
                if (err.status === 401) {
                    ctx.status = 401;
                    ctx.body = "Protected resource";
                }
                else {
                    throw err;
                }
            });
        });
    }
}
exports.AuthMw = AuthMw;
//# sourceMappingURL=../../src/middleware/auth.mw.js.map