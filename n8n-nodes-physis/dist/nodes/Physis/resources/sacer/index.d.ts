import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
export declare const sacerDescriptions: INodeProperties[];
export declare function sacerRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]>;
