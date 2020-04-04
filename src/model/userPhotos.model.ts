import {Document, model, Model, Schema} from "mongoose";
import {sign as signJwt} from "jsonwebtoken";
import {compare, hash} from "bcrypt";
import {NodeAPIEnv} from "../config/env";
import * as _ from 'lodash';

export interface IUserPhotos {
    username: string;
    imageData: Buffer;
    imageType: string;
    imageSize: number;
    imageName: string;
    imageWidth: number;
    imageHeight: number;
    status: "draft" | "final"
    image?: string;
    captions?: string;
    tags?: [string];
    createdAt?: Date;
    updatedAt?: Date;
    photoId?: string;
}

export interface IUserPhotosModel extends Document, IUserPhotos {

}

const userPhotosSchema: Schema = new Schema({
    username: String,
    imageData: Buffer,
    imageType: String,
    imageSize: Number,
    imageName: String,
    imageWidth: Number,
    imageHeight: Number,
    status: {
      type: String,
      enum: ["draft","final"]     
    },
    captions: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
}, { collection: "userPhotos" });

userPhotosSchema.index({ username: 1, createdAt: 1 });

export const UserPhotosModel: Model<IUserPhotosModel> = model<IUserPhotosModel>('UserPhotos', userPhotosSchema);
UserPhotosModel.createIndexes();

export class UserPhotos extends UserPhotosModel {
    env: NodeAPIEnv;

    constructor(userPhotos: any) {
        super(userPhotos);
        this.env = new NodeAPIEnv(process.env.NODE_ENV);
    }

    // static async findUserByUsername(username: string): Promise<User> {
    //     const userResult: IUser = await UserModel.findOne({username: new RegExp('^' + username + '$', "i")});

    //     if (!userResult) {
    //         throw new Error(`User ${username} not found`);
    //     }
    //     const user: User = new User(userResult);
    //     return user;
    // }

    static async uploadUserPhotos(userPhotos: IUserPhotos): Promise<UserPhotos> {
        //const u = Object.assign({}, user, {username: user.username.toLowerCase()});
        const newUserPhotos: UserPhotos = new UserPhotos(userPhotos);
        await newUserPhotos.saveOrCreate();
        return newUserPhotos;
    }

    async saveOrCreate() {

        if (this.createdAt) {
            this.updatedAt = new Date();
        } else {
            // set new date
            this.createdAt = new Date();
        }
        try {
            await this.save();
        } catch (e) {
            throw e;
        }
    }

    static async getUserPhotos(username: string): Promise<UserPhotos[]> {
      const userPhotosResult: IUserPhotosModel[] = await UserPhotos.find({ username });
      if (!userPhotosResult) {
          throw new Error(`User Photos for ${username} not found`);
      }
      const userPhotos: UserPhotos[] = userPhotosResult.map((photo: IUserPhotos) => new UserPhotos(photo));
      return userPhotos;
    }

    static async deleteUserPhoto(username: string, photoId: string): Promise<UserPhotos> {
      await UserPhotos.deleteOne({ _id: photoId, username });
      return;
    }

    static async updateUserPhoto(username: string, photoId: string, data: any): Promise<UserPhotos> {
      console.log("updateUserPhoto: ", username, photoId, data)
      const update = await UserPhotos.findOneAndUpdate({
          _id: photoId,
          username
      }, data, { new: true });
      console.log("updateUserPhoto update: ", update)
      const userPhotos: UserPhotos = new UserPhotos(update);
      return userPhotos;
    }

    static async getPhotos(): Promise<UserPhotos[]> {
      const userPhotosResult: IUserPhotosModel[] = await UserPhotos.find();
      if (!userPhotosResult) {
          throw new Error(`User Photos not found`);
      }
      const userPhotos: UserPhotos[] = userPhotosResult.map((photo: IUserPhotos) => new UserPhotos(photo));
      return userPhotos;
    }


    response(): IUserPhotos {
        const userPhotos: IUserPhotos = {
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            username: this.username,
            imageData: this.imageData,
            imageType: this.imageType,
            imageSize: this.imageSize,
            imageName: this.imageName,
            imageWidth: this.imageWidth,
            imageHeight: this.imageHeight,
            status: this.status,
            captions: this.captions,
            tags: this.tags,
            photoId: this._id
        };
        return userPhotos;
    }
}
