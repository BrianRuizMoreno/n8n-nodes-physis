# Recurso Tipo de Contrato (SACER)

El recurso **Tipo de Contrato** permite administrar las diferentes modalidades contractuales utilizadas en la compra-venta de granos. Clasifica los acuerdos según su condición comercial (ej. "A Fijar Precio", "Disponible", "Canje") y establece reglas básicas como la moneda y si requiere fijación posterior.

## 📋 Estructura de Datos (Schema)

### 1. Objeto TipoContrato
Define la configuración de una modalidad de contrato.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codigo` | Int | **0** para crear nuevo. ID para editar o consultar. |
| `descripcion`* | String | Nombre del tipo de contrato (ej: "A Fijar Pesos"). |
| `sigla` | String | Abreviatura para reportes (ej: "AF_PES"). |
| `afijar` | Bool | **True**: El precio se define luego. **False**: Precio cerrado. |
| `idMoneda` | Int | Moneda asociada (1: Pesos, 2: Dólares, etc.). |

---

## 🛠 Operaciones Disponibles

### 🔍 Consultas
* **Listar Todos** (`getTiposContrato`): Devuelve el catálogo completo de tipos de contrato.
* **Obtener Detalle** (`getTipoContrato`): Consulta la configuración de un tipo específico mediante su ID.

### ⚙️ Gestión
* **Crear** (`createTipoContrato`): Da de alta una nueva modalidad de contrato.
* **Modificar** (`updateTipoContrato`): Actualiza la descripción o condiciones de un tipo existente.
* **Eliminar** (`deleteTipoContrato`): Baja de un registro (si no está en uso).

---

## 💡 Ejemplos de Uso

### 1. Crear Modalidad "A Fijar Dólares"
Registrar un contrato donde la mercadería se entrega ahora pero el precio se fija después en moneda extranjera.

**Recurso**: `TipoContrato`

**Operación**: `Crear`

**JSON Body**:
```json
{
  "codigo": 0,
  "descripcion": "Maíz A Fijar u$s",
  "sigla": "MZ_AF_USD",
  "afijar": true,
  "idMoneda": 2
}
```

### 2. Modificar una Descripción
Corregir el nombre de un tipo de contrato existente (ID 5).

**Recurso**: `TipoContrato`

**Operación**: `Modificar`

**JSON Body**:

```json
{
  "codigo": 5,
  "descripcion": "Disponible Rosario (Corregido)",
  "sigla": "DIS_ROS",
  "afijar": false,
  "idMoneda": 1
}
```

### 3. Consultar Detalle
Ver las condiciones del contrato código 10.

**Recurso**: `TipoContrato`

**Operación**: `Obtener Detalle`

**Parámetros**:

* idTipoContrato: `10`

---

## ⚠️ Notas Técnicas
**Lógica de Negocio**: El campo `afijar` es crítico. Si está en `true`, el sistema esperará que posteriormente se generen operaciones de "Fijación de Precio" vinculadas a los contratos de este tipo. Si es `false`, se asume que el precio está determinado al momento de la firma.