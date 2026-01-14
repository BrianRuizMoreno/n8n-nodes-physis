# Recurso Varios (SIFAC)

El recurso **Varios** unifica herramientas de utilidad general, configuración de seguridad avanzada y reportes dinámicos del módulo SIFAC.

## 🛠 Operaciones Disponibles

### 1. Conceptos
Gestión de ítems no inventariables.
* **Conceptos: Listar Todos** (`getConceptos`): Devuelve la lista de servicios, impuestos o conceptos facturables.
    * *Filtro JSON*: `{ "origen": 1 }` (Opcional).

### 2. Consultas Terceros (Motor de Reportes)
Permite ejecutar consultas dinámicas sobre la vista de Terceros/Auxiliares definiendo campos, filtros y ordenamiento en un JSON, sin necesidad de endpoints dedicados.

* **Consultas: Terceros Dinámica** (`consultaTerceros`).

**Estructura del JSON de Consulta:**
```json
{
  "Campos": [ "Nombre", "NumeroDocumento", "IdCtaAuxi" ],
  "Paginado": { "PaginaActual": 1, "RegistrosPorPagina": 10 },
  "Orden": [ { "Campo": "Nombre", "Tipo": 0 } ],
  "Filtros": [
    {
      "Campo": "Nombre",
      "Valor": "PEREZ",
      "Tipo": 0,       // 0=String
      "Operador": 8    // 8=Contiene
    }
  ]
}
```

### 3. Grupos: Cuentas Permitidas (Seguridad)
Permite restringir qué Cuentas Específicas (Clientes o Proveedores puntuales) puede ver un Grupo de Usuarios. Esto aplica seguridad a nivel de registro ("Row Level Security").

* Grupos: Listar Cuentas Permitidas (``getGrupoCuentas``).

* Grupos: Asignar Cuentas Permitidas (``updateGrupoCuentas``).

**Parámetros Requeridos**:

* ID Grupo: ID numérico del grupo de usuarios.

* Tipo de Auxiliar (``idAuxi``): 1 para Clientes, 2 para Proveedores.

**Ejemplo JSON (Asignar)**: Restringir al grupo para que solo vea al Cliente "CLI-001".

```json
{
  "valuesAndNivelesRestricciones": {
    "CLI-001": 0
  }
}
```

---

## ⚠️ Notas Técnicas
* **Consultas Dinámicas**: El motor de consultas es muy potente pero sensible a la estructura del JSON. Asegúrese de respetar los nombres de campos (Case Sensitive según la base de datos).

* **Sobreescritura de Permisos**: La operación ``updateGrupoCuentas`` sobrescribe totalmente la lista de permitidos para ese grupo y tipo de auxiliar.