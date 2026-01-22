# Recurso Partidas (SIFAC)

El recurso **Partidas** administra la trazabilidad y la segregación de inventarios.

Una "Partida" en SIFAC es una subdivisión del stock de un producto que comparte características comunes, como fecha de vencimiento, lote de fabricación, número de serie o, en el caso de la industria cárnica/ganadera, la **Tropa**.

Este recurso es fundamental para el seguimiento de la calidad, el control de FIFO/FEFO y el cumplimiento de normativas sanitarias (trazabilidad de hacienda).

## 📋 Campos Principales (Schema)

El objeto Partida es flexible. Puede representar un simple lote industrial o contener datos complejos de faena y ganadería (objeto `tropa`).

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idPartida` | String | Código único (Lote/Serie). | Sí |
| `descripcion` | String | Nombre descriptivo del lote. | Sí |
| `fechaVto` | Date | Fecha de vencimiento del lote. | No |
| `tipoPartida` | Int | Clasificación (0=Estándar, 1=Tropa, etc.). | No |
| `feedLot` | Bool | Marca si es una partida de engorde a corral. | No |
| `tropa` | Object | **Ganadería**: Datos específicos de faena, DTE y procedencia. | No |

### Estructura de `tropa` (Opcional)
Para trazabilidad cárnica:
* `numeroTropa`: Identificador oficial de faena.
* `nroDTE`: Documento de Tránsito Electrónico.
* `fechaFaena`: Fecha de sacrificio.
* `procedencia`: Origen de la hacienda.

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Registra un nuevo lote/partida en el sistema.
    * *Query Params*: Permite relacionar automáticamente la partida con un producto (`agregarRelacionPartidaProducto`, `idProducto`).
* **Modificar** (`update`): Actualiza datos como vencimientos o correcciones en datos de tropa.
* **Eliminar** (`delete`): Borra una partida (si no tiene movimientos).

### Consultas
* **Listar Partidas** (`getAll`): Búsqueda general con filtros.
    * *Filtros*: `idProducto`, `idDeposito`, `fecha` (Vigencia), `criterio` (Texto).
* **Partidas por Producto** (`getByProducto`): Obtiene específicamente los lotes asociados a un artículo.
    * *Filtro*: `validaVigencia` (Oculta vencidos).

---

## 💡 Ejemplos de Uso

### 1. Crear Partida de Medicamentos (Lote con Vencimiento)
Registrar el lote "A-2026" del producto "VACUNA-X" con vencimiento en Diciembre.

**Recurso**: `Partidas` 

**Operación**: `Crear`

**Parámetros (Query)**:
* `agregarRelacionPartidaProducto`: `true`
* `idProducto`: `VACUNA-X`

**JSON Body**:
```json
{
  "idPartida": "LOTE-A2026",
  "descripcion": "Lote Fabricación Enero 2026",
  "fechaAlta": "2026-01-14T00:00:00",
  "fechaVto": "2026-12-31T00:00:00",
  "tipoPartida": 0
}
```

### 2. Crear Partida de Hacienda (Tropa)
Registrar una tropa de faena con datos de DTE y procedencia.

**Recurso**: ``Partidas`` 

**Operación**: ``Crear``

**Parámetros (Query)**:

* datosTropa: ``true``

**JSON Body**:

```json
{
  "idPartida": "TROPA-5599",
  "descripcion": "Novillos Procedencia Santa Fe",
  "tipoPartida": 1,
  "tropa": {
    "numeroTropa": "5599",
    "nroDTE": "123456789",
    "fechaFaena": "2026-01-14T00:00:00",
    "procedencia": "Estancia La Paz",
    "kilosVivo": 4500.00
  }
}
```

### 3. Consultar Lotes Disponibles de un Producto
Ver qué partidas vigentes hay del producto "SEMILLA-MAIZ" en el depósito "CAMPO-1".

**Recurso**: ``Partidas`` 

**Operación**: ``Listar Partidas``

**Parámetros (Query)**:

* idProducto: ``SEMILLA-MAIZ``

* idDeposito: ``CAMPO-1``

* fecha: ``2026-01-14T00:00:00 (Para validar vigencia a hoy)``

---

## ⚠️ Notas Técnicas
* **Relación N-N**: En SIFAC, una Partida puede relacionarse con múltiples productos (aunque lo usual es 1 a 1 o 1 a N). El parámetro ``agregarRelacionPartidaProducto`` en el ``create`` simplifica esta gestión creando el vínculo en el mismo paso.

* **Vigencia**: El filtro ``validaVigencia`` o el uso de la fecha en las consultas es vital para evitar despachar productos vencidos.

* **Trazabilidad**: En implementaciones frigoríficas, el objeto ``tropa`` es obligatorio y se valida contra los movimientos de stock de hacienda en pie.