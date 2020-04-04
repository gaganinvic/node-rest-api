import * as Router from "koa-router";
import {UserController} from "../controller/user.controller";

export class AuthRoute {

    constructor(router: Router = new Router()) {
        router.post('/oauth/token', UserController.authenticate);
    }
}
