# Recurso Retenciones (SIGES)

El recurso **Retenciones** administra la configuración fiscal y el estado de los certificados impositivos emitidos por la empresa.

En el sistema tributario argentino, al realizar pagos a proveedores, la empresa actúa a menudo como Agente de Retención (Ganancias, IVA, Ingresos Brutos, SUSS). Este recurso permite:
1.  Consultar qué regímenes aplican a determinadas cuentas contables.
2.  Verificar si el certificado legal que respalda esa retención es válido (Emitido) o fue cancelado (Anulado).

## 🛠 Operaciones Disponibles

### Configuración Fiscal
* **Listar Regímenes de Retención** (`getRegimes`): Devuelve las tablas de regímenes configuradas en el sistema (ej: "Regimen 78 - Enajenación de bienes muebles").

### Auditoría
* **Verificar Estado Certificado** (`checkCertificateStatus`): Dado un comprobante de pago (Orden de Pago), indica si sus certificados de retención están vigentes.

---

## 💡 Ejemplos de Uso

### 1. Consultar Regímenes de Ganancias
Obtener la lista de códigos de régimen para configurar un proveedor nuevo.

**Recurso**: `Retenciones` 

**Operación**: `Listar Regímenes de Retención`

### 2. Validar Certificado antes de Enviar
Antes de enviar el PDF de retención al proveedor por email, verificar que no haya sido anulado.

**Recurso**: `Retenciones` 

**Operación**: `Verificar Estado Certificado`

**Parámetros**:

* idEjercicio: `2026`
* idComprobante: `9955` (ID de la Orden de Pago)

> *Respuesta*: `{ "estado": true }` (Donde true = Emitido/Vigente).

---

## ⚠️ Notas Técnicas

* **Respuesta Booleana**: La operación `checkCertificateStatus` devuelve directamente un valor booleano (`true`/`false`) desde la API. El nodo de n8n lo envuelve en un objeto JSON `{ "estado": true }` para mantener la consistencia del flujo de datos.