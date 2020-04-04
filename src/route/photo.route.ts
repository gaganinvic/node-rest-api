import * as Router from "koa-router";
import {PhotoController} from "../controller/photo.controller";

export class PhotoRoute {

    constructor(router: Router = new Router()) {
        router.get('/photo', PhotoController.getPhotos);
    }
}
