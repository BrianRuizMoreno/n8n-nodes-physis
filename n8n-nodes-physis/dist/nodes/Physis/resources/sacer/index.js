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
exports.sacerDescriptions = void 0;
exports.sacerRouter = sacerRouter;
const campo = __importStar(require("./campo/description"));
const campoHandler = __importStar(require("./campo/handlers"));
const cartaPorte = __importStar(require("./cartaPorte/description"));
const cartaPorteHandler = __importStar(require("./cartaPorte/handlers"));
const cereal = __importStar(require("./cereal/description"));
const cerealHandler = __importStar(require("./cereal/handlers"));
const infraestructura = __importStar(require("./infraestructura/description"));
const infraestructuraHandler = __importStar(require("./infraestructura/handlers"));
const logistica = __importStar(require("./logistica/description"));
const logisticaHandler = __importStar(require("./logistica/handlers"));
const calidad = __importStar(require("./calidad/description"));
const calidadHandler = __importStar(require("./calidad/handlers"));
const campania = __importStar(require("./campania/description"));
const campaniaHandler = __importStar(require("./campania/handlers"));
const contrato = __importStar(require("./contrato/description"));
const contratoHandler = __importStar(require("./contrato/handlers"));
const cuentaCorrienteGranos = __importStar(require("./cuentaCorrienteGranos/description"));
const cuentaCorrienteGranosHandler = __importStar(require("./cuentaCorrienteGranos/handlers"));
const establecimiento = __importStar(require("./establecimiento/description"));
const establecimientoHandler = __importStar(require("./establecimiento/handlers"));
const formaPago = __importStar(require("./formaPago/description"));
const formaPagoHandler = __importStar(require("./formaPago/handlers"));
const fijacion = __importStar(require("./fijacion/description"));
const fijacionHandler = __importStar(require("./fijacion/handlers"));
const formato = __importStar(require("./formato/description"));
const formatoHandler = __importStar(require("./formato/handlers"));
const humedad = __importStar(require("./humedad/description"));
const humedadHandler = __importStar(require("./humedad/handlers"));
const variedad = __importStar(require("./variedad/description"));
const variedadHandler = __importStar(require("./variedad/handlers"));
const tipoFormato = __importStar(require("./tipoFormato/description"));
const tipoFormatoHandler = __importStar(require("./tipoFormato/handlers"));
const tipoContrato = __importStar(require("./tipoContrato/description"));
const tipoContratoHandler = __importStar(require("./tipoContrato/handlers"));
const imputacionIVA = __importStar(require("./imputacionIVA/description"));
const imputacionIVAHandler = __importStar(require("./imputacionIVA/handlers"));
const tarifaFlete = __importStar(require("./tarifaFlete/description"));
const tarifaFleteHandler = __importStar(require("./tarifaFlete/handlers"));
const suelo = __importStar(require("./suelo/description"));
const sueloHandler = __importStar(require("./suelo/handlers"));
const numerador = __importStar(require("./numerador/description"));
const numeradorHandler = __importStar(require("./numerador/handlers"));
const tercero = __importStar(require("./tercero/description"));
const terceroHandler = __importStar(require("./tercero/handlers"));
const imputacionesContable = __importStar(require("./imputacionesContable/description"));
const imputacionesContableHandler = __importStar(require("./imputacionesContable/handlers"));
const varios = __importStar(require("./varios/description"));
const variosHandler = __importStar(require("./varios/handlers"));
exports.sacerDescriptions = [
    ...campo.campoOperations, ...campo.campoFields,
    ...cartaPorte.cartaPorteOperations, ...cartaPorte.cartaPorteFields,
    ...cereal.cerealOperations, ...cereal.cerealFields,
    ...infraestructura.infraestructuraOperations, ...infraestructura.infraestructuraFields,
    ...logistica.logisticaOperations, ...logistica.logisticaFields,
    ...calidad.calidadOperations, ...calidad.calidadFields,
    ...campania.campaniaOperations, ...campania.campaniaFields,
    ...contrato.contratoOperations, ...contrato.contratoFields,
    ...cuentaCorrienteGranos.cuentaCorrienteGranosOperations, ...cuentaCorrienteGranos.cuentaCorrienteGranosFields,
    ...establecimiento.establecimientoOperations, ...establecimiento.establecimientoFields,
    ...formaPago.formaPagoOperations, ...formaPago.formaPagoFields,
    ...fijacion.fijacionOperations, ...fijacion.fijacionFields,
    ...formato.formatoOperations, ...formato.formatoFields,
    ...humedad.humedadOperations, ...humedad.humedadFields,
    ...variedad.variedadOperations, ...variedad.variedadFields,
    ...tipoFormato.tipoFormatoOperations, ...tipoFormato.tipoFormatoFields,
    ...tipoContrato.tipoContratoOperations, ...tipoContrato.tipoContratoFields,
    ...imputacionIVA.imputacionIVAOperations, ...imputacionIVA.imputacionIVAFields,
    ...tarifaFlete.tarifaFleteOperations, ...tarifaFlete.tarifaFleteFields,
    ...suelo.sueloOperations, ...suelo.sueloFields,
    ...numerador.numeradorOperations, ...numerador.numeradorFields,
    ...tercero.terceroOperations, ...tercero.terceroFields,
    ...imputacionesContable.imputacionContableOperations, ...imputacionesContable.imputacionContableFields,
    ...varios.variosOperations, ...varios.variosFields,
];
async function sacerRouter(context, index, resource) {
    switch (resource) {
        case 'campo':
            return await campoHandler.execute.call(context, index);
        case 'cartaPorte':
            return await cartaPorteHandler.execute.call(context, index);
        case 'cereal':
            return await cerealHandler.execute.call(context, index);
        case 'infraestructura':
            return await infraestructuraHandler.execute.call(context, index);
        case 'logistica':
            return await logisticaHandler.execute.call(context, index);
        case 'calidad':
            return await calidadHandler.execute.call(context, index);
        case 'campania':
            return await campaniaHandler.execute.call(context, index);
        case 'contrato':
            return await contratoHandler.execute.call(context, index);
        case 'cuentaCorrienteGranos':
            return await cuentaCorrienteGranosHandler.execute.call(context, index);
        case 'establecimiento':
            return await establecimientoHandler.execute.call(context, index);
        case 'formaPago':
            return await formaPagoHandler.execute.call(context, index);
        case 'fijacion':
            return await fijacionHandler.execute.call(context, index);
        case 'formato':
            return await formatoHandler.execute.call(context, index);
        case 'humedad':
            return await humedadHandler.execute.call(context, index);
        case 'variedad':
            return await variedadHandler.execute.call(context, index);
        case 'tipoFormato':
            return await tipoFormatoHandler.execute.call(context, index);
        case 'tipoContrato':
            return await tipoContratoHandler.execute.call(context, index);
        case 'imputacionIVA':
            return await imputacionIVAHandler.execute.call(context, index);
        case 'tarifaFlete':
            return await tarifaFleteHandler.execute.call(context, index);
        case 'suelo':
            return await sueloHandler.execute.call(context, index);
        case 'numerador':
            return await numeradorHandler.execute.call(context, index);
        case 'tercero':
            return await terceroHandler.execute.call(context, index);
        case 'imputacionesContable':
            return await imputacionesContableHandler.execute.call(context, index);
        case 'varios':
            return await variosHandler.execute.call(context, index);
        default:
            throw new Error(`El recurso SACER "${resource}" no está implementado en el router.`);
    }
}
//# sourceMappingURL=index.js.map