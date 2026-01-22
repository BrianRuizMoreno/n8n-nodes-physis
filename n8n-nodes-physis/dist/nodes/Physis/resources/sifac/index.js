"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sifacDescriptions = void 0;
exports.sifacRouter = sifacRouter;
const comprobante = __importStar(require("./comprobante/description"));
const comprobanteHandler = __importStar(require("./comprobante/handlers"));
const condicionPago = __importStar(require("./condicionPago/description"));
const condicionPagoHandler = __importStar(require("./condicionPago/handlers"));
const deposito = __importStar(require("./deposito/description"));
const depositoHandler = __importStar(require("./deposito/handlers"));
const listaPrecio = __importStar(require("./listaPrecio/description"));
const listaPrecioHandler = __importStar(require("./listaPrecio/handlers"));
const ordenCompra = __importStar(require("./ordenCompra/description"));
const ordenCompraHandler = __importStar(require("./ordenCompra/handlers"));
const pedido = __importStar(require("./pedido/description"));
const pedidoHandler = __importStar(require("./pedido/handlers"));
const producto = __importStar(require("./producto/description"));
const productoHandler = __importStar(require("./producto/handlers"));
const remitoCompra = __importStar(require("./remitoCompra/description"));
const remitoCompraHandler = __importStar(require("./remitoCompra/handlers"));
const transporte = __importStar(require("./transporte/description"));
const transporteHandler = __importStar(require("./transporte/handlers"));
const vendedor = __importStar(require("./vendedor/description"));
const vendedorHandler = __importStar(require("./vendedor/handlers"));
const zona = __importStar(require("./zona/description"));
const zonaHandler = __importStar(require("./zona/handlers"));
const unidad = __importStar(require("./unidad/description"));
const unidadHandler = __importStar(require("./unidad/handlers"));
const tipoTasa = __importStar(require("./tipoTasa/description"));
const tipoTasaHandler = __importStar(require("./tipoTasa/handlers"));
const reagrupacionAuxiliar = __importStar(require("./reagrupacionAuxiliar/description"));
const reagrupacionAuxiliarHandler = __importStar(require("./reagrupacionAuxiliar/handlers"));
const proveedorInfo = __importStar(require("./proveedorInfo/description"));
const proveedorInfoHandler = __importStar(require("./proveedorInfo/handlers"));
const productoStock = __importStar(require("./productoStock/description"));
const productoStockHandler = __importStar(require("./productoStock/handlers"));
const precio = __importStar(require("./precio/description"));
const precioHandler = __importStar(require("./precio/handlers"));
const partida = __importStar(require("./partida/description"));
const partidaHandler = __importStar(require("./partida/handlers"));
const ordenCompraInterfaz = __importStar(require("./ordenCompraInterfaz/description"));
const ordenCompraInterfazHandler = __importStar(require("./ordenCompraInterfaz/handlers"));
const origenDestino = __importStar(require("./origenDestino/description"));
const origenDestinoHandler = __importStar(require("./origenDestino/handlers"));
const medioTransporte = __importStar(require("./medioTransporte/description"));
const medioTransporteHandler = __importStar(require("./medioTransporte/handlers"));
const condicionComercial = __importStar(require("./condicionComercial/description"));
const condicionComercialHandler = __importStar(require("./condicionComercial/handlers"));
const controlAdicional = __importStar(require("./controlAdicional/description"));
const controlAdicionalHandler = __importStar(require("./controlAdicional/handlers"));
const maestroGeneral = __importStar(require("./maestroGeneral/description"));
const maestroGeneralHandler = __importStar(require("./maestroGeneral/handlers"));
const clienteInfo = __importStar(require("./clienteInfo/description"));
const clienteInfoHandler = __importStar(require("./clienteInfo/handlers"));
const auxiliarSifac = __importStar(require("./auxiliarSifac/description"));
const auxiliarSifacHandler = __importStar(require("./auxiliarSifac/handlers"));
const conductores = __importStar(require("./conductores/description"));
const conductoresHandler = __importStar(require("./conductores/handlers"));
const imagenes = __importStar(require("./imagenes/description"));
const imagenesHandler = __importStar(require("./imagenes/handlers"));
const ccInsumos = __importStar(require("./ccInsumos/description"));
const ccInsumosHandler = __importStar(require("./ccInsumos/handlers"));
const gruposProductos = __importStar(require("./gruposProductos/description"));
const gruposProductosHandler = __importStar(require("./gruposProductos/handlers"));
const gruposProveedores = __importStar(require("./gruposProveedores/description"));
const gruposProveedoresHandler = __importStar(require("./gruposProveedores/handlers"));
const descuentos = __importStar(require("./descuentos/description"));
const descuentosHandler = __importStar(require("./descuentos/handlers"));
const observaciones = __importStar(require("./observaciones/description"));
const observacionesHandler = __importStar(require("./observaciones/handlers"));
const tiposComprobante = __importStar(require("./tiposComprobantes/description"));
const tiposComprobanteHandler = __importStar(require("./tiposComprobantes/handlers"));
const varios = __importStar(require("./varios/description"));
const variosHandler = __importStar(require("./varios/handlers"));
exports.sifacDescriptions = [
    ...comprobante.comprobanteSifacOperations, ...comprobante.comprobanteSifacFields,
    ...condicionPago.condicionPagoOperations, ...condicionPago.condicionPagoFields,
    ...deposito.depositoOperations, ...deposito.depositoFields,
    ...listaPrecio.listaPrecioOperations, ...listaPrecio.listaPrecioFields,
    ...ordenCompra.ordenCompraOperations, ...ordenCompra.ordenCompraFields,
    ...pedido.pedidoOperations, ...pedido.pedidoFields,
    ...producto.productoOperations, ...producto.productoFields,
    ...remitoCompra.remitoCompraOperations, ...remitoCompra.remitoCompraFields,
    ...transporte.transporteOperations, ...transporte.transporteFields,
    ...vendedor.vendedorOperations, ...vendedor.vendedorFields,
    ...zona.zonaOperations, ...zona.zonaFields,
    ...unidad.unidadOperations, ...unidad.unidadFields,
    ...tipoTasa.tipoTasaOperations, ...tipoTasa.tipoTasaFields,
    ...reagrupacionAuxiliar.reagrupacionAuxiliarOperations, ...reagrupacionAuxiliar.reagrupacionAuxiliarFields,
    ...proveedorInfo.proveedorInfoOperations, ...proveedorInfo.proveedorInfoFields,
    ...productoStock.productoStockOperations, ...productoStock.productoStockFields,
    ...precio.precioOperations, ...precio.precioFields,
    ...partida.partidaOperations, ...partida.partidaFields,
    ...ordenCompraInterfaz.ordenCompraInterfazOperations, ...ordenCompraInterfaz.ordenCompraInterfazFields,
    ...origenDestino.origenDestinoOperations, ...origenDestino.origenDestinoFields,
    ...medioTransporte.medioTransporteOperations, ...medioTransporte.medioTransporteFields,
    ...condicionComercial.condicionComercialOperations, ...condicionComercial.condicionComercialFields,
    ...controlAdicional.controlAdicionalOperations, ...controlAdicional.controlAdicionalFields,
    ...maestroGeneral.maestroGeneralOperations, ...maestroGeneral.maestroGeneralFields,
    ...clienteInfo.clienteInfoOperations, ...clienteInfo.clienteInfoFields,
    ...auxiliarSifac.auxiliarSifacOperations, ...auxiliarSifac.auxiliarSifacOperations,
    ...conductores.conductorOperations, ...conductores.conductorFields,
    ...imagenes.imagenOperations, ...imagenes.imagenFields,
    ...ccInsumos.ccInsumosOperations, ...ccInsumos.ccInsumosFields,
    ...gruposProductos.grupoPermisosOperations, ...gruposProductos.grupoPermisosFields,
    ...gruposProveedores.grupoProveedoresOperations, ...gruposProveedores.grupoProveedoresFields,
    ...descuentos.descuentosClientesOperations, ...descuentos.descuentosClientesFields,
    ...observaciones.observacionesOperations, ...observaciones.observacionesFields,
    ...tiposComprobante.tiposComprobanteOperations, ...tiposComprobante.tiposComprobanteFields,
    ...varios.variosOperations, ...varios.variosFields,
];
async function sifacRouter(context, index, resource) {
    switch (resource) {
        case 'comprobante':
            return await comprobanteHandler.execute.call(context, index);
        case 'condicionPago':
            return await condicionPagoHandler.execute.call(context, index);
        case 'deposito':
            return await depositoHandler.execute.call(context, index);
        case 'listaPrecio':
            return await listaPrecioHandler.execute.call(context, index);
        case 'ordenCompra':
            return await ordenCompraHandler.execute.call(context, index);
        case 'pedido':
            return await pedidoHandler.execute.call(context, index);
        case 'producto':
            return await productoHandler.execute.call(context, index);
        case 'remitoCompra':
            return await remitoCompraHandler.execute.call(context, index);
        case 'transporte':
            return await transporteHandler.execute.call(context, index);
        case 'vendedor':
            return await vendedorHandler.execute.call(context, index);
        case 'zona':
            return await zonaHandler.execute.call(context, index);
        case 'unidad':
            return await unidadHandler.execute.call(context, index);
        case 'tipoTasa':
            return await tipoTasaHandler.execute.call(context, index);
        case 'reagrupacionAuxiliar':
            return await reagrupacionAuxiliarHandler.execute.call(context, index);
        case 'proveedorInfo':
            return await proveedorInfoHandler.execute.call(context, index);
        case 'productoStock':
            return await productoStockHandler.execute.call(context, index);
        case 'precio':
            return await precioHandler.execute.call(context, index);
        case 'partida':
            return await partidaHandler.execute.call(context, index);
        case 'ordenCompraInterfaz':
            return await ordenCompraInterfazHandler.execute.call(context, index);
        case 'origenDestino':
            return await origenDestinoHandler.execute.call(context, index);
        case 'medioTransporte':
            return await medioTransporteHandler.execute.call(context, index);
        case 'condicionComercial':
            return await condicionComercialHandler.execute.call(context, index);
        case 'controlAdicional':
            return await controlAdicionalHandler.execute.call(context, index);
        case 'maestroGeneral':
            return await maestroGeneralHandler.execute.call(context, index);
        case 'clienteInfo':
            return await clienteInfoHandler.execute.call(context, index);
        case 'auxiliarSifac':
            return await auxiliarSifacHandler.execute.call(context, index);
        case 'conductores':
            return await conductoresHandler.execute.call(context, index);
        case 'imagenes':
            return await imagenesHandler.execute.call(context, index);
        case 'ccInsumos':
            return await ccInsumosHandler.execute.call(context, index);
        case 'gruposProductos':
            return await gruposProductosHandler.execute.call(context, index);
        case 'gruposProveedores':
            return await gruposProveedoresHandler.execute.call(context, index);
        case 'descuentosClientes':
            return await descuentosHandler.execute.call(context, index);
        case 'observaciones':
            return await observacionesHandler.execute.call(context, index);
        case 'tiposComprobante':
            return await tiposComprobanteHandler.execute.call(context, index);
        case 'varios':
            return await variosHandler.execute.call(context, index);
        default:
            throw new Error(`El recurso SIFAC "${resource}" no está implementado en el router.`);
    }
}
//# sourceMappingURL=index.js.map