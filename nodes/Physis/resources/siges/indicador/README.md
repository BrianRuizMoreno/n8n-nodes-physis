# Recurso Indicador (SIGES)

El recurso **Indicador** administra los valores de cotización de monedas extranjeras y las series de índices económicos utilizados en el sistema.

Permite consultar el tipo de cambio vigente para una fecha determinada (crucial para facturar en dólares o convertir balances) y actualizar diariamente las pizarras de cotizaciones.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idIndicador` | String | Código de la moneda o índice (ej: `U$S`, `EUR`, `UVA`). |
| `idSerie` | Int | Identificador del tipo de cotización (ej: 1=Comprador, 2=Vendedor, 3=Oficial). |
| `fecha` | DateTime | Fecha de vigencia de la cotización. |
| `tasa` | Decimal | Valor numérico de la cotización o índice. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Obtener Tasa Funcional** (`getFunctionalRate`): Devuelve la cotización de la moneda funcional (base contable) de la empresa para una fecha específica.
* **Obtener Tasa de Serie** (`getSerieRate`): Busca la cotización de un indicador y serie específicos (ej: Dólar Vendedor) para una fecha.
    * *Nota*: Soporta lógica de "Fecha Anterior" si no existe cotización para el día exacto solicitado (configuración del sistema).

### Gestión (Carga)
* **Fijar/Actualizar Tasa** (`upsertRate`): Inserta una nueva cotización para el día o actualiza la existente si ya fue cargada.
    * *Uso*: Ideal para bots que leen cotizaciones de bancos centrales y las impactan automáticamente en el ERP al inicio del día.

---

## 💡 Ejemplos de Uso

### 1. Consultar Dólar Vendedor Hoy
Obtener la cotización del Dólar (ID "U$S") tipo Vendedor (Serie 2) para realizar una factura.

**Recurso**: `Tasas` 

**Operación**: `Obtener Tasa de Serie`

**Parámetros**:
* idIndicador: `U$S`
* idSerie: `2`
* fecha: `2026-01-15T00:00:00`

### 2. Obtener Cambio Contable
Consultar a cuánto debe valuarse una operación en moneda funcional.

**Recurso**: `Tasas` 

**Operación**: `Obtener Tasa Funcional`

**Parámetros (Query)**:
* fecha: `2026-01-15`

### 3. Cargar Cotización del Día (Bot)
Un proceso automático actualiza el valor del Euro a primera hora.

**Recurso**: `Tasas`  

**Operación**: `Fijar/Actualizar Tasa`

**Parámetros**:
* idIndicador: `EUR`
* idSerieMercado: `2` (Vendedor)
* tasa: `1250.50`
* fecha: `2026-01-15`

---

## ⚠️ Notas Técnicas

* **Estructura del POST**: A diferencia de otros endpoints REST estándar, la operación de carga (`POST`) recibe el valor de la `tasa` directamente en la URL (Path Parameter), no en el cuerpo del mensaje.
    * *Ruta*: `/api/siges/indicadores/{id}/serie/{serie}/tasa/{valor}`.
* **Moneda Funcional**: La "Tasa Funcional" se refiere a la moneda secundaria de gestión definida en la configuración de la empresa (generalmente Dólar estadounidense en economías inflacionarias), distinta de la moneda legal.