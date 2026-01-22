import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
export declare const silabDescriptions: INodeProperties[];
export declare function silabRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]>;
