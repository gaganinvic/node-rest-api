"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const mongoose = require("mongoose");
class NodeAPIInit {
    constructor() {
        this.env = new env_1.NodeAPIEnv(process.env.NODE_ENV);
        this.db = new database_1.NodeAPIDB(this.env.databaseURI);
    }
    async initDatabase() {
        if (!mongoose.connection.readyState) {
            await this.db.connect();
        }
    }
}
exports.NodeAPIInit = NodeAPIInit;
//# sourceMappingURL=../src/init.js.map