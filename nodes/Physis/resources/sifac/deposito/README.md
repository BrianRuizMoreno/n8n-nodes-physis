# Recurso Depósitos (SIFAC)

El recurso **Depósitos** gestiona los puntos de almacenamiento de mercadería dentro del sistema.

Este maestro es fundamental para el control de inventarios, ya que cada movimiento de stock (Entrada/Salida) debe referenciar un depósito. Además, permite vincular ubicaciones logísticas con entidades productivas del módulo agrícola (Campos/Lotes), facilitando la trazabilidad de insumos y cosechas.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, se envía un objeto JSON con la configuración del depósito.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idDeposito` | String | Código único (ej: "CENTRAL"). | Sí |
| `descripcion` | String | Nombre descriptivo (ej: "Depósito Central Insumos"). | Sí |
| `domicilioCalle` | String | Dirección física (Calle/Ruta). | No |
| `domicilioLocalidad` | String | Ciudad. | No |
| `feedLot` | Bool | Indica si es un establecimiento de engorde. | No |
| `esTransito` | Bool | Indica si es un depósito virtual de tránsito. | No |
| `ubicacion` | Bool | Si gestiona ubicaciones internas (pasillos/racks). | No |
| `nroRenspa` | String | Registro sanitario (si aplica). | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Depósitos** (`getAll`): Devuelve el listado de depósitos aplicando filtros de seguridad y búsqueda por texto.
    * *Filtros Avanzados*: Permite filtrar por asociación a Campos/Lotes (`conCampos`, `idCampo`), por stock disponible de un producto (`mostrarStock`, `idProducto`) y por ubicación geográfica.
* **Obtener por ID** (`get`): Recupera el detalle de un depósito específico.

### ABM (Escritura)
* **Crear** (`create`): Da de alta un nuevo punto de almacenamiento.
* **Actualizar** (`update`): Modifica los datos (dirección, descripción) de un depósito existente.
* **Eliminar** (`delete`): Borra un depósito (si no tiene movimientos asociados).

---

## 💡 Ejemplos de JSON

### 1. Crear Depósito Central
Registra el almacén principal de la empresa.

**Recurso**: `Depósitos` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idDeposito": "01",
  "descripcion": "Casa Central - Repuestos",
  "domicilioCalle": "Av. Principal 1234",
  "domicilioLocalidad": "Rosario",
  "esTransito": false,
  "ubicacion": true 
}
```

### 2. Consultar Depósitos con Stock de un Producto
Buscar qué depósitos tienen existencias del producto "SEMILLA-SOJA".

**Recurso**: ``Depósitos`` 

**Operación**: ``Listar Depósitos``

**Parámetros (Query)**:

* mostrarStock: ``true``

* idProducto: ``SEMILLA-SOJA``

* orden: ``2`` (Ordenar por descripción)

### 3. Consultar Depósitos de un Campo
Ver los depósitos (silos/bolsas) asociados al Campo ID 10.

**Recurso**: ``Depósitos`` 

**Operación**: ``Listar Depósitos``

**Parámetros (Query)**:

* conCampos: ``true``

* idCampo: ``10``

---

## ⚠️ Notas Técnicas
* **Seguridad (Restricciones)**: El listado de depósitos (``getAll``) retorna un campo ``nivelRestriccion`` que indica si el usuario actual tiene acceso total (``SR``), parcial (``CR``) o nulo (``RT``) sobre ese depósito. Esto es vital para filtrar opciones en interfaces de usuario.

* **Integración Agrícola**: Los parámetros ``conCampos``, ``idCampo`` e ``idLote`` permiten cruzar datos con el módulo de producción, útil para imputar consumos de insumos directamente al lote productivo.