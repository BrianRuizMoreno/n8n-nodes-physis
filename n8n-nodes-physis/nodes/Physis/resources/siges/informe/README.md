# Recurso Informes (SIGES)

El recurso **Informe** centraliza las herramientas de análisis de cuentas corrientes en SIGES.

Permite obtener la "foto" financiera de un cliente o proveedor, respondiendo preguntas clave como:
* ¿Qué me debe este cliente hoy? (**Composición de Saldos**)
* ¿Qué movimientos tuvo este proveedor en el último año? (**Resumen de Cuenta**)
* ¿Cómo se aplicó un pago a una factura específica? (**Afectaciones**)

Además, permite generar PDFs de documentos internos como listados de valores (cheques) asociados a un comprobante.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idAuxi` / `idCtaAuxi` | Int/String | Identificador del tercero (Cliente/Proveedor) a consultar. |
| `fechaDesde` / `Hasta` | DateString | Rango de fechas para el informe (Formato `yyyy-MM-dd`). |
| `multimoneda` | Boolean | Define si el reporte se expresa en Moneda de Registro ($) o Moneda Funcional (U$S). |
| `cancelados` | Boolean | Filtro para ver deuda pendiente o historial completo (ver notas técnicas). |

---

## 🛠 Operaciones Disponibles

### Análisis de Cuenta Corriente
* **Resumen de Cuenta** (`getResumenCuenta`): Devuelve el listado cronológico de movimientos (Debe/Haber/Saldo) de un tercero en un rango de fechas. Es el equivalente al "Extracto de Cuenta".
* **Composición de Saldos** (`getComposicionSaldos`): Devuelve el detalle de las facturas o comprobantes que componen el saldo actual (Deuda pendiente o a favor). Permite filtrar por fechas de vencimiento.
* **Composición Reagrupada** (`getComposicionSaldosReagrupados`): Similar al anterior, pero permite consultar deuda acumulada por agrupadores (ej: Por Zona, Por Vendedor).

### Detalle y Trazabilidad
* **Detalle de Afectación** (`getAfectacionDetalle`): Muestra cómo se vinculan los comprobantes entre sí (ej: Qué facturas canceló el Recibo X, o con qué pago se canceló la Factura Y).
* **Información Comercial** (`getInfoComercial`): Reporte específico para el módulo de consignatarios con datos de comportamiento comercial.

### Generación de PDFs
* **PDF Valores** (`getValoresPdf`): Genera un archivo PDF con el detalle de los valores (cheques, efectivos) involucrados en un comprobante.
* **PDF Afectaciones** (`getAfectacionesPdf`): Genera un archivo PDF visualizando las imputaciones de un comprobante.

---

## 💡 Ejemplos de Uso

### 1. Consultar Deuda Pendiente (Aging)
Saber qué facturas debe el cliente "Juan Perez" (ID 500) al día de hoy.

**Recurso**: `Informes`  

**Operación**: `Composición de Saldos`

**Parámetros (Query)**:

* idAuxi: `500`
* cancelados: `true` (Ver nota técnica: en este endpoint true suele filtrar para ver solo lo "vivo" o pendiente, dependiendo de la versión).
* multimoneda: `false` (Pesos)

### 2. Obtener Extracto Histórico
Enviar al cliente los movimientos del último mes para conciliación.

**Recurso**: `Informes`  

**Operación**: `Resumen de Cuenta`

**Parámetros (Query)**:

* idAuxi: `500`
* fechaDesde: `2026-01-01`
* fechaHasta: `2026-01-31`

### 3. Trazabilidad de un Recibo
Entender qué facturas mató el Recibo #8899.

**Recurso**: `Informes`  

**Operación**: `Detalle de Afectación`

**Parámetros (Path)**:

* idComprobante: `8899`

---

## ⚠️ Notas Técnicas

* **Lógica del parámetro `cancelados`**: En el endpoint de *Composición de Saldos*, el booleano suele funcionar de manera inversa a la intuición en algunas versiones de la API:
    * `false` (Default): Incluye comprobantes cancelados (pagados). Trae TODO el histórico.
    * `true`: Trae **solo los pendientes** (Comprobantes NO cancelados).
    * *Recomendación*: Para ver "Cuánto me deben", usar `true`. Para auditoría, usar `false`.
* **Fechas**: El formato estándar para los parámetros string de fecha es `yyyy-MM-dd` (ej: `2026-01-15`).
* **Seguridad**: Si el usuario que consulta no es Administrador, el sistema restringirá los resultados únicamente a la Cuenta Auxiliar vinculada a su usuario (Portal de Clientes).