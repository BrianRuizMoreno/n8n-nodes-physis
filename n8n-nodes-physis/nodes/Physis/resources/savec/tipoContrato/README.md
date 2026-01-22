# Recurso Tipo de Contrato (SAVEC)

El recurso **Tipo de Contrato** administra las clasificaciones disponibles para los acuerdos de granos. Define el comportamiento comercial y administrativo de cada contrato, estableciendo reglas clave como si admite fijaciones de precio posteriores, si requiere emisión de certificados o si corresponde a una operación de exportación.

Permite estandarizar la operatoria clasificando los negocios (ej: "A Fijar", "Precio Hecho", "Canje", "Exportación").

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `tipoContrato` | Int | Código identificador (0 para crear uno nuevo). | Sí |
| `descripcion` | String | Nombre de la clasificación (ej: "Compra a Fijar"). | Sí |
| `fijaciones` | Bool | Indica si el contrato permite fijar precio a futuro. | No |
| `certificado` | Bool | Indica si la operación emite certificados (1116A/RT). | No |
| `deExportacion` | Bool | Define si es un contrato de venta al exterior. | No |
| `embarque` | Bool | Indica si maneja lógica de embarques/cupos. | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve el catálogo completo de tipos de contrato.
    * *Filtros opcionales (Query String)*: `filtroFijaciones` (0=Todos, 1=Con Fijaciones, 2=Sin Fijaciones).
* **Obtener por ID** (`get`): Recupera el detalle de una configuración específica.

### ABM (Escritura)
* **Crear** (`create`): Da de alta una nueva tipificación de contrato.
* **Actualizar** (`update`): Modifica las reglas de un tipo existente.
* **Eliminar** (`delete`): Borra un tipo de contrato (si no tiene operaciones asociadas).

---

## 💡 Ejemplos de JSON

### 1. Crear Tipo "Compra a Fijar"
Configura un contrato que no tiene precio cerrado al inicio y requiere fijaciones posteriores.

**Recurso**: `Tipo Contrato` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "tipoContrato": 0,
  "descripcion": "Compra a Fijar Precio",
  "fijaciones": true,
  "certificado": true,
  "deExportacion": false,
  "embarque": false
}
```

### 2. Crear Tipo "Exportación Directa"
Configura un contrato de venta al exterior, sin fijaciones (precio cerrado) y con lógica de embarque.

**Recurso**: ``Tipo Contrato``

**Operación**: ``Crear`` 

**JSON Body**:

```json
{
  "tipoContrato": 0,
  "descripcion": "Venta Exportación Directa",
  "fijaciones": false,
  "certificado": false,
  "deExportacion": true,
  "embarque": true
}
```

---

## ⚠️ Notas Técnicas
* **Filtro de Fijaciones**: El endpoint ``getAll`` soporta un parámetro especial filtroFijaciones para filtrar rápidamente los tipos según su naturaleza: ``0`` (Todos), ``1`` (Con Fijaciones), ``2`` (Sin Fijaciones).

* **Compatibilidad**: Existe un parámetro ``id`` opcional en el listado que se mantiene por compatibilidad con versiones anteriores, pero se recomienda utilizar los filtros específicos.

* **Lógica de Negocio**: La combinación de flags (``fijaciones``, ``deExportacion``, etc.) altera las validaciones que el sistema realizará al momento de cargar un contrato. Por ejemplo, si ``fijaciones`` es ``true``, el sistema exigirá operaciones de fijación posteriores para cerrar el saldo monetario.