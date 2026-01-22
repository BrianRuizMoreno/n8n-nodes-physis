# Recurso QR (SIGES)

El recurso **QR** es una herramienta de utilidad para la **automatización de carga de comprobantes**.

En Argentina, toda factura electrónica debe contener un código QR estandarizado por AFIP que codifica los datos esenciales de la transacción. Este endpoint permite subir el archivo de la factura (PDF o Imagen), el servidor localiza y escanea dicho QR, y devuelve la información estructurada en JSON.



## 📋 Datos Extraídos

Al procesar un archivo exitosamente, el endpoint devuelve:

| Campo | Descripción |
| :--- | :--- |
| `Fecha` | Fecha de emisión del comprobante. |
| `Cuit` | CUIT del emisor. |
| `PuntoVenta` | Número de la sucursal/punto de venta. |
| `TipoComprobante` | Código AFIP (ej: 001, 006, 011). |
| `NroComprobante` | Número secuencial de la factura. |
| `Importe` | Monto total de la operación. |
| `Moneda` | Código de moneda (PES, DOL). |
| `Cotizacion` | Tipo de cambio aplicado. |
| `CodigoAutorizacion` | El CAE (Código de Autorización Electrónico). |

---

## 🛠 Operaciones Disponibles

### Procesamiento
* **Leer QR de Comprobante** (`readQr`): Envía un archivo binario al servidor para su análisis y extracción de datos.

---

## 💡 Ejemplos de Uso

### Automatización de Carga de Compras
Un flujo de n8n recibe facturas de proveedores por correo electrónico.
1.  El trigger de Email descarga el adjunto.
2.  El nodo **SIGES QR** procesa el adjunto.
3.  Con los datos devueltos (`Cuit`, `Importe`, `CAE`), el flujo busca al proveedor en la base de datos y pre-carga la factura en el sistema de Compras, evitando la carga manual y errores de tipeo.

**Recurso**: `Qr` 

**Operación**: `Leer QR de Comprobante`

**Parámetro**: 

* binaryPropertyName: `attachment_0`

* Respuesta:

```json 
{
   "ver": 1,
   "fecha": "2026-01-16",
   "cuit": 30112233445,
   "ptoVta": 4,
   "tipoCmp": 1,
   "nroCmp": 12345,
   "importe": 1500.50,
   "moneda": "PES",
   "ctz": 1,
   "codAut": 71234567890123
}
```

---

## ⚠️ Notas Técnicas

* **Calidad de Imagen**: Si se sube una imagen escaneada o foto, la calidad debe ser suficiente para que el motor de OCR/QR del servidor pueda interpretar el código. Los PDFs nativos (digitales) funcionan con 100% de precisión.
* **Privacidad**: El archivo se sube temporalmente para su procesamiento en memoria y extracción de datos.