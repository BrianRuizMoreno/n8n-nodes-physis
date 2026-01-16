# Recurso Cuentas de Reagrupación Auxiliar (SIGES)

El recurso **Cuentas de Reagrupación Auxiliar** administra las estructuras de clasificación secundarias para los terceros (Clientes, Proveedores, etc.).

En Physis, un mismo tercero puede estar clasificado bajo múltiples criterios simultáneamente (ej: Por Zona Geográfica, Por Actividad, Por Vendedor, Por Canal de Venta). Cada uno de estos criterios es una "Reagrupación", y este recurso gestiona los nodos (cuentas) dentro de esas jerarquías.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idAuxi` | Int | Identificador del Plan Auxiliar base (ej: 100=Clientes). |
| `idReagAuxi` | Int | Identificador del Tipo de Reagrupación (ej: 1=Zonas, 2=Actividades). |
| `idCtaReagAuxi` | String | Código jerárquico del nodo (ej: "01.01" para "Zona Norte"). |
| `nombre` | String | Descripción o etiqueta de la clasificación. |
| `imputable` | Boolean | Indica si se pueden asociar terceros a este nivel o si es solo agrupador. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Devuelve el listado plano de cuentas de reagrupación. Requiere filtrar por Plan (`idAuxi`) y Tipo (`idReagAuxi`).
* **Obtener por ID** (`get`): Recupera el detalle de una cuenta específica.
* **Vistas Jerárquicas** (`getTree`, `getTreeList`): Estructuras optimizadas para representar el árbol de clasificación en interfaces de usuario (Selectores, Menús desplegables).
* **Obtener Siguiente ID** (`getNextId`): Sugiere el próximo código disponible para crear una nueva categoría.

### Gestión (ABM)
* **Crear** (`create`): Alta de una nueva categoría o nodo de clasificación.
* **Actualizar** (`update`): Modificación de nombre u otras propiedades.
* **Eliminar** (`delete`): Baja de una categoría (Solo si no está en uso).

---

## 💡 Ejemplos de Uso

### 1. Listar Zonas de Ventas
Obtener todas las zonas geográficas definidas para el plan de Clientes.
*(Supongamos: idAuxi=100 Clientes, idReagAuxi=1 Zonas)*

**Recurso**: `CuentasReagrupacionAuxi` 

**Operación**: `Listar Todas`

**Parámetros (Query)**:
* idAuxi: `100`
* idReagAuxi: `1`

### 2. Crear una Nueva Zona "Cuyo"
Agregar una nueva región comercial.

**Recurso**: `CuentasReagrupacionAuxi` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idAuxi": 100,
  "idReagAuxi": 1,
  "idCtaReagAuxi": "05",
  "nombre": "Región Cuyo",
  "imputable": true,
  "nivel": 1
}
```

### 3. Obtener Árbol de Actividades
Para mostrar un filtro jerárquico en un reporte de ventas.

**Recurso**: `CuentasReagrupacionAuxi` 

**Operación**: `Vista Árbol (Tree)`

**Parámetros (Query)**:

* idAuxi: `100`

* idReagAuxi: `2` (Actividades)

---

## ⚠️ Notas Técnicas
* **Clave Compuesta**: La unicidad de un registro está dada por la combinación de `idAuxi` + `idReagAuxi` + `idCtaReagAuxi`. Es fundamental enviar los tres parámetros en las operaciones de búsqueda o eliminación.

* **Uso en Terceros**: Estas cuentas no reciben asientos contables directos. Se asignan a las fichas de los Terceros (`CuentasAuxi`) para permitir reportes segmentados.

* **Borrado (Delete)**: La operación de eliminación en esta API es particular ya que requiere enviar el objeto identificador en el Cuerpo (Body) de la petición, en lugar de solo en la URL.