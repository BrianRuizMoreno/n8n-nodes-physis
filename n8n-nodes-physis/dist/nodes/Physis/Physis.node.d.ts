import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
interface IExtendedNodeTypeDescription extends INodeTypeDescription {
    usableAsTool?: true;
    codex?: {
        categories: string[];
        subcategories: Record<string, string[]>;
        alias: string[];
    };
}
export declare class Physis implements INodeType {
    description: IExtendedNodeTypeDescription;
    constructor();
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
export {};
