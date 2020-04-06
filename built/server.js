"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const index_route_1 = require("./route/index.route");
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const HTTP = require("http");
const koaBody = require("koa-body");
const cors = require("kcors");
class NodeAPIServer {
    constructor() {
        this.app = new Koa();
        this.server = HTTP.createServer(this.app.callback());
        this.env = new env_1.NodeAPIEnv(process.env.NODE_ENV);
        this.nodeAPIdb = new database_1.NodeAPIDB(this.env.databaseURI);
    }
    async init() {
        await this.nodeAPIdb.connect();
        this.app.use(koaBody({ multipart: true }));
        this.initMiddleware();
    }
    async start() {
        this.server.listen(process.env.PORT || 3000);
    }
    initMiddleware() {
        this.app
            .use(cors({ credentials: true }))
            .use(index_route_1.router.allowedMethods()) //Returns separate middleware for responding to OPTIONS requests with an Allow header containing the allowed methods, as well as responding with 405 Method Not Allowed and 501 Not Implemented as appropriate.
            .use(index_route_1.router.routes()); //Returns router middleware which dispatches a route matching the request.
    }
}
exports.NodeAPIServer = NodeAPIServer;
//# sourceMappingURL=../src/server.js.map