"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const env_1 = require("../config/env");
const userSchema = new mongoose_1.Schema({
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
exports.UserModel = mongoose_1.model('User', userSchema);
exports.UserModel.createIndexes();
class User extends exports.UserModel {
    constructor(user) {
        super(user);
        this.env = new env_1.NodeAPIEnv(process.env.NODE_ENV);
    }
    async setPassword(newPassword) {
        const passwordHash = await User.hashPassword(newPassword);
        this.password = passwordHash;
    }
    async isValidPassword(candidatePassword) {
        let isMatch;
        try {
            isMatch = await bcrypt_1.compare(candidatePassword, this.password);
        }
        catch (e) {
            console.error(`error during password compare for ${this.username}: ${e}`);
            throw e;
        }
        console.log(`compare password for ${this.username} is ${isMatch}`);
        if (!isMatch) {
            throw Error('invalid password');
        }
    }
    static async hashPassword(passwordToHash) {
        const saltRound = 10;
        const passwordHash = await bcrypt_1.hash(passwordToHash, saltRound);
        return passwordHash;
    }
    static async findUserByUsername(username) {
        const userResult = await exports.UserModel.findOne({ username: new RegExp('^' + username + '$', "i") });
        if (!userResult) {
            throw new Error(`User ${username} not found`);
        }
        const user = new User(userResult);
        return user;
    }
    static async createUser(user) {
        //const u = Object.assign({}, user, {username: user.username.toLowerCase()});
        const newUser = new User(user);
        await newUser.saveOrCreate();
        return newUser;
    }
    async saveOrCreate() {
        if (this.createdAt) {
            this.updatedAt = new Date();
        }
        else {
            // set new date
            this.createdAt = new Date();
            // hash password
            if (this.password && !this.validateSync("password")) {
                await this.setPassword(this.password);
            }
        }
        try {
            await this.save();
        }
        catch (e) {
            // make duplicate user message prettier
            if (/E11000 duplicate key/.test(e.message)) {
                e.message = "Username is already taken";
            }
            throw e;
        }
    }
    static async getUsers() {
        const usersResult = await User.find();
        if (!usersResult) {
            throw new Error(`User  not found`);
        }
        const users = usersResult.map((user) => new User(user));
        return users;
    }
    static async authenticate(username, candidatePassword) {
        const user = await User.findUserByUsername(username);
        await user.isValidPassword(candidatePassword);
        const token = user.getJWT();
        return token;
    }
    getJWT() {
        const token = jsonwebtoken_1.sign({
            username: this.username
        }, this.env.jwtSecret, { expiresIn: this.env.jwtExpire });
        return token;
    }
    response() {
        const user = {
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
exports.User = User;
//# sourceMappingURL=../../src/model/user.model.js.map