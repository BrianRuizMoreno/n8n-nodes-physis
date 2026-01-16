# Recurso Vencimientos (SIGES)

El recurso **Vencimientos** proporciona herramientas analíticas para la gestión de deudas y créditos (Cuentas a Cobrar y a Pagar).

A diferencia de un listado plano de facturas, este endpoint (`vencimientos-reagrupados`) devuelve la información **sumarizada** por dimensiones de negocio. Es ideal para tableros de control o reportes de Cash Flow proyectado.



## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idAuxi` | Int | El universo de cuentas a analizar (Clientes, Proveedores). |
| `idReagAuxi` | Int | La dimensión por la cual agrupar (Zona, Canal, Vendedor). |
| `fechaDesde` | String | Fecha de corte. Formato requerido por API: `YYYYMMDD`. |

---

## 🛠 Operaciones Disponibles

### Análisis
* **Obtener Vencimientos Reagrupados** (`getGroupedMaturities`): Devuelve los saldos vencidos y a vencer organizados por la agrupación solicitada.

---

## 💡 Ejemplos de Uso

### 1. Deuda de Clientes por Zona Geográfica
Saber cuánto me deben los clientes, agrupado por Zonas, desde el 1ro de Enero de 2026.
*(Supuestos: ID Auxi 100 es Clientes, ID Reagrupación 10 es Zonas)*.

**Recurso**: `Vencimientos` 

**Operación**: `Obtener Vencimientos Reagrupados`

**Parámetros**:

* idAuxi: `100`
* idReagAuxi: `10`
* fechaDesde: `2026-01-01`

> *Respuesta Esperada*:
> ```json
> [
>   { "codigo": "ZN", "nombre": "Zona Norte", "vencido": 50000, "aVencer": 120000 },
>   { "codigo": "ZS", "nombre": "Zona Sur", "vencido": 10000, "aVencer": 45000 }
> ]
> ```

### 2. Pagos a Proveedores por Rubro
Analizar vencimientos de proveedores agrupados por "Tipo de Gasto" (ej: Insumos, Servicios, Impuestos).
*(Supuestos: ID Auxi 200 es Proveedores, ID Reagrupación 5 es Rubros)*.

**Recurso**: `Vencimientos` 

**Operación**: `Obtener Vencimientos Reagrupados`

**Parámetros**:

* idAuxi: `200`
* idReagAuxi: `5`
* fechaDesde: `2026-02-01`

---

## ⚠️ Notas Técnicas

* **Formato de Fecha**: Aunque en n8n selecciones una fecha (ISO 8601), el handler intentará convertirla automáticamente al formato estricto que pide la API (`YYYYMMDD`).
* **Performance**: Este endpoint realiza cálculos en tiempo real sobre la cuenta corriente. Para rangos de fechas muy amplios o bases de datos con millones de comprobantes, la respuesta podría demorar unos segundos.