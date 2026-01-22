# Recurso Estado (SACH)

El recurso Estado administra el catálogo de estados posibles para los distintos comprobantes o entidades del sistema de Hacienda. Permite definir la descripción del estado (ej: "Pendiente", "Autorizado", "Anulado") y marcar cuál es el estado por defecto para nuevas operaciones.

## 📋 Campos Principales (Schema)
Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura básica.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idEstado` | Int | Identificador numérico (0 para crear uno nuevo). | Sí |
| `descripcion` | String | Nombre o etiqueta del estado. | Sí |
| `porDefecto` | Bool | Indica si este estado se aplica por defecto. | No |

---

## 🛠 Operaciones Disponibles

**Consultas**
* **Listar Todos** (``getAll``): Devuelve la lista completa de estados configurados (``GET /api/sach/estados``).

* **Obtener por ID** (``get``): Recupera el detalle de un estado específico (``GET /api/sach/estados/{id}``).

* **Consulta Avanzada** (``search``): Permite realizar búsquedas complejas con filtros, paginado y ordenamiento mediante POST (``POST /api/sach/estados/consulta``).

**ABM (Escritura)**

* **Crear** (``create``): Registra un nuevo estado en el sistema.

* **Actualizar**(``update``): Modifica los datos de un estado existente.

* **Eliminar** (``delete``): Elimina un estado por su identificador.

---

## 💡 Ejemplos de JSON

### 1. Crear Estado "Pendiente"

Registra un nuevo estado y lo marca como no predeterminado.

**Recurso**: ``Estado``

**Operación**: ``Crear``

**JSON Body**:

```json
{
  "idEstado": 0,
  "descripcion": "Pendiente de Aprobación",
  "porDefecto": false
}`
```

### 2. Consulta Avanzada

Buscar estados de forma paginada y filtrada.

**Recurso**: ``Estado``

**Operación**: ``Consulta Avanzada``

**JSON Body**:
```json
{
  "conPaginado": true,
  "paginado": {
    "paginaActual": 1,
    "registrosPorPagina": 20
  },
  "filtros": {
    "filtros": [
      "Descripcion LIKE '%Autorizado%'"
    ],
    "logico": 0
  },
  "orden": [
    {
      "campo": "descripcion",
      "direccion": 0
    }
  ]
}
```

---

## ⚠️ Notas Técnicas

* **Estructura de Búsqueda**: La operación de **Consulta Avanzada** (``search``) utiliza una estructura de objeto compleja para definir ``filtros``, ``paginado``, ``orden`` y ``agrupamiento``. Es más potente que el listado simple (``getAll``) y se recomienda para integraciones que requieran filtrar grandes volúmenes de datos.
* **Identificadores**: Para las operaciones ``get`` y ``delete``, el parámetro ``id`` se pasa en la URL (path parameter), mientras que para ``update``, el ID debe estar incluido dentro del ``jsonBody`` (``idEstado``).