export interface INodeAPIEnvConst {
    databaseURI: string;
    jwtSecret: string;
    jwtExpire: string;
}
export declare class NodeAPIEnv {
    envName: string;
    jwtSecret: string;
    databaseURI: string;
    jwtExpire: string;
    constructor(envName?: string);
}
