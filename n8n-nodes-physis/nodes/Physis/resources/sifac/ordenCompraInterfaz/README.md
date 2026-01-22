# Recurso Interfaz Orden de Compra 

El recurso **Interfaz Orden de Compra** es un conjunto de endpoints simplificados diseñados para integraciones con clientes específicos o sistemas externos que requieren una estructura de datos plana y directa.

## 📋 Estructura de Datos (Schema)

La estructura de retorno es simplificada en comparación con la orden de compra estándar, aplanando objetos de domicilio y logística.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idCabecera` | Int | Identificador único interno. |
| `pvComprobante` | String | Punto de Venta (ej: "0001"). |
| `numeroComprobante` | String | Número del comprobante (ej: "00001234"). |
| `cuitProveedor` | String | Identificación fiscal del proveedor. |
| `fechaEmision` | String | Fecha de la orden. |
| `ordenCompraItems` | Array | Lista de productos (Detalle). |

### Detalle del Item (`ordenCompraItems`)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idProducto` | Int | Código interno del producto (numérico en esta interfaz). |
| `nombreProducto` | String | Descripción del artículo. |
| `cantidadUMPrimaria` | String | Cantidad solicitada (Formato string). |

---

## 🛠 Operaciones Disponibles

Este recurso es de **Solo Lectura**.

* **Consultar Cabecera** (`getOCcabecera`): Obtiene los datos completos de una OC (Cabecera + Items) dado su ID.
* **Consultar Detalle** (`getOCDetalle`): Obtiene únicamente la lista de ítems de una OC dada.
* **Buscar Listado** (`consulta`): Obtiene una lista de OCs emitidas en una fecha o rango de fechas.

---

## 💡 Ejemplos de JSON

### 1. Consultar una Orden Específica (Cabecera + Items)
Obtener la información completa de la Orden de Compra ID 12500.

**Recurso**: `Interfaz OC` > **Operación**: `Consultar Cabecera`

**Parámetros (Query)**:
* `idCabecera`: `12500`

**Respuesta JSON**:
```json
{
  "idCabecera": 12500,
  "pvComprobante": "0005",
  "numeroComprobante": "00000456",
  "anulado": false,
  "fechaEmision": "2026-01-14T10:00:00",
  "horaEmision": "10:30",
  "cuitProveedor": "30112233445",
  "aliasTercero": "PROVEEDOR S.A.",
  "observaciones": "Entrega en depósito central - Urgente",
  "ordenCompraItems": [
    {
      "idProducto": 1055,
      "aliasProducto": "INS-001",
      "nombreProducto": "Insumo Industrial Tipo A",
      "cantidadUMBulto": 0,
      "cantidadUMUnidades": 100,
      "cantidadUMPrimaria": "100.00",
      "observaciones": "Lote específico"
    },
    {
      "idProducto": 2099,
      "aliasProducto": "SERV-LOG",
      "nombreProducto": "Servicio de Flete",
      "cantidadUMPrimaria": "1.00",
      "observaciones": ""
    }
  ]
}
```

### 2. Buscar Órdenes por Rango de Fechas
Obtener el listado de todas las órdenes generadas entre el 10 y el 14 de Enero de 2026.

**Recurso**: ``Interfaz OC`` 

**Operación**: ``Buscar Listado``

**Parámetros (Query)**:

* fecha: ``2026-01-10T00:00:00``

* fechaHasta: ``2026-01-14T23:59:59``

* empresaID: ``0`` (Default)

**Respuesta JSON**:

```json
[
  {
    "idCabecera": 12500,
    "pvComprobante": "0005",
    "numeroComprobante": "00000456",
    "anulado": false,
    "fechaEmision": "2026-01-14",
    "cuitProveedor": "30112233445",
    "aliasTercero": "PROVEEDOR S.A.",
    "ordenCompraItems": [] 
  },
  {
    "idCabecera": 12499,
    "pvComprobante": "0005",
    "numeroComprobante": "00000455",
    "anulado": true,
    "fechaEmision": "2026-01-12",
    "cuitProveedor": "20998877661",
    "aliasTercero": "JUAN PEREZ",
    "ordenCompraItems": []
  }
]
```
(Nota: El endpoint de búsqueda consulta puede devolver la lista de ítems vacía o llena dependiendo de la configuración del backend, priorizando la velocidad del listado de cabeceras).

---

## ⚠️ Notas Técnicas
* **Formato de Fechas**: Dependiendo de la versión del servicio, el campo ``fechaEmision`` podría retornar una cadena con formato crudo (ej: "20260114") o ISO. Se recomienda parsear con flexibilidad.

* **Identificadores**: A diferencia de otros módulos que usan Strings para IDs de productos, esta interfaz utiliza ``integer`` (``idProducto: 0``).

* **Parámetro ultimo**: El parámetro booleano ``ultimo`` en la búsqueda está marcado como "futuro" en la documentación técnica. Actualmente debe enviarse en ``false``.