import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
export declare const sigesDescriptions: INodeProperties[];
export declare function sigesRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]>;
