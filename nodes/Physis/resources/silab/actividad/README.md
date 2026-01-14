# Recurso Actividades (SILAB)

El recurso **Actividades** administra el maestro de labores, tareas o ensayos gestionados dentro del módulo de Laboratorio y Agricultura (SILAB).

Estas actividades tipifican las acciones que se pueden realizar sobre los lotes o muestras (ej: "Siembra", "Cosecha", "Análisis de Suelo", "Pulverización"). Es un recurso fundamental para clasificar los partes de trabajo y los resultados de laboratorio.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `IdActividad` | String | Código identificador de la actividad (ej: "SIE", "COS"). |
| `Descripcion` | String | Nombre de la labor (ej: "Siembra de Soja"). |
| `CodCereal` | Int | Código del cultivo asociado (si aplica). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Devuelve el catálogo de actividades disponibles.
    * *Filtros*: `Aplicacion`, `SoloNoImputables`.
    * *Opciones*: `reducido` (para optimizar la carga en selectores/combos).
* **Obtener por ID** (`get`): Recupera el detalle de una actividad específica.
* **Consultar Lotes Asociados** (`getLotes`): Devuelve los lotes de campo donde se realizó una actividad en una fecha específica.

---

## 💡 Ejemplos de Uso

### 1. Listar Actividades (Optimizado para Selectores)
Obtener una lista ligera (solo ID y Descripción) para llenar un combo de "Tipo de Labor" en una App Móvil.

**Recurso**: `Actividades` 

**Operación**: `Listar Todas`

**Parámetros (Query)**:
* reducido: `true`

**Respuesta Esperada (Ejemplo)**:
```json
[
  { "IdActividad": "PUL", "Descripcion": "Pulverización", "CodCereal": 0 },
  { "IdActividad": "COS", "Descripcion": "Cosecha", "CodCereal": 1 }
]
```

### 2. Consultar Lotes Trabajados
Averiguar en qué lotes del campo "La Estancia" (CodCampo 5) se realizó una "Siembra" (Actividad SIE) el día 10 de Octubre de 2025.

**Recurso**: ``Actividades`` 

**Operación**: ``Consultar Lotes Asociados``

**Parámetros**:

* IdActividad: ``SIE``

* Fecha: ``2025-10-10``

* CodCampo: ``5``

* CodCampania: ``2526`` (Campaña 2025/2026)

⚠️ Notas Técnicas
* **Parámetro reducido**: Se recomienda encarecidamente usar ``reducido``=``true`` cuando se necesita poblar listas desplegables, ya que evita la transmisión de metadatos pesados o configuraciones internas de la actividad que no son relevantes para la selección simple.

* **Formatos de Respuesta**: Este recurso soporta exportación directa mediante el parámetro ``formatoRespuesta`` (ej: CSV, TSV), útil para integraciones de datos masivos sin procesar JSON.