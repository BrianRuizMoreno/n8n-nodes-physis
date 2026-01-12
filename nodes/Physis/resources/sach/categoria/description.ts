import { INodeProperties } from 'n8n-workflow';

export const categoriaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['categoria'] } },
        options: [
            { name: 'Listar Todas', value: 'getAll', description: 'GET Lista categorías (filtro opcional por Especie).' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene una categoría específica.' },
            { name: 'Ver Árbol', value: 'getArbol', description: 'GET Lista jerárquica Especie -> Categoría.' },
            { name: 'Ver Mercado', value: 'getMercado', description: 'GET Lista categorías para Mercado Ganadero.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva categoría.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una categoría existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una categoría.' },
        ],
        default: 'getAll',
    },
];

export const categoriaFields: INodeProperties[] = [
    {
        displayName: 'ID Categoría',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['categoria'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador de la categoría.',
    },
    {
        displayName: 'ID Especie',
        name: 'idEspecie',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['categoria'], 
                operation: ['getAll', 'get', 'delete'] 
            } 
        },
        description: 'Filtro opcional. ID de la especie a la que pertenece la categoría.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['categoria'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo con los datos de la categoría (descripción, sigla, cría, etc.).',
    },
];