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
exports.sigesDescriptions = void 0;
exports.sigesRouter = sigesRouter;
const banco = __importStar(require("./banco/description"));
const bancoHandler = __importStar(require("./banco/handlers"));
const chequera = __importStar(require("./chequera/description"));
const chequeraHandler = __importStar(require("./chequera/handlers"));
const comprobante = __importStar(require("./comprobante/description"));
const comprobanteHandler = __importStar(require("./comprobante/handlers"));
const credito = __importStar(require("./credito/description"));
const creditoHandler = __importStar(require("./credito/handlers"));
const cuentaAuxiliar = __importStar(require("./cuentaAuxiliar/description"));
const cuentaAuxiliarHandler = __importStar(require("./cuentaAuxiliar/handlers"));
const cuentaCorriente = __importStar(require("./cuentaCorriente/description"));
const cuentaCorrienteHandler = __importStar(require("./cuentaCorriente/handlers"));
const cuentaPrincipal = __importStar(require("./cuentaPrincipal/description"));
const cuentaPrincipalHandler = __importStar(require("./cuentaPrincipal/handlers"));
const dominio = __importStar(require("./dominio/description"));
const dominioHandler = __importStar(require("./dominio/handlers"));
const ejercicio = __importStar(require("./ejercicio/description"));
const ejercicioHandler = __importStar(require("./ejercicio/handlers"));
const imagen = __importStar(require("./imagen/description"));
const imagenHandler = __importStar(require("./imagen/handlers"));
const informe = __importStar(require("./informe/description"));
const informeHandler = __importStar(require("./informe/handlers"));
const mayor = __importStar(require("./mayor/description"));
const mayorHandler = __importStar(require("./mayor/handlers"));
const moneda = __importStar(require("./moneda/description"));
const monedaHandler = __importStar(require("./moneda/handlers"));
const tercero = __importStar(require("./tercero/description"));
const terceroHandler = __importStar(require("./tercero/handlers"));
const regimenes = __importStar(require("./regimenes/description"));
const regimenesHandler = __importStar(require("./regimenes/handlers"));
const tipoDocumento = __importStar(require("./tipoDocumento/description"));
const tipoDocumentoHandler = __importStar(require("./tipoDocumento/handlers"));
const usuario = __importStar(require("./usuario/description"));
const usuarioHandler = __importStar(require("./usuario/handlers"));
const zona = __importStar(require("./zona/description"));
const zonaHandler = __importStar(require("./zona/handlers"));
const planCuenta = __importStar(require("./planCuenta/description"));
const planCuentaHandler = __importStar(require("./planCuenta/handlers"));
const planCuentaAuxiliar = __importStar(require("./planCuentaAuxiliar/description"));
const planCuentaAuxiliarHandler = __importStar(require("./planCuentaAuxiliar/handlers"));
const planReagrupacionAuxiliar = __importStar(require("./reagrupacionAuxiliar/description"));
const planReagrupacionAuxiliarHandler = __importStar(require("./reagrupacionAuxiliar/handlers"));
const planReagrupacionPrincipal = __importStar(require("./reagrupacionPrincipal/description"));
const planReagrupacionPrincipalHandler = __importStar(require("./reagrupacionPrincipal/handlers"));
const reagrupacionRelacionAuxiliar = __importStar(require("./reagrupacionCuentaAuxiliar/description"));
const reagrupacionRelacionAuxiliarHandler = __importStar(require("./reagrupacionCuentaAuxiliar/handlers"));
const reagrupacionRelacionPrincipal = __importStar(require("./reagrupacionCuentaPpal/description"));
const reagrupacionRelacionPrincipalHandler = __importStar(require("./reagrupacionCuentaPpal/handlers"));
const PP_comprobantes = __importStar(require("./PP_comprobantes/description"));
const PP_comprobantesHandler = __importStar(require("./PP_comprobantes/handlers"));
const PP_compradoresAutorizantes = __importStar(require("./PP_compradoresAutorizantes/description"));
const PP_compradoresAutorizantesHandler = __importStar(require("./PP_compradoresAutorizantes/handlers"));
const autorizacion = __importStar(require("./autorizacion/description"));
const autorizacionHandler = __importStar(require("./autorizacion/handlers"));
const campania = __importStar(require("./campania/description"));
const campaniaHandler = __importStar(require("./campania/handlers"));
const empresa = __importStar(require("./empresa/description"));
const empresaHandler = __importStar(require("./empresa/handlers"));
const facturaProveedor = __importStar(require("./facturaProveedor/description"));
const facturaProveedorHandler = __importStar(require("./facturaProveedor/handlers"));
const indicador = __importStar(require("./indicador/description"));
const indicadorHandler = __importStar(require("./indicador/handlers"));
const libro = __importStar(require("./libro/description"));
const libroHandler = __importStar(require("./libro/handlers"));
const pesaje = __importStar(require("./pesajes/description"));
const pesajeHandler = __importStar(require("./pesajes/handlers"));
const afectacion = __importStar(require("./afectacion/description"));
const afectacionHandler = __importStar(require("./afectacion/handlers"));
const reporteDefinible = __importStar(require("./reporteDefinible/description"));
const reporteDefinibleHandler = __importStar(require("./reporteDefinible/handlers"));
const reporteCompartido = __importStar(require("./reporteCompartido/description"));
const reporteCompartidoHandler = __importStar(require("./reporteCompartido/handlers"));
const saldo = __importStar(require("./saldo/description"));
const saldoHandler = __importStar(require("./saldo/handlers"));
const cuentasReagrupacionAuxi = __importStar(require("./cuentasReagrupacionAuxi/description"));
const cuentasReagrupacionAuxiHandler = __importStar(require("./cuentasReagrupacionAuxi/handlers"));
const cuentasReagrupacionPpal = __importStar(require("./cuentasReagrupacionPpal/description"));
const cuentasReagrupacionPpalHandler = __importStar(require("./cuentasReagrupacionPpal/handlers"));
const numeracion = __importStar(require("./numeracion/description"));
const numeracionHandler = __importStar(require("./numeracion/handlers"));
const BI = __importStar(require("./BI/description"));
const BIHandler = __importStar(require("./BI/handlers"));
const billeteras = __importStar(require("./billeteras/description"));
const billeterasHandler = __importStar(require("./billeteras/handlers"));
const combos = __importStar(require("./combos/description"));
const combosHandler = __importStar(require("./combos/handlers"));
const comprobantePendiente = __importStar(require("./comprobantesPendientes/description"));
const comprobantePendienteHandler = __importStar(require("./comprobantesPendientes/handlers"));
const tiposComprobantesAfip = __importStar(require("./tiposComprobantesAFIP/description"));
const tiposComprobantesAfipHandler = __importStar(require("./tiposComprobantesAFIP/handlers"));
const controlDiario = __importStar(require("./controlDiario/description"));
const controlDiarioHandler = __importStar(require("./controlDiario/handlers"));
const firmas = __importStar(require("./firmas/description"));
const firmasHandler = __importStar(require("./firmas/handlers"));
const tiposComprobantes = __importStar(require("./tiposComprobantes/description"));
const tiposComprobantesHandler = __importStar(require("./tiposComprobantes/handlers"));
const valores = __importStar(require("./valores/description"));
const valoresHandler = __importStar(require("./valores/handlers"));
const cuentasTemp = __importStar(require("./cuentasTemporales/description"));
const cuentasTempHandler = __importStar(require("./cuentasTemporales/handlers"));
const conceptosIVA = __importStar(require("./conceptosIVA/description"));
const conceptosIVAHandler = __importStar(require("./conceptosIVA/handlers"));
const vencimientos = __importStar(require("./vencimientos/description"));
const vencimientosHandler = __importStar(require("./vencimientos/handlers"));
const qr = __importStar(require("./qr/description"));
const qrHandler = __importStar(require("./qr/handlers"));
const textos = __importStar(require("./textos/description"));
const textosHandler = __importStar(require("./textos/handlers"));
const interdepositos = __importStar(require("./interdepositos/description"));
const interdepositosHandler = __importStar(require("./interdepositos/handlers"));
const historia = __importStar(require("./historia/description"));
const historiaHandler = __importStar(require("./historia/handlers"));
const modelos = __importStar(require("./modelos/description"));
const modelosHandler = __importStar(require("./modelos/handlers"));
const sistemas = __importStar(require("./sistemas/description"));
const sistemasHandler = __importStar(require("./sistemas/handlers"));
const retenciones = __importStar(require("./retenciones/description"));
const retencionesHandler = __importStar(require("./retenciones/handlers"));
const utilidades = __importStar(require("./utilidades/description"));
const utilidadesHandler = __importStar(require("./utilidades/handlers"));
exports.sigesDescriptions = [
    ...banco.bancoOperations, ...banco.bancoFields,
    ...chequera.chequeraOperations, ...chequera.chequeraFields,
    ...comprobante.comprobanteOperations, ...comprobante.comprobanteFields,
    ...credito.creditoOperations, ...credito.creditoFields,
    ...cuentaAuxiliar.cuentasAuxiOperations, ...cuentaAuxiliar.cuentasAuxiFields,
    ...cuentaCorriente.cuentaCorrienteOperations, ...cuentaCorriente.cuentaCorrienteFields,
    ...cuentaPrincipal.cuentaPrincipalOperations, ...cuentaPrincipal.cuentaPrincipalFields,
    ...dominio.dominioOperations, ...dominio.dominioFields,
    ...ejercicio.ejercicioOperations, ...ejercicio.ejercicioFields,
    ...imagen.imagenOperations, ...imagen.imagenFields,
    ...informe.informeOperations, ...informe.informeFields,
    ...mayor.mayorOperations, ...mayor.mayorFields,
    ...moneda.monedaOperations, ...moneda.monedaFields,
    ...tercero.terceroOperations, ...tercero.terceroFields,
    ...regimenes.tipoOperations, ...regimenes.tipoFields,
    ...tipoDocumento.tipoDocumentoOperations, ...tipoDocumento.tipoDocumentoFields,
    ...usuario.usuarioOperations, ...usuario.usuarioFields,
    ...zona.zonaOperations, ...zona.zonaFields,
    ...planCuenta.planCuentaOperations, ...planCuenta.planCuentaFields,
    ...planCuentaAuxiliar.planCuentaAuxiliarOperations, ...planCuentaAuxiliar.planCuentaAuxiliarFields,
    ...planReagrupacionAuxiliar.planReagrupacionAuxiOperations, ...planReagrupacionAuxiliar.planReagrupacionAuxiFields,
    ...planReagrupacionPrincipal.planReagrupacionPrincipalOperations, ...planReagrupacionPrincipal.planReagrupacionPrincipalFields,
    ...reagrupacionRelacionAuxiliar.reagrupacionRelacionAuxiliarOperations, ...reagrupacionRelacionAuxiliar.reagrupacionRelacionAuxiliarFields,
    ...reagrupacionRelacionPrincipal.reagrupacionRelacionPrincipalOperations, ...reagrupacionRelacionPrincipal.reagrupacionRelacionPrincipalFields,
    ...PP_comprobantes.PP_comprobantesOperations, ...PP_comprobantes.PP_comprobantesFields,
    ...PP_compradoresAutorizantes.PP_compradoresAutorizantesOperations, ...PP_compradoresAutorizantes.PP_compradoresAutorizantesFields,
    ...autorizacion.autorizacionOperations, ...autorizacion.autorizacionFields,
    ...campania.campaniaOperations, ...campania.campaniaFields,
    ...empresa.empresaOperations, ...empresa.empresaFields,
    ...facturaProveedor.facturaProveedorOperations, ...facturaProveedor.facturaProveedorFields,
    ...indicador.indicadorOperations, ...indicador.indicadorFields,
    ...libro.libroOperations, ...libro.libroFields,
    ...pesaje.pesajeOperations, ...pesaje.pesajeFields,
    ...afectacion.afectacionOperations, ...afectacion.afectacionFields,
    ...reporteDefinible.reporteDefinibleOperations, ...reporteDefinible.reporteDefinibleFields,
    ...saldo.saldoOperations, ...saldo.saldoFields,
    ...cuentasReagrupacionAuxi.cuentasReagrupacionAuxiOperations, ...cuentasReagrupacionAuxi.cuentasReagrupacionAuxiFields,
    ...cuentasReagrupacionPpal.cuentasReagrupacionPpalOperations, ...cuentasReagrupacionPpal.cuentasReagrupacionPpalFields,
    ...numeracion.numeracionOperations, ...numeracion.numeracionFields,
    ...reporteCompartido.reporteCompartidoOperations, ...reporteCompartido.reporteCompartidoFields,
    ...BI.biOperations, ...BI.biFields,
    ...billeteras.billeterasOperations, ...billeteras.billeterasFields,
    ...combos.combosOperations, ...combos.combosFields,
    ...comprobantePendiente.comprobantePendienteOperations, ...comprobantePendiente.comprobantePendienteFields,
    ...tiposComprobantesAfip.tiposComprobantesAfipOperations, ...tiposComprobantesAfip.tiposComprobantesAfipFields,
    ...controlDiario.controlDiarioOperations, ...controlDiario.controlDiarioFields,
    ...firmas.firmasOperations, ...firmas.firmasFields,
    ...tiposComprobantes.tiposComprobanteOperations, ...tiposComprobantes.tiposComprobanteFields,
    ...valores.valoresOperations, ...valores.valoresFields,
    ...cuentasTemp.cuentasTempOperations, ...cuentasTemp.cuentasTempFields,
    ...conceptosIVA.conceptosIVAOperations, ...conceptosIVA.conceptosIVAFields,
    ...vencimientos.vencimientosOperations, ...vencimientos.vencimientosFields,
    ...qr.qrOperations, ...qr.qrFields,
    ...sistemas.sistemasOperations, ...sistemas.sistemasFields,
    ...modelos.modeloOperations, ...modelos.modeloFields,
    ...textos.textosOperations, ...textos.textosFields,
    ...interdepositos.interdepositosOperations, ...interdepositos.interdepositosFields,
    ...historia.historiaOperations, ...historia.historiaFields,
    ...retenciones.retencionesOperations, ...retenciones.retencionesFields,
    ...utilidades.utilidadesOperations, ...utilidades.utilidadesFields,
];
async function sigesRouter(context, index, resource) {
    switch (resource) {
        case 'banco': return await bancoHandler.execute.call(context, index);
        case 'chequera': return await chequeraHandler.execute.call(context, index);
        case 'comprobante': return await comprobanteHandler.execute.call(context, index);
        case 'credito': return await creditoHandler.execute.call(context, index);
        case 'cuentaAuxiliar': return await cuentaAuxiliarHandler.execute.call(context, index);
        case 'cuentaCorriente': return await cuentaCorrienteHandler.execute.call(context, index);
        case 'cuentaPrincipal': return await cuentaPrincipalHandler.execute.call(context, index);
        case 'dominio': return await dominioHandler.execute.call(context, index);
        case 'ejercicio': return await ejercicioHandler.execute.call(context, index);
        case 'imagen': return await imagenHandler.execute.call(context, index);
        case 'informe': return await informeHandler.execute.call(context, index);
        case 'mayor': return await mayorHandler.execute.call(context, index);
        case 'moneda': return await monedaHandler.execute.call(context, index);
        case 'tercero': return await terceroHandler.execute.call(context, index);
        case 'regimenes': return await regimenesHandler.execute.call(context, index);
        case 'tipoDocumento': return await tipoDocumentoHandler.execute.call(context, index);
        case 'usuario': return await usuarioHandler.execute.call(context, index);
        case 'zona': return await zonaHandler.execute.call(context, index);
        case 'planCuenta': return await planCuentaHandler.execute.call(context, index);
        case 'planCuentaAuxiliar': return await planCuentaAuxiliarHandler.execute.call(context, index);
        case 'planReagrupacionAuxiliar': return await planReagrupacionAuxiliarHandler.execute.call(context, index);
        case 'planReagrupacionPrincipal': return await planReagrupacionPrincipalHandler.execute.call(context, index);
        case 'reagrupacionRelacionAuxiliar': return await reagrupacionRelacionAuxiliarHandler.execute.call(context, index);
        case 'reagrupacionRelacionPrincipal': return await reagrupacionRelacionPrincipalHandler.execute.call(context, index);
        case 'PP_comprobantes': return await PP_comprobantesHandler.execute.call(context, index);
        case 'PP_compradoresAutorizantes': return await PP_compradoresAutorizantesHandler.execute.call(context, index);
        case 'autorizacion': return await autorizacionHandler.execute.call(context, index);
        case 'campania': return await campaniaHandler.execute.call(context, index);
        case 'empresa': return await empresaHandler.execute.call(context, index);
        case 'facturaProveedor': return await facturaProveedorHandler.execute.call(context, index);
        case 'indicador': return await indicadorHandler.execute.call(context, index);
        case 'libro': return await libroHandler.execute.call(context, index);
        case 'pesaje': return await pesajeHandler.execute.call(context, index);
        case 'afectacion': return await afectacionHandler.execute.call(context, index);
        case 'reporteDefinible': return await reporteDefinibleHandler.execute.call(context, index);
        case 'saldo': return await saldoHandler.execute.call(context, index);
        case 'reagrupacionCuentaAuxi': return await cuentasReagrupacionAuxiHandler.execute.call(context, index);
        case 'reagrupacionCuentaPpal': return await cuentasReagrupacionPpalHandler.execute.call(context, index);
        case 'numeracion': return await numeracionHandler.execute.call(context, index);
        case 'reporteCompartido': return await reporteCompartidoHandler.execute.call(context, index);
        case 'BI': return await BIHandler.execute.call(context, index);
        case 'billeteras': return await billeterasHandler.execute.call(context, index);
        case 'combos': return await combosHandler.execute.call(context, index);
        case 'comprobantePendiente': return await comprobantePendienteHandler.execute.call(context, index);
        case 'tiposComprobantesAfip': return await tiposComprobantesAfipHandler.execute.call(context, index);
        case 'controlDiario': return await controlDiarioHandler.execute.call(context, index);
        case 'firmas': return await firmasHandler.execute.call(context, index);
        case 'tiposComprobantes': return await tiposComprobantesHandler.execute.call(context, index);
        case 'valores': return await valoresHandler.execute.call(context, index);
        case 'cuentasTemporales': return await cuentasTempHandler.execute.call(context, index);
        case 'qr': return await qrHandler.execute.call(context, index);
        case 'conceptosIVA': return await conceptosIVAHandler.execute.call(context, index);
        case 'vencimientos': return await vencimientosHandler.execute.call(context, index);
        case 'sistemas': return await sistemasHandler.execute.call(context, index);
        case 'modelos': return await modelosHandler.execute.call(context, index);
        case 'textos': return await textosHandler.execute.call(context, index);
        case 'interdepositos': return await interdepositosHandler.execute.call(context, index);
        case 'historia': return await historiaHandler.execute.call(context, index);
        case 'retenciones': return await retencionesHandler.execute.call(context, index);
        case 'utilidades': return await utilidadesHandler.execute.call(context, index);
        default:
            throw new Error(`El recurso SIGES "${resource}" no está implementado en el router.`);
    }
}
//# sourceMappingURL=index.js.map