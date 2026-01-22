import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

// =====================================================================
// IMPORTACIÓN DE RECURSOS SIGES
// =====================================================================

// 1. Banco
import * as banco from './banco/description';
import * as bancoHandler from './banco/handlers';

// 2. Chequera
import * as chequera from './chequera/description';
import * as chequeraHandler from './chequera/handlers';

// 3. Comprobante
import * as comprobante from './comprobante/description';
import * as comprobanteHandler from './comprobante/handlers';

// 4. Crédito
import * as credito from './credito/description';
import * as creditoHandler from './credito/handlers';

// 5. Cuenta Auxiliar
import * as cuentaAuxiliar from './cuentaAuxiliar/description';
import * as cuentaAuxiliarHandler from './cuentaAuxiliar/handlers';

// 6. Cuenta Corriente
import * as cuentaCorriente from './cuentaCorriente/description';
import * as cuentaCorrienteHandler from './cuentaCorriente/handlers';

// 7. Cuenta Principal
import * as cuentaPrincipal from './cuentaPrincipal/description';
import * as cuentaPrincipalHandler from './cuentaPrincipal/handlers';

// 8. Dominio
import * as dominio from './dominio/description';
import * as dominioHandler from './dominio/handlers';

// 9. Ejercicio
import * as ejercicio from './ejercicio/description';
import * as ejercicioHandler from './ejercicio/handlers';

// 10. Imagen
import * as imagen from './imagen/description';
import * as imagenHandler from './imagen/handlers';

// 11. Informe
import * as informe from './informe/description';
import * as informeHandler from './informe/handlers';

// 12. Mayor
import * as mayor from './mayor/description';
import * as mayorHandler from './mayor/handlers';

// 13. Moneda
import * as moneda from './moneda/description';
import * as monedaHandler from './moneda/handlers';

// 14. Tercero
import * as tercero from './tercero/description';
import * as terceroHandler from './tercero/handlers';

// 15. Regimenes
import * as regimenes from './regimenes/description';
import * as regimenesHandler from './regimenes/handlers';

// 16. Tipo Documento
import * as tipoDocumento from './tipoDocumento/description';
import * as tipoDocumentoHandler from './tipoDocumento/handlers';

// 17. Usuario
import * as usuario from './usuario/description';
import * as usuarioHandler from './usuario/handlers';

// 18. Zona
import * as zona from './zona/description';
import * as zonaHandler from './zona/handlers';

// 19. Plan de Cuentas
import * as planCuenta from './planCuenta/description';
import * as planCuentaHandler from './planCuenta/handlers';

// 20. Plan de Cuentas Auxiliar
import * as planCuentaAuxiliar from './planCuentaAuxiliar/description';
import * as planCuentaAuxiliarHandler from './planCuentaAuxiliar/handlers';

// 21. Plan de Reagrupación Auxiliar
import * as planReagrupacionAuxiliar from './reagrupacionAuxiliar/description';
import * as planReagrupacionAuxiliarHandler from './reagrupacionAuxiliar/handlers';

// 22. Plan de Reagrupación Principal
import * as planReagrupacionPrincipal from './reagrupacionPrincipal/description';
import * as planReagrupacionPrincipalHandler from './reagrupacionPrincipal/handlers';

// 23. Reagrupación de Relación Auxiliar
import * as reagrupacionRelacionAuxiliar from './reagrupacionCuentaAuxiliar/description';
import * as reagrupacionRelacionAuxiliarHandler from './reagrupacionCuentaAuxiliar/handlers';

// 24. Reagrupación de Relación Principal
import * as reagrupacionRelacionPrincipal from './reagrupacionCuentaPpal/description';
import * as reagrupacionRelacionPrincipalHandler from './reagrupacionCuentaPpal/handlers';

// 25. PP Comprobantes
import * as PP_comprobantes from './PP_comprobantes/description';
import * as PP_comprobantesHandler from './PP_comprobantes/handlers';

// 26. PP Compradores Autorizantes
import * as PP_compradoresAutorizantes from './PP_compradoresAutorizantes/description';
import * as PP_compradoresAutorizantesHandler from './PP_compradoresAutorizantes/handlers';

// 27. Autorización
import * as autorizacion from './autorizacion/description';
import * as autorizacionHandler from './autorizacion/handlers';

// 28. Campaña
import * as campania from './campania/description';
import * as campaniaHandler from './campania/handlers';

// 29. Empresa
import * as empresa from './empresa/description';
import * as empresaHandler from './empresa/handlers';

