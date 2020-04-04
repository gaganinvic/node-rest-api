import {INodeAPIEnvConst} from '../env';

export class NodeAPIEnvConst implements INodeAPIEnvConst {
    databaseURI: string = "mongodb://localhost:27010/api-localhost";
    jwtSecret: string = "mysecret";
    jwtExpire: string = "1h";
}
