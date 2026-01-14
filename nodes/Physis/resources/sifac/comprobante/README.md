# Recurso Comprobantes (SIFAC)

El recurso **Comprobantes** es el núcleo transaccional del módulo SIFAC. Permite la gestión integral del ciclo de vida de los documentos comerciales y logísticos de la empresa (Facturas, Pedidos, Remitos, Notas de Débito/Crédito).

Este recurso administra:
1.  **Registración**: Alta de nuevos comprobantes con su detalle de ítems, impuestos y datos logísticos.
2.  **Consulta**: Buscadores avanzados (Motor de Búsqueda) y listados de cabeceras.
3.  **Autorización**: Flujo de aprobación de ítems (ej: Pedidos que superan límite de crédito).

## 📋 Campos Principales (Schema)

La creación de un comprobante (`create`) implica un objeto JSON complejo que anida cabecera, renglones (ítems), impuestos y datos de transporte.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCabecera` | Int | Identificador interno (0 para nuevos). | Sí |
| `idTipoComprobante` | String | Código del tipo de documento (ej: "FAC", "PED"). | Sí |
| `fecha` | Date | Fecha de emisión. | Sí |
| `numero` | String | Punto de venta y número (ej: "0001-00001234"). | Sí |
| `idCtaAuxi` | String | Código del Cliente o Proveedor. | Sí |
| `items` | Array | **Detalle de Productos**: Cantidad, Precio, Descuentos. | Sí |
| `impuestos` | Array | **Fiscal**: Tasas de IVA, Percepciones, Tributos. | No |
| `viaje` | Object | **Logística**: Datos del flete, chofer y destino (para Remitos). | No |

### Estructura de `items` (Renglones)
* `idProducto`: Código del artículo.
* `cantidad`: Unidades transaccionadas.
* `precioUnitario`: Precio antes de impuestos.
* `idDeposito`: Depósito de origen/destino del stock.

---

## 🛠 Operaciones Disponibles

### 1. Gestión de Comprobantes (ABM)
* **Registrar** (`create`): Genera un nuevo comprobante en el sistema. Valida stock, cuentas y reglas de negocio.
* **Consulta Avanzada** (`search`): Motor de búsqueda potente vía JSON (Campos, Filtros, Paginado). Endpoint: `/consulta`.
* **Listar Cabeceras** (`getCabeceras`): Listado ligero de comprobantes con filtros estándar (Fecha, Tipo, Tercero). Útil para grillas de visualización.

### 2. Flujo de Autorización
Permite gestionar la aprobación de comprobantes (usualmente Pedidos) que quedaron pendientes por reglas de negocio.
* **Consultar Pendientes** (`getAutorizacionConsulta`): Busca ítems específicos que requieren acción.
* **Autorizar/Rechazar** (`patchAutorizacionItem`): Modifica el estado de autorización de un ítem/renglón específico.

---

## 💡 Ejemplos de JSON

### 1. Registrar un Pedido Simple
Alta de un pedido para el cliente "C001" con un solo producto.

**Recurso**: `Comprobantes` 

**Operación**: `Registrar`

**JSON Body**:
```json
{
  "idCabecera": 0,
  "idTipoComprobante": "PED",
  "fecha": "2026-01-14T00:00:00",
  "sucursal": "0001",
  "idCtaAuxi": "C001",
  "idCondPago": "CTA_CTE",
  "idMoneda": "PES",
  "importeTotal": 1210.00,
  "items": [
    {
      "nroOrden": 1,
      "idProducto": "PROD-100",
      "cantidad": 10,
      "precioUnitario": 100.00,
      "tasaIVA": 21.00,
      "idDeposito": "CENTRAL"
    }
  ],
  "impuestos": []
}
```

### 2. Consulta Avanzada (Motor de Búsqueda)
Buscar facturas ("FAC") del cliente "C001" emitidas en 2026.

**Recurso**: ``Comprobantes`` 

**Operación**: ``Consulta Avanzada``

**JSON Body**:

```json
{
  "campos": ["Fecha", "Numero", "ImporteTotal"],
  "filtros": {
    "logico": "AND",
    "filtros": [
      { "Campo": "IdCtaAuxi", "Operador": 0, "Valor": "C001" },
      { "Campo": "IdTipoComprobante", "Operador": 0, "Valor": "FAC" },
      { "Campo": "Fecha", "Operador": 7, "Valor": "2026-01-01" } 
    ]
  },
  "paginado": { "paginaActual": 1, "registrosPorPagina": 20 }
}
```

### 3. Autorizar un Ítem de Pedido
Aprobar el movimiento ID 5599 perteneciente a la cabecera 10200.

**Recurso**: ``Comprobantes`` 

**Operación**: ``Autorizar/Rechazar``

**Parámetros (Path)**:

* idCabecera: ``10200``

* idMovimiento: ``5599``

**JSON Body**:

```json
{
  "autoriza": true,
  "cantidad": 10,
  "observacion": "Autorizado por Gerencia Comercial"
}
```

---

## ⚠️ Notas Técnicas
* **Complejidad del Alta**: La operación ``create`` es transaccional y compleja. Si el comprobante mueve stock (ej: Remito), validará existencias. Si mueve cuenta corriente (ej: Factura), validará crédito.

* **Logística (Viajes)**: El objeto ``viaje`` dentro del POST es fundamental para la generación de Cartas de Porte o remitos que requieren datos de transporte (Camión, Chasis, Chofer).

* **Autorización Granular**: La autorización se realiza a nivel de Ítem (``idMovimiento``), no solo de cabecera. Esto permite aprobar parcialmente un pedido (autorizar 5 unidades de 10 solicitadas).