# Recurso Compradores y Autorizantes (Portal Proveedores)

El recurso **Compradores y Autorizantes** administra el esquema de seguridad y workflow del Portal de Proveedores.

Su función es establecer la relación: **Sector (Comprador) -> Responsable (Autorizante)**.
Permite definir reglas de negocio como:
* "¿Quién puede aprobar facturas del sector 'Sistemas'?"
* "¿Hasta qué monto puede aprobar el Gerente de Mantenimiento?"
* "Configurar alertas de correo automático."

## 📋 Campos Principales

### Configuración de Relación (Autorizante)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idCtaReagAuxiComprador` | String | Identificador del "Comprador" (Sector/Centro de Costo). |
| `idAutorizante` | Int | ID del Usuario habilitado para aprobar. |
| `importeMax` | Decimal | Límite máximo en Pesos que este usuario puede aprobar. |
| `importeMaxEnDolares` | Decimal | Límite máximo en Dólares. |
| `nivel` | Int | Jerarquía de aprobación (ej: 1=Jefe, 2=Gerente, 3=Director). |

### Configuración Global (Settings)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `compradoresIdReagAuxi` | String | Define qué Reagrupación Auxiliar se usa como catálogo de Compradores (ej: Rubro "Sectores"). |
| `envioDeEmailAutomatico` | Boolean | Activa notificaciones por email ante nuevos comprobantes. |

---

## 🛠 Operaciones Disponibles

### Configuración General
* **Gestionar Configuración** (`getSettings`, `saveSettings`): Define los parámetros globales del portal, como la URL base para los correos y qué tabla se utiliza para listar a los compradores.

### Gestión de Compradores
* **Listar Compradores** (`getBuyers`): Obtiene la lista de sectores o departamentos habilitados para recibir facturas.
    * *Filtro*: `conAutorizantes=true` devuelve solo aquellos que ya tienen un responsable asignado.

### Gestión de Autorizantes (Permisos)
Estas operaciones definen **quién** aprueba y **cuánto**.
* **Listar Autorizantes de un Comprador** (`getAuthorizersByBuyer`): Devuelve la lista de personas habilitadas para un sector específico.
* **Listado Global** (`getAllAuthorizers`): Matriz completa de relaciones Comprador-Autorizante.
* **Asignar Autorizante** (`addAuthorizer`, `addAuthorizerList`): Vincula un usuario a un sector, estableciendo sus límites de monto.
* **Modificar Límites** (`updateAuthorizer`): Permite cambiar el `importeMax` o el `nivel` de un autorizante existente (Ver nota sobre PATCH).
* **Eliminar Relación** (`deleteAuthorizer`): Quita el permiso de aprobación a un usuario sobre un sector específico.

---

## 💡 Ejemplos de Uso

### 1. Configurar un Nuevo Gerente de IT
Asignar al usuario "JuanPerez" (ID 50) como aprobador del sector "Tecnología" (Código "TEC-01"), con capacidad de aprobar hasta $1.000.000.

**Recurso**: `CompradoresAutorizantes` 

**Operación**: `Asignar Autorizante`

**Parámetro (Path)**: 

* idCtaReagAuxiComprador: `TEC-01`

**JSON Body**:
```json
{
  "idAutorizante": 50,
  "importeMax": 1000000,
  "importeMaxEnDolares": 1000,
  "nivel": 2
}
```

### 2. Aumentar Límite de Aprobación
El usuario 50 ahora puede aprobar hasta $2.000.000 debido a un ascenso.

**Recurso**: `CompradoresAutorizantes` 

**Operación**: `Modificar Límites (PATCH)`

**Parámetros**:

* idCtaReagAuxiComprador: `TEC-01`

* idAutorizante: `50`

**JSON Body** (Formato JSON Patch):

```json
[
  { "op": "replace", "path": "/importeMax", "value": 2000000 }
]
```

### 3. Consultar Flujo de Aprobación
Ver quiénes son los responsables del sector "Marketing".

**Recurso**: `CompradoresAutorizantes` 

**Operación**: `Listar Autorizantes de un Comprador`

**Parámetro**: 

* idCtaReagAuxiComprador: `MKT`

---

## ⚠️ Notas Técnicas
* **Origen de Compradores**: Los "Compradores" no son una entidad aislada; técnicamente son Cuentas de Reagrupación Auxiliar (ver recurso `CuentasReagrupacionAuxi`). La configuración global (`/settings`) define qué `idReagAuxi` se utiliza para poblar esta lista.

* **JSON Patch**: La operación de modificación utiliza el estándar JSON Patch (`RFC 6902`). Debe enviar un array de operaciones (`replace`, `add`, `remove`) en lugar del objeto completo.

* **Niveles**: El campo nivel es útil para lógica de escalamiento. Si una factura supera el `importeMax` del Nivel 1, el sistema puede buscar autorizantes de Nivel 2.