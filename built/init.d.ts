import { NodeAPIEnv } from './config/env';
import { NodeAPIDB } from './config/database';
export declare class NodeAPIInit {
    db: NodeAPIDB;
    env: NodeAPIEnv;
    constructor();
    initDatabase(): Promise<void>;
}
