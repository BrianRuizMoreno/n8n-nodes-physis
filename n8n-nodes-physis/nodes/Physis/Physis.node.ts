import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { z } from 'zod';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { PhysisTransport } from './transport/transport';

// --- IMPORTACIÓN DE ROUTERS ---
import { silabDescriptions, silabRouter } from './resources/silab/index';
import { sigesDescriptions, sigesRouter } from './resources/siges/index';
import { sachDescriptions, sachRouter } from './resources/sach/index';
import { sifacDescriptions, sifacRouter } from './resources/sifac/index';
import { savecDescriptions, savecRouter } from './resources/savec/index';
import { sacerDescriptions, sacerRouter } from './resources/sacer/index';

function camelToKebab(str: string): string {
	return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

interface IExtendedNodeTypeDescription extends INodeTypeDescription {
	usableAsTool?: true;
	codex?: { categories: string[]; subcategories: Record<string, string[]>; alias: string[]; };
}

export class Physis implements INodeType {
	description: IExtendedNodeTypeDescription = {
		displayName: 'Physis Informática SRL',
		name: 'physis',
		icon: 'file:physis.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["service"] + ": " + $parameter["resource"]}}',
		description: 'Integración completa Physis SRL (Modular)',
		defaults: { name: 'Physis Informática' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'physisApi', required: true }],
		
		usableAsTool: true,

		properties: [
			// ============================================================
			// 1. SELECTOR DE MÓDULO (SERVICIO)
			// ============================================================
			{
				displayName: 'Módulo',
				name: 'service',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Physis Tool (AI)', value: 'physis_tool' }, 
					{ name: 'SACER (Acopio)', value: 'sacer' },
					{ name: 'SACH (Hacienda)', value: 'sach' },
					{ name: 'SAVEC (Granos)', value: 'savec' },
					{ name: 'SIFAC (Facturación)', value: 'sifac' },
					{ name: 'SIGES (Gestión)', value: 'siges' },
					{ name: 'SILAB (Agro)', value: 'silab' },
				],
				default: 'siges',
			},

			// ============================================================
			// 2. CONFIGURACIÓN TOOL
			// ============================================================
			{
				displayName: 'Módulo Objetivo',
				name: 'tool_module',
				type: 'options',
				displayOptions: { show: { service: ['physis_tool'] } },
				options: [
					{ name: 'SACER', value: 'sacer' },
					{ name: 'SACH', value: 'sach' },
					{ name: 'SAVEC', value: 'savec' },
					{ name: 'SIFAC', value: 'sifac' },
					{ name: 'SIGES', value: 'siges' },
					{ name: 'SILAB', value: 'silab' },
				],
				default: 'siges',
			},
			{
				displayName: 'Recurso Objetivo',
				name: 'tool_resource',
				type: 'string',
				default: '',
				displayOptions: { show: { service: ['physis_tool'] } },
				description: 'Ej: campania, lote, tercero (debe coincidir con el nombre interno del recurso)',
			},

			// ============================================================
			// 3. SELECTORES DE RECURSOS
			// ============================================================
			
			// --- SACER ---
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { service: ['sacer'] } },
				options: [
					{ name: 'Calidad', value: 'calidad' },
					{ name: 'Campaña', value: 'campania' },
					{ name: 'Campo', value: 'campo' },
					{ name: 'Carta de Porte', value: 'cartaPorte' },
					{ name: 'Cereal', value: 'cereal' },
					{ name: 'Contrato', value: 'contrato' },
					{ name: 'Cuenta Corriente Granos', value: 'cuentaCorrienteGranos' },
					{ name: 'Establecimiento', value: 'establecimiento' },
					{ name: 'Fijación', value: 'fijacion' },
					{ name: 'Forma de Pago', value: 'formaPago' },
					{ name: 'Formato', value: 'formato' },
					{ name: 'Humedad', value: 'humedad' },
					{ name: 'Imputación IVA', value: 'imputacionIVA' },
					{ name: 'Imputaciones Contables', value: 'imputacionesContable' },
					{ name: 'Infraestructura', value: 'infraestructura' },
					{ name: 'Logística', value: 'logistica' },
					{ name: 'Numerador', value: 'numerador' },
					{ name: 'Suelo', value: 'suelo' },
					{ name: 'Tarifa Flete', value: 'tarifaFlete' },
					{ name: 'Tercero', value: 'tercero' },
					{ name: 'Tipo Contrato', value: 'tipoContrato' },
					{ name: 'Tipo Formato', value: 'tipoFormato' },
					{ name: 'Variedad', value: 'variedad' },
					{ name: 'Varios', value: 'varios' },
				],
				default: 'cartaPorte',
			},

			// --- SACH ---
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { service: ['sach'] } },
				options: [
					{ name: 'Ajuste', value: 'ajuste' },
					{ name: 'Cartel', value: 'cartel' },
					{ name: 'Categoría', value: 'categoria' },
					{ name: 'Cliente', value: 'cliente' },
					{ name: 'Comisionista', value: 'comisionista' },
					{ name: 'Comprador Remate', value: 'compradorRemate' },
					{ name: 'Emisión', value: 'emision' },
					{ name: 'Especie', value: 'especie' },
					{ name: 'Establecimiento', value: 'establecimiento' },
					{ name: 'Estado', value: 'estado' },
					{ name: 'Gasto', value: 'gasto' },
					{ name: 'Imputaciones Contables', value: 'imputacionesContable' },
					{ name: 'Informe', value: 'informe' },
					{ name: 'Liquidación', value: 'liquidacion' },
					{ name: 'Lote', value: 'lote' },
					{ name: 'Lugar', value: 'lugar' },
					{ name: 'Marca', value: 'marca' },
					{ name: 'Plazo', value: 'plazo' },
					{ name: 'Raza', value: 'raza' },
					{ name: 'Remate', value: 'remate' },
					{ name: 'Retención Especial', value: 'retencionEspecial' },
					{ name: 'Tabla LSP', value: 'tablaLsp' },
					{ name: 'Tipo Hacienda', value: 'tipoHacienda' },
					{ name: 'Tipo Operación', value: 'tipoOperacion' },
				],
				default: 'cliente',
			},

			// --- SAVEC ---
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { service: ['savec'] } },
				options: [
					{ name: 'Auxiliar', value: 'auxiliar' },
					{ name: 'Concepto', value: 'concepto' },
					{ name: 'Contrato', value: 'contrato' },
					{ name: 'CRM', value: 'crm' },
					{ name: 'Motivo Retiro', value: 'motivoRetiro' },
					{ name: 'Tarifas', value: 'tarifas' },
					{ name: 'Tipo Contrato', value: 'tipoContrato' },
					{ name: 'Tipos Formulario', value: 'tiposFormulario' },
					{ name: 'Venta Campo', value: 'ventaCampo' },
				],
				default: 'contrato',
			},

			// --- SIFAC ---
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { service: ['sifac'] } },
				options: [
					{ name: 'Auxiliar SIFAC', value: 'auxiliarSifac' },
					{ name: 'CC Insumos', value: 'ccInsumos' },
					{ name: 'Comprobante', value: 'comprobante' },
					{ name: 'Condición Comercial', value: 'condicionComercial' },
					{ name: 'Condición Pago', value: 'condicionPago' },
					{ name: 'Conductores', value: 'conductores' },
					{ name: 'Control Adicional', value: 'controlAdicional' },
					{ name: 'Depósito', value: 'deposito' },
					{ name: 'Descuentos', value: 'descuentos' },
					{ name: 'Grupos Productos', value: 'gruposProductos' },
					{ name: 'Grupos Proveedores', value: 'gruposProveedores' },
					{ name: 'Imágenes', value: 'imagenes' },
					{ name: 'Información Cliente', value: 'clienteInfo' },
					{ name: 'Lista Precio', value: 'listaPrecio' },
					{ name: 'Maestro General', value: 'maestroGeneral' },
					{ name: 'Medio Transporte', value: 'medioTransporte' },
					{ name: 'Observaciones', value: 'observaciones' },
					{ name: 'Orden Compra', value: 'ordenCompra' },
					{ name: 'Orden Compra Interfaz', value: 'ordenCompraInterfaz' },
					{ name: 'Origen Destino', value: 'origenDestino' },
					{ name: 'Partida', value: 'partida' },
					{ name: 'Pedido', value: 'pedido' },
					{ name: 'Precio', value: 'precio' },
					{ name: 'Producto', value: 'producto' },
					{ name: 'Producto Stock', value: 'productoStock' },
					{ name: 'Proveedor Info', value: 'proveedorInfo' },
					{ name: 'Reagrupación Auxiliar', value: 'reagrupacionAuxiliar' },
					{ name: 'Remito Compra', value: 'remitoCompra' },
					{ name: 'Tipo Tasa', value: 'tipoTasa' },
					{ name: 'Tipos Comprobantes', value: 'tiposComprobantes' },
					{ name: 'Transporte', value: 'transporte' },
					{ name: 'Unidad', value: 'unidad' },
					{ name: 'Varios', value: 'varios' },
					{ name: 'Vendedor', value: 'vendedor' },
					{ name: 'Zona', value: 'zona' },
				],
				default: 'comprobante',
			},

			// --- SIGES ---
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { service: ['siges'] } },
				options: [
					{ name: 'Afectación', value: 'afectacion' },
					{ name: 'Autorización', value: 'autorizacion' },
					{ name: 'Banco', value: 'banco' },
					{ name: 'BI', value: 'BI' },
					{ name: 'Billeteras', value: 'billeteras' },
					{ name: 'Campaña', value: 'campania' },
					{ name: 'Chequera', value: 'chequera' },
					{ name: 'Combos', value: 'combos' },
					{ name: 'Comprobante', value: 'comprobante' },
					{ name: 'Comprobantes Pendientes', value: 'comprobantesPendientes' },
					{ name: 'Conceptos IVA', value: 'conceptosIVA' },
					{ name: 'Control Diario', value: 'controlDiario' },
					{ name: 'Crédito', value: 'credito' },
					{ name: 'Cuenta Auxiliar', value: 'cuentaAuxiliar' },
					{ name: 'Cuenta Corriente', value: 'cuentaCorriente' },
					{ name: 'Cuenta Principal', value: 'cuentaPrincipal' },
					{ name: 'Cuentas Reagrupación Auxi', value: 'cuentasReagrupacionAuxi' },
					{ name: 'Cuentas Reagrupación Ppal', value: 'cuentasReagrupacionPpal' },
					{ name: 'Cuentas Temporales', value: 'cuentasTemporales' },
					{ name: 'Dominio', value: 'dominio' },
					{ name: 'Ejercicio', value: 'ejercicio' },
					{ name: 'Empresa', value: 'empresa' },
					{ name: 'Factura Proveedor', value: 'facturaProveedor' },
					{ name: 'Firmas', value: 'firmas' },
					{ name: 'Historia', value: 'historia' },
					{ name: 'Imagen', value: 'imagen' },
					{ name: 'Indicador', value: 'indicador' },
					{ name: 'Informe', value: 'informe' },
					{ name: 'Interdepósitos', value: 'interdepositos' },
					{ name: 'Libro', value: 'libro' },
					{ name: 'Mayor', value: 'mayor' },
					{ name: 'Modelos', value: 'modelos' },
					{ name: 'Moneda', value: 'moneda' },
					{ name: 'Numeración', value: 'numeracion' },
					{ name: 'Pesajes', value: 'pesajes' },
					{ name: 'Plan Cuenta', value: 'planCuenta' },
					{ name: 'Plan Cuenta Auxiliar', value: 'planCuentaAuxiliar' },
					{ name: 'PP Compradores Autorizantes', value: 'PP_compradoresAutorizantes' },
					{ name: 'PP Comprobantes', value: 'PP_comprobantes' },
					{ name: 'QR', value: 'qr' },
					{ name: 'Reagrupación Auxiliar', value: 'reagrupacionAuxiliar' },
					{ name: 'Reagrupación Cuenta Auxiliar', value: 'reagrupacionCuentaAuxiliar' },
					{ name: 'Reagrupación Cuenta Ppal', value: 'reagrupacionCuentaPpal' },
					{ name: 'Reagrupación Principal', value: 'reagrupacionPrincipal' },
					{ name: 'Regímenes', value: 'regimenes' },
					{ name: 'Reporte Compartido', value: 'reporteCompartido' },
					{ name: 'Reporte Definible', value: 'reporteDefinible' },
					{ name: 'Retenciones', value: 'retenciones' },
					{ name: 'Saldo', value: 'saldo' },
					{ name: 'Sistemas', value: 'sistemas' },
					{ name: 'Tercero', value: 'tercero' },
					{ name: 'Textos', value: 'textos' },
					{ name: 'Tipo Documento', value: 'tipoDocumento' },
					{ name: 'Tipos Comprobantes', value: 'tiposComprobantes' },
					{ name: 'Tipos Comprobantes AFIP', value: 'tiposComprobantesAFIP' },
					{ name: 'Usuario', value: 'usuario' },
					{ name: 'Utilidades', value: 'utilidades' },
					{ name: 'Valores', value: 'valores' },
					{ name: 'Vencimientos', value: 'vencimientos' },
					{ name: 'Zona', value: 'zona' },
				],
				default: 'tercero',
			},

			// --- SILAB ---
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { service: ['silab'] } },
				options: [
					{ name: 'Actividad', value: 'actividad' },
					{ name: 'Campaña', value: 'campania' },
					{ name: 'Campo', value: 'campo' },
					{ name: 'Dominio', value: 'dominio' },
					{ name: 'Implemento', value: 'implemento' },
					{ name: 'Insumo', value: 'insumo' },
					{ name: 'Labor', value: 'labor' },
					{ name: 'Lote', value: 'lote' },
					{ name: 'Numerador', value: 'numerador' },
					{ name: 'Orden Parte', value: 'ordenParte' },
					{ name: 'Personal', value: 'personal' },
					{ name: 'Tambo', value: 'tambo' },
					{ name: 'Tipos', value: 'tipos' },
					{ name: 'Tractor', value: 'tractor' },
					{ name: 'Varios', value: 'varios' },
				],
				default: 'campania',
			},

			// ============================================================
			// 4. INYECCIÓN MASIVA DE CAMPOS (Desde los index.ts)
			// ============================================================
			...silabDescriptions,
			...sigesDescriptions,
			...sachDescriptions,
			...sifacDescriptions,
			...savecDescriptions,
			...sacerDescriptions,
		],
	};

	constructor() {
		this.description.usableAsTool = true;
		this.description.codex = { categories: ['ERP'], subcategories: { 'ERP': ['Agro'] }, alias: ['physis'] };
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const service = this.getNodeParameter('service', 0) as string;

		// --- MODO TOOL ---
		if (service === 'physis_tool') {
			const toolModule = this.getNodeParameter('tool_module', 0) as string;
			const toolResource = this.getNodeParameter('tool_resource', 0) as string;
			const transport = new PhysisTransport(this);
			
			const tool = new DynamicStructuredTool({
				name: `physis_${toolModule}_${toolResource}`,
				description: `Tool para ${toolResource} de ${toolModule}`,
				schema: z.object({
					operation: z.string().describe('Operación (getAll, get, upsert, delete)'),
					id: z.string().optional(),
					filters: z.record(z.string(), z.unknown()).optional(),
					body: z.record(z.string(), z.unknown()).optional()
				}),
				func: async ({ operation, id, filters, body }) => {
					let endpoint = `/${toolModule}/api/${camelToKebab(toolResource)}s`;
					if (id) endpoint += `/${id}`;
					const method = (operation === 'upsert') ? 'POST' : (operation === 'delete') ? 'DELETE' : 'GET';
					const response = await transport.request(method, endpoint, (body || {}) as IDataObject, (filters || {}) as IDataObject);
					return JSON.stringify(response);
				}
			});
			return [[{ json: { tool: tool as unknown as IDataObject } }]];
		}

		// --- MODO MANUAL ---
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				let data: INodeExecutionData[] = [];

				if (service === 'silab') {
					data = await silabRouter(this, i, resource);
				} 
				else if (service === 'siges') {
					data = await sigesRouter(this, i, resource);
				} 
				else if (service === 'sach') {
					data = await sachRouter(this, i, resource);
				}
				else if (service === 'sifac') {
					data = await sifacRouter(this, i, resource);
				}
				else if (service === 'savec') {
					data = await savecRouter(this, i, resource);
				}
				else if (service === 'sacer') {
					data = await sacerRouter(this, i, resource);
				}

				if (!data || data.length === 0) {
					returnData.push({ json: { warning: `No data returned for ${service}/${resource}` } });
				} else {
					returnData.push(...data);
				}

			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ json: { error: errorMessage } });
					continue;
				}
				throw error;
			}
		}
		return [returnData];
	}
}