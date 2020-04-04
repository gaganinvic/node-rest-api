import { Context } from 'koa';
import { UserPhotos, IUserPhotos } from '../model/userPhotos.model';

export class PhotoController {

		static async getPhotos(ctx: Context, next: Function) {
      try {
        const userPhotos: UserPhotos[] = await UserPhotos.getPhotos();
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

}
