import { INodeProperties, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

// =====================================================================
// IMPORTACIÓN DE RECURSOS SIFAC
// =====================================================================

// 1. Comprobante (Factura)
import * as comprobante from './comprobante/description';
import * as comprobanteHandler from './comprobante/handlers';

// 2. Condición de Pago
import * as condicionPago from './condicionPago/description';
import * as condicionPagoHandler from './condicionPago/handlers';

// 3. Depósito
import * as deposito from './deposito/description';
import * as depositoHandler from './deposito/handlers';

// 4. Lista de Precios
import * as listaPrecio from './listaPrecio/description';
import * as listaPrecioHandler from './listaPrecio/handlers';

// 5. Orden de Compra
import * as ordenCompra from './ordenCompra/description';
import * as ordenCompraHandler from './ordenCompra/handlers';

// 6. Pedido
import * as pedido from './pedido/description';
import * as pedidoHandler from './pedido/handlers';

// 7. Producto
import * as producto from './producto/description';
import * as productoHandler from './producto/handlers';

// 8. Remito de Compra
import * as remitoCompra from './remitoCompra/description';
import * as remitoCompraHandler from './remitoCompra/handlers';

// 9. Transporte
import * as transporte from './transporte/description';
import * as transporteHandler from './transporte/handlers';

// 10. Vendedor
import * as vendedor from './vendedor/description';
import * as vendedorHandler from './vendedor/handlers';

// 11. Zona
import * as zona from './zona/description';
import * as zonaHandler from './zona/handlers';

//12. Unidad
import * as unidad from './unidad/description';
import * as unidadHandler from './unidad/handlers';

//13. Tipo Tasa
import * as tipoTasa from './tipoTasa/description';
import * as tipoTasaHandler from './tipoTasa/handlers';

//14. Reagrupacion Auxiliar
import * as reagrupacionAuxiliar from './reagrupacionAuxiliar/description';
import * as reagrupacionAuxiliarHandler from './reagrupacionAuxiliar/handlers';

//15. Proveedor Info
import * as proveedorInfo from './proveedorInfo/description';
import * as proveedorInfoHandler from './proveedorInfo/handlers';

//16. Producto Stock
import * as productoStock from './productoStock/description';
import * as productoStockHandler from './productoStock/handlers';

//17. Precio
import * as precio from './precio/description';
import * as precioHandler from './precio/handlers';

//18. Partida
import * as partida from './partida/description';
import * as partidaHandler from './partida/handlers';

//19. Orden Compra Interfaz
import * as ordenCompraInterfaz from './ordenCompraInterfaz/description';
import * as ordenCompraInterfazHandler from './ordenCompraInterfaz/handlers';

//20. Origen Destino
import * as origenDestino from './origenDestino/description';
import * as origenDestinoHandler from './origenDestino/handlers';

//21. Medio Transporte
import * as medioTransporte from './medioTransporte/description';
import * as medioTransporteHandler from './medioTransporte/handlers';

//22. Condicion Comercial
import * as condicionComercial from './condicionComercial/description';
import * as condicionComercialHandler from './condicionComercial/handlers';

//23. Control Adicional
import * as controlAdicional from './controlAdicional/description';
import * as controlAdicionalHandler from './controlAdicional/handlers';

//24. Maestro General
import * as maestroGeneral from './maestroGeneral/description';
import * as maestroGeneralHandler from './maestroGeneral/handlers';

//25. Cliente Info
import * as clienteInfo from './clienteInfo/description';
import * as clienteInfoHandler from './clienteInfo/handlers';

//26. Auxiliar Sifac
import * as auxiliarSifac from './auxiliarSifac/description';
import * as auxiliarSifacHandler from './auxiliarSifac/handlers';

// =====================================================================
// EXPORTACIÓN DE PROPIEDADES (Para el Nodo Principal)
// =====================================================================
export const sifacDescriptions: INodeProperties[] = [

    ...comprobante.comprobanteSifacOperations, ...comprobante.comprobanteSifacFields,
    ...condicionPago.condicionPagoOperations, ...condicionPago.condicionPagoFields,
    ...deposito.depositoOperations, ...deposito.depositoFields,
    ...listaPrecio.listaPrecioOperations, ...listaPrecio.listaPrecioFields,
    ...ordenCompra.ordenCompraOperations, ...ordenCompra.ordenCompraFields,
    ...pedido.pedidoOperations, ...pedido.pedidoFields,
    ...producto.productoOperations, ...producto.productoFields,
    ...remitoCompra.remitoCompraOperations, ...remitoCompra.remitoCompraFields,
    ...transporte.transporteOperations, ...transporte.transporteFields,
    ...vendedor.vendedorOperations, ...vendedor.vendedorFields,
    ...zona.zonaOperations, ...zona.zonaFields,
    ...unidad.unidadOperations, ...unidad.unidadFields,
    ...tipoTasa.tipoTasaOperations, ...tipoTasa.tipoTasaFields,
    ...reagrupacionAuxiliar.reagrupacionAuxiliarOperations, ...reagrupacionAuxiliar.reagrupacionAuxiliarFields,
    ...proveedorInfo.proveedorInfoOperations, ...proveedorInfo.proveedorInfoFields,
    ...productoStock.productoStockOperations, ...productoStock.productoStockFields,
    ...precio.precioOperations, ...precio.precioFields,
    ...partida.partidaOperations, ...partida.partidaFields,
    ...ordenCompraInterfaz.ordenCompraInterfazOperations, ...ordenCompraInterfaz.ordenCompraInterfazFields,
    ...origenDestino.origenDestinoOperations, ...origenDestino.origenDestinoFields,
    ...medioTransporte.medioTransporteOperations, ...medioTransporte.medioTransporteFields,
    ...condicionComercial.condicionComercialOperations, ...condicionComercial.condicionComercialFields,
    ...controlAdicional.controlAdicionalOperations, ...controlAdicional.controlAdicionalFields,
    ...maestroGeneral.maestroGeneralOperations, ...maestroGeneral.maestroGeneralFields,
    ...clienteInfo.clienteInfoOperations, ...clienteInfo.clienteInfoFields,
    ...auxiliarSifac.auxiliarSifacOperations, ...auxiliarSifac.auxiliarSifacOperations,
];


// =====================================================================
// ROUTER DE EJECUCIÓN SIFAC
// =====================================================================
export async function sifacRouter(context: IExecuteFunctions, index: number, resource: string): Promise<INodeExecutionData[]> {
    switch (resource) {
        case 'comprobante':
            return await comprobanteHandler.execute.call(context, index);
        case 'condicionPago':
            return await condicionPagoHandler.execute.call(context, index);
        case 'deposito':
            return await depositoHandler.execute.call(context, index);
        case 'listaPrecio':
            return await listaPrecioHandler.execute.call(context, index);
        case 'ordenCompra':
            return await ordenCompraHandler.execute.call(context, index);
        case 'pedido':
            return await pedidoHandler.execute.call(context, index);
        case 'producto':
            return await productoHandler.execute.call(context, index);
        case 'remitoCompra':
            return await remitoCompraHandler.execute.call(context, index);
        case 'transporte':
            return await transporteHandler.execute.call(context, index);
        case 'vendedor':
            return await vendedorHandler.execute.call(context, index);
        case 'zona':
            return await zonaHandler.execute.call(context, index);
        case 'unidad':
            return await unidadHandler.execute.call(context, index);
        case 'tipoTasa':
            return await tipoTasaHandler.execute.call(context, index);
        case 'reagrupacionAuxiliar':
            return await reagrupacionAuxiliarHandler.execute.call(context, index);
        case 'proveedorInfo':
            return await proveedorInfoHandler.execute.call(context, index);
        case 'productoStock':
            return await productoStockHandler.execute.call(context, index);
        case 'precio':
            return await precioHandler.execute.call(context, index);
        case 'partida':
            return await partidaHandler.execute.call(context, index);
        case 'ordenCompraInterfaz':
            return await ordenCompraInterfazHandler.execute.call(context, index);
        case 'origenDestino':
            return await origenDestinoHandler.execute.call(context, index);
        case 'medioTransporte':
            return await medioTransporteHandler.execute.call(context, index);
        case 'condicionComercial':
            return await condicionComercialHandler.execute.call(context, index);
        case 'controlAdicional':
            return await controlAdicionalHandler.execute.call(context, index);
        case 'maestroGeneral':
            return await maestroGeneralHandler.execute.call(context, index);
        case 'clienteInfo':
            return await clienteInfoHandler.execute.call(context, index);
        case 'auxiliarSifac':
            return await auxiliarSifacHandler.execute.call(context, index);
        
        default:
            throw new Error(`El recurso SIFAC "${resource}" no está implementado en el router.`);
    }
}