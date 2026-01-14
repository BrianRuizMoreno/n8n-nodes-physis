# Recurso Emisión (SACH)

El recurso **Emisión** centraliza el proceso de facturación y liquidación de las operaciones de hacienda. Es el paso final del circuito comercial, donde los lotes rematados o negociados se convierten en comprobantes fiscales (Liquidaciones de Compra o Venta).

Permite realizar pre-emisiones (simulaciones para control), emisiones definitivas y anulaciones mediante contra-asientos automáticos (Notas de Crédito/Débito).

## 📋 Parámetros Principales

A diferencia de otros recursos de alta, la emisión se gestiona principalmente mediante parámetros que definen el alcance de la liquidación.

| Parámetro | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `iTipoOperacion` | Int | Tipo de movimiento: `1`=Compra, `2`=Venta, `3`=Ambas. | Sí |
| `bPreemitir` | Bool | Si es `true`, simula la operación sin grabar (Validación). | No |
| `dFechaEmision` | Date | Fecha contable del comprobante. | Sí |
| `lotesJson` | String | Cadena JSON con los IDs de lotes a incluir. | En `DeLotes` |
| `sCuentaCliente` | String | Filtrar operación por un cliente específico. | No |

---

## 🛠 Operaciones Disponibles

### 1. Generación de Liquidaciones
* **Generar Facturas** (`generar`): Proceso general de facturación aplicando filtros de operación, hacienda y lugar.
* **Generar desde Lotes** (`generarDeLotes`): Emisión específica seleccionando puntualmente qué lotes se van a liquidar.
    * *Uso*: Ideal para liquidaciones parciales.

### 2. Gestión y Anulación
* **Anular con NC/ND** (`anular`): Revierte una liquidación completa generando automáticamente la Nota de Crédito o Débito por anulación correspondiente.
    * *Requiere*: `IdComprobanteSACH` (ID de la liquidación original).

### 3. Consultas
* **Listar Liquidaciones** (`getAll`): Recupera el histórico de comprobantes emitidos (Facturas, Notas de Crédito, Notas de Débito).
    * *Filtros*: `FechaDesde`, `FechaHasta`, `Anulados`, `chkCC` (Cuentas Corrientes), etc.

---

## 💡 Ejemplos de Uso

### 1. Pre-emitir Liquidación de Venta (Simulación)
Verificar los cálculos de una liquidación de venta para los lotes seleccionados antes de confirmarla.

**Recurso**: `Emisión` > **Operación**: `Generar desde Lotes`
**Parámetros**:
* `bPreemitir`: `true`
* `iTipoOperacion`: `2` (Venta)
* `dFechaEmision`: `2024-06-15T00:00:00.000Z`
* `lotesJson`: `"[101, 102, 105]"`

### 2. Consultar Ventas del Mes
Obtener todas las liquidaciones de venta emitidas en junio.

**Recurso**: `Emisión` > **Operación**: `Listar Liquidaciones`
**Parámetros**:
* `FechaDesde`: `2024-06-01T00:00:00`
* `FechaHasta`: `2024-06-30T23:59:59`
* `chkCV`: `true` (Comprobantes de Venta)

### 3. Anular una Liquidación
Se detectó un error en la liquidación ID 5500 y se requiere anularla.

**Recurso**: `Emisión` > **Operación**: `Anular con NC/ND`
**Parámetros**:
* `IdComprobanteSACH`: `5500`
* `Observaciones`: "Error en la carga de gastos"

---

## ⚠️ Notas Técnicas

* **Pre-Emisión**: Se recomienda encarecidamente utilizar siempre `bPreemitir = true` en una primera instancia para mostrar al usuario los totales calculados. Solo confirmar con `bPreemitir = false` cuando el usuario apruebe los montos.
* **Formato JSON**: El parámetro `lotesJson` o `sLotesIncluidosJson` espera una cadena de texto que contenga un array de enteros serializado (ej: `"[1, 2, 3]"`), no un objeto JSON nativo.