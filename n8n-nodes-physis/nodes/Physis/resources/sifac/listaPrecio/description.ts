import { INodeProperties } from 'n8n-workflow';

export const listaPrecioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['listaPrecio'] } },
        options: [
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura jerárquica', action: 'Listar rbol a lista precio',},
            { name: 'Get Many', value: 'getAll', description: 'GET Listas de precios planas', action: 'Listar planas a lista precio',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Una lista específica', action: 'Obtener por ID a lista precio',},
            { name: 'Crear', value: 'create', description: 'POST Nueva lista de precios', action: 'Crear a lista precio',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modificar lista existente', action: 'Actualizar a lista precio',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Eliminar lista', action: 'Eliminar a lista precio',},
        ],
        default: 'getArbol',
    },
];

export const listaPrecioFields: INodeProperties[] = [
    {
        displayName: 'ID Lista (CtaReagAuxi)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sifac'], resource: ['listaPrecio'], operation: ['get', 'delete'] } },
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['listaPrecio'] } },
        description: 'Cuerpo para POST/PUT o filtros para GET (cuentaPadre, imputables)',
    },
];