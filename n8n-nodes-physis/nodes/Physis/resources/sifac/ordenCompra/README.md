# Recurso Órdenes de Compra (SIFAC)

El recurso **Órdenes de Compra** administra los documentos formales de adquisición de bienes o servicios a proveedores.

Este recurso actúa como el contrato inicial de la operación, donde se especifican los productos, precios pactados, condiciones de pago y, crucialmente en este sistema, la **logística de retiro/entrega** (a través del objeto `viaje`).

## 📋 Estructura de Datos (Schema)

A diferencia de otros comprobantes planos, la Orden de Compra se estructura en un objeto contenedor raíz que separa la **Cabecera** (Datos del proveedor y generales) de los **Ítems** (Detalle de productos).

### 1. Objeto `cabecera`
Contiene los datos administrativos y logísticos.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idTipoComprobante` | String | Código del tipo de orden (ej: "OCC", "OC"). | Sí |
| `fecha` | Date | Fecha de emisión. | Sí |
| `idCtaAuxi` | String | Código del Proveedor/Solicitante. | Sí |
| `idComprador` | String | ID del empleado/sector que realiza la compra. | No |
| `idCondPago` | String | Condición de pago pactada. | No |
| `idListaPrecios` | String | Lista de precios de referencia. | No |
| `viaje` | Object | **Logística**: Datos de origen, destino, transporte y chofer asignado para el retiro de la mercadería. | No |

### 2. Objeto `items` (Array)
Detalle de la mercadería.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idProducto` | String | Código del artículo a comprar. | Sí |
| `cantidad` | Decimal | Cantidad solicitada. | Sí |
| `precioUnitario` | Decimal | Costo unitario pactado. | Sí |
| `idDeposito` | String | Depósito de destino previsto. | No |
| `plazoDeEntrega` | Date | Fecha límite o estimada de recepción. | No |
| `nroOrden` | Int | Número de renglón/línea. | No |

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Registra una nueva Orden de Compra.
* **Modificar** (`update`): Edita una orden existente (ej: cambio de cantidades o fechas).
* **Obtener por ID** (`get`): Recupera el detalle completo de una orden específica.

### Consultas
* **Listar Órdenes** (`getAll`): Búsqueda de órdenes con filtros de fecha y ordenamiento.
    * *Filtros*: `fechaDesde`, `fechaHasta`, `orden` (Criterio de ordenamiento), `top` (Paginación).

---

## 💡 Ejemplos de JSON

### 1. Crear Orden de Compra Básica
Compra de 100 unidades de "INSUMO-X" al proveedor "PROV-001" para entregar en el depósito central.

**Recurso**: `Órdenes de Compra` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "cabecera": {
    "fecha": "2026-01-14T10:00:00",
    "idTipoComprobante": "OCC",
    "idCtaAuxi": "PROV-001",
    "idCondPago": "30DIAS",
    "idMoneda": "PES",
    "observaciones": "Entrega urgente antes del fin de semana",
    "numerador": {
      "idPuntoDeVenta": "0001",
      "numero": "00000000" 
    }
  },
  "items": [
    {
      "nroOrden": 1,
      "idProducto": "INSUMO-X",
      "cantidad": 100.00,
      "precioUnitario": 550.00,
      "plazoDeEntrega": "2026-01-20T00:00:00",
      "idDeposito": "CENTRAL",
      "detalle": "Especificación técnica adjunta en mail"
    }
  ]
}
```
(Nota: El número en 00000000 suele indicar que el sistema debe asignar el siguiente disponible automáticamiente).

### 2. Modificar Orden (Agregar Logística/Viaje)
A una orden existente (ID 500), se le asigna el transporte que retirará la carga (Flete a cargo del comprador).

**Recurso**: ``Órdenes de Compra`` 

**Operación**: ``Modificar``

**Parámetros (Path)**:

* idCabecera: ``500``

**JSON Body**:

```json
{
  "cabecera": {
    "idCabecera": 500,
    "fecha": "2026-01-14T10:00:00",
    "idTipoComprobante": "OCC",
    "idCtaAuxi": "PROV-001",
    "viaje": {
      "idAuxiTrans": 2, 
      "idCtaAuxiTrans": "TRANS-LOGISTICA",
      "idMedioTransporte": 105, 
      "patente1": "AA999BB",
      "idConductor": 88,
      "calleOrigen": "Ruta Nacional 9 Km 280",
      "localidadOrigen": "Rosario",
      "calleDestino": "Planta Industrial",
      "localidadDestino": "Córdoba"
    }
  },
  "items": [
    {
      "idProducto": "INSUMO-X",
      "cantidad": 100.00,
      "precioUnitario": 550.00,
      "idDeposito": "CENTRAL"
    }
  ]
}
```

### 3. Consultar Orden Completa (Respuesta)
Estructura típica de respuesta al consultar por ID.

**Recurso**: ``Órdenes de Compra`` 

**Operación**: ``Obtener por ID``

**Parámetros (Path)**:

* idCabecera: ``500``

**JSON Response**:

```json
{
  "cabecera": {
    "idCabecera": 500,
    "fecha": "2026-01-14T10:00:00",
    "numerador": {
      "idPuntoDeVenta": "0001",
      "numero": "00001234"
    },
    "idCtaAuxi": "PROV-001",
    "solicitante": {
      "nombre": "PROVEEDOR INDUSTRIAL S.A.",
      "nroDocumento": "30-11223344-5",
      "domicilio": {
        "domicilioCalle": "Av. Siempreviva 123",
        "domicilioLocalidad": "Rosario"
      }
    },
    "importeTotal": 55000.00
  },
  "items": [
    {
      "idProducto": "INSUMO-X",
      "descProducto": "Insumo Plástico Básico",
      "cantidad": 100.00,
      "precioUnitario": 550.00,
      "precioNeto": 55000.00
    }
  ]
}
```

---

## ⚠️ Notas Técnicas
* **Estructura Envolvente**: Es vital respetar la estructura ``{ "cabecera": {...}, "items": [...] }`` tanto en el **POST** como en el **PUT**. Enviar las propiedades planas en la raíz provocará un error de deserialización.

* **Viajes y Cartas de Porte**: Si la Orden de Compra incluye datos de ``viaje`` y granos/hacienda, estos datos suelen pre-cargar la futura Carta de Porte o Remito de Ingreso, agilizando la recepción en portería.

* **Estados**: Aunque no se visualiza en el JSON de ejemplo básico, internamente la OC gestiona estados de "Pendiente", "Cumplida Parcial" y "Cumplida Total" según las recepciones de mercadería asociadas.