/// <reference types="node" />
import * as Koa from 'koa';
import { NodeAPIEnv } from './config/env';
import { NodeAPIDB } from './config/database';
import * as HTTP from 'http';
export declare class NodeAPIServer {
    app: Koa;
    env: NodeAPIEnv;
    nodeAPIdb: NodeAPIDB;
    server: HTTP.Server;
    constructor();
    init(): Promise<void>;
    start(): Promise<void>;
    initMiddleware(): void;
}
