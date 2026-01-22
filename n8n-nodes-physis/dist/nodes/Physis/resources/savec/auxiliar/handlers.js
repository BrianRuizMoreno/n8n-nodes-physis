"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/savec';
    const method = 'GET';
    const body = {};
    let qs = {};
    switch (operation) {
        case 'getCampanias':
            endpoint = `${endpoint}/campanias`;
            const incluirRowTodosCamp = this.getNodeParameter('incluirRowTodos', index, false);
            qs.incluirRowTodos = incluirRowTodosCamp;
            break;
        case 'getCampaniasUsuario': {
            const idUsuario = this.getNodeParameter('idUsuario', index, '');
            endpoint = `${endpoint}/usuarios/${idUsuario}/campanias`;
            break;
        }
        case 'getCereales':
            endpoint = `${endpoint}/cereales`;
            const todos = this.getNodeParameter('incluirRowTodos', index, false);
            qs.todos = todos;
            break;
        case 'getCerealesStock':
            endpoint = `${endpoint}/cereales/stock`;
            qs.codCampania = this.getNodeParameter('codCampania', index);
            qs.fecha = this.getNodeParameter('fecha', index);
            break;
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            qs = { ...qs, ...json };
        }
        catch (error) {
            throw new Error(`JSON body inválido: ${error.message}`);
        }
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map