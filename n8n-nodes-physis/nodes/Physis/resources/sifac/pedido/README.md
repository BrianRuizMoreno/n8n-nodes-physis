# Recurso Pedidos (SIFAC)

El recurso **Pedidos** administra las Notas de Venta o Pedidos de Clientes.

Representa el compromiso de venta y es el documento base que posteriormente se transformará en un Remito (para el despacho de mercadería) o una Factura. Permite reservar stock (dependiendo de la configuración), asignar vendedores, definir condiciones comerciales y pactar la logística de entrega.

## 📋 Estructura de Datos (Schema)

Al igual que las Órdenes de Compra, los Pedidos utilizan una estructura envolvente que separa los datos administrativos (**Cabecera**) del detalle de productos (**Ítems**).

### 1. Objeto `cabecera`
Datos del cliente y condiciones comerciales.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idTipoComprobante` | String | Código del tipo de pedido (ej: "PED", "NP"). | Sí |
| `fecha` | Date | Fecha de toma del pedido. | Sí |
| `idCtaAuxi` | String | Código del Cliente. | Sí |
| `idVendedor` | String | Código del vendedor asignado. | No |
| `idCondPago` | String | Condición de venta pactada. | No |
| `idListaPrecios` | String | Lista de precios aplicada. | No |
| `viaje` | Object | **Logística**: Datos de entrega (Dirección destino, transporte, chofer). | No |

### 2. Objeto `items` (Array)
Detalle de productos solicitados.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idProducto` | String | Código del artículo. | Sí |
| `cantidad` | Decimal | Cantidad solicitada. | Sí |
| `precioUnitario` | Decimal | Precio de venta (según lista). | Sí |
| `idDeposito` | String | Depósito del cual saldrá la mercadería. | No |
| `plazoDeEntrega` | Date | Fecha prometida de entrega. | No |

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Registra un nuevo Pedido.
* **Modificar** (`update`): Edita un pedido existente (ej: agregar ítems, cambiar cantidades).
* **Obtener por ID** (`get`): Recupera el detalle completo de un pedido.

### Consultas y Trazabilidad
* **Listar Pedidos** (`getAll`): Búsqueda general con filtros.
    * *Filtros*: `fechaDesde`, `fechaHasta`, `orden` (Criterio), `top` (Límite).
* **Comprobantes Asociados** (`getComprobantesAsociados`): Permite consultar qué documentos posteriores (Facturas/Remitos) se generaron a partir de este pedido.

---

## 💡 Ejemplos de Uso

### 1. Registrar un Pedido de Venta
El cliente "CLI-001" solicita 50 unidades del producto "A", atendido por el vendedor "VEND-01".

**Recurso**: `Pedidos` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "cabecera": {
    "fecha": "2026-01-14T15:30:00",
    "idTipoComprobante": "PED",
    "idCtaAuxi": "CLI-001",
    "idVendedor": "VEND-01",
    "idCondPago": "30DIAS",
    "idMoneda": "PES",
    "observaciones": "Entregar por la mañana",
    "numerador": {
      "idPuntoDeVenta": "0001",
      "numero": "00000000"
    }
  },
  "items": [
    {
      "nroOrden": 1,
      "idProducto": "PROD-A",
      "cantidad": 50.00,
      "precioUnitario": 1200.00,
      "idDeposito": "CENTRAL"
    }
  ]
}
```

### 2. Listar Pedidos del Día
Ver todos los pedidos cargados hoy, ordenados por hora de carga.

**Recurso**: ``Pedidos`` 

**Operación**: ``Listar Pedidos``

**Parámetros (Query)**:

* fechaDesde: ``2026-01-14T00:00:00``

* fechaHasta: ``2026-01-14T23:59:59``

* orden: ``3`` (FechaHora Descendente)

### 3. Consultar Trazabilidad
Ver si el Pedido ID 1000 ya fue facturado o remitido.

**Recurso**: ``Pedidos`` 

**Operación**: ``Comprobantes Asociados``

**Parámetros (Path)**:

* idCabecera: ``1000``

**Parámetros (Query)**:

* operacion: ``2`` (Consulta)

---

## ⚠️ Notas Técnicas
* **Estructura Envolvente**: Al igual que en Ordenes de Compra, es obligatorio envolver los datos en las propiedades raíz ``"cabecera"`` e ``"items"``.

* **Objeto Viaje**: Si el pedido implica que la empresa se hace cargo del flete, se debe completar el objeto ``viaje`` con los datos del transporte y la dirección de entrega (``calleDestino``, ``localidadDestino``). Estos datos se heredarán automáticamente al generar el Remito posterior.

* **Punto de Venta**: El objeto ``numerador`` requiere definir el punto de venta (``idPuntoDeVenta``). Si el número se deja en cero o null, el sistema asignará el correlativo automático correspondiente a ese punto de venta.