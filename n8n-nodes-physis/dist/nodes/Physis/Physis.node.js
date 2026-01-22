"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Physis = void 0;
const zod_1 = require("zod");
const tools_1 = require("@langchain/core/tools");
const transport_1 = require("./transport/transport");
const index_1 = require("./resources/silab/index");
const index_2 = require("./resources/siges/index");
const index_3 = require("./resources/sach/index");
const index_4 = require("./resources/sifac/index");
const index_5 = require("./resources/savec/index");
const index_6 = require("./resources/sacer/index");
function camelToKebab(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
class Physis {
    constructor() {
        this.description = {
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
                {
                    displayName: 'Módulo',
                    name: 'service',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        { name: 'SACER (Acopio)', value: 'sacer' },
                        { name: 'SACH (Hacienda)', value: 'sach' },
                        { name: 'SAVEC (Granos)', value: 'savec' },
                        { name: 'SIFAC (Facturación)', value: 'sifac' },
                        { name: 'SIGES (Gestión)', value: 'siges' },
                        { name: 'SILAB (Agro)', value: 'silab' },
                    ],
                    default: 'siges',
                },
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
                        { name: 'Carta De Porte', value: 'cartaPorte' },
                        { name: 'Cereal', value: 'cereal' },
                        { name: 'Contrato', value: 'contrato' },
                        { name: 'Cuenta Corriente Grano', value: 'cuentaCorrienteGranos' },
                        { name: 'Establecimiento', value: 'establecimiento' },
                        { name: 'Fijación', value: 'fijacion' },
                        { name: 'Forma De Pago', value: 'formaPago' },
                        { name: 'Formato', value: 'formato' },
                        { name: 'Humedad', value: 'humedad' },
                        { name: 'Imputación IVA', value: 'imputacionIVA' },
                        { name: 'Imputaciones Contable', value: 'imputacionesContable' },
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
                        { name: 'Imputaciones Contable', value: 'imputacionesContable' },
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
                        { name: 'Tarifa', value: 'tarifas' },
                        { name: 'Tipo Contrato', value: 'tipoContrato' },
                        { name: 'Tipos Formulario', value: 'tiposFormulario' },
                        { name: 'Venta Campo', value: 'ventaCampo' },
                    ],
                    default: 'contrato',
                },
                {
                    displayName: 'Recurso',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: { show: { service: ['sifac'] } },
                    options: [
                        { name: 'Auxiliar SIFAC', value: 'auxiliarSifac' },
                        { name: 'CC Insumo', value: 'ccInsumos' },
                        { name: 'Comprobante', value: 'comprobante' },
                        { name: 'Condición Comercial', value: 'condicionComercial' },
                        { name: 'Condición Pago', value: 'condicionPago' },
                        { name: 'Conductores', value: 'conductores' },
                        { name: 'Control Adicional', value: 'controlAdicional' },
                        { name: 'Depósito', value: 'deposito' },
                        { name: 'Descuentos', value: 'descuentos' },
                        { name: 'Grupos Producto', value: 'gruposProductos' },
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
                        { name: 'Tipos Comprobante', value: 'tiposComprobantes' },
                        { name: 'Transporte', value: 'transporte' },
                        { name: 'Unidad', value: 'unidad' },
                        { name: 'Varios', value: 'varios' },
                        { name: 'Vendedor', value: 'vendedor' },
                        { name: 'Zona', value: 'zona' },
                    ],
                    default: 'comprobante',
                },
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
                        { name: 'Texto', value: 'textos' },
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
                ...index_6.sacerDescriptions,
                ...index_3.sachDescriptions,
                ...index_5.savecDescriptions,
                ...index_4.sifacDescriptions,
                ...index_2.sigesDescriptions,
                ...index_1.silabDescriptions,
            ],
            usableAsTool: true,
        };
        this.description.usableAsTool = true;
        this.description.codex = { categories: ['ERP'], subcategories: { 'ERP': ['Agro'] }, alias: ['physis'] };
    }
    async execute() {
        const service = this.getNodeParameter('service', 0);
        if (service === 'physis_tool') {
            const toolModule = this.getNodeParameter('tool_module', 0);
            const toolResource = this.getNodeParameter('tool_resource', 0);
            const transport = new transport_1.PhysisTransport(this);
            const tool = new tools_1.DynamicStructuredTool({
                name: `physis_${toolModule}_${toolResource}`,
                description: `Tool para ${toolResource} de ${toolModule}`,
                schema: zod_1.z.object({
                    operation: zod_1.z.string().describe('Operación (getAll, get, upsert, delete)'),
                    id: zod_1.z.string().optional(),
                    filters: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
                    body: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional()
                }),
                func: async ({ operation, id, filters, body }) => {
                    let endpoint = `/${toolModule}/api/${camelToKebab(toolResource)}s`;
                    if (id)
                        endpoint += `/${id}`;
                    const method = (operation === 'upsert') ? 'POST' : (operation === 'delete') ? 'DELETE' : 'GET';
                    const response = await transport.request(method, endpoint, (body || {}), (filters || {}));
                    return JSON.stringify(response);
                }
            });
            return [[{ json: { tool: tool } }]];
        }
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i);
                let data = [];
                if (service === 'silab') {
                    data = await (0, index_1.silabRouter)(this, i, resource);
                }
                else if (service === 'siges') {
                    data = await (0, index_2.sigesRouter)(this, i, resource);
                }
                else if (service === 'sach') {
                    data = await (0, index_3.sachRouter)(this, i, resource);
                }
                else if (service === 'sifac') {
                    data = await (0, index_4.sifacRouter)(this, i, resource);
                }
                else if (service === 'savec') {
                    data = await (0, index_5.savecRouter)(this, i, resource);
                }
                else if (service === 'sacer') {
                    data = await (0, index_6.sacerRouter)(this, i, resource);
                }
                if (!data || data.length === 0) {
                    returnData.push({ json: { warning: `No data returned for ${service}/${resource}` } });
                }
                else {
                    returnData.push(...data);
                }
            }
            catch (error) {
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
exports.Physis = Physis;
//# sourceMappingURL=Physis.node.js.map