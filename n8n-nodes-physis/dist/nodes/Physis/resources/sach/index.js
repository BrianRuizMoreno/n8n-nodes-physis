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
exports.sachDescriptions = void 0;
exports.sachRouter = sachRouter;
const categoria = __importStar(require("./categoria/description"));
const categoriaHandler = __importStar(require("./categoria/handlers"));
const cliente = __importStar(require("./cliente/description"));
const clienteHandler = __importStar(require("./cliente/handlers"));
const comisionista = __importStar(require("./comisionista/description"));
const comisionistaHandler = __importStar(require("./comisionista/handlers"));
const compradorRemate = __importStar(require("./compradorRemate/description"));
const compradorRemateHandler = __importStar(require("./compradorRemate/handlers"));
const especie = __importStar(require("./especie/description"));
const especieHandler = __importStar(require("./especie/handlers"));
const establecimiento = __importStar(require("./establecimiento/description"));
const establecimientoHandler = __importStar(require("./establecimiento/handlers"));
const tipoHacienda = __importStar(require("./tipoHacienda/description"));
const tipoHaciendaHandler = __importStar(require("./tipoHacienda/handlers"));
const liquidacion = __importStar(require("./liquidacion/description"));
const liquidacionHandler = __importStar(require("./liquidacion/handlers"));
const lote = __importStar(require("./lote/description"));
const loteHandler = __importStar(require("./lote/handlers"));
const remate = __importStar(require("./remate/description"));
const remateHandler = __importStar(require("./remate/handlers"));
const ajuste = __importStar(require("./ajuste/description"));
const ajusteHandler = __importStar(require("./ajuste/handlers"));
const cartel = __importStar(require("./cartel/description"));
const cartelHandler = __importStar(require("./cartel/handlers"));
const tipoOperacion = __importStar(require("./tipoOperacion/description"));
const tipoOperacionHandler = __importStar(require("./tipoOperacion/handlers"));
const tablaLsp = __importStar(require("./tablaLsp/description"));
const tablaLspHandler = __importStar(require("./tablaLsp/handlers"));
const retencionEspecial = __importStar(require("./retencionEspecial/description"));
const retencionEspecialHandler = __importStar(require("./retencionEspecial/handlers"));
const raza = __importStar(require("./raza/description"));
const razaHandler = __importStar(require("./raza/handlers"));
const plazo = __importStar(require("./plazo/description"));
const plazoHandler = __importStar(require("./plazo/handlers"));
const marca = __importStar(require("./marca/description"));
const marcaHandler = __importStar(require("./marca/handlers"));
const lugar = __importStar(require("./lugar/description"));
const lugarHandler = __importStar(require("./lugar/handlers"));
const gasto = __importStar(require("./gasto/description"));
const gastoHandler = __importStar(require("./gasto/handlers"));
const emision = __importStar(require("./emision/description"));
const emisionHandler = __importStar(require("./emision/handlers"));
const estado = __importStar(require("./estado/description"));
const estadoHandler = __importStar(require("./estado/handlers"));
const informe = __importStar(require("./informe/description"));
const informeHandler = __importStar(require("./informe/handlers"));
const imputacionContable = __importStar(require("./imputacionesContable/description"));
const imputacionContableHandler = __importStar(require("./imputacionesContable/handlers"));
exports.sachDescriptions = [
    ...categoria.categoriaOperations, ...categoria.categoriaFields,
    ...cliente.clienteOperations, ...cliente.clienteFields,
    ...comisionista.comisionistaOperations, ...comisionista.comisionistaFields,
    ...compradorRemate.compradorRemateOperations, ...compradorRemate.compradorRemateFields,
    ...especie.especieOperations, ...especie.especieFields,
    ...establecimiento.establecimientoOperations, ...establecimiento.establecimientoFields,
    ...tipoHacienda.tipoHaciendaOperations, ...tipoHacienda.tipoHaciendaFields,
    ...liquidacion.liquidacionOperations, ...liquidacion.liquidacionFields,
    ...lote.loteSachOperations, ...lote.loteSachFields,
    ...remate.remateOperations, ...remate.remateFields,
    ...ajuste.ajusteOperations, ...ajuste.ajusteFields,
    ...cartel.cartelOperations, ...cartel.cartelFields,
    ...tipoOperacion.tipoOperacionOperations, ...tipoOperacion.tipoOperacionFields,
    ...tablaLsp.tablaLspOperations, ...tablaLsp.tablaLspFields,
    ...retencionEspecial.retencionEspecialOperations, ...retencionEspecial.retencionEspecialFields,
    ...raza.razaOperations, ...raza.razaFields,
    ...plazo.plazoOperations, ...plazo.plazoFields,
    ...marca.marcaOperations, ...marca.marcaFields,
    ...lugar.lugarOperations, ...lugar.lugarFields,
    ...gasto.gastoOperations, ...gasto.gastoFields,
    ...emision.emisionOperations, ...emision.emisionFields,
    ...estado.estadoOperations, ...estado.estadoFields,
    ...informe.informeOperations, ...informe.informeFields,
    ...imputacionContable.imputacionContableOperations, ...imputacionContable.imputacionContableFields,
];
async function sachRouter(context, index, resource) {
    switch (resource) {
        case 'categoria':
            return await categoriaHandler.execute.call(context, index);
        case 'cliente':
            return await clienteHandler.execute.call(context, index);
        case 'comisionista':
            return await comisionistaHandler.execute.call(context, index);
        case 'compradorRemate':
            return await compradorRemateHandler.execute.call(context, index);
        case 'especie':
            return await especieHandler.execute.call(context, index);
        case 'establecimiento':
            return await establecimientoHandler.execute.call(context, index);
        case 'tipohacienda':
            return await tipoHaciendaHandler.execute.call(context, index);
        case 'liquidacion':
            return await liquidacionHandler.execute.call(context, index);
        case 'lote':
            return await loteHandler.execute.call(context, index);
        case 'remate':
            return await remateHandler.execute.call(context, index);
        case 'ajuste':
            return await ajusteHandler.execute.call(context, index);
        case 'cartel':
            return await cartelHandler.execute.call(context, index);
        case 'tipoOperacion':
            return await tipoOperacionHandler.execute.call(context, index);
        case 'tablaLsp':
            return await tablaLspHandler.execute.call(context, index);
        case 'retencionEspecial':
            return await retencionEspecialHandler.execute.call(context, index);
        case 'raza':
            return await razaHandler.execute.call(context, index);
        case 'plazo':
            return await plazoHandler.execute.call(context, index);
        case 'marca':
            return await marcaHandler.execute.call(context, index);
        case 'lugar':
            return await lugarHandler.execute.call(context, index);
        case 'gasto':
            return await gastoHandler.execute.call(context, index);
        case 'emision':
            return await emisionHandler.execute.call(context, index);
        case 'estado':
            return await estadoHandler.execute.call(context, index);
        case 'informe':
            return await informeHandler.execute.call(context, index);
        case 'imputacionContable':
            return await imputacionContableHandler.execute.call(context, index);
        default:
            throw new Error(`El recurso SACH "${resource}" no está implementado en el router.`);
    }
}
//# sourceMappingURL=index.js.map