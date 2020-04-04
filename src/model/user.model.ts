import {Document, model, Model, Schema} from "mongoose";
import {sign as signJwt} from "jsonwebtoken";
import {compare, hash} from "bcrypt";
import {NodeAPIEnv} from "../config/env";
import * as _ from 'lodash';

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

const userSchema: Schema = new Schema({
    email: String,
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "User username required"]
    },
    password: {
        type: String
    },
    firstName: String,
    lastName: String,
    middleName: String,
    gender: {
      type: String,
      enum: ["male", "female"]
    },
    createdAt: Date,
    updatedAt: Date,
}, { collection: "user" });

userSchema.index({ username: 1 });

export const UserModel: Model<IUserModel> = model<IUserModel>('User', userSchema);
UserModel.createIndexes();

export class User extends UserModel {
    env: NodeAPIEnv;

    constructor(user: any) {
        super(user);
        this.env = new NodeAPIEnv(process.env.NODE_ENV);
    }

    async setPassword(newPassword: string) {
        const passwordHash = await User.hashPassword(newPassword);
        this.password = passwordHash;
    }

    async isValidPassword(candidatePassword: string): Promise<void> {
        let isMatch: boolean;
        try {
            isMatch = await compare(candidatePassword, this.password);
        } catch (e) {
            console.error(`error during password compare for ${this.username}: ${e}`);
            throw e;
        }

        console.log(`compare password for ${this.username} is ${isMatch}`);
        if (!isMatch) {
            throw Error('invalid password');
        }
    }

    static async hashPassword(passwordToHash: string): Promise<string> {
        const saltRound: number = 10;
        const passwordHash: string = await hash(passwordToHash, saltRound);

        return passwordHash;
    }

    static async findUserByUsername(username: string): Promise<User> {
        const userResult: IUser = await UserModel.findOne({username: new RegExp('^' + username + '$', "i")});

        if (!userResult) {
            throw new Error(`User ${username} not found`);
        }
        const user: User = new User(userResult);
        return user;
    }

    static async createUser(user: IUser): Promise<User> {
        //const u = Object.assign({}, user, {username: user.username.toLowerCase()});
        const newUser: User = new User(user);
        await newUser.saveOrCreate();
        return newUser;
    }

    async saveOrCreate() {

        if (this.createdAt) {
            this.updatedAt = new Date();
        } else {
            // set new date
            this.createdAt = new Date();
            // hash password
            if (this.password && !this.validateSync("password")) {
                await this.setPassword(this.password);
            }
        }
        try {
            await this.save();
        } catch (e) {
            // make duplicate user message prettier
            if (/E11000 duplicate key/.test(e.message)) {
                e.message = "Username is already taken";
            }
            throw e;
        }
    }

    static async getUsers(): Promise<User[]> {
      const usersResult: IUser[] = await User.find();
      if (!usersResult) {
          throw new Error(`User  not found`);
      }
      const users: User[] = usersResult.map((user: IUser) => new User(user));
      return users;
    }

    static async authenticate(username: string, candidatePassword: string) {
        const user: User = await User.findUserByUsername(username);
        await user.isValidPassword(candidatePassword);
        const token: string = user.getJWT();
        return token;
    }

    getJWT(): string {
        const token: string = signJwt({
            username: this.username
        }, this.env.jwtSecret, {expiresIn: this.env.jwtExpire});
        return token;
    }

    response(): IUser {
        const user: IUser = {
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            gender: this.gender,
            email: this.email,
        };
        return user;
    }
}
