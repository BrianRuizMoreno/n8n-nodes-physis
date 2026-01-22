import { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions, IDataObject } from 'n8n-workflow';
export declare class PhysisTransport {
    private readonly functions;
    constructor(functions: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions);
    request(method: string, endpoint: string, body?: IDataObject, qs?: IDataObject): Promise<any>;
    getAll(endpoint: string, qs?: IDataObject): Promise<any>;
}
