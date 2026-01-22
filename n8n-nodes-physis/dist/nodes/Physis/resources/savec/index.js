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
exports.savecDescriptions = void 0;
exports.savecRouter = savecRouter;
const contrato = __importStar(require("./contrato/description"));
const contratoHandler = __importStar(require("./contrato/handlers"));
const crm = __importStar(require("./crm/description"));
const crmHandler = __importStar(require("./crm/handlers"));
const tarifas = __importStar(require("./tarifas/description"));
const tarifasHandler = __importStar(require("./tarifas/handlers"));
const ventaCampo = __importStar(require("./ventaCampo/description"));
const ventaCampoHandler = __importStar(require("./ventaCampo/handlers"));
const concepto = __importStar(require("./concepto/description"));
const conceptoHandler = __importStar(require("./concepto/handlers"));
const motivoRetiro = __importStar(require("./motivoRetiro/description"));
const motivoRetiroHandler = __importStar(require("./motivoRetiro/handlers"));
const tipoContrato = __importStar(require("./tipoContrato/description"));
const tipoContratoHandler = __importStar(require("./tipoContrato/handlers"));
const auxiliares = __importStar(require("./auxiliar/description"));
const auxiliaresHandler = __importStar(require("./auxiliar/handlers"));
const tiposFormulario = __importStar(require("./tiposFormulario/description"));
const tiposFormularioHandler = __importStar(require("./tiposFormulario/handlers"));
exports.savecDescriptions = [
    ...contrato.contratoOperations, ...contrato.contratoFields,
    ...crm.crmOperations, ...crm.crmFields,
    ...tarifas.tarifasOperations, ...tarifas.tarifasFields,
    ...ventaCampo.ventaCampoOperations, ...ventaCampo.ventaCampoFields,
    ...concepto.conceptoOperations, ...concepto.conceptoFields,
    ...motivoRetiro.motivoRetiroOperations, ...motivoRetiro.motivoRetiroFields,
    ...tipoContrato.tipoContratoOperations, ...tipoContrato.tipoContratoFields,
    ...auxiliares.auxiliarOperations, ...auxiliares.auxiliarFields,
    ...tiposFormulario.tiposFormularioOperations, ...tiposFormulario.tiposFormularioFields,
];
async function savecRouter(context, index, resource) {
    switch (resource) {
        case 'contrato':
            return await contratoHandler.execute.call(context, index);
        case 'crm':
            return await crmHandler.execute.call(context, index);
        case 'tarifas':
            return await tarifasHandler.execute.call(context, index);
        case 'ventaCampo':
            return await ventaCampoHandler.execute.call(context, index);
        case 'concepto':
            return await conceptoHandler.execute.call(context, index);
        case 'motivoRetiro':
            return await motivoRetiroHandler.execute.call(context, index);
        case 'tipoContrato':
            return await tipoContratoHandler.execute.call(context, index);
        case 'auxiliar':
            return await auxiliaresHandler.execute.call(context, index);
        case 'tiposFormulario':
            return await tiposFormularioHandler.execute.call(context, index);
        default:
            throw new Error(`El recurso SAVEC "${resource}" no está implementado en el router.`);
    }
}
//# sourceMappingURL=index.js.map