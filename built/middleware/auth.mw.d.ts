import * as KoaRouter from 'koa-router';
export declare class AuthMw {
    router: KoaRouter;
    private secret;
    private jwt;
    private unlessOptions;
    constructor(router: KoaRouter);
    private initMiddleware;
    private initJwt;
    private errorHandler;
}
