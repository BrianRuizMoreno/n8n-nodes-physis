import { INodeProperties } from 'n8n-workflow';

export const listaPrecioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['listaPrecio'] } },
        options: [
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura jerárquica.' },
            { name: 'Listar Planas', value: 'getAll', description: 'GET Listas de precios planas.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Una lista específica.' },
            { name: 'Crear', value: 'create', description: 'POST Nueva lista de precios.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modificar lista existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Eliminar lista.' },
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
        description: 'Cuerpo para POST/PUT o filtros para GET (cuentaPadre, imputables).',
    },
];