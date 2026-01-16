# Recurso Imágen (SIGES)

El recurso **Imágen** permite la gestión documental digital asociada a los comprobantes contables.

Cubre dos funciones principales:
1.  **Adjuntos (Imágenes)**: Subir, listar y descargar archivos que el usuario adjunta a un comprobante (ej: scan de una factura de proveedor, foto de un remito).
2.  **Reportes PDF**: Descargar versiones imprimibles oficiales generadas por el sistema (PDF del Asiento, Certificados de Retención, Liquidaciones Pecuarias, etc.).

## 📋 Campos Principales

### Objeto Imagen (Adjunto)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idImagen` | Int | Identificador único del archivo adjunto. |
| `descripcion` | String | Nota o título del archivo (ej: "Factura escaneada"). |
| `extension` | String | Tipo de archivo (ej: `.pdf`, `.jpg`, `.png`). |
| `imagen` | String (Base64) | El contenido binario del archivo codificado. |

### Claves de Vinculación
Para cualquier operación, es obligatorio identificar el comprobante dueño del archivo:
* `idEjercicio`: Año contable.
* `idComprobante`: ID del asiento/documento.

---

## 🛠 Operaciones Disponibles

### Gestión de Adjuntos (User Uploads)
Estas operaciones administran los archivos subidos por los usuarios a la carpeta de imágenes del servidor.
* **Listar Imágenes** (`getAll`): Devuelve la lista de archivos adjuntos a un comprobante específico.
* **Obtener Imagen** (`get`): Descarga el contenido de un archivo específico (`idImagen`).
* **Subir Imagen** (`create`): Adjunta un nuevo archivo a un comprobante.
    * *Params*: Requiere `extension` y `descripcion`. El contenido va en el Body.
* **Actualizar Imagen** (`update`): Modifica los metadatos o el contenido de un adjunto existente.
* **Eliminar Imagen** (`delete`): Borra un archivo adjunto.

### Descarga de Documentos (System Generated)
Endpoints de solo lectura para obtener PDFs generados por el sistema.
* **PDF Comprobante** (`getPdf`): La impresión estándar del comprobante/asiento.
* **PDF AFIP** (`getPdfAfip`): Para liquidaciones del sector pecuario o documentos electrónicos autorizados.
* **PDF Certificados** (`getCertificadosPdf`): Permite descargar el comprobante de retención (Ganancias, IVA, SUSS) generado al emitir un pago.
    * *Nota*: Requiere primero listar los certificados (`getCertificados`) para obtener el `idSecuencia` necesario para la descarga.
* **PDF Orden de Pago/Compra** (`getPdfOprc`): Detalle específico para circuitos de compras.

---

## 💡 Ejemplos de Uso

### 1. Adjuntar Scan de Factura
Guardar una copia digital de la factura del proveedor en el sistema.

**Recurso**: `Imágenes` 

**Operación**: `Subir Imagen`

**Parámetros (Query)**:
* IdEjercicio: `2026`
* IdComprobante: `5000`
* extension: `.jpg`
* descripcion: "Original Firmado"

**Body**: (Contenido binario o Base64 del archivo).

### 2. Descargar Certificado de Retención
Recuperar el PDF de retención de Ganancias para enviárselo a un proveedor.

**Paso 1: Listar Certificados**
`GET .../ejercicios/2026/comprobantes/8800/certificados`
> *Respuesta*: `[ { "idSecuencia": 1, "impuesto": "Ganancias", ... } ]`

**Paso 2: Descargar PDF**
**Recurso**: `Imágenes` 

**Operación**: `PDF Certificado`

**Parámetros (Path)**:
* idEjercicio: `2026`
* idComprobante: `8800`
* idSecuencia: `1`

### 3. Ver PDF del Asiento
Obtener la vista imprimible de una Orden de Pago.

**Recurso**: `Imágenes` 

**Operación**: `PDF Comprobante`

---

## ⚠️ Notas Técnicas

* **Codificación**: Al subir imágenes (`POST`/`PUT`), el sistema espera que el archivo sea enviado en el cuerpo de la petición. Dependiendo de la configuración del servidor, esto puede ser un JSON con un campo Base64 o el stream binario directo. Revise la cabecera `Content-Type`.
* **Formatos**: Aunque el recurso se llama "Imágenes", el campo `extension` permite gestionar PDFs, Excel u otros documentos adjuntos, siempre que el visualizador del cliente lo soporte.