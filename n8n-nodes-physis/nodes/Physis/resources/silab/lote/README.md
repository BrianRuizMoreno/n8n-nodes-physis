# Recurso Lotes (SILAB)

El recurso **Lotes** administra la unidad mínima de producción agrícola.

En la estructura jerárquica de SILAB, los Lotes son las subdivisiones de los **Campos**. Es aquí donde se define la superficie productiva (hectáreas), se asignan los cultivos y se imputan los costos directos de las labores.

## 📋 Estructura Jerárquica

La organización geográfica en SILAB sigue este orden:
1.  **Zona** (Región)
2.  **Campo** (Establecimiento/Propiedad)
3.  **Lote** (Unidad de Manejo/Producción)

## 🛠 Operaciones Disponibles

### Consultas Planas
* **Listar Lotes** (`getAll`): Devuelve una lista plana de lotes.
    * *Filtros*: `CodCampo` (Para ver solo los lotes de un establecimiento específico).
* **Obtener por ID** (`get`): Recupera el detalle técnico de un lote individual.
* **Lotes por Actividad** (`getByActividad`): Devuelve los lotes donde se ha planificado o realizado una actividad específica (ej: "¿En qué lotes se hizo Siembra?").

### Consultas Jerárquicas (Tree)
Estas operaciones están optimizadas para generar árboles de navegación visuales (UI) o selectores anidados.

* **Árbol Estructural** (`getTree`): Devuelve la estructura completa *Zona > Campo > Lote*.
* **Árbol con Actividades** (`getTreeWithActivities`): Devuelve la estructura jerárquica enriquecida con las actividades asignadas para una **Campaña** específica. Ideal para tableros de planificación.

---

## 💡 Ejemplos de Uso

### 1. Listar Lotes de un Campo
Obtener todos los lotes productivos del campo "La Estancia" (Código 50).

**Recurso**: `Lotes` > **Operación**: `Listar Lotes`

**Parámetros (Query)**:
* `CodCampo`: `50`

### 2. Generar Selector de Lotes (Árbol)
Obtener la estructura completa para llenar un menú lateral de navegación en una App.

**Recurso**: `Lotes`  

**Operación**: `Árbol Estructural`

**Respuesta Esperada (Estructura simplificada)**:
```json
[
  {
    "Tipo": "Zona",
    "Nombre": "Zona Norte",
    "Hijos": [
      {
        "Tipo": "Campo",
        "Nombre": "La Estancia",
        "Hijos": [
          { "Tipo": "Lote", "Nombre": "Lote 1 - Molino", "Id": 101 },
          { "Tipo": "Lote", "Nombre": "Lote 2 - Bajo", "Id": 102 }
        ]
      }
    ]
  }
]
```

### 3. Consultar Lotes Sembrados
Ver en qué lotes hay actividad de Siembra ("SIE") en la campaña actual (2526).

**Recurso**: ``Lotes`` 

**Operación**: ``Lotes por Actividad``

**Parámetros**:

* IdActividad: ``SIE``

* CodCampania: ``2526``

---

## ⚠️ Notas Técnicas
* **Formatos de Respuesta**: La operación de listado plano soporta ``formatoRespuesta`` (CSV, TSV), útil para exportar la superficie productiva a planillas de cálculo.

* **Contexto de Campaña**: La operación ``getTreeWithActivities`` requiere obligatoriamente el ``CodCampania``, ya que las actividades asignadas a un lote cambian año a año (rotación de cultivos).