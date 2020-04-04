export declare class NodeAPIDB {
    uri: string;
    constructor(uri: string);
    connect(): Promise<void>;
}
