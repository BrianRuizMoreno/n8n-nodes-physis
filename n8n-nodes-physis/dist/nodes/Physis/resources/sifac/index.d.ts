import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
export declare const sifacDescriptions: INodeProperties[];
export declare function sifacRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]>;
