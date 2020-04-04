import * as Router from "koa-router";
import {AuthMw} from "../middleware/auth.mw";
import {UserRoute} from "./user.route";
import {PhotoRoute} from "./photo.route";
import {AuthRoute} from "./auth.route";
import {UserPhotosRoute} from "./userPhotos.route";

export const router: Router = new Router();

const authMw: AuthMw = new AuthMw(router);


new AuthRoute(router);
new UserRoute(router);
new UserPhotosRoute(router);
new PhotoRoute(router);
