import { INodeProperties } from 'n8n-workflow';

export const categoriaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['categoria'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista categorías (filtro opcional por Especie)', action: 'Listar todas a categoria',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene una categoría específica', action: 'Obtener por ID a categoria',},
            { name: 'Ver Árbol', value: 'getArbol', description: 'GET Lista jerárquica Especie -> Categoría', action: 'Ver rbol a categoria',},
            { name: 'Ver Mercado', value: 'getMercado', description: 'GET Lista categorías para Mercado Ganadero', action: 'Ver mercado a categoria',},
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva categoría', action: 'Crear a categoria',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una categoría existente', action: 'Actualizar a categoria',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una categoría', action: 'Eliminar a categoria',},
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
        description: 'Identificador de la categoría',
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
        description: 'Cuerpo con los datos de la categoría (descripción, sigla, cría, etc.)',
    },
];