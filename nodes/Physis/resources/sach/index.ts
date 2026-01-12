import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

// =====================================================================
// IMPORTACIÓN DE RECURSOS SACH
// =====================================================================

// 1. Categoria
import * as categoria from './categoria/description';
import * as categoriaHandler from './categoria/handlers';

// 2. Cliente
import * as cliente from './cliente/description';
import * as clienteHandler from './cliente/handlers';

// 3. Comisionista
import * as comisionista from './comisionista/description';
import * as comisionistaHandler from './comisionista/handlers';

// 4. Comprador Remate 
import * as compradorRemate from './compradorRemate/description';
import * as compradorRemateHandler from './compradorRemate/handlers';

// 5. Especie
import * as especie from './especie/description';
import * as especieHandler from './especie/handlers';

// 6. Establecimiento
import * as establecimiento from './establecimiento/description';
import * as establecimientoHandler from './establecimiento/handlers';

// 7. Tipo Hacienda
import * as tipoHacienda from './tipoHacienda/description';
import * as tipoHaciendaHandler from './tipoHacienda/handlers';

// 8. Liquidacion
import * as liquidacion from './liquidacion/description';
import * as liquidacionHandler from './liquidacion/handlers';

// 9. Lote
import * as lote from './lote/description';
import * as loteHandler from './lote/handlers';

// 10. Remate
import * as remate from './remate/description';
import * as remateHandler from './remate/handlers';

//11. Ajuste
import * as ajuste from './ajuste/description';
import * as ajusteHandler from './ajuste/handlers';

//12. Cartel
import * as cartel from './cartel/description';
import * as cartelHandler from './cartel/handlers';

//13. Tipo Operacion
import * as tipoOperacion from './tipoOperacion/description';
import * as tipoOperacionHandler from './tipoOperacion/handlers';

//14. Tabla Liquidación
import * as tablaLsp from './tablaLsp/description';
import * as tablaLspHandler from './tablaLsp/handlers';

//15. Retencion Especial
import * as retencionEspecial from './retencionEspecial/description';
import * as retencionEspecialHandler from './retencionEspecial/handlers';

//16. Raza
import * as raza from './raza/description';
import * as razaHandler from './raza/handlers';

//17. Plazo
import * as plazo from './plazo/description';
import * as plazoHandler from './plazo/handlers';

//18. Marca
import * as marca from './marca/description';
import * as marcaHandler from './marca/handlers';

//19. Lugar
import * as lugar from './lugar/description';
import * as lugarHandler from './lugar/handlers';

//20. Gasto
import * as gasto from './gasto/description';
import * as gastoHandler from './gasto/handlers';

//21. Emisión
import * as emision from './emision/description';
import * as emisionHandler from './emision/handlers';

//22. Establecimiento Faenador
import * as establecimientoFaenador from './establecimientoFaenador/description';
import * as establecimientoFaenadorHandler from './establecimientoFaenador/handlers';

//23. Establecimiento Agropecuario
import * as establecimientoAgropecuario from './establecimientoAgropecuario/description';
import * as establecimientoAgropecuarioHandler from './establecimientoAgropecuario/handlers';

//24. Estado
import * as estado from './estado/description';
import * as estadoHandler from './estado/handlers';

//25. Informe
import * as informe from './informe/description';
import * as informeHandler from './informe/handlers';

// =====================================================================
// EXPORTACIÓN DE PROPIEDADES 
// =====================================================================
export const sachDescriptions: INodeProperties[] = [

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
    ...establecimientoFaenador.establecimientoFaenadorOperations, ...establecimientoFaenador.establecimientoFaenadorFields,
    ...establecimientoAgropecuario.establecimientoAgropecuarioOperations, ...establecimientoAgropecuario.establecimientoAgropecuarioFields,
    ...estado.estadoOperations, ...estado.estadoFields,
    ...informe.informeOperations, ...informe.informeFields,
];


// =====================================================================
// ROUTER DE EJECUCIÓN SACH
// =====================================================================
export async function sachRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]> {
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
        case 'establecimientoFaenador':
            return await establecimientoFaenadorHandler.execute.call(context, index);
        case 'establecimientoAgropecuario':
            return await establecimientoAgropecuarioHandler.execute.call(context, index);
        case 'estado':
            return await estadoHandler.execute.call(context, index);
        case 'informe':
            return await informeHandler.execute.call(context, index);
        
        default:
            throw new Error(`El recurso SACH "${resource}" no está implementado en el router.`);
    }
}