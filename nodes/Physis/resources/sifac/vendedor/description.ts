import { INodeProperties } from 'n8n-workflow';

export const vendedorOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['vendedor'] } },
        options: [
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Lista jerárquica de vendedores' 
																																																							action: 'Listar Árbol a vendedor',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un vendedor específico' 
																																																				action: 'Obtener por ID a vendedor',},
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo vendedor' 
																																														action: 'Crear a vendedor',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un vendedor existente' 
																																																			action: 'Actualizar a vendedor',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un vendedor' 
																																																	action: 'Eliminar a vendedor',},
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
        description: 'Identificador (CtaReagAuxi) del vendedor',
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
        description: 'Cuerpo para Crear/Actualizar o Filtros (cuentaPadre, imputables) para el árbol',
    },
];