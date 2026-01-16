# Recurso Billeteras (SIGES)

El recurso **Billeteras** administra la integración del ERP con plataformas de **Billeteras Digitales** (especialmente BICA).

Facilita la conciliación y el registro automático de:
1.  **Pagos QR**: Ingreso de transacciones de compra realizadas por usuarios.
2.  **Sincronización**: Envío de movimientos generados en el ERP hacia la billetera y viceversa.
3.  **Balances Diarios**: Conciliación nocturna de operaciones.

## 📋 Campos Principales

### Operación / Movimiento
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idMovimiento` | Int | ID único de la transacción. |
| `operationGroupId` | String | Identificador agrupador. Varios movimientos pueden pertenecer a una misma operación (ej: Débito en cuenta + Comisión). |
| `nombreOperacion` | String | Tipo de transacción (ej: "Compra QR"). |
| `importe` | Decimal | Monto de la operación. |
| `cuentaDebito` / `cuentaCredito` | String | CBU/CVU o identificadores de las cuentas involucradas. |
| `codigoTransaccion` | String | Hash o ID externo de la billetera. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Billeteras** (`getAll`): Devuelve las cuentas configuradas como billeteras virtuales.
* **Obtener Billetera** (`get`): Recupera datos específicos de una cuenta.

### Sincronización (ERP -> Billetera)
* **Listar Movimientos Pendientes** (`getPendingMovements`): Consulta qué movimientos internos de Physis aún no se han notificado a la plataforma externa.
* **Actualizar Estado** (`updateMovementStatus`): Confirma la sincronización.
    * *Posiciones*:
        * `1`: Marca el movimiento como "Procesado" (Estado 0 -> 1).
        * `2`: Registra la fecha/hora de envío a la API.
        * `3`: Registra la fecha/hora de confirmación bancaria.

### Integración (Billetera -> ERP)
* **Insertar Operación (QR)** (`createOperation`): Endpoint principal para inyectar ventas realizadas con QR. Agrupa movimientos por `operationGroupId` y genera el comprobante contable automáticamente.
* **Procesar Balance Diario** (`processDailyBalance`): Recibe el resumen diario del banco, verifica qué falta cargar y lo inserta.
* **Refrescar Saldos** (`refreshBalances`): Fuerza el recálculo de saldos en la tabla `MovimientosBilletera` tras el cierre diario.

---

## 💡 Ejemplos de Uso

### 1. Registrar una Compra QR
Ingresar una venta de $1500 realizada con QR.

**Recurso**: `Billeteras` 

**Operación**: `Insertar Operación (QR)`

**JSON Body**:
```json
[
  {
    "idMovimiento": 12345,
    "fecha": "2026-01-16T15:30:00Z",
    "operationGroupId": "GRP-998877",
    "nombreOperacion": "COMPRA_QR",
    "conceptoDescripcion": "Venta Mostrador",
    "importe": 1500.00,
    "cuentaDebito": "CVU-CLIENTE",
    "cuentaCredito": "CVU-COMERCIO",
    "codigoTransaccion": "TX-ABC-123"
  }
]
```


### 2. Confirmar Envío a API
Marcar el movimiento interno 500 como enviado exitosamente a la API externa.

**Recurso**: `Billeteras` 

**Operación**: `Actualizar Estado Movimiento`

**Parámetros**:

* idMov: `500`

* posicion: `2` (Setear fecha API)

---

## ⚠️ Notas Técnicas
* **OperationGroupId**: Este campo es crítico. El sistema agrupa todos los items del array que compartan este ID para generar un único asiento/comprobante contable con N pases (ej: El pago neto + el cargo por comisión + IVA comisión).

* **Conciliación**: El endpoint `processDailyBalance` es idempotente en lógica de negocio: verifica si el `operationGroupId` ya existe antes de intentar insertarlo, evitando duplicados.