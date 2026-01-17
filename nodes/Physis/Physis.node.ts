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
        icon: 'file:physis.png',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["service"] + ": " + $parameter["resource"]}}',
        description: 'Integración completa Physis SRL (Modular)',
        defaults: { name: 'Physis Informática' },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [{ name: 'physisApi', required: true }],
        
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
                    { name: 'SILAB (Agro)', value: 'silab' },
                    { name: 'SIGES (Gestión)', value: 'siges' },
                    { name: 'SACH (Hacienda)', value: 'sach' },
                    { name: 'SIFAC (Facturación)', value: 'sifac' },
                    { name: 'SAVEC (Granos)', value: 'savec' },
                    { name: 'SACER (Acopio)', value: 'sacer' },
                ],
                default: 'sifac',
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
                    { name: 'SILAB', value: 'silab' },
                    { name: 'SIGES', value: 'siges' },
                    { name: 'SACH', value: 'sach' },
                    { name: 'SIFAC', value: 'sifac' },
                    { name: 'SAVEC', value: 'savec' },
                    { name: 'SACER', value: 'sacer' },
                ],
                default: 'silab',
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
            
            // SILAB
            {
                displayName: 'Recurso',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                displayOptions: { show: { service: ['silab'] } },
                options: [
                    { name: 'Campaña', value: 'campania' },
                    { name: 'Actividade', value: 'actividad' },
                    { name: 'Campo', value: 'campo' },
                    { name: 'Lote', value: 'lote' },
                    { name: 'Labore', value: 'labor' },
                    { name: 'Insumo', value: 'insumo' },
                    { name: 'Implemento', value: 'implemento' },
                    { name: 'Tractore', value: 'tractor' },
                    { name: 'Personal', value: 'personal' },
                    { name: 'Ordenes/Parte', value: 'ordenParte' },
                    { name: 'Ordenes De Trabajo', value: 'ordenTrabajo' }, 
                    { name: 'Estructura Agro', value: 'estructuraAgro' }, 
                    { name: 'Tambo', value: 'tambo' }, 
                    { name: 'Recursos De Campo', value: 'recursoCampo' }, 
                ],
                default: 'campania',
            },

            // SIGES
            {
                displayName: 'Recurso',
                name: 'resource',
                type: 'options',
																noDataExpression: true,
                displayOptions: { show: { service: ['siges'] } },
                options: [
                    { name: 'Tercero', value: 'tercero' },
                    { name: 'Comprobante', value: 'comprobante' },
                    { name: 'Banco', value: 'banco' },
                    { name: 'Cuenta Corriente', value: 'cuentaCorriente' },
                    { name: 'Ejercicio', value: 'ejercicio' },
                    { name: 'Usuario', value: 'usuario' },
                    { name: 'Geografía', value: 'geografia' },
                    { name: 'Tipos Vario', value: 'tipo' },
                    { name: 'Chequera', value: 'chequera' },
                    { name: 'Valore', value: 'valor' },
                    { name: 'Informe', value: 'informe' },
                    { name: 'Planes Cuenta', value: 'planCuenta' },
                    { name: 'Planes Cta Auxiliar', value: 'planCuentaAuxiliar' },
                    { name: 'Moneda', value: 'moneda' },
                    { name: 'Tipos Documento', value: 'tipoDocumento' },
                    { name: 'OP Masivo', value: 'opMasivo' },
                    { name: 'Tipos Comprobante', value: 'tipoComprobante' },
                    { name: 'Imágene', value: 'imagen' },
                    { name: 'Crédito', value: 'credito' },
                    { name: 'Cuentas Auxiliare', value: 'cuentaAuxiliar' },
                    { name: 'Consulta Mayor', value: 'mayor' },
                    { name: 'Medios De Pago', value: 'mediosPago' },
                    { name: 'Cuentas Principale', value: 'cuentaPrincipal' },
                    { name: 'Zona', value: 'zona' },
                    { name: 'Dominios', value: 'dominio' },
                    { name: 'Reagrupación Auxiliar', value: 'reagrupacionAuxiliar' },
                    { name: 'Reagrupación Principal', value: 'reagrupacionPrincipal' },
                ],
                default: 'tercero',
            },

            // SACH
            {
                displayName: 'Recurso',
                name: 'resource',
                type: 'options',
																noDataExpression: true,
                displayOptions: { show: { service: ['sach'] } },
                options: [
                    { name: 'Categoría', value: 'categoria' },
                    { name: 'Cliente', value: 'cliente' },
                    { name: 'Comisionista', value: 'comisionista' },
                    { name: 'Entidade', value: 'entidad' },
                    { name: 'Especy', value: 'especie' },
                    { name: 'Establecimiento', value: 'establecimiento' },
                    { name: 'Hacienda', value: 'hacienda' },
                    { name: 'Liquidacione', value: 'liquidacion' },
                    { name: 'Lote', value: 'lote' },
                    { name: 'Remate', value: 'remate' },
                ],
                default: 'cliente',
            },

            // SIFAC
            {
                displayName: 'Recurso',
                name: 'resource',
                type: 'options',
																noDataExpression: true,
                displayOptions: { show: { service: ['sifac'] } },
                options: [
                    { name: 'Comprobante', value: 'comprobante' },
                    { name: 'Condición Pago', value: 'condicionPago' },
                    { name: 'Depósito', value: 'deposito' },
                    { name: 'Listas Precio', value: 'listaPrecio' },
                    { name: 'Orden Compra', value: 'ordenCompra' },
                    { name: 'Pedido', value: 'pedido' },
                    { name: 'Producto', value: 'producto' },
                    { name: 'Remitos Compra', value: 'remitoCompra' },
                    { name: 'Transporte', value: 'transporte' },
                    { name: 'Vendedore', value: 'vendedor' },
                    { name: 'Zona', value: 'zona' },
                ],
                default: 'comprobante',
            },

            // SAVEC
            {
                displayName: 'Recurso',
                name: 'resource',
                type: 'options',
																noDataExpression: true,
                displayOptions: { show: { service: ['savec'] } },
                options: [
                    { name: 'Contrato', value: 'contrato' },
                    { name: 'CRM', value: 'crm' },
                    { name: 'Definicione', value: 'definicion' },
                    { name: 'Ventas Campo', value: 'ventaCampo' },
                ],
                default: 'contrato',
            },

            // SACER
            {
                displayName: 'Recurso',
                name: 'resource',
                type: 'options',
																noDataExpression: true,
                displayOptions: { show: { service: ['sacer'] } },
                options: [
                    { name: 'Campo', value: 'campo' },
                    { name: 'Cartas Porte', value: 'cartaPorte' },
                    { name: 'Cereale', value: 'cereal' },
                    { name: 'Infraestructura', value: 'infraestructura' },
                    { name: 'Logística', value: 'logistica' },
                ],
                default: 'cartaPorte',
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
		usableAsTool: true,
    };

    constructor() {
        this.description.usableAsTool = true;
        this.description.codex = { categories: ['ERP'], subcategories: { 'ERP': ['Agro'] }, alias: ['physis'] };
    }

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const service = this.getNodeParameter('service', 0) as string;

        // --- MODO TOOL  ---
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