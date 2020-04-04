import { Context } from 'koa';
import { UserPhotos, IUserPhotos } from '../model/userPhotos.model';
const fs = require('fs');

export class UserPhotosController {

		static async createUserPhotos(ctx: Context, next: Function) {
				try {
       
          const photos:IUserPhotos = Object.assign({
            username: ctx.params.username,
            imageData: fs.readFileSync(ctx.request.files.photo.path),
            imageType: ctx.request.files.photo.type,
            imageSize: ctx.request.files.photo.size,
            imageName: ctx.request.files.photo.name
          }, ctx.request.body);
          console.log("photos:IUserPhotos : ", photos);
          const userPhotos: UserPhotos = await UserPhotos.uploadUserPhotos(photos);
          console.log("userPhotos : ", userPhotos);
          ctx.status = 201;
          ctx.body = userPhotos.response();
          console.log("userPhotos : ", userPhotos);
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
    
    static async getUserPhotos(ctx: Context, next: Function) {
      try {
        const userPhotos: UserPhotos[] = await UserPhotos.getUserPhotos(ctx.params.username);
        ctx.body = { photos: userPhotos.map((photos) => photos.response()) };
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

    static async updateUserPhoto(ctx: Context, next: Function) {
      try {
        const userPhotos: UserPhotos = await UserPhotos.updateUserPhoto(ctx.params.username, ctx.params.id, ctx.request.body);
        ctx.body = userPhotos.response();
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

    static async deleteUserPhoto(ctx: Context, next: Function) {
      try {
        await UserPhotos.deleteUserPhoto(ctx.params.username, ctx.params.id);
        ctx.status = 204;
        ctx.body = { success: true };
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
