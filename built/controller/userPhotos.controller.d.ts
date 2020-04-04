import { Context } from 'koa';
export declare class UserPhotosController {
    static createUserPhotos(ctx: Context, next: Function): Promise<void>;
    static getUserPhotos(ctx: Context, next: Function): Promise<void>;
    static updateUserPhoto(ctx: Context, next: Function): Promise<void>;
    static deleteUserPhoto(ctx: Context, next: Function): Promise<void>;
}
