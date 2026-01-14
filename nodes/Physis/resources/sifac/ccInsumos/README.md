# Recurso Cuenta Corriente Insumos (FacCCInsumos)

El recurso **FacCCInsumos** se especializa en la trazabilidad comercial y el estado de cumplimiento de los comprobantes relacionados con insumos y mercaderías.

Permite responder preguntas clave del ciclo de ventas/compras:
* ¿Cuánto se ha entregado de este Pedido? (Pendiente vs. Remitido)
* ¿Cuánto se ha facturado de este Remito? (Pendiente vs. Facturado)

A diferencia de los recursos de *Pedidos* o *Remitos* (que gestionan el ABM), este recurso está orientado a **Reportes** y vistas de control de pendientes.

## 📋 Parámetros de Filtrado Comunes

Casi todas las operaciones comparten los mismos filtros para acotar la búsqueda:

| Campo | Tipo | Descripción | Default |
| :--- | :--- | :--- | :---: |
| `idAuxi` | Int | Tipo de Auxiliar (ej: 1=Cliente, 2=Proveedor). | - |
| `idCtaAuxi` | String | Código del Cliente/Proveedor. | - |
| `sSubSistema` | String | Módulo: `V` (Ventas/Clientes) o `C` (Compras/Proveedores). | `V` |
| `fechaDesde` | Date | Fecha inicial del rango. | - |
| `fechaHasta` | Date | Fecha final del rango. | - |

---

## 🛠 Operaciones Disponibles

### Pedidos (Orden de Venta / Compra)
* **Pedidos Resumen** (`getPedidosResumen`): Listado general de pedidos en el rango.
* **Pedidos Detalle** (`getPedidosDetalle`): Muestra ítem por ítem cuánto se pidió y cuánto se ha entregado (saldo pendiente de entrega).

### Remitos (Entregas / Recepciones)
* **Remitos Resumen** (`getRemitosResumen`): Listado general de remitos.
* **Remitos Detalle** (`getRemitosDetalle`): Muestra ítem por ítem qué se entregó y si ya fue facturado (saldo pendiente de facturación).

### Facturas
* **Facturas Resumen** (`getFacturasResumen`): Listado fiscal.
* **Facturas Detalle** (`getFacturasDetalle`): Desglose de ítems facturados y su relación con remitos/pedidos previos.

### Específicos
* **Consultar Comprobante Único** (`getComprobanteCumplimiento`): Dado un `idCabecera` específico, devuelve toda la cadena de trazabilidad de ese documento.

---

## 💡 Ejemplos de JSON (Filtros)

### 1. Consultar Pedidos Pendientes de un Cliente
Ver el detalle de pedidos del cliente "CLI-001" en lo que va del año 2026, para el subsistema de Ventas.

**Recurso**: `CC Insumos` 

**Operación**: `Pedidos: Detalle y Cumplimiento`

**JSON Filtros**:
```json
{
  "idAuxi": 1,
  "idCtaAuxi": "CLI-001",
  "sSubSistema": "V",
  "fechaDesde": "2026-01-01T00:00:00",
  "fechaHasta": "2026-12-31T23:59:59"
}
```

### 2. Consultar Remitos de Compra (Proveedores)
Ver los remitos recibidos del proveedor "PROV-99" en la última semana.

**Recurso**: ``CC Insumos`` 

**Operación**: ``Remitos: Resumen``

**JSON Filtros**:

```json
{
  "idAuxi": 2,             // 2 = Proveedores
  "idCtaAuxi": "PROV-99",
  "sSubSistema": "C",      // C = Compras
  "fechaDesde": "2026-01-07T00:00:00",
  "fechaHasta": "2026-01-14T23:59:59"
}
```

---

## ⚠️ Notas Técnicas
**Subsistema**: Es crucial definir correctamente el ``sSubSistema``. Si busca datos de un Proveedor pero deja el default ``V`` (Ventas), la consulta probablemente venga vacía.

**Resumen vs Detalle**:

* **Resumen**: Devuelve una fila por comprobante (Totales).

* **Detalle**: Devuelve una fila por cada producto dentro del comprobante, ideal para ver faltantes parciales.