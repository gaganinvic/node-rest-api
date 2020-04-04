import {NodeAPIEnv} from './config/env';
import {NodeAPIDB} from './config/database';
import * as mongoose from 'mongoose';

export class NodeAPIInit {
    db: NodeAPIDB;
    env: NodeAPIEnv;

    constructor() {
        this.env = new NodeAPIEnv(process.env.NODE_ENV);
        this.db = new NodeAPIDB(this.env.databaseURI);
    }

    async initDatabase() {
        if (!mongoose.connection.readyState) {
            await this.db.connect();
        }
    }

}