// 30. Factura Proveedor
import * as facturaProveedor from './facturaProveedor/description';
import * as facturaProveedorHandler from './facturaProveedor/handlers';

// 31. Indicador
import * as indicador from './indicador/description';
import * as indicadorHandler from './indicador/handlers';

// 32. Libro
import * as libro from './libro/description';
import * as libroHandler from './libro/handlers';

// 33. Pesaje
import * as pesaje from './pesajes/description';
import * as pesajeHandler from './pesajes/handlers';

// 34. Afectación
import * as afectacion from './afectacion/description';
import * as afectacionHandler from './afectacion/handlers';

// 35. Reporte Definible
import * as reporteDefinible from './reporteDefinible/description';
import * as reporteDefinibleHandler from './reporteDefinible/handlers';

// 36. Reporte Compartido
import * as reporteCompartido from './reporteCompartido/description';
import * as reporteCompartidoHandler from './reporteCompartido/handlers';

// 37. Saldo
import * as saldo from './saldo/description';
import * as saldoHandler from './saldo/handlers';

// 38. Cuentas de Reagrupación Auxiliar
import * as cuentasReagrupacionAuxi from './cuentasReagrupacionAuxi/description';
import * as cuentasReagrupacionAuxiHandler from './cuentasReagrupacionAuxi/handlers';

// 39. Cuentas de Reagrupación Principal
import * as cuentasReagrupacionPpal from './cuentasReagrupacionPpal/description';
import * as cuentasReagrupacionPpalHandler from './cuentasReagrupacionPpal/handlers';

// 40. Numeración
import * as numeracion from './numeracion/description';
import * as numeracionHandler from './numeracion/handlers';

// 41. BI
import * as BI from './BI/description';
import * as BIHandler from './BI/handlers';

// 42. Billeteras
import * as billeteras from './billeteras/description';
import * as billeterasHandler from './billeteras/handlers';

// 43. Combos
import * as combos from './combos/description';
import * as combosHandler from './combos/handlers';

// 44. Comprobantes Pendientes
import * as comprobantePendiente from './comprobantesPendientes/description';   
import * as comprobantePendienteHandler from './comprobantesPendientes/handlers';

// 45. Tipos de Comprobantes AFIP
import * as tiposComprobantesAfip from './tiposComprobantesAFIP/description';
import * as tiposComprobantesAfipHandler from './tiposComprobantesAFIP/handlers';

// 46. Control Diario
import * as controlDiario from './controlDiario/description';
import * as controlDiarioHandler from './controlDiario/handlers';

// 47. Firmas
import * as firmas from './firmas/description';
import * as firmasHandler from './firmas/handlers';

// 48. Tipos de Comprobantes
import * as tiposComprobantes from './tiposComprobantes/description';
import * as tiposComprobantesHandler from './tiposComprobantes/handlers';

// 49. Valores
import * as valores from './valores/description';
import * as valoresHandler from './valores/handlers';

// 50. Cuentas Temporales
import * as cuentasTemp from './cuentasTemporales/description';
import * as cuentasTempHandler from './cuentasTemporales/handlers';

// 51. Conceptos IVA
import * as conceptosIVA from './conceptosIVA/description';
import * as conceptosIVAHandler from './conceptosIVA/handlers';

// 52. Vencimientos
import * as vencimientos from './vencimientos/description';
import * as vencimientosHandler from './vencimientos/handlers';

// 53. QR
import * as qr from './qr/description';
import * as qrHandler from './qr/handlers';

// 54. Textos
import * as textos from './textos/description';
import * as textosHandler from './textos/handlers';

// 55. Interdepósitos
import * as interdepositos from './interdepositos/description';
import * as interdepositosHandler from './interdepositos/handlers';

// 56. Historia
import * as historia from './historia/description';
import * as historiaHandler from './historia/handlers';

// 57. Modelos
import * as modelos from './modelos/description';
import * as modelosHandler from './modelos/handlers';

// 58. Sistemas
import * as sistemas from './sistemas/description';
import * as sistemasHandler from './sistemas/handlers';

// 59. Retenciones
import * as retenciones from './retenciones/description';
import * as retencionesHandler from './retenciones/handlers';

// 60. Utilidades
import * as utilidades from './utilidades/description';
import * as utilidadesHandler from './utilidades/handlers';

// =====================================================================
// EXPORTACIÓN DE PROPIEDADES 
// =====================================================================
export const sigesDescriptions: INodeProperties[] = [

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


// =====================================================================
// ROUTER DE EJECUCIÓN 
// =====================================================================
export async function sigesRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]> {
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