# Recurso Reportes Definibles (SIGES)

El recurso **Reportes Definibles** gestiona la ejecución de informes personalizados o configurables del sistema.

A diferencia de los reportes estándar (como el Libro Mayor o el IVA), los "Definibles" son plantillas de reporte creadas por el usuario o los consultores para cubrir necesidades específicas (ej: "Listado de Clientes con deuda mayor a X", "Etiquetas de Stock").

Este recurso permite consultar el catálogo de reportes disponibles y ejecutarlos para obtener el archivo PDF resultante.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idFormato` | Int | Identificador numérico único de la plantilla del reporte. |
| `idTipoFormato` | String | Código que agrupa los reportes por módulo o categoría (ej: `VTA`=Ventas, `STK`=Stock). |
| `nombre` | String | Título descriptivo del reporte definible. |

---

## 🛠 Operaciones Disponibles

### Catálogo
* **Listar Reportes** (`getAll`): Devuelve la lista de todos los formatos de impresión definidos en el sistema. Es útil para llenar un menú de "Reportes Varios" en el frontend.
    * *Nota*: Suele requerir el parámetro `IdDefinido=1` para traer el listado completo.

### Ejecución
* **Generar PDF** (`getPdf`): Ejecuta la consulta asociada a la plantilla y devuelve el archivo PDF renderizado.
    * *Requiere*: Identificar el reporte mediante el par `idTipoFormato` + `idFormato`.

### Auditoría / Metadata
* **Obtener Resumen** (`getSummary`): Consulta datos sobre una ejecución previa de un reporte (cantidad de páginas, fecha de generación), basado en el ID de reporte y conexión.

---

## 💡 Ejemplos de Uso

### 1. Obtener Menú de Reportes
Llenar una grilla con los reportes personalizados disponibles para el usuario.

**Recurso**: `ReportesDefinibles`

**Operación**: `Listar Reportes`

**Parámetros (Query)**:

* IdDefinido: `1`

### 2. Imprimir un Listado de Precios
El usuario selecciona el reporte "Lista de Precios Mayorista" (ID 50) de la categoría Ventas ("VTA").

**Recurso**: `ReportesDefinibles`  

**Operación**: `Generar PDF`

**Parámetros (Query)**:

* idtipoformato: `VTA`
* idformato: `50`

---

## ⚠️ Notas Técnicas

* **Parámetros Dinámicos**: A diferencia de los reportes estándar que tienen filtros fijos (fecha desde/hasta), los reportes definibles pueden tener filtros variables que están incrustados en la definición del `idFormato`. Este endpoint (`/pdf`) generalmente ejecuta el reporte con los parámetros por defecto o los últimos configurados, ya que no expone una interfaz genérica para pasar filtros dinámicos en la URL.
* **IdDefinido**: Según la documentación, para obtener el listado, es mandatorio enviar `IdDefinido=1`.