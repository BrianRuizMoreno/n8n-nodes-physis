import { INodeProperties } from 'n8n-workflow';

export const planCuentaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['planCuenta'] } },
        options: [

			{ name: 'Listar Todos (Combo)', value: 'getCombo', description: 'GET Devuelve lista simple de Planes de Cuentas.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Devuelve un Plan de Cuenta Principal.' },
            { name: 'Ver Fechas', value: 'getFechas', description: 'GET Fechas de creación/modificación. Req: ID.' },
            { name: 'Ver Estructura', value: 'getEstructura', description: 'GET Estructura de cuentas del plan. Req: ID.' },
            { name: 'Ver Tamaño Total', value: 'getTamano', description: 'GET Tamaño total del Plan de Cuentas.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta Plan (Verificar disponibilidad en API).' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica Plan (Verificar disponibilidad en API).' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un Plan de Cuenta Principal.' },
        ],
        default: 'getCombo',
    },
];

export const planCuentaFields: INodeProperties[] = [
    {
        displayName: 'ID Plan Principal',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planCuenta'], 
                operation: ['get', 'delete', 'getFechas', 'getEstructura'] 
            } 
        },
        description: 'Identificador numérico del Plan de Cuentas (idPpal).',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planCuenta'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar.',
    },
];