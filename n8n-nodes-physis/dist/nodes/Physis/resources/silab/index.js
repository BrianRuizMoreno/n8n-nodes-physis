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
exports.silabDescriptions = void 0;
exports.silabRouter = silabRouter;
const campania = __importStar(require("./campania/description"));
const campaniaHandler = __importStar(require("./campania/handlers"));
const actividad = __importStar(require("./actividad/description"));
const actividadHandler = __importStar(require("./actividad/handlers"));
const campo = __importStar(require("./campo/description"));
const campoHandler = __importStar(require("./campo/handlers"));
const lote = __importStar(require("./lote/description"));
const loteHandler = __importStar(require("./lote/handlers"));
const labor = __importStar(require("./labor/description"));
const laborHandler = __importStar(require("./labor/handlers"));
const insumo = __importStar(require("./insumo/description"));
const insumoHandler = __importStar(require("./insumo/handlers"));
const implemento = __importStar(require("./implemento/description"));
const implementoHandler = __importStar(require("./implemento/handlers"));
const tractor = __importStar(require("./tractor/description"));
const tractorHandler = __importStar(require("./tractor/handlers"));
const personal = __importStar(require("./personal/description"));
const personalHandler = __importStar(require("./personal/handlers"));
const ordenParte = __importStar(require("./ordenParte/description"));
const ordenParteHandler = __importStar(require("./ordenParte/handlers"));
const tambo = __importStar(require("./tambo/description"));
const tamboHandler = __importStar(require("./tambo/handlers"));
const tipos = __importStar(require("./tipos/description"));
const tiposHandler = __importStar(require("./tipos/handlers"));
const numerador = __importStar(require("./numerador/description"));
const numeradorHandler = __importStar(require("./numerador/handlers"));
const dominio = __importStar(require("./dominio/description"));
const dominioHandler = __importStar(require("./dominio/handlers"));
const varios = __importStar(require("./varios/description"));
const variosHandler = __importStar(require("./varios/handlers"));
exports.silabDescriptions = [
    ...campania.campaniaOperations, ...campania.campaniaFields,
    ...actividad.actividadOperations, ...actividad.actividadFields,
    ...campo.campoOperations, ...campo.campoFields,
    ...lote.loteOperations, ...lote.loteFields,
    ...labor.laborOperations, ...labor.laborFields,
    ...insumo.insumoOperations, ...insumo.insumoFields,
    ...implemento.implementoOperations, ...implemento.implementoFields,
    ...tractor.tractorOperations, ...tractor.tractorFields,
    ...personal.personalOperations, ...personal.personalFields,
    ...ordenParte.ordenParteOperations, ...ordenParte.ordenParteFields,
    ...tambo.tamboOperations, ...tambo.tamboFields,
    ...tipos.tiposOperations, ...tipos.tiposFields,
    ...numerador.numeradorOperations, ...numerador.numeradorFields,
    ...dominio.dominioOperations, ...dominio.dominioFields,
    ...varios.variosOperations, ...varios.variosFields,
];
async function silabRouter(context, index, resource) {
    switch (resource) {
        case 'campania':
            return await campaniaHandler.execute.call(context, index);
        case 'actividad':
            return await actividadHandler.execute.call(context, index);
        case 'campo':
            return await campoHandler.execute.call(context, index);
        case 'lote':
            return await loteHandler.execute.call(context, index);
        case 'labor':
            return await laborHandler.execute.call(context, index);
        case 'insumo':
            return await insumoHandler.execute.call(context, index);
        case 'implemento':
            return await implementoHandler.execute.call(context, index);
        case 'tractor':
            return await tractorHandler.execute.call(context, index);
        case 'personal':
            return await personalHandler.execute.call(context, index);
        case 'ordenParte':
            return await ordenParteHandler.execute.call(context, index);
        case 'tambo':
            return await tamboHandler.execute.call(context, index);
        case 'tipos':
            return await tiposHandler.execute.call(context, index);
        case 'numerador':
            return await numeradorHandler.execute.call(context, index);
        case 'dominio':
            return await dominioHandler.execute.call(context, index);
        case 'varios':
            return await variosHandler.execute.call(context, index);
        default:
            throw new Error(`El recurso SILAB "${resource}" no está implementado en el router.`);
    }
}
//# sourceMappingURL=index.js.map