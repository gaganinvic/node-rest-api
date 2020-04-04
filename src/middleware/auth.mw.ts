import * as Koa from 'koa';
import * as jwt from 'koa-jwt';
import * as KoaRouter from 'koa-router';
import {NodeAPIEnv} from '../config/env';

export class AuthMw {

    private secret: string;
    private jwt: typeof jwt = jwt;

    private unlessOptions = {
      path: [
          /^\/oauth\/token/,
          /^\/user/
      ]
    }

    constructor(public router: KoaRouter) {
        const env: NodeAPIEnv = new NodeAPIEnv(process.env.NODE_ENV);
        this.secret = env.jwtSecret;
        this.initMiddleware();
        this.initJwt();
    }

    private initMiddleware() {
        this.errorHandler();
    }

    private initJwt() {
        this.router.use(
            this.jwt({ secret: this.secret }).unless(this.unlessOptions),
        );
    }

    private errorHandler() {
        this.router.use((ctx: Koa.Context, next: Function) => {
            return next().catch((err: any) => {
                if ( err.status === 401 ) {
                    ctx.status = 401;
                    ctx.body = "Protected resource";
                } else {
                    throw err;
                }
            });
        });
    }

}
