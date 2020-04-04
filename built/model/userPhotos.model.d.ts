/// <reference types="node" />
import { Document, Model } from "mongoose";
import { NodeAPIEnv } from "../config/env";
export interface IUserPhotos {
    username: string;
    imageData: Buffer;
    imageType: string;
    imageSize: number;
    imageName: string;
    imageWidth: number;
    imageHeight: number;
    status: "draft" | "final";
    image?: string;
    captions?: string;
    tags?: [string];
    createdAt?: Date;
    updatedAt?: Date;
    photoId?: string;
}
export interface IUserPhotosModel extends Document, IUserPhotos {
}
export declare const UserPhotosModel: Model<IUserPhotosModel>;
export declare class UserPhotos extends UserPhotosModel {
    env: NodeAPIEnv;
    constructor(userPhotos: any);
    static uploadUserPhotos(userPhotos: IUserPhotos): Promise<UserPhotos>;
    saveOrCreate(): Promise<void>;
    static getUserPhotos(username: string): Promise<UserPhotos[]>;
    static deleteUserPhoto(username: string, photoId: string): Promise<UserPhotos>;
    static updateUserPhoto(username: string, photoId: string, data: any): Promise<UserPhotos>;
    static getPhotos(): Promise<UserPhotos[]>;
    response(): IUserPhotos;
}
