# Recurso Campos (SILAB)

El recurso **Campos** administra el maestro de establecimientos agrícolas, estancias o propiedades rurales.

En la jerarquía de SILAB, el "Campo" es la unidad física mayor que agrupa a los **Lotes** (unidades de producción). Este recurso permite identificar geográficamente dónde se realizan las actividades productivas y gestionar la estructura de la tierra.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `CodCampo` | Int | Código identificador del establecimiento. |
| `Descripcion` | String | Nombre del campo (ej: "La Estancia", "El Gringo"). |
| `CodZona` | Int | Zona geográfica a la que pertenece. |
| `Hectareas` | Decimal | Superficie total del establecimiento (suma de lotes). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve la lista de campos.
    * *Filtros*: `CodZona` (Filtrar por región), `formatoRespuesta` (CSV, TSV, JSON).
* **Obtener por ID** (`get`): Recupera el detalle de un campo específico.
* **Listar Campos Depósitos** (`getCamposDepositos`): Devuelve una lista especial de campos que funcionan técnicamente como depósitos de stock (ej: para silobolsas o acopio en campo).

---

## 💡 Ejemplos de Uso

### 1. Listar Campos de una Zona
Obtener todos los establecimientos pertenecientes a la Zona Norte (Código 1).

**Recurso**: `Campos` 

**Operación**: `Listar Todos`

**Parámetros (Query)**:

* CodZona: `1`

### 2. Exportar Listado a CSV
Obtener el maestro de campos en formato texto separado por comas para importar en Excel, en lugar de JSON.

**Recurso**: `Campos` 

**Operación**: `Listar Todos`

**Parámetros (Query)**:

* formatoRespuesta: `CSV`

### 3. Consultar Campos de Acopio
Obtener los campos habilitados para almacenar stock (Campos Lotes).

**Recurso**: `Campos` 

**Operación**: `Listar Campos Depósitos`

---

## ⚠️ Notas Técnicas

* **Jerarquía**: Es importante no confundir **Campo** con **Lote**.
    * **Campo**: La propiedad física / Catastral.
    * **Lote**: La subdivisión de manejo agronómico dentro del campo (donde se siembra).
* **Campos Depósito**: El endpoint `campos-depositos` es vital para la gestión de inventarios. En agricultura, es común que la cosecha se almacene temporalmente en el mismo campo (silobolsa); este endpoint identifica qué campos tienen esa capacidad operativa en el sistema.
* **Formatos**: Este recurso soporta `formatoRespuesta`, permitiendo integraciones "low-code" que consumen CSV directamente.