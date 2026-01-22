# Recurso Tipos (SILAB)

El recurso **Tipos** gestiona la configuración estructural de los documentos en SILAB. Se divide en dos conceptos clave que, aunque relacionados, tienen propósitos distintos:

1.  **Tipos de Orden / Parte**: Definen la **operatividad**. Determinan si el documento es una "Siembra", una "Cosecha" o un "Monitoreo". Controlan qué datos se piden en la App Móvil (si pide insumos, si pide maquinaria, etc.).
2.  **Tipos de Formulario**: Definen la **contabilidad**. Determinan cómo imputan esos movimientos en las cuentas corrientes, centros de costos y stock.

## 📋 Campos Principales

### Tipo de Orden / Parte
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `sigla` | String | Identificador único corto (ej: "SIE", "COS"). |
| `nombre` | String | Descripción legible (ej: "Siembra"). |
| `mobil` | Boolean | `true` si debe aparecer en la App para operarios. |
| `esTipoCultivo` | Boolean | Define si el parte está atado a un ciclo biológico. |

### Tipo de Formulario
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idTipoFormulario` | Int | Identificador numérico. |
| `descripcion` | String | Nombre de la configuración contable. |
| `permiteCambioCtaPpal` | Boolean | Reglas de negocio para la imputación. |

---

## 🛠 Operaciones Disponibles

### Tipos de Orden (Configuración Operativa)
* **Listar Todos** (`getAllTipos`): Catálogo de documentos disponibles.
* **Obtener por Sigla** (`getTipo`): Detalle de configuración de un tipo (ej: `SIE`).
* **ABM** (`createTipo`, `updateTipo`, `deleteTipo`): Gestión de altas, bajas y modificaciones.

### Tipos de Formulario (Configuración Contable)
* **Listar Todos** (`getAllTiposFormulario`): Catálogo de configuraciones contables.
* **Obtener por ID** (`getTipoFormulario`): Detalle de imputación.
* **Modificar** (`updateTipoFormulario`): Actualización de reglas contables.

---

## 💡 Ejemplos de Uso

### 1. Configurar App Móvil
Listar qué tipos de partes están habilitados para ser vistos en la aplicación móvil.

**Recurso**: `Tipos` 

**Operación**: `Tipos Orden: Listar Todos`

**Filtrado (en cliente)**: Buscar objetos donde `mobil == true`.

### 2. Crear Nuevo Tipo de Labor
Dar de alta el tipo "Monitoreo de Plagas" (`MON`).

**Recurso**: `Tipos` 

**Operación**: `Tipos Orden: Crear`

**JSON Body**:
```json
{
  "sigla": "MON",
  "nombre": "Monitoreo Plagas",
  "descripcion": "Relevamiento de insectos en lote",
  "mobil": true,
  "esTipoCultivo": true,
  "copias": 1
}
```

### 3. Eliminar Tipo
Borrar un tipo de parte que se creó por error.

**Recurso**: ``Tipos``  

**Operación**: ``Tipos Orden: Eliminar``

**Parámetro ID**: ``MON`` (La sigla).

---

## ⚠️ Notas Técnicas
* **Sigla como ID**: Para los Tipos de Orden, la clave primaria es la ``sigla`` (String).

* **ID Numérico**: Para los Tipos de Formulario, la clave primaria es ``idTipoFormulario`` (Integer).

* **Precaución**: Modificar los Tipos de Formulario puede alterar la consistencia contable del sistema. Se recomienda usar estas operaciones (``updateTipoFormulario``) solo para ajustes de configuración inicial o mantenimiento avanzado.