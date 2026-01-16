# Recurso Conceptos IVA (SIGES)

El recurso **Conceptos IVA** administra la tabla de tasas impositivas del Impuesto al Valor Agregado.

Es utilizado por los Artículos y Conceptos de Facturación para determinar cómo se calcula el impuesto en los comprobantes. Define no solo el porcentaje, sino también si el concepto es "Gravado", "Exento" o "No Gravado".

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idConceptoIVA` | Int | Identificador único (ej: 1, 2, 3). |
| `nombre` | String | Descripción (ej: "IVA General 21%"). |
| `alicuota` | Decimal | El porcentaje del impuesto (ej: `21.00`, `10.50`). |
| `tipo` | String | `G`=Gravado, `E`=Exento, `N`=No Gravado. |
| `impuestosInternos` | Boolean | Indica si sobre este concepto aplican impuestos internos. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve todas las tasas disponibles.
* **Obtener Detalle** (`get`): Consulta la configuración de una tasa específica.

### Gestión (ABM)
* **Crear** (`create`): Permite dar de alta nuevas tasas (ej: IVA 27% para servicios públicos).
* **Modificar** (`update`): Actualiza descripciones o atributos secundarios.
* **Eliminar** (`delete`): Borra una tasa (si no está siendo usada en artículos/comprobantes).

---

## 💡 Ejemplos de Uso

### 1. Listar Tasas para un Combo
Obtener las opciones de IVA para cargar un nuevo producto.

**Recurso**: `ConceptosIVA` 

**Operación**: `Listar Todos`

### 2. Crear Tasa Reducida
Configurar la tasa del 10.5% para bienes de capital.

**Recurso**: `ConceptosIVA` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "nombre": "IVA Reducido 10.5%",
  "alicuota": 10.5,
  "tipo": "G",
  "clase": "N",
  "acrecentamientoRNI": true,
  "percepcionIB": true
}
```

---

## ⚠️ Notas Técnicas
* **Parámetro DELETE**: A diferencia de la mayoría de los recursos REST estándar, la operación de eliminación espera el ID como un parámetro en la Query String (**DELETE** `/conceptos-IVA?idConceptoIVA=1`) en lugar de en la ruta.

* **Tipo**: Es fundamental definir correctamente el campo tipo (G/E/N), ya que esto dispara el comportamiento de los libros de IVA Digital de AFIP.