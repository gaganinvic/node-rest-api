import * as Koa from 'koa';
import {router} from './route/index.route';
import {NodeAPIEnv} from './config/env';
import {NodeAPIDB} from './config/database';
import {NodeAPIInit} from './init';
import * as HTTP from 'http';
import * as koaBody from 'koa-body';
import * as cors from 'kcors';

export class NodeAPIServer {
    public app: Koa;
    public env: NodeAPIEnv;
    public nodeAPIdb: NodeAPIDB;
    public server: HTTP.Server;

    constructor() {
        this.app = new Koa();
        this.server = HTTP.createServer(this.app.callback());
        this.env = new NodeAPIEnv(process.env.NODE_ENV);
        this.nodeAPIdb = new NodeAPIDB(this.env.databaseURI);
    }

    public async init() {
        await this.nodeAPIdb.connect();
        this.app.use(koaBody({ multipart: true }));
        this.initMiddleware();
    }

    public async start() {
        this.server.listen(3000);
    }

    public initMiddleware() {
        this.app
          .use(cors({credentials: true}))
          .use(router.allowedMethods())  //Returns separate middleware for responding to OPTIONS requests with an Allow header containing the allowed methods, as well as responding with 405 Method Not Allowed and 501 Not Implemented as appropriate.
          .use(router.routes())  //Returns router middleware which dispatches a route matching the request.
    }

}

