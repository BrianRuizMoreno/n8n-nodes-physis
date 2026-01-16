# Recurso Comprobantes (SIGES)

El recurso **Comprobantes** es el corazón transaccional del módulo contable y financiero (SIGES).

Permite administrar todo el universo de documentos de la empresa: **Facturas** (Compra/Venta), **Recibos** de Cobranza, **Órdenes de Pago** (OP), **Notas de Crédito/Débito** y **Movimientos de Fondos** internos.

A diferencia de un simple ABM, este recurso maneja lógica de negocio compleja como:
* Cálculo automático de retenciones impositivas (Ganancias, IIBB).
* Validación de duplicados contra AFIP.
* Gestión de pagos masivos.
* Imputaciones contables automáticas (Pases).

## 📋 Estructura de Datos (Objeto Comprobante)

La creación de un comprobante requiere una estructura jerárquica profunda. Aquí se detallan las secciones clave:

```json
{
  "cabecera": {
    "idEjercicio": 2026,
    "idTipoComprobante": "FAC", // Factura A Compra
    "fecha": "2026-01-15T00:00:00",
    "idAuxi": 500, // ID Proveedor
    "importe": 12100.00
  },
  "items": [ // Detalle de la factura (Conceptos)
    {
      "detalle": "Servicio de Consultoría",
      "importe": 10000.00,
      "idCtaPpal": "410101" // Cuenta de Gasto
    }
  ],
  "pases": [ // Movimiento contable / Fondos
    // Generalmente se genera automático, pero puede requerirse en cargas manuales
  ],
  "valores": [ // Cheques o formas de pago (solo para Recibos/OP)
    {
      "idBanco": "011",
      "importe": 12100.00,
      "nroCheque": "555666"
    }
  ],
  "retenciones": [ // Impuestos calculados
    // Se completan automáticamente si se usa el endpoint de cálculo
  ]
}
```

## 🛠 Operaciones Disponibles
### 1. Consultas y Reportes
**Listar Paginado (getAllPaginated)**: La forma recomendada de consultar historiales. Permite filtrar por fechas, tipos de comprobante y estado (anulado).

**Obtener Detalle (get)**: Recupera la estructura completa de un documento.

* ⚠️ Importante: La clave primaria es compuesta. Siempre se requiere el `idComprobante` (en la URL) y el `idEjercicio` (en el JSON Body/Query).

**Pendientes de Pago (getPendientesPago)**: Lista facturas impagas, ideal para armar una bandeja de pagos a proveedores.

### 2. Gestión Transaccional (Alta/Baja/Modificación)
**Crear Comprobante (create)**: Permite ingresar cualquier tipo de documento.

**Eliminar (delete)**: Borra física o lógicamente un comprobante. Soporta un flag de advertencia para forzar el borrado ante alertas no bloqueantes.

### 3. Tesorería Avanzada (Pagos)
**Generar OP Masivas (createOPMasivas)**: Motor de automatización de pagos. Recibe una lista de IDs de facturas o saldos a cancelar y genera automáticamente las Órdenes de Pago, calculando retenciones y asignando los medios de pago configurados.

**Validar Existencia (checkExternalExists)**: Verifica si una factura de proveedor (Punto Venta + Número + CUIT) ya existe en la base de datos para prevenir duplicados antes de la carga.

## 💡 Ejemplos de Uso
### 1. Consultar Factura Específica
Recuperar la factura #10250 del ejercicio 2026.

**Recurso**: `Comprobante` 

**Operación**: `Obtener por ID`

**ID Comprobante**: 10250

**JSON Body**:

```json
{ "idEjercicio": 2026 }
```

### 2. Validar Factura de Proveedor (Previo a Carga)
Verificar si la factura A-0005-12345678 del proveedor 500 ya fue cargada.

**Recurso**: `Comprobante` 

**Operación**: `Validar Existencia Externa`

**JSON Body**:

```json
{
  "IdAuxi": 500,
  "PuntoVenta": "0005",
  "NumeroComprobante": "12345678",
  "TipoIVA": "A",
  "TipoDocumento": 80 // CUIT
}
```

### 3. Listar Deuda Pendiente
Obtener todo lo que se le debe al proveedor 500.

**Recurso**: `Comprobante` 

**Operación**: `Pendientes de Pago`

**JSON Body**:

```json
{
  "idAuxi": 500,
  "fechaHasta": "2026-01-31" // Vencimientos hasta fin de mes
}
```

---

## ⚠️ Notas Técnicas
* **Clave Compuesta**: Nunca intente obtener o borrar un comprobante usando solo su ID numérico. El sistema recicla numeración por ejercicio contable. Siempre acompañe con `idEjercicio`.

* **Complejidad del CREATE**: El endpoint de creación es estricto. Si faltan cuentas contables (`idCtaPpal`) o datos fiscales, la operación fallará. Se recomienda usar plantillas predefinidas o consultar primero los valores por defecto del proveedor (`ProveedorInfo`).

* **Anulación**: La operación delete puede comportarse como una anulación lógica (marcar como anulado) o un borrado físico dependiendo del estado del comprobante (si ya fue informado a AFIP o si tiene pagos asociados).