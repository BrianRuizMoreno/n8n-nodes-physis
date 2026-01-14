# Recurso Informe (SACH)

El recurso **Informe** centraliza las herramientas de reportes y consultas analíticas del módulo de Hacienda. Su función principal es proveer información consolidada sobre la actividad comercial, con un fuerte foco en el análisis de **Comisiones** (devengadas o por comprobante) y el **Resumen de Operaciones** del período.

Permite auditar los ingresos por comisiones y obtener una visión macro del negocio mediante filtros flexibles de fecha y tipo de operación.

## 📋 Campos y Parámetros

Dependiendo de la operación, se utiliza un identificador directo o un objeto JSON que contiene los múltiples filtros para generar el reporte.

| Campo | Parámetro | Tipo | Requerido | Descripción | Operaciones donde aplica |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **ID Comprobante** | `idComprobante` | String | Sí (condicional) | Identificador único del comprobante a auditar. | `getComisionesComprobante` |
| **Filtros / Parámetros** | `jsonBody` | JSON | Sí (condicional) | Objeto con los parámetros de filtro (Fechas, Tipos, Cuentas) para el reporte. | `getComisionesDevengadas`, `getResumenOperaciones` |

---

## 🛠 Operaciones Disponibles

### 1. Gestión de Comisiones
* **Comisiones por Comprobante** (`getComisionesComprobante`): Devuelve el detalle de las comisiones calculadas y asociadas a un comprobante específico (Liquidación).
* **Reporte Comisiones Devengadas** (`getComisionesDevengadas`): Genera un informe detallado o resumido de las comisiones generadas en un período. Soporta filtros avanzados por tipo de fecha, cuentas, lugar y tipo de hacienda.

### 2. Análisis General
* **Resumen de Operaciones** (`getResumenOperaciones`): Provee un sumario de la actividad comercial entre fechas, permitiendo alternar entre fecha de operación o emisión.

---

## 💡 Ejemplos de Uso

### 1. Consultar Comisiones de una Liquidación
Verificar qué comisiones se aplicaron al comprobante ID 5500.

**Recurso**: `Informe` > **Operación**: `Comisiones por Comprobante`

**Parámetros**:
* `idComprobante`: `5500`

### 2. Reporte de Comisiones Devengadas (Mensual)
Obtener las comisiones devengadas en Enero 2024, filtradas por fecha de Operación ('O').

**Recurso**: `Informe`

**Operación**: `Reporte Comisiones Devengadas`

**JSON Body (Filtros)**:
```json
{
  "Inicio": "2024-01-01T00:00:00",
  "Fin": "2024-01-31T23:59:59",
  "QueFecha": "O",
  "TipoInforme": 1, 
  "Orden": 1,
  "TipoOperacion": "0",
  "CodigoLugar": "00"
}
```
(Nota: TipoInforme 1 = Resumido, 0 = Analítico)

### 3. Resumen de Operaciones
Ver el resumen de movimientos del último mes según fecha de emisión.

**Recurso**: ``Informe`` 

**Operación**: ``Resumen de Operaciones``

**JSON Body (Filtros)**:

```json
{
  "FechaDesde": "2024-03-01T00:00:00",
  "FechaHasta": "2024-03-31T23:59:59",
  "EsResumido": true,
  "PorFechaEmision": true
}
```

---

## ⚠️ Notas Técnicas
**Parámetro** ``QueFecha``: En el reporte de comisiones devengadas, este campo determina el criterio temporal:

* ``O``: Por Fecha de Operación.

* ``E``: Por Fecha de Emisión.

* ``V``: Por Fecha de Vencimiento.

**Filtro de Cuentas**: El parámetro ``cuentas`` en ``getComisionesDevengadas`` acepta una cadena de texto con los códigos de cuenta separados por coma (ej: ``"1001, 1002, 2005``").

**Códigos Generales**: Para indicar "Todos" en los filtros, se suelen usar los valores ``0`` (Enteros) o ``"0"`` / ``"00"`` (Strings), según el campo específico (``TipoOperacion``, ``TipoHacienda``, ``CodigoLugar``).