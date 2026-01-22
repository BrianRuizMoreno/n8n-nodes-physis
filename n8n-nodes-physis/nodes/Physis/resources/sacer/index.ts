import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

// =====================================================================
// IMPORTACIÓN DE RECURSOS SACER
// =====================================================================

// 1. Campo
import * as campo from './campo/description';
import * as campoHandler from './campo/handlers';

// 2. Carta de Porte
import * as cartaPorte from './cartaPorte/description';
import * as cartaPorteHandler from './cartaPorte/handlers';

// 3. Cereal
import * as cereal from './cereal/description';
import * as cerealHandler from './cereal/handlers';

// 4. Infraestructura
import * as infraestructura from './infraestructura/description';
import * as infraestructuraHandler from './infraestructura/handlers';

// 5. Logística
import * as logistica from './logistica/description';
import * as logisticaHandler from './logistica/handlers';

// 6. Calidad
import * as calidad from './calidad/description';
import * as calidadHandler from './calidad/handlers';

// 7. Campaña
import * as campania from './campania/description';
import * as campaniaHandler from './campania/handlers';

// 8. Contrato
import * as contrato from './contrato/description';
import * as contratoHandler from './contrato/handlers';

//9. Cuenta Corriente Granos
import * as cuentaCorrienteGranos from './cuentaCorrienteGranos/description';
import * as cuentaCorrienteGranosHandler from './cuentaCorrienteGranos/handlers';

//10. Establecimiento
import * as establecimiento from './establecimiento/description';
import * as establecimientoHandler from './establecimiento/handlers';

//11. Formas de Pago
import * as formaPago from './formaPago/description';
import * as formaPagoHandler from './formaPago/handlers';

//12. Fijación de Precios
import * as fijacion from './fijacion/description';
import * as fijacionHandler from './fijacion/handlers';

//13. Formato
import * as formato from './formato/description';
import * as formatoHandler from './formato/handlers';

//14. Humedad
import * as humedad from './humedad/description';
import * as humedadHandler from './humedad/handlers';

//15. Variedad
import * as variedad from './variedad/description';
import * as variedadHandler from './variedad/handlers';

//16. Tipo Formato
import * as tipoFormato from './tipoFormato/description';   
import * as tipoFormatoHandler from './tipoFormato/handlers';

//17. Tipo Contrato
import * as tipoContrato from './tipoContrato/description';   
import * as tipoContratoHandler from './tipoContrato/handlers';

//18. Imputación IVA
import * as imputacionIVA from './imputacionIVA/description';   
import * as imputacionIVAHandler from './imputacionIVA/handlers';

//19. Tarifa Flete
import * as tarifaFlete from './tarifaFlete/description';   
import * as tarifaFleteHandler from './tarifaFlete/handlers';

//20. Suelo
import * as suelo from './suelo/description';
import * as sueloHandler from './suelo/handlers';

//21. Numerador
import * as numerador from './numerador/description';
import * as numeradorHandler from './numerador/handlers';

//22. Tercero
import * as tercero from './tercero/description';
import * as terceroHandler from './tercero/handlers';

//23. Imputaciones Contable
import * as imputacionesContable from './imputacionesContable/description';
import * as imputacionesContableHandler from './imputacionesContable/handlers';

//24. Varios
import * as varios from './varios/description';
import * as variosHandler from './varios/handlers';

// =====================================================================
// EXPORTACIÓN DE PROPIEDADES 
// =====================================================================
export const sacerDescriptions: INodeProperties[] = [

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


// =====================================================================
// ROUTER DE EJECUCIÓN SACER
// =====================================================================
export async function sacerRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]> {
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