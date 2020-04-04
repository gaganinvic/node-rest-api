"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeAPIEnv {
    constructor(envName = "localhost") {
        this.envName = envName;
        const envModule = require(`./env/${envName}`);
        const env = new envModule.NodeAPIEnvConst();
        this.jwtSecret = env.jwtSecret;
        this.databaseURI = env.databaseURI;
        this.jwtExpire = env.jwtExpire;
    }
}
exports.NodeAPIEnv = NodeAPIEnv;
//# sourceMappingURL=../../src/config/env.js.map