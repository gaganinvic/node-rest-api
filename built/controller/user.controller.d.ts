import { Context } from 'koa';
export declare class UserController {
    static createUser(ctx: Context, next: Function): Promise<void>;
    static authenticate(ctx: Context, next: Function): Promise<void>;
    static getUsers(ctx: Context, next: Function): Promise<void>;
}
