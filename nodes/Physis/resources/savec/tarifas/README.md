# Recurso Tarifas (SAVEC)

El recurso **Tarifas** permite administrar las tablas de costos aplicables a las labores de cosecha y servicios de acondicionamiento de granos. Agrupa dos conceptos clave:
* **Tarifas de Cosechero**: Costos pactados con contratistas por la recolección, escalonados por rendimiento (Kilos).
* **Tarifas de Secado**: Costos de servicio de secado en planta, escalonados por porcentaje de humedad.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones de **Creación**, el sistema espera un **Array de objetos JSON**.

### Tarifa Cosechero
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codCampo` | Int | Código del campo donde aplica. |
| `codCereal` | Int | Cereal cosechado (ej: 2-Soja). |
| `kilosDesde` / `kilosHasta` | Decimal | Rango de rinde (Kg/Ha) para aplicar la tarifa. |
| `tarifa` | Decimal | Precio fijo por hectárea (o unidad definida). |
| `tarifaPorKilo` | Decimal | Precio variable por kilo recolectado. |

### Tarifa Secado
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codPlanta` | Int | Planta de acopio donde aplica. |
| `codCereal` | Int | Grano a secar. |
| `humedadDesde` / `humedadHasta` | Decimal | Rango de humedad de ingreso. |
| `tarifa` | Decimal | Costo del servicio para ese rango. |

---

## 🛠 Operaciones Disponibles

### Tarifas de Cosechero
* **Listar Tarifas** (`getCosechero`): Consulta la tabla de tarifas vigente.
    * *Filtros*: `codCereal`, `codCampo`.
* **Crear Tarifas** (`createCosechero`): Define o actualiza la grilla de costos.
* **Eliminar Tarifas** (`deleteCosechero`): Borra la configuración para un campo y cereal.

### Tarifas de Secado
* **Listar Tarifas** (`getSecado`): Consulta los costos de secado.
    * *Filtros*: `codCereal`, `codPlanta`.
* **Crear Tarifas** (`createSecado`): Define o actualiza la grilla de secado.
* **Eliminar Tarifas** (`deleteSecado`): Borra la configuración de secado para una planta y cereal.

---

## 💡 Ejemplos de JSON

### Definir Tarifas de Cosecha (Escalonada)
Establece que para rendimientos bajos se paga una tarifa, y para altos otra.

**Operación**: `Crear Tarifas Cosechero`

**JSON Body**:
```json
[
  {
    "codCampo": 10,
    "codCereal": 2,
    "kilosDesde": 0,
    "kilosHasta": 2000,
    "tarifa": 45.0,
    "tarifaPorKilo": 0
  },
  {
    "codCampo": 10,
    "codCereal": 2,
    "kilosDesde": 2001,
    "kilosHasta": 5000,
    "tarifa": 42.0,
    "tarifaPorKilo": 0.01
  }
]
```
Consultar Tarifas de Secado
Ver costo de secado para Maíz en la planta principal. 

**Operación**: ``Listar Tarifas Secado`` 

**Parámetros**:

* codCereal: ``2``

* codPlanta: ``1``

## ⚠️ Notas Técnicas

* **Estructura de Envío**: A diferencia de otros recursos, las operaciones de creación (``POST``) esperan siempre una **Lista (Array)** de objetos, no un objeto único. Esto permite cargar la tabla completa de escalas en una sola petición.

* **Eliminación**: La operación ``DELETE`` no borra un renglón específico, sino que limpia toda la configuración de tarifas asociada a la combinación Campo/Planta + Cereal enviada en los parámetros.