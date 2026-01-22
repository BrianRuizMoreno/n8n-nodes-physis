# Recurso Moneda (SIGES)

El recurso **Moneda** gestiona el catálogo de divisas disponibles en la empresa.

En la arquitectura contable bimonetaria de SIGES, es crucial distinguir entre dos conceptos:
1.  **Moneda de Registro**: La moneda de curso legal del país (ej: Pesos Argentinos), obligatoria para la contabilidad fiscal.
2.  **Moneda Funcional**: La moneda utilizada para la gestión económica real y ajustes por inflación (ej: Dólar Estadounidense).

Este recurso permite consultar estas definiciones y verificar si la empresa tiene habilitado el módulo de contabilidad bimonetaria.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idMoneda` | String | Código identificador (ej: `1`, `2`, `U$S`). |
| `descripcion` | String | Nombre de la divisa (ej: "Pesos", "Dólares"). |
| `simbolo` | String | Símbolo visual (ej: `$`, `u$s`, `€`). |
| `cotizacion` | Decimal | (Contextual) Valor de cambio actual si aplica en el contexto. |

---

## 🛠 Operaciones Disponibles

### Consultas de Catálogo
* **Listar Todas** (`getAll`): Devuelve todas las monedas configuradas en el sistema.
* **Listar Monedas de Registro** (`getRegistrationCurrencies`): Obtiene solo las divisas habilitadas para registrar asientos contables legales.
* **Listar Monedas Funcionales** (`getFunctionalCurrencies`): Obtiene las divisas utilizadas para la contabilidad de gestión o secundaria.
* **Obtener por ID** (`get`): Recupera el detalle de una moneda específica (buscando en registro o funcional según el endpoint).

### Configuración del Sistema
* **Verificar Multimoneda** (`checkMultiCurrency`): Devuelve `true` si la empresa tiene instalado y activado el módulo de gestión multimoneda. Es vital consultar esto antes de intentar operaciones bimonetarias.

---

## 💡 Ejemplos de Uso

### 1. Llenar Combo de Monedas
Obtener la lista de monedas para que un usuario seleccione en qué divisa está expresado un comprobante.

**Recurso**: `Monedas` 

**Operación**: `Listar Todas`

### 2. Validar Lógica Bimonetaria
Antes de mostrar columnas en Dólares en un reporte, verificar si el sistema lo soporta.

**Recurso**: `Monedas` 

**Operación**: `Verificar Multimoneda`

**Respuesta Esperada**: `true` (o `false`)

### 3. Obtener Datos del Dólar
Consultar la configuración de la moneda funcional principal.

**Recurso**: `Monedas` 

**Operación**: `Obtener Moneda Funcional`

**Parámetro ID**: `2` (o el código correspondiente a Dólares).

---

## ⚠️ Notas Técnicas

* **IDs de Moneda**: A menudo, el sistema utiliza `1` para Pesos (Registro) y `2` para Dólares (Funcional/Extranjera), pero esto es configurable. Se recomienda no hardcodear estos IDs y obtenerlos dinámicamente o permitir que el usuario los configure.
* **Relación con Tasas**: Este recurso define *qué* monedas existen. Para saber *cuánto* valen (cotización) en una fecha, debe utilizar el recurso **Tasas** (`/api/siges/tasa` o `/indicadores`).