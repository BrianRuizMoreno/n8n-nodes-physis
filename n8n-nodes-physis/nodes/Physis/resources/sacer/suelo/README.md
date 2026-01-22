# Recurso Suelos (SACER)

El recurso **Suelos** permite la administración de los diferentes tipos de suelos utilizados en el sistema. Es fundamental para la gestión agronómica, permitiendo clasificar lotes y campos según sus características edafológicas para una mejor planificación productiva.

## 📋 Estructura de Datos (Schema)

### 1. Objeto Suelo
Representa la tipificación y características de un suelo.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codSuelo` | Int | **0** para crear nuevo. ID para editar o consultar. |
| `descripcion`* | String | Nombre o clasificación del suelo (ej: "Franco Arenoso"). |
| `observaciones` | String | Notas adicionales sobre características, manejo o limitaciones. |

---

## 🛠 Operaciones Disponibles

### 🔍 Consultas
* **Listar Todos** (`getSuelos`): Devuelve el catálogo completo de suelos registrados.
* **Obtener Detalle** (`getSuelo`): Consulta la información de un suelo específico mediante su código.

### ⚙️ Gestión
* **Crear** (`createSuelo`): Da de alta un nuevo tipo de suelo en el maestro.
* **Modificar** (`updateSuelo`): Actualiza la descripción u observaciones de un suelo existente.
* **Eliminar** (`deleteSuelo`): Da de baja un registro de suelo del sistema.

---

## 💡 Ejemplos de Uso

### 1. Registrar un Nuevo Tipo de Suelo
Alta de una clasificación agronómica específica.

**Recurso**: `Suelos`

**Operación**: `Crear`

**JSON Body**:
```json
{
  "codSuelo": 0,
  "descripcion": "Suelo Franco Limoso Clase I",
  "observaciones": "Alta aptitud agrícola, excelente retención de agua."
}
```

### 2. Modificar Observaciones de un Suelo
Actualizar las notas de manejo para el suelo con código 10.

**Recurso**: `Suelos`

**Operación**: `Modificar`

**JSON Body**:

```json
{
  "codSuelo": 10,
  "descripcion": "Suelo Arcilloso Pesado",
  "observaciones": "Requiere labranza vertical para evitar compactación."
}
```

### 3. Consultar Detalle
Recuperar la información del suelo código 5 para mostrar en ficha de lote.

**Recurso**: `Suelos`

**Operación**: `Obtener Detalle`

**Parámetros**:

* codSuelo: `5`

---

## ⚠️ Notas Técnicas
**Gestión de IDs**: El campo `codSuelo` actúa como identificador único.

* En operaciones **POST** (Crear), se debe enviar en `0` (o ignorar) para que la base de datos asigne el siguiente número disponible.

* En operaciones **PUT** (Modificar), es obligatorio enviar el ID real para que el sistema sepa qué registro actualizar.