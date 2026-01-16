# Recurso Comprobantes Portal Proveedores (SIGES)

El recurso **Comprobantes de Portal de Proveedores** gestiona el ciclo de vida de las facturas ingresadas a través del portal web de autogestión.

Este circuito difiere de la carga tradicional de facturas (`Facturas PDF`) en que permite una interacción bidireccional:
1.  **El Proveedor** sube su factura, ve el estado (Pendiente, Autorizada, Rechazada) y puede adjuntar documentación extra o enviar mensajes.
2.  **La Empresa** (Autorizadores) revisa los documentos, chatea con el proveedor mediante el sistema de mensajes y cambia el estado del comprobante.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idComprobanteAut` | Int | Identificador único del trámite de autorización. |
| `cuitEmisor` | String | CUIT del proveedor que carga el documento. |
| `numeroExterno` | String | Número de la factura. |
| `importeTotal` | Decimal | Monto total del comprobante. |
| `estado` | Int/Obj | Estado actual del trámite (ej: Pendiente, Aprobado). |
| `archivo` | String | Hash o identificador del archivo PDF principal asociado. |
| `mensajes` | Array | Hilo de conversación entre el proveedor y la empresa. |

---

## 🛠 Operaciones Disponibles

### Gestión de Comprobantes
* **Listar Todos** (`getAll`): Ver todos los comprobantes (con filtros por estado, proveedor, fechas).
* **Listar Propios** (`getOwn`): Ver solo los comprobantes del usuario logueado (Proveedor viendo sus facturas o Autorizador viendo sus pendientes).
* **Obtener Detalle** (`get`): Recupera la ficha completa de un comprobante.
* **Cargar Comprobante** (`create`): Registra los datos de una factura y la vincula con un archivo subido previamente.
* **Modificar / Autorizar** (`update`): Método PATCH para cambiar datos puntuales o avanzar el estado (Autorizar/Rechazar).
* **Eliminar** (`delete`): Borra un comprobante (generalmente solo si está en estados iniciales).

### Archivos y Digitalización
* **Pre-carga PDF (QR)** (`uploadPdf`): Sube un PDF, extrae automáticamente los datos del código QR (si existe) y devuelve un **Hash** necesario para crear el comprobante.
* **Gestionar Adjuntos** (`getFiles`, `uploadFiles`): Listar o agregar archivos secundarios (remitos, certificados) a un comprobante ya creado.

### Workflow y Comunicación
* **Mensajería** (`getMessages`, `addMessage`): Sistema de chat asociado al comprobante para resolver dudas ("Falta el remito", "El importe no coincide").
* **Estados** (`getStates`, `getPossibleStates`): Consulta el flujo de trabajo disponible y a qué estados puede transicionar un comprobante según el rol del usuario.

---

## 💡 Ejemplos de Uso

### 1. Circuito de Carga de Factura (Proveedor)
El proceso de alta suele ser de dos pasos para validar el archivo primero.

**Paso 1: Subir PDF y obtener Hash**
**Recurso**: `PP_Comprobantes` 

**Operación**: `Pre-carga PDF`
> *Respuesta*: `{ "hash": "abc-123", "cuitEmisor": "...", "importe": 1000 ... }`

**Paso 2: Confirmar Carga de Datos**
**Recurso**: `PP_Comprobantes` 

**Operación**: `Cargar Comprobante`

**JSON Body**:
```json
{
  "cuitEmisor": "30112233445",
  "numeroExterno": "0001-12345678",
  "importeTotal": 1000,
  "archivo": "abc-123", // Hash obtenido en Paso 1
  "observacion": "Factura por servicios de Enero"
}
```

### 2. Autorizador Revisa Pendientes
Un gerente entra para ver qué facturas debe aprobar.

**Recurso**: `PP_Comprobantes` 

**Operación**: `Listar Propios` (Endpoint /me/...)

**Parámetros (Query)**:

* idsEstados: `1` (Supongamos 1 = Pendiente de Autorización)

### 3. Solicitar Corrección al Proveedor
El autorizador rechaza una factura y deja un mensaje explicando el motivo.

* **Paso 1**: Agregar Mensaje 
    * **Recurso**: `PP_Comprobantes`  
    * **Operación**: `Mensajería: Agregar` 
    * **Body**: 
    ```json
    { "mensaje": "La factura no incluye el número de Orden de Compra solicitado." }
    ```

* **Paso 2**: Cambiar Estado a "Rechazado" 
    * **Recurso**: `PP_Comprobantes` 
    * **Operación**: `Modificar` 
    * **Body**: 
    ```json
    { "estado": 9 } ```
    (Supongamos 9 = Rechazado)

---

## ⚠️ Notas Técnicas
* **Hash de Archivo**: El campo archivo en el método **POST** (Create) no espera el binario del PDF, sino el string hash retornado por el endpoint de carga de archivos (/pdf o /archivos). Esto asegura que el archivo ya está en el servidor antes de crear el registro de base de datos.

* **Validación QR**: El endpoint /pdf intenta leer el QR de AFIP. Si tiene éxito, devuelve los datos fiscales parseados, facilitando el autocompletado del formulario en el frontend.

* **Permisos**: La visibilidad de los endpoints /me/... vs los generales depende estrictamente del rol del usuario (Proveedor vs Usuario Interno/Admin).