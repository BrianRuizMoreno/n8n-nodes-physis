import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

// =====================================================================
// IMPORTACIÓN DE RECURSOS SAVEC
// =====================================================================

// 1. Contrato
import * as contrato from './contrato/description';
import * as contratoHandler from './contrato/handlers';

// 2. CRM
import * as crm from './crm/description';
import * as crmHandler from './crm/handlers';

// 3. Tarifas
import * as tarifas from './tarifas/description';
import * as tarifasHandler from './tarifas/handlers';

// 4. Ventas Campo
import * as ventaCampo from './ventaCampo/description';
import * as ventaCampoHandler from './ventaCampo/handlers';

//5. Concepto
import * as concepto from './concepto/description';
import * as conceptoHandler from './concepto/handlers';

//6. Motivo Retiro
import * as motivoRetiro from './motivoRetiro/description';
import * as motivoRetiroHandler from './motivoRetiro/handlers';

//7. Tipo Contrato
import * as tipoContrato from './tipoContrato/description';
import * as tipoContratoHandler from './tipoContrato/handlers';

//8. Auxiliares
import * as auxiliares from './auxiliar/description';
import * as auxiliaresHandler from './auxiliar/handlers';

//9. Tipos Formularios
import * as tiposFormulario from './tiposFormulario/description';
import * as tiposFormularioHandler from './tiposFormulario/handlers';



// =====================================================================
// EXPORTACIÓN DE PROPIEDADES 
// =====================================================================
export const savecDescriptions: INodeProperties[] = [

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


// =====================================================================
// ROUTER DE EJECUCIÓN SAVEC
// =====================================================================
export async function savecRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]> {
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