# Recurso Comprobantes Pendientes (SIGES)

El recurso **Comprobantes Pendientes** administra el flujo de trabajo (workflow) de los documentos antes de ser contabilizados definitivamente o enviados externamente.

No debe confundirse con la "Deuda Pendiente" (Cuenta Corriente). Este recurso trata sobre:
1.  **Pendientes de AFIP**: Facturas generadas pero que aún no obtuvieron CAE.
2.  **Autorización de Pagos**: Órdenes de pago que requieren firma de un gerente.
3.  **Errores**: Comprobantes que intentaron procesarse y fallaron (ej: CUIT inválido en AFIP).

## 📋 Campos Principales (Filtros JSON)

Para listar, se utiliza un objeto JSON con criterios de filtrado:

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `fechaDesde` / `fechaHasta` | DateTime | Rango de emisión. |
| `pendienteEnvio` | Boolean | `true` para ver facturas que faltan enviar a AFIP. |
| `autorizacionPagos` | Int | Filtro específico para workflow de tesorería. |
| `anulado` | Boolean | Incluir o no comprobantes anulados. |
| `resultadoConstatacion` | String | Filtro por mensaje de error de AFIP. |

---

## 🛠 Operaciones Disponibles

### Listados y Procesamiento
* **Listar Pendientes** (`getAll`): Recupera la bandeja de entrada de comprobantes que requieren acción.
* **Listar Detallado** (`getDetailed`): Versión extendida que incluye datos del cliente/proveedor (Razón Social, CUIT) directamente en la respuesta.
* **Obtener Resumen** (`getSummary`): Devuelve estadísticas (ej: "5 facturas pendientes de CAE", "2 pagos a autorizar").

### Auditoría y Errores
* **Contar Errores** (`getErrorCounts`): Endpoint rápido para monitoreo. Permite saber si hay trabas operativas (ej: servicios de AFIP caídos que generaron errores masivos).
* **Obtener Detalle** (`get`): Ver el estado puntual de un comprobante específico.

---

## 💡 Ejemplos de Uso

### 1. Monitoreo de Facturación Electrónica
Consultar si quedaron facturas del día sin enviar a AFIP (`pendienteEnvio = true`).

**Recurso**: `ComprobantePendiente` 

**Operación**: `Listar Pendientes`

**JSON Body**:
```json
{
  "fechaDesde": "2026-01-16T00:00:00Z",
  "fechaHasta": "2026-01-16T23:59:59Z",
  "pendienteEnvio": true
}
```

### 2. Bandeja de Autorización de Pagos
Un tesorero consulta qué pagos están esperando su aprobación.

**Recurso**: `ComprobantePendiente` 

**Operación**: `Listar Detallado`

**JSON Body**:

```json
{
  "autorizacionPagos": 1, // 1 = Pendientes de Autorizar
  "opNoEjecutadas": true
}
```

### 3. Alerta de Errores
Consultar cuántos comprobantes están en estado de error para el usuario actual.

**Recurso**: `ComprobantePendiente` 

**Operación**: `Contar Errores`

**Parámetros**:

* IdUsuario: `55`

* idPpal: `1`

---

## ⚠️ Notas Técnicas
* **Typo en API**: El endpoint de listado detallado tiene un error ortográfico en la URL oficial: `/comprobamtes-pendientes-all-detallados`. El nodo maneja esto internamente, pero es importante tenerlo en cuenta si se hacen llamadas directas.

* **GET con Body**: Varios endpoints de este recurso utilizan el método **GET** pero esperan un objeto JSON complejo en el cuerpo de la petición (Request body).