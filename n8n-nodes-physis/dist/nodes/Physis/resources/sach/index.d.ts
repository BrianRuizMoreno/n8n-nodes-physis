import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
export declare const sachDescriptions: INodeProperties[];
export declare function sachRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]>;
