import * as Router from "koa-router";
import {UserController} from "../controller/user.controller";

export class UserRoute {

    constructor(router: Router = new Router()) {
        router.post('/user', UserController.createUser);
        router.get('/user', UserController.getUsers);
    }
}
