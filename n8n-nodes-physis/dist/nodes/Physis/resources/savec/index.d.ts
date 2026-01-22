import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
export declare const savecDescriptions: INodeProperties[];
export declare function savecRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]>;
