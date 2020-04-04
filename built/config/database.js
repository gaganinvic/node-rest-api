"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class NodeAPIDB {
    constructor(uri) {
        this.uri = uri;
        //mongoose.Promise = global.Promise;
    }
    async connect() {
        console.log(`connecting to ${this.uri}`);
        try {
            if (!mongoose.connection.readyState) {
                await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
                console.log('Connected to DB');
            }
        }
        catch (e) {
            console.log('unable to connect to DB', e);
        }
    }
}
exports.NodeAPIDB = NodeAPIDB;
//# sourceMappingURL=../../src/config/database.js.map