# Recurso Libro (SIGES)

El recurso **Libro** permite acceder a la configuración y estado de los libros contables y legales del sistema (ej: Libro Diario, IVA Ventas, IVA Compras).

Es utilizado principalmente para procesos de auditoría, cierre de periodos y generación de reportes legales, permitiendo conocer qué libros están habilitados en un ejercicio y su configuración de foliado o estado.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idLibro` | Int | Identificador numérico del libro (ej: `1` = Diario, `2` = IVA Ventas). |
| `descripcion` | String | Nombre del libro contable. |
| `idEjercicio` | Int | Ejercicio contable al que pertenece la configuración. |
| `idTipoComprobante` | Int | Filtro opcional para vincular libros con tipos de documentos. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve el listado de libros configurados para un ejercicio específico.
* **Obtener por ID** (`get`): Recupera la configuración detallada de un libro puntual dentro de un ejercicio.
* **Consultar por Fecha** (`getByDate`): Obtiene información o estado de un libro para una fecha específica. Puede utilizarse para validar si es posible registrar movimientos en esa fecha o filtrar comprobantes asociados.

---

## 💡 Ejemplos de Uso

### 1. Listar Libros del Ejercicio
Ver qué libros legales están activos y configurados para el año 2026.

**Recurso**: `Libros`  

**Operación**: `Listar Todos`

**Parámetros (Query)**:

* IdEjercicio: `2026`

### 2. Consultar Configuración del Diario
Obtener detalles del Libro Diario (ID 1) para el ejercicio actual.

**Recurso**: `Libros`  

**Operación**: `Obtener por ID`

**Parámetros**:

* IdLibro: `1` (Path)
* IdEjercicio: `2026` (Query)

### 3. Verificar Libro en una Fecha
Consultar el estado o datos del libro para el día 31 de Enero.

**Recurso**: `Libros`  

**Operación**: `Consultar por Fecha`

**Parámetros**:

* Fecha: `2026-01-31` (Path)
* IdEjercicio: `2026` (Query)

---

## ⚠️ Notas Técnicas

* **Contexto de Ejercicio**: La configuración de los libros (numeración de folios, apertura/cierre) es dependiente del `IdEjercicio`. Asegúrese de enviar siempre este parámetro para obtener la información correcta del año fiscal deseado.
* **Formatos de Fecha**: El parámetro `{Fecha}` en la ruta debe seguir el formato estándar ISO (ej: `yyyy-MM-dd`) para asegurar su correcta interpretación.