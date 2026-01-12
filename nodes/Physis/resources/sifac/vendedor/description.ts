import { INodeProperties } from 'n8n-workflow';

export const vendedorOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['vendedor'] } },
        options: [
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Lista jerárquica de vendedores.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un vendedor específico.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo vendedor.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un vendedor existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un vendedor.' },
        ],
        default: 'getArbol',
    },
];

export const vendedorFields: INodeProperties[] = [
    {
        displayName: 'ID Vendedor',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['vendedor'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador (CtaReagAuxi) del vendedor.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['vendedor']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros (cuentaPadre, imputables) para el árbol.',
    },
];