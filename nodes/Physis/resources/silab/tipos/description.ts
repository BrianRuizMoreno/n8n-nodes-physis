import { INodeProperties } from 'n8n-workflow';

export const tiposOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['tipos'] } },
        options: [

			{ 
                name: 'Tipos Orden: Listar Todos', 
                value: 'getAllTipos', 
                description: 'GET Listado de tipos de órdenes de trabajo.' 
            },
            { 
                name: 'Tipos Orden: Obtener por Sigla', 
                value: 'getTipo', 
                description: 'GET Detalle de un tipo de orden específico.' 
            },
            { 
                name: 'Tipos Orden: Crear', 
                value: 'createTipo', 
                description: 'POST Alta de nuevo tipo de orden. Requiere JSON Body.' 
            },
            { 
                name: 'Tipos Orden: Modificar', 
                value: 'updateTipo', 
                description: 'PUT Modificación de tipo de orden. Requiere JSON Body.' 
            },
            { 
                name: 'Tipos Orden: Eliminar', 
                value: 'deleteTipo', 
                description: 'DELETE Elimina un tipo de orden por su Sigla.' 
            },
            { 
                name: 'Tipos Formulario: Listar Todos', 
                value: 'getAllTiposFormulario', 
                description: 'GET Listado de tipos de formulario (Configuración contable).' 
            },
            { 
                name: 'Tipos Formulario: Obtener por ID', 
                value: 'getTipoFormulario', 
                description: 'GET Detalle de un tipo de formulario.' 
            },
            { 
                name: 'Tipos Formulario: Modificar', 
                value: 'updateTipoFormulario', 
                description: 'PUT Modificación de configuración de formulario. Requiere JSON Body.' 
            },
        ],
        default: 'getAllTipos',
    },
];

export const tiposFields: INodeProperties[] = [
    {
        displayName: 'ID / Sigla',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['tipos'], 
                operation: [
                    'getTipo', 
                    'deleteTipo',
                    'getTipoFormulario'
                ] 
            } 
        },
        description: 'Sigla para Tipos de Orden (ej: "SJO") o ID Numérico para Tipos de Formulario.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['tipos'],
                operation: ['createTipo', 'updateTipo', 'updateTipoFormulario']
            } 
        },
        description: 'Cuerpo de la petición con la configuración del tipo.',
    },
];