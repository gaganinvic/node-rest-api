import * as Router from "koa-router";
import {UserPhotosController} from "../controller/userPhotos.controller";

export class UserPhotosRoute {

    constructor(router: Router = new Router()) {
        router.post('/user/:username/photos', UserPhotosController.createUserPhotos);
        router.get('/user/:username/photos', UserPhotosController.getUserPhotos);
        router.put('/user/:username/photos/:id', UserPhotosController.updateUserPhoto);
        router.delete('/user/:username/photos/:id', UserPhotosController.deleteUserPhoto);
    }
}
