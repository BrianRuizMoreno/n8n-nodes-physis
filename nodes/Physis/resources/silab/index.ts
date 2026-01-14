import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

// =====================================================================
// IMPORTACIÓN DE RECURSOS SILAB
// =====================================================================

// 1. Campañas
import * as campania from './campania/description';
import * as campaniaHandler from './campania/handlers';

// 2. Actividades
import * as actividad from './actividad/description';
import * as actividadHandler from './actividad/handlers';

// 3. Campos
import * as campo from './campo/description';
import * as campoHandler from './campo/handlers';

// 4. Lotes
import * as lote from './lote/description';
import * as loteHandler from './lote/handlers';

// 5. Labores
import * as labor from './labor/description';
import * as laborHandler from './labor/handlers';

// 6. Insumos
import * as insumo from './insumo/description';
import * as insumoHandler from './insumo/handlers';

// 7. Implementos
import * as implemento from './implemento/description';
import * as implementoHandler from './implemento/handlers';

// 8. Tractores
import * as tractor from './tractor/description';
import * as tractorHandler from './tractor/handlers';

// 9. Personal
import * as personal from './personal/description';
import * as personalHandler from './personal/handlers';

// 10. Ordenes y Partes 
import * as ordenParte from './ordenParte/description';
import * as ordenParteHandler from './ordenParte/handlers';

// 11. Tambo 
import * as tambo from './tambo/description';
import * as tamboHandler from './tambo/handlers';

// 12. Tipos 
import * as tipos from './tipos/description';
import * as tiposHandler from './tipos/handlers';

//13. Numerador
import * as numerador from './numerador/description';
import * as numeradorHandler from './numerador/handlers';

//14. Dominio
import * as dominio from './dominio/description';
import * as dominioHandler from './dominio/handlers';

//15. Varios
import * as varios from './varios/description';
import * as variosHandler from './varios/handlers';


// =====================================================================
// EXPORTACIÓN DE CAMPOS 
// =====================================================================
export const silabDescriptions: INodeProperties[] = [

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


// =====================================================================
// ROUTER DE EJECUCIÓN 
// =====================================================================
export async function silabRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]> {
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