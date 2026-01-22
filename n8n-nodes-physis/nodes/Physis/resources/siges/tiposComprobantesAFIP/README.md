# Recurso Tipos Comprobantes AFIP (SIGES)

El recurso **Tipos de Comprobantes AFIP** administra la tabla de homologación entre los comprobantes internos del ERP y la codificación oficial de la AFIP.

Es un recurso fundamental para:
1.  **Factura Electrónica**: Determina qué código (ej: 001, 006, 011) se envía al webservice de AFIP.
2.  **Libro IVA Digital**: Asegura que las compras y ventas se informen con la nomenclatura fiscal correcta.
3.  **Factura de Crédito Electrónica (FCE)**: Configura el comportamiento especial de las facturas MiPyME.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idTipoComprobanteAFIP` | String | Código interno en el sistema (ej: `FA`). |
| `iva` | String | Ámbito de aplicación: `V` (Ventas/Emitidos) o `C` (Compras/Recibidos). |
| `codigoAFIP` | String | El código numérico oficial (ej: `001` para Factura A, `006` para Factura B). |
| `letraAsociada` | String | Letra fiscal (A, B, C, E, M). |
| `facturaDeCredito` | Boolean | Indica si aplica al régimen de FCE MiPyME. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve la tabla de comprobantes configurados. Permite filtrar por ámbito (Compras o Ventas).
* **Obtener Detalle** (`get`): Recupera la configuración de un tipo específico mediante su clave compuesta.

### Gestión (ABM)
* **Crear** (`create`): Registra un nuevo tipo de comprobante (ej: Nuevos comprobantes "T" de turismo).
* **Modificar** (`update`): Actualiza códigos AFIP o descripciones.
* **Eliminar** (`delete`): Borra una configuración.

---

## 💡 Ejemplos de Uso

### 1. Listar Comprobantes de Venta
Obtener todos los códigos disponibles para emitir facturas.

**Recurso**: `TiposComprobantesAfip` 

**Operación**: `Listar Todos`

**Parámetro**: 

* ivaFilter: `Ventas (V)`

### 2. Consultar Factura A
Ver qué código de AFIP tiene asignada la "Factura A" interna.

**Recurso**: `TiposComprobantesAfip` 

**Operación**: `Obtener Detalle`

**Parámetros**:

* idTipoComprobanteAfip: `FAC-A` (o el ID interno que corresponda)
* iva: `V`

> *Respuesta*: `{ "codigoAFIP": "001", "letraAsociada": "A", ... }`

### 3. Configurar Factura de Crédito MiPyME A
Crear la definición para FCE A (Código 201).

**Recurso**: `TiposComprobantesAfip` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "iva": "V",
  "idTipoComprobanteAFIP": "FCE-A",
  "codigoAFIP": "201",
  "nombre": "Factura de Crédito Electrónica MiPyME A",
  "letraAsociada": "A",
  "facturaDeCredito": true
}
```

---

## ⚠️ Notas Técnicas
* **Clave Compuesta**: La unicidad de este recurso está dada por el par `idTipoComprobanteAFIP` + `iva`. Es posible tener el ID "FAC" tanto en Compras como en Ventas, representando cosas distintas.

* **Códigos Oficiales**: Se debe consultar la Tabla de Comprobantes de AFIP para cargar los valores correctos en `codigoAFIP`.