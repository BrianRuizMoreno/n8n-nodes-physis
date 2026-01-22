# Recurso BI (Business Intelligence) (SIGES)

El recurso **BI** administra las herramientas de Análisis Multidimensional y persistencia de interfaz de usuario del sistema SIGES.

Sus funciones se dividen en dos áreas:
1.  **Tableros (Dashboards)**: Gestiona las definiciones de reportes dinámicos tipo cubo OLAP (Pivoteo, Gráficos, Series).
2.  **Configuración de Grillas**: Permite guardar y recuperar el estado visual de las tablas del sistema (AgGrid), recordando qué columnas están visibles, su orden, ancho y agrupamiento.



## 📋 Campos Principales

### Tablero
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `origen` | Int | Módulo funcional (Ventas, Compras, Stock) al que pertenece el análisis. |
| `idTablero` | Int | ID del reporte configurado. |
| `nombre` | String | Título del análisis (ej: "Ventas por Zona y Vendedor"). |
| `columnas` | String | Definición JSON de las dimensiones y métricas del cubo. |
| `pivotMode` | Boolean | Indica si la vista por defecto es una tabla dinámica. |

### Grilla (AgGrid)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `grilla` | String | ID de texto único de la pantalla/tabla (ej: `gridClientes`). |
| `columnas` | String | JSON estado de AgGrid (ColumnState). |

---

## 🛠 Operaciones Disponibles

### Análisis Multidimensional
* **Listar Tableros** (`listDashboards`): Muestra qué análisis están pre-configurados para el usuario.
* **Obtener Datos** (`getDashboardData`): Ejecuta el tablero, devolviendo tanto la configuración visual como los datos crudos para poblar el cubo.
* **Crear / Actualizar** (`createDashboard`, `updateDashboard`): Permite guardar nuevas vistas de análisis creadas por el usuario.

### Persistencia de UI (AgGrid)
* **Obtener Configuración** (`getGridConfig`): Recupera cómo el usuario prefiere ver una tabla específica (orden de columnas, filtros guardados).
* **Guardar Configuración** (`updateGridConfig`): Guarda el estado actual de la grilla para futuras sesiones.

---

## 💡 Ejemplos de Uso

### 1. Cargar Tablero de Ventas
Obtener el análisis de ventas anual (ID Tablero 10) del módulo Ventas (Origen 1).

**Recurso**: `BI`  

**Operación**: `Obtener Datos de Tablero`

**Parámetros**:

* Origen: `1`
* IdGrupo: `1`
* IdTablero: `10`
* FechaDesde: `2025-01-01`

### 2. Guardar Preferencia de Grilla de Clientes
El usuario ocultó la columna "Fecha Alta" y movió "Saldo" al principio en el listado de clientes. Guardar este estado.

**Recurso**: `BI`  

**Operación**: `Guardar Configuración Grilla`

**Parámetros**:

* grillaName: `frmClientes_Grid`
* origen`: 1`

**JSON Body**:
```json
{
  "columnas": "[{\"colId\":\"saldo\",\"width\":100,\"hide\":false}, ...]",
  "guardarCambios": true
}
```

---

## ⚠️ Notas Técnicas
**Origen**: Es un discriminador clave. `Origen = 0` suele traer configuraciones globales, mientras que `valores > 0` filtran por subsistemas específicos.

**Strings JSON**: Tanto en tableros (`columnas`, `grafico1`) como en grillas, el sistema almacena configuraciones complejas de UI como strings serializados dentro del objeto JSON principal. El frontend es responsable de parsear estos strings para reconstruir la vista.