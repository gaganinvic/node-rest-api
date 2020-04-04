import { Context } from 'koa';
import { User, IUser } from '../model/user.model';

export class UserController {

		static async createUser(ctx: Context, next: Function) {
				try {
						const user: User = await User.createUser(ctx.request.body);
						ctx.status = 201;
						ctx.body = user.response();
				} catch (e) {
						console.error(e);
						ctx.status = 400;
						ctx.body = {
								message: `Invalid request, ${e.message}`,
								errors: e.errors
						};
				}
				next();
		}

		static async authenticate(ctx: Context, next: Function) {
				try {
						const token: string = await User.authenticate(ctx.request.body.username, ctx.request.body.password);
						ctx.body = { token };
				} catch (e) {
						console.error(`error from authenticate call ${e}`);
						ctx.status = 401;
						ctx.body = "invalid username or password";
				}
				next();
		}

		static async getUsers(ctx: Context, next: Function) {
      try {
        const users: User[] = await User.getUsers();
        ctx.body = { users: users.map((user) => user.response()) };
      } catch (e) {
          console.error(e);
          ctx.status = 400;
          ctx.body = {
              message: `Invalid request, ${e.message}`,
              errors: e.errors
          };
      }
      next();
    }

}
