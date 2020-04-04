"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const env_1 = require("../config/env");
const userPhotosSchema = new mongoose_1.Schema({
    username: String,
    imageData: Buffer,
    imageType: String,
    imageSize: Number,
    imageName: String,
    imageWidth: Number,
    imageHeight: Number,
    status: {
        type: String,
        enum: ["draft", "final"]
    },
    captions: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
}, { collection: "userPhotos" });
userPhotosSchema.index({ username: 1, createdAt: 1 });
exports.UserPhotosModel = mongoose_1.model('UserPhotos', userPhotosSchema);
exports.UserPhotosModel.createIndexes();
class UserPhotos extends exports.UserPhotosModel {
    constructor(userPhotos) {
        super(userPhotos);
        this.env = new env_1.NodeAPIEnv(process.env.NODE_ENV);
    }
    // static async findUserByUsername(username: string): Promise<User> {
    //     const userResult: IUser = await UserModel.findOne({username: new RegExp('^' + username + '$', "i")});
    //     if (!userResult) {
    //         throw new Error(`User ${username} not found`);
    //     }
    //     const user: User = new User(userResult);
    //     return user;
    // }
    static async uploadUserPhotos(userPhotos) {
        //const u = Object.assign({}, user, {username: user.username.toLowerCase()});
        const newUserPhotos = new UserPhotos(userPhotos);
        await newUserPhotos.saveOrCreate();
        return newUserPhotos;
    }
    async saveOrCreate() {
        if (this.createdAt) {
            this.updatedAt = new Date();
        }
        else {
            // set new date
            this.createdAt = new Date();
        }
        try {
            await this.save();
        }
        catch (e) {
            throw e;
        }
    }
    static async getUserPhotos(username) {
        const userPhotosResult = await UserPhotos.find({ username });
        if (!userPhotosResult) {
            throw new Error(`User Photos for ${username} not found`);
        }
        const userPhotos = userPhotosResult.map((photo) => new UserPhotos(photo));
        return userPhotos;
    }
    static async deleteUserPhoto(username, photoId) {
        await UserPhotos.deleteOne({ _id: photoId, username });
        return;
    }
    static async updateUserPhoto(username, photoId, data) {
        console.log("updateUserPhoto: ", username, photoId, data);
        const update = await UserPhotos.findOneAndUpdate({
            _id: photoId,
            username
        }, data, { new: true });
        console.log("updateUserPhoto update: ", update);
        const userPhotos = new UserPhotos(update);
        return userPhotos;
    }
    static async getPhotos() {
        const userPhotosResult = await UserPhotos.find();
        if (!userPhotosResult) {
            throw new Error(`User Photos not found`);
        }
        const userPhotos = userPhotosResult.map((photo) => new UserPhotos(photo));
        return userPhotos;
    }
    response() {
        const userPhotos = {
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
exports.UserPhotos = UserPhotos;
//# sourceMappingURL=../../src/model/userPhotos.model.js.map