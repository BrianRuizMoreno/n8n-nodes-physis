# Recurso Mayor (SIGES)

El recurso **Mayor** permite la generación y consulta del **Libro Mayor Contable** y sus variantes analíticas.

A diferencia de un simple listado de asientos, este recurso procesa la información para presentar:
* Saldos iniciales y acumulados.
* Movimientos del periodo (Debe/Haber).
* Saldos finales.
* Desgloses por Terceros (Auxiliares) o Centros de Costos (Reagrupaciones).

Es la herramienta fundamental para el análisis contable, auditoría de balances y revisión de cuentas corrientes.

## 📋 Estructura del Reporte

El endpoint devuelve una lista de líneas de movimiento. Los campos típicos de respuesta incluyen:

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `fecha` | DateTime | Fecha del movimiento (según criterio elegido). |
| `idComprobante` | Int | Número interno del asiento. |
| `concepto` | String | Descripción del movimiento o asiento. |
| `debe` | Decimal | Importe al Debe. |
| `haber` | Decimal | Importe al Haber. |
| `saldo` | Decimal | Saldo acumulado línea a línea. |
| `idCtaPpal` | String | Código de la cuenta contable afectada. |

---

## 🛠 Operaciones Disponibles

### Generación de Informes
* **Obtener Mayor** (`getMayor`): Ejecuta el motor de reportes contables. Es altamente parametrizable para obtener distintas "vistas" de la contabilidad (Contable puro, Por Terceros, Por Reagrupación, etc.).

### Trazabilidad
* **Consultar Referenciados** (`getReferenciados`): Permite el *drill-down*. Dada una línea del Mayor (un movimiento), devuelve qué comprobantes están relacionados o cancelados por ese movimiento.
    * *Ejemplo*: Si la línea es un "Pago a Proveedor", este endpoint dice qué facturas se pagaron con ese movimiento.

---

## ⚙️ Parámetros Clave (`getMayor`)

Dado la complejidad del reporte, la combinación de estos parámetros define qué se obtiene:

### 1. `tipoInforme` (Alcance)
* `0`: **Mayor Contable** (Plan de Cuentas Principal). El reporte estándar.
* `1`: **Mayor de Auxiliares** (Cuentas Corrientes). Detalle por Cliente/Proveedor.
* `2`: **Mayor de Reagrupación Principal** (ej: Por Centro de Costos).
* `3`: **Mayor de Reagrupación Auxiliar** (ej: Por Zona Geográfica de Clientes).

### 2. `tipoSinConPor` (Nivel de Detalle)
Define cómo se cruzan las cuentas principales con las auxiliares.
* `0` (**Sin**): Solo la cuenta base.
* `1` (**Con**): Desglosa la cuenta base mostrando sus auxiliares debajo.
* `2` (**Por**): Agrupa directamente por el auxiliar.
* `3` (**Consolidado**): Resumen totalizado.

### 3. Filtros de Fechas y Moneda
* tipoFecha: `0` (Emisión/Registro), `1` (Vencimiento), `2` (Operación).
* enMonedaFuncional: `true` para ver el reporte expresado en Dólares (o moneda secundaria definida), `false` para Moneda Nacional.
* modoCampanias: `true` para filtrar por ciclo productivo (Gestión) en lugar de Ejercicio Fiscal.

---

## 💡 Ejemplos de Uso

### 1. Libro Mayor General (Ejercicio Completo)
Obtener el libro mayor oficial del ejercicio actual para todas las cuentas.

**Recurso**: `Mayor`  

**Operación**: `Obtener Mayor`

**Parámetros (Query)**:

* fechaDesde: `2026-01-01`
* fechaHasta: `2026-12-31`
* tipoInforme: `0` (Principal)
* opciones: `1` (Solo cuentas con movimientos)

### 2. Mayor de una Cuenta Específica (Caja)
Ver los movimientos de la cuenta "Caja Administración" (1.1.01.01).

**Recurso**: `Mayor` 

**Operación**: `Obtener Mayor`

**Parámetros (Query)**:

* cuentas: `1.1.01.01`
* tipoInforme: `0`

### 3. Mayor de un Proveedor Específico
Ver la ficha contable del proveedor "Juan Perez" (ID Auxiliar 500) dentro del rubro Proveedores (2.1.01).

**Recurso**: `Mayor`  

**Operación**: `Obtener Mayor`

**Parámetros (Query)**:

* tipoInforme: `1` (Auxiliar)
* idAuxi: `200` (ID del Plan de Proveedores)
* cuentas: `500` (ID del Proveedor específico)

### 4. Trazabilidad de un Asiento
El mayor muestra un pago global en la línea con `idComprobante` 9900. Queremos saber qué facturas pagó.

**Recurso**: `Mayor` 

**Operación**: `Consultar Referenciados`

**Parámetros (Query)**:
* idEjercicio: `2026`
* idComprobante: `9900`
* cuentaPpal: `2.1.01.01` (Proveedores Locales)

---

## ⚠️ Notas Técnicas

* **Performance**: Este endpoint procesa grandes volúmenes de datos. Se recomienda siempre acotar por `fechaDesde` y `fechaHasta`, y si es posible, filtrar por `cuentas` específicas para mejorar la velocidad de respuesta.
* **Fechas Sugeridas**: La API indica que `fechaDesde` y `fechaHasta` deberían sugerirse con el inicio y fin del ejercicio contable activo (`/api/siges/ejercicios/actual`) para asegurar la consistencia del saldo inicial.
* **Cuentas Múltiples**: El parámetro `cuentas` acepta un string separado por comas (ej: `"1.1.01, 1.1.02"`) para consultar varios rubros en una sola llamada.