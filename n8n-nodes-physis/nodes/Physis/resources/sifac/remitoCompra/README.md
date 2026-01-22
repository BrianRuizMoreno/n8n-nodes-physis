# Recurso Remitos de Compra (SIFAC)

El recurso **Remitos de Compra** administra la recepción física de bienes provenientes de proveedores.

Este comprobante representa la **entrada oficial de stock** al sistema y suele ser el paso previo a la carga de la factura de compra (validación "Factura contra Remito"). Permite registrar qué productos llegaron, en qué cantidad y a qué depósito ingresaron, validando contra una Orden de Compra previa si existiese.

## 📋 Estructura de Datos (Schema)

Sigue la estructura de "Comprobante Complejo" con separación de Cabecera e Ítems.

### 1. Objeto `cabecera`
Datos del proveedor y depósitos.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idTipoComprobante` | String | Código del remito (ej: "RMC", "REC"). | Sí |
| `fecha` | Date | Fecha de recepción. | Sí |
| `idCtaAuxi` | String | Código del Proveedor. | Sí |
| `numerador` | Object | Número oficial del remito del proveedor (Pto Venta + Número). | Sí |
| `idDepositoEntrada` | String | Depósito donde ingresa la mercadería. | Sí |
| `idDepositoSalida` | String | Depósito origen (Solo para movimientos internos/devoluciones). | No |

### 2. Objeto `items` (Array)
Detalle de lo recibido.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idProducto` | String | Código del artículo. | Sí |
| `cantidad` | Decimal | Cantidad física recibida. | Sí |
| `idPartida` | String | Lote/Serie asignado al ingreso. | No |
| `idDeposito` | String | Depósito específico por ítem (si difiere de cabecera). | No |

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Registra la recepción de mercadería (Aumenta stock).
* **Obtener por ID** (`get`): Recupera el detalle de un remito específico.

### Consultas
* **Listar Remitos** (`getAll`): Búsqueda de historial de recepciones.
    * *Filtros*: `fechaDesde`, `fechaHasta`, `orden` (Criterio), `top` (Paginación).

---

## 💡 Ejemplos de Uso

### 1. Registrar Recepción de Mercadería
Ingresan 200 cajas de "CERAMICA-BLANCA" al depósito "CENTRAL", provenientes del proveedor "PROV-001" con su remito N° 0001-00005555.

**Recurso**: `Remitos de Compra` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "cabecera": {
    "fecha": "2026-01-14T08:00:00",
    "idTipoComprobante": "RMC",
    "idCtaAuxi": "PROV-001",
    "idDepositoEntrada": "CENTRAL",
    "observaciones": "Mercadería recibida en buen estado",
    "numerador": {
      "idPuntoDeVenta": "0001",
      "numero": "00005555"
    }
  },
  "items": [
    {
      "nroOrden": 1,
      "idProducto": "CERAMICA-BLANCA",
      "cantidad": 200.00,
      "idDeposito": "CENTRAL"
    }
  ]
}
```

### 2. Consultar Recepciones de la Semana
Ver todos los remitos de compra cargados en los últimos 7 días.

**Recurso**: ``Remitos de Compra`` 

**Operación**: ``Listar Remitos``

**Parámetros (Query)**:

* fechaDesde: ``2026-01-07T00:00:00``

* fechaHasta: ``2026-01-14T23:59:59``

* orden: ``3`` (Fecha Descendente)

---

## ⚠️ Notas Técnicas
* **Impacto en Stock**: La operación **POST** (Crear) impacta inmediatamente en el saldo físico del producto en el depósito indicado (``idDepositoEntrada``).

* **Numeración**: Es crítico cargar correctamente el objeto ``numerador`` con los datos reales del papel que entrega el proveedor, ya que este dato se usa para la fiscalización y para evitar duplicados.

* **Trazabilidad**: Si el producto maneja lotes o partidas, es obligatorio informar el campo ``idPartida`` en el ítem al momento de la recepción.