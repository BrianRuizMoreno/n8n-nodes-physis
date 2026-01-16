# Recurso Facturas (Procesamiento PDF) (SIGES)

El recurso **Facturas** en este contexto se especializa en la gestión digital y automatizada de comprobantes de proveedores.

A diferencia del recurso *Comprobantes* o *FacturaProveedor* (que gestionan la carga manual contable), este endpoint está diseñado para flujos de **digitalización y autorización**: permite subir archivos PDF, verificar si una factura ya fue cargada en el sistema (por su CUIT y número externo) e ingresar comprobantes autorizados junto con su imagen adjunta.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `cuitEmisor` | String | CUIT del proveedor que emite la factura. |
| `puntoVenta` | String | Punto de venta del comprobante (4 o 5 dígitos). |
| `numeroExterno` | String | Número del comprobante (8 dígitos). |
| `tipoExterno` | String | Código de tipo de factura (ej: "1" para Factura A, "6" para Factura B). |
| `archivo` | String (Base64/Binary) | El contenido del archivo PDF o imagen de la factura. |
| `idAutorizante` | Int | ID del usuario que valida/autoriza el ingreso del comprobante. |

---

## 🛠 Operaciones Disponibles

### Validación y Consulta
* **Verificar Existencia** (`checkExists`): Consulta si una factura específica (definida por CUIT Emisor + Tipo + Punto Venta + Número) ya existe en la base de datos. Fundamental para evitar la carga de duplicados en procesos automáticos.
* **Leer Datos QR** (`parseQr`): (Contextual) Extrae la información fiscal contenida en el código QR de una factura electrónica.

### Gestión de Archivos y Alta
* **Subir PDF** (`uploadPdf`): Recibe el archivo físico de la factura para su almacenamiento temporal o procesamiento.
* **Autorizar e Ingresar** (`authorize`): Registra el comprobante en el sistema con estado "Autorizado", vinculando los datos contables con la imagen del documento (`archivo`).

---

## 💡 Ejemplos de Uso

### 1. Validar Duplicados antes de Cargar
Antes de permitir que un usuario suba una factura, verificar si ya está registrada.

**Recurso**: `Facturas` 

**Operación**: `Verificar Existencia`

**Parámetros (Query)**:
* CuitEmiso`: `30112233445`
* TipoExterno: `1` (Factura A)
* PuntoVenta: `0002`
* NumeroExterno: `12345678`

### 2. Ingresar Factura Autorizada
Guardar una factura que ha pasado el proceso de aprobación, adjuntando su PDF.

**Recurso**: `Facturas` 

**Operación**: `Autorizar e Ingresar`

**JSON Body**:
```json
{
  "cuitEmisor": "30112233445",
  "puntoVenta": "0002",
  "numeroExterno": "12345678",
  "importeTotal": 15000.00,
  "fechaExterno": "2026-01-15T00:00:00",
  "idAutorizante1": 10,
  "nombreArchivo": "factura_123.pdf",
  "archivo": "JVBERi0xLjQKJ..." // Base64 del PDF
}
```

---

## ⚠️ Notas Técnicas
* **Manejo de Archivos**: El endpoint de autorización espera el archivo codificado (usualmente Base64 o similar dentro del JSON), mientras que `facturas-pdf` puede aceptar `multipart/form-data`. Verifique el formato de codificación de su cliente HTTP.

* **Codificación de Tipos**: Los campos `tipoExterno` suelen referirse a los códigos de tabla de AFIP (ej: 001 = Factura A, 006 = Factura B, 011 = Factura C). Asegúrese de realizar el mapeo correcto.