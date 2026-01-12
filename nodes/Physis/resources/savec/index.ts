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

// 3. Definiciones
import * as definicion from './definicion/description';
import * as definicionHandler from './definicion/handlers';

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

// =====================================================================
// EXPORTACIÓN DE PROPIEDADES 
// =====================================================================
export const savecDescriptions: INodeProperties[] = [

    ...contrato.contratoOperations, ...contrato.contratoFields,
    ...crm.crmOperations, ...crm.crmFields,
    ...definicion.definicionOperations, ...definicion.definicionFields,
    ...ventaCampo.ventaCampoOperations, ...ventaCampo.ventaCampoFields,
    ...concepto.conceptoOperations, ...concepto.conceptoFields,
    ...motivoRetiro.motivoRetiroOperations, ...motivoRetiro.motivoRetiroFields,
    ...tipoContrato.tipoContratoOperations, ...tipoContrato.tipoContratoFields,
    ...auxiliares.auxiliarOperations, ...auxiliares.auxiliarFields,
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
        case 'definicion':
            return await definicionHandler.execute.call(context, index);
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
        
        default:
            throw new Error(`El recurso SAVEC "${resource}" no está implementado en el router.`);
    }
}