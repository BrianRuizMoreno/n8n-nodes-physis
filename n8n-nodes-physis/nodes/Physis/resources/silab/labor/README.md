# Recurso Labores (SILAB)

El recurso **Labores** administra las tareas específicas que se realizan en el campo.

Es el nivel más detallado de la jerarquía de actividades. Mientras que una "Actividad" es genérica (ej: "Siembra"), la "Labor" define el método o variante precisa (ej: "Siembra Directa de Soja 1ra"). Es la entidad central sobre la que se imputan costos, insumos y maquinaria.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `IdLabor` | Int | Identificador numérico único. |
| `Descripcion` | String | Nombre específico de la tarea. |
| `IdActividad` | String | Código de la actividad padre a la que pertenece. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Labores** (`getAll`): Devuelve el maestro completo de tareas configuradas.
* **Obtener por ID** (`get`): Recupera el detalle de una labor específica.
* **Labores por Actividad** (`getByActividad`): Filtra las labores disponibles para una actividad macro dada.

---

## 💡 Ejemplos de Uso

### 1. Seleccionar Tarea Específica
El usuario eligió la actividad "Cosecha" (`COS`). Mostrar las variantes disponibles.

**Recurso**: `Labores` 

**Operación**: `Labores por Actividad`

**Parámetros (Path)**:

* IdActividad: `COS`

**Respuesta Esperada**:
* Cosecha de Trigo
* Cosecha de Soja
* Cosecha de Maíz

### 2. Exportar Maestro de Labores
Obtener todas las labores en formato CSV para análisis de costos externos.

**Recurso**: `Labores` 

**Operación**: `Listar Labores`

**Parámetros (Query)**:
* formatoRespuesta: `CSV`

---

## ⚠️ Notas Técnicas

* **Jerarquía**: 
    1. **Actividad** (Genérica - Recurso `Actividades`)
    2. **Labor** (Específica - Este recurso)
* **Uso en Partes de Trabajo**: Al reportar un trabajo de campo, se debe indicar el `IdLabor` para que el sistema sepa exactamente qué costos y cuentas contables aplicar.