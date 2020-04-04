export interface INodeAPIEnvConst {
    databaseURI: string;
    jwtSecret: string;
    jwtExpire: string;
}

export class NodeAPIEnv {
    jwtSecret: string;
    databaseURI: string;
    jwtExpire: string;

    constructor(public envName = "localhost") {
        const envModule: any = require(`./env/${envName}`);
        const env: INodeAPIEnvConst = new envModule.NodeAPIEnvConst();
        this.jwtSecret = env.jwtSecret;
        this.databaseURI = env.databaseURI;
        this.jwtExpire = env.jwtExpire;
    }

}
