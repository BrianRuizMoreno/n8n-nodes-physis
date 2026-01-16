# Recurso Reportes Compartidos (SIGES)

El recurso **Reportes Compartidos** administra el repositorio de documentos estáticos (PDFs) del sistema.

Permite dos funciones principales:
1.  **Recuperación de Comprobantes**: Obtener la impresión oficial de una factura o movimiento basada en su ID contable.
2.  **Bandeja de Reportes Publicados**: Un sistema de almacenamiento donde los usuarios pueden "publicar" reportes (ej: Un Balance cerrado, un listado de stock) y compartirlos con otros usuarios o grupos de trabajo.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | Long (Int64) | Identificador único del reporte compartido. |
| `titulo` / `descripcion` | String | Metadatos descriptivos del archivo. |
| `grupo` | String | Categoría o carpeta lógica del reporte (ej: "Contabilidad", "Ventas"). |
| `fecha` | DateTime | Fecha de publicación del documento. |
| `idUsuario` | Int | Propietario o creador del reporte. |

---

## 🛠 Operaciones Disponibles

### Documentos Estándar (Sistema)
Endpoints para obtener impresiones oficiales de transacciones.
* **PDF Comprobante** (`getVoucherPdf`): Devuelve el PDF de un comprobante específico buscando por Ejercicio e ID.
    * *Nota*: Soporta lógica específica para módulos de Insumos/Ganadería mediante `IdCabecera`.
* **PDF por Link** (`getPdfByLink`): Recupera un documento mediante un token o enlace único (útil para accesos directos o correos).
* **Generación Batch** (`generatePdfs`): Fuerza la generación y guardado en disco de una serie de comprobantes (Operación administrativa `PUT`).

### Gestión de Reportes Compartidos (Repositorio)
* **Listar Reportes** (`getAll`): Búsqueda avanzada de documentos publicados. Permite filtrar por texto, fechas, grupo y usuario.
    * *Importante*: Posee un flag `incluirPdf` para decidir si descargar el binario en el listado (ver Notas Técnicas).
* **Obtener Metadatos** (`get`): Recupera la información de un reporte (quién lo subió, cuándo, descripción) sin necesariamente descargar el archivo.
* **Descargar Archivo** (`getPdf`): Obtiene el stream binario del PDF asociado a un reporte compartido.
* **Eliminar** (`delete`): Borra un reporte del repositorio.

### Grupos y Permisos
* **Listar Grupos** (`getGroups`): Devuelve las categorías existentes (carpetas) para organizar la visualización.
* **Usuarios con Acceso** (`getUsers`): Informa qué usuarios tienen permiso para visualizar un reporte específico.

---

## 💡 Ejemplos de Uso

### 1. Buscar Reportes de "Balance"
Buscar todos los documentos compartidos en el grupo "Contabilidad" que mencionen "Balance" en el último mes.

**Recurso**: `ReportesCompartidos` 

**Operación**: `Listar Reportes`

**Parámetros (Query)**:

* grupo: `Contabilidad`
* texto: `Balance`
* fechaDesde: `2026-01-01`
* incluirPdf: `false` (Solo quiero ver la lista, no descargar los archivos aún).

### 2. Descargar un PDF específico
Una vez obtenido el ID del listado anterior (ej: ID 999), descargar el archivo.

**Recurso**: `ReportesCompartidos` 

**Operación**: `Descargar Archivo`

**Parámetro (Path)**: 

*id: `999`

### 3. Obtener Factura Original
Recuperar el PDF de la factura de venta interna n° 5000 del ejercicio 2026.

**Recurso**: `ReportesCompartidos`  

**Operación**: `PDF Comprobante`

**Parámetros (Query)**:

* IdEjercicio: `2026`
* IdComprobante: `5000`

---

## ⚠️ Notas Técnicas

* **Performance y `incluirPdf`**: En el endpoint de listado (`/reportes-compartidos`), el parámetro `incluirPdf` viene en `false` por defecto. **Se recomienda mantenerlo así**.
    * Si se envía en `true`, el servidor devolverá el contenido binario (Base64 o bytes) de *todos* los PDFs encontrados en la lista. Esto puede generar respuestas de cientos de Megabytes y colapsar la conexión si hay muchos resultados.
    * La buena práctica es: Listar con `incluirPdf=false` -> Obtener ID -> Descargar individualmente con `/pdf`.
* **IdCabecera vs IdComprobante**: Para comprobantes contables estándar se usa `IdComprobante`. Para movimientos de stock, insumos o ganadería que tienen estructuras de cabecera/detalle complejas, se suele utilizar `IdCabecera` y dejar `IdComprobante` en 0.