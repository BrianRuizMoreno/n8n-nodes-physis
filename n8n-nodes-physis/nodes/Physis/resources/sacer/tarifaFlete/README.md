# Recurso Tarifas de Flete (SACER)

El recurso **Tarifas de Flete** administra las tablas de precios logísticos del sistema. Su función principal es definir y consultar los costos de transporte (fletes) basados en distancias (kilómetros), permitiendo gestionar múltiples cuadros tarifarios según la campaña, el proveedor o la vigencia (fechas).

## 📋 Estructura de Datos (Schema)

### 1. Objeto Tabla de Tarifas (Cabecera)
Representa una lista de precios o acuerdo tarifario general.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codTabla` | Int | **0** para crear nueva. ID para consultas. |
| `codCampania` | Int | Campaña agrícola a la que aplica la tarifa. |
| `descripcion`* | String | Nombre de la tarifa (ej: "Tarifa CATAC 2026", "Flete Corto"). |
| `fechaAlta` | Date | Inicio de vigencia (ISO 8601). |
| `fechaBaja` | Date | Fin de vigencia (ISO 8601). |
| `tarifasKM` | Array | Lista de precios por tramo (ver abajo). |

### 2. Objeto Detalle KM (Item)
Define el precio específico para una distancia determinada dentro de una tabla.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `kmARecorrer`* | Int | Distancia del tramo (ej: 100 km). |
| `tarifa`* | Double | Valor monetario real a cobrar/pagar. |
| `tarifaReferencia` | Double | Valor de referencia (ej: oficial o pizarra). |

---

## 🛠 Operaciones Disponibles

### 📋 Consultas de Tablas
* **Listar Tarifas** (`getTarifasFlete`): Devuelve el listado de tablas de tarifas disponibles.
    * *Filtros*:
        * `CodCampania`: Filtrar por campaña.
        * `CodTabla`: Buscar una tabla específica.
        * `FechaRomaneo`: Buscar tarifas vigentes a una fecha dada.
        * `Todos`: **True** (trae todas, incluso vencidas) / **False** (solo vigentes).

### 🚚 Consulta de Precio (Cotizador)
* **Obtener Tarifa por KM** (`getTarifaPorKm`): Busca el precio exacto para una distancia específica dentro de una tabla.
    * *Params*: `CodTabla`, `Km`.

### ⚙️ Gestión
* **Crear / Insertar** (`createTarifasFlete`): Da de alta una nueva tabla de tarifas con todos sus tramos de kilómetros asociados.

---

## 💡 Ejemplos de Uso

### 1. Crear Nueva Lista de Precios
Alta de una tarifa de cosecha para la campaña actual con tramos definidos.

**Recurso**: `TarifasFlete`

**Operación**: `Crear`

**JSON Body**:
```json
{
  "codTabla": 0,
  "codCampania": 25,
  "descripcion": "Tarifa Cosecha Gruesa 2026",
  "fechaAlta": "2026-01-01T00:00:00.000Z",
  "fechaBaja": "2026-12-31T23:59:59.000Z",
  "tarifasKM": [
    {
      "kmARecorrer": 50,
      "tarifa": 5000.00,
      "tarifaReferencia": 4800.00
    },
    {
      "kmARecorrer": 100,
      "tarifa": 8500.00,
      "tarifaReferencia": 8200.00
    }
  ]
}
```
### 2. Cotizar un Viaje
El sistema necesita saber cuánto pagar por un viaje de 120 km usando la tabla de tarifa ID 5.

**Recurso**: `TarifasFlete`

**Operación**: `Obtener Tarifa por KM`

**Parámetros**:

* CodTabla: `5`

* Km: `120`

### 3. Listar Tarifas Vigentes
Obtener las tablas de precios activas para la fecha de un romaneo (13 de Enero 2026).

**Recurso**: `TarifasFlete`

**Operación**: `Listar Tarifas`

**Parámetros**:

* FechaRomaneo: `2026-01-13T00:00:00.000Z`

* Todos: `false`

---

## ⚠️ Notas Técnicas
**Búsqueda por KM**: La operación `getTarifaPorKm` no requiere que el kilometraje exacto exista en la tabla. El backend aplicará la lógica de negocio para encontrar el tramo o intervalo correspondiente al valor enviado en el parámetro `Km`.

**Vigencia de Tarifas**: El filtro `Todos=false` utiliza `fechaAlta` y `fechaBaja` contra la FechaRomaneo (o la fecha actual si se omite) para determinar qué tarifas mostrar.