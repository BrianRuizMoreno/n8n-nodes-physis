import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const transport = new PhysisTransport(this);
	
	const idAuxi = this.getNodeParameter('idAuxi', index) as string;
	const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string;
	
	const endpoint = `/phy2service/api/sifac/reagrupaciones-auxiliares/${idAuxi}/${idCtaAuxi}/default`;
	let method = 'GET';

	const response = await transport.request(method, endpoint, {}, {}) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}