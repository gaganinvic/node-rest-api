import { Document, Model } from "mongoose";
import { NodeAPIEnv } from "../config/env";
export interface IUser {
    email?: string;
    username: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    gender?: "male" | "female";
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IUserModel extends Document, IUser {
}
export declare const UserModel: Model<IUserModel>;
export declare class User extends UserModel {
    env: NodeAPIEnv;
    constructor(user: any);
    setPassword(newPassword: string): Promise<void>;
    isValidPassword(candidatePassword: string): Promise<void>;
    static hashPassword(passwordToHash: string): Promise<string>;
    static findUserByUsername(username: string): Promise<User>;
    static createUser(user: IUser): Promise<User>;
    saveOrCreate(): Promise<void>;
    static getUsers(): Promise<User[]>;
    static authenticate(username: string, candidatePassword: string): Promise<string>;
    getJWT(): string;
    response(): IUser;
}
