import {INodeAPIEnvConst} from '../env';

export class NodeAPIEnvConst implements INodeAPIEnvConst {
    databaseURI: string = "mongodb+srv://gagan:gagan@cluster0-afzjv.mongodb.net/test?retryWrites=true&w=majority";
    jwtSecret: string = "mysecret";
    jwtExpire: string = "1h";
}
