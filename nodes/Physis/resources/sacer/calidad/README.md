# Recurso Calidad (SACER)

Este recurso administra los parámetros analíticos (ej: Proteína, Humedad, Dañados) que determinan la calidad del grano entregado. 

Permite configurar no solo los rangos aceptables (`minimo`/`maximo`), sino también cómo estos valores impactan comercialmente (bonificaciones o rebajas) mediante **listas de intervalos**.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura. Los campos marcados con `*` son críticos.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codCalidad` | Int | ID de la calidad (0 para crear nueva). |
| `codCereal`* | Int | Código del cereal al que aplica (ej: 1 para Trigo). |
| `descripcion`* | String | Nombre del rubro (ej: "Proteína"). |
| `minimo` / `maximo` | Decimal | Rango base de tolerancia estándar. |
| `obligatoria` | Bool | Si el análisis es mandatorio en la Carta de Porte. |
| `afectaKilos` | Bool | Si genera mermas físicas en los kilos (ej: Humedad). |
| `tipoBonificacion` | Int | Define cómo se aplica el ajuste económico. |
| `listaDeIntervalo` | Array | Tabla de rangos para bonificaciones/rebajas progresivas. |

---

## 🛠 Operaciones Disponibles

### Consultas Simples
* **Listar Calidades** (`getAll`): Devuelve el listado maestro.
    * *Parámetro opcional*: `codCereal` (Filtra solo las calidades de un grano).
* **Obtener por ID** (`get`): Recupera el detalle completo de una configuración de calidad.
* **Listar por Cereal** (`getByCereal`): Endpoint específico para obtener todas las calidades vinculadas a un cereal.

### Gestión de Agrupaciones
Las agrupaciones (o "Rubros") permiten organizar múltiples calidades bajo un mismo concepto para reportes.
* **Listar Agrupaciones** (`getAgrupacionesByCereal`): Ver agrupaciones de un cereal.
* **Obtener Agrupación** (`getAgrupacion`): Detalle de una agrupación específica.

### ABM (Escritura)
* **Crear** (`create`): Da de alta un nuevo rubro de calidad.
* **Actualizar** (`update`): Modifica una configuración existente.
* **Eliminar** (`delete`): Borra una calidad (si no tiene movimientos asociados).

### 🔍 Consulta Avanzada (`tableSearch`)
Permite realizar búsquedas complejas directamente sobre la base de datos de Physis, con paginado y ordenamiento.
* **Uso**: Selecciona la operación `Consulta Tabla`.
* **Cuerpo JSON**:
    ```json
    {
      "Campos": [ "Descripcion", "CodCereal" ],
      "Paginado": { "PaginaActual": 1, "RegistrosPorPagina": 50 },
      "Filtros": [ 
        { 
          "Campo": "Descripcion", 
          "Valor": "Humedad", 
          "Operador": 8 // 8 = CONTIENE
        } 
      ]
    }
    ```

---

## 💡 Ejemplos de JSON

### Crear una Calidad de "Proteína" con Bonificación
Este ejemplo crea un rubro que bonifica si el valor supera cierto rango.

**Recurso**: `Calidad` > **Operación**: `Crear`
**JSON Body**:
```json
{
  "codCereal": 2,
  "descripcion": "Proteína Soja Campaña 24",
  "minimo": 40.0,
  "maximo": 100.0,
  "obligatoria": true,
  "afectaKilos": false,
  "esContenidoProteico": true,
  "listaDeIntervalo": [
    {
      "minimo": 40.1,
      "maximo": 42.0,
      "monto": 1.5,
      "tipoBonificacion": 1
    }
  ]
}