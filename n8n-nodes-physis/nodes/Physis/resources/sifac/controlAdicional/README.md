# Recurso Controles Adicionales (SIFAC)

El recurso **Controles Adicionales** administra la documentación, permisos y requisitos exigibles a los actores logísticos (Conductores y Medios de Transporte).

Permite definir **qué** se debe controlar (ej: "VTV", "Seguro de Vida", "Licencia de Conducir", "CNRT") y **asignar los valores y vencimientos** correspondientes a cada chofer o camión. El sistema utiliza esta información para validar si un transporte está habilitado para realizar un viaje al momento de emitir un comprobante.

## 📋 Campos Principales (Schema)

Existen dos estructuras de datos: la **Definición** del control (Maestro) y la **Asignación** (Valor específico para una entidad).

### 1. Definición del Control (Maestro)
Define la regla de negocio.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idControlAdicional` | String | Código único (ej: "VTV", "LICENCIA"). | Sí |
| `descripcion` | String | Nombre legible (ej: "Verificación Técnica Vehicular"). | Sí |
| `conVencimiento` | Bool | Si `true`, exigirá una fecha de caducidad al asignarse. | No |
| `conValor` | Bool | Si `true`, exigirá un dato alfanumérico (ej: Nro de Póliza). | No |
| `obligatorio` | Bool | Si es requerido para operar. | No |
| `conduc_MediosTrans` | Int | Alcance: `1` = Conductor, `2` = Medio Transporte, `0` = Ambos. | Sí |

### 2. Asignación (Valor)
Define el dato concreto para un Chofer o Camión.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `valor` | String | El dato real (ej: "A-12345678"). | Sí (si aplica) |
| `vencimiento` | Date | Fecha de expiración del documento. | Sí (si aplica) |

---

## 🛠 Operaciones Disponibles

### 1. Gestión de Definiciones (Maestros)
* **Listar Definiciones** (`getAll`): Obtiene el catálogo de controles disponibles.
    * *Filtro `tipo`*: 1 (Conductores), 2 (Vehículos), 0 (Todos).
* **Crear Definición** (`create`): Da de alta un nuevo tipo de control (ej: "Curso de Cargas Peligrosas").
* **Modificar/Eliminar** (`update`, `delete`): Gestiona las definiciones existentes.

### 2. Gestión de Conductores
* **Listar por Conductor** (`getByConductor`): Ver documentaciones cargadas a un chofer.
* **Asignar a Conductor** (`assignToConductor`): Guarda valores y vencimientos (ej: cargar la Licencia al chofer Juan Pérez).
    * *Nota*: Permite carga masiva (lista de controles).
* **Eliminar de Conductor** (`deleteFromConductor`): Quita un control o todos los asociados.

### 3. Gestión de Medios de Transporte
* **Listar por Vehículo** (`getByMedioTransporte`): Ver documentaciones cargadas a un camión/acoplado.
* **Asignar a Vehículo** (`assignToMedioTransporte`): Guarda valores (ej: cargar la VTV al Camión Patente ABC-123).
* **Eliminar de Vehículo** (`deleteFromMedioTransporte`): Quita controles asociados.

---

## 💡 Ejemplos de JSON

### 1. Crear Definición "Seguro Automotor"
Define que existe un control llamado "SEGURO" para vehículos, que requiere número de póliza y fecha de vencimiento.

**Recurso**: `Controles Adicionales` 

**Operación**: `Crear Definición`

**JSON Body**:
```json
{
  "idControlAdicional": "SEGURO",
  "descripcion": "Seguro Obligatorio Automotor",
  "conVencimiento": true,
  "conValor": true,
  "obligatorio": true,
  "conduc_MediosTrans": 2 
}
```
(Nota: conduc_MediosTrans: 2 indica que aplica a Medios de Transporte)

### 2. Asignar VTV a un Camión
Cargar los datos de la VTV al Medio de Transporte ID 500.

**Recurso**: ``Controles Adicionales``

**Operación**: ``Asignar a Vehículo``

**Parámetros (Path)**:

* idMedioTransporte: ``500``

**JSON Body**:

```json
[
  {
    "idControlAdicional": "VTV",
    "valor": "3345-X",
    "vencimiento": "2026-12-31T00:00:00",
    "descripcion": "Verificación Técnica 2026"
  }
]
```

### 3. Consultar Documentación de un Chofer
Ver qué papeles tiene al día el conductor ID 88.

**Recurso**: ``Controles Adicionales``

**Operación**: ``Listar por Conductor``

**Parámetros (Path)**:

* idConductor: ``88``

---

## ⚠️ Notas Técnicas
* **Validación de Bloqueo**: Si un control está marcado como ``obligatorio`` y ``conVencimiento``, y la fecha asignada es anterior a la fecha actual (vencido), el sistema de Facturación/Logística bloqueará la emisión de la Carta de Porte o Remito.

* **Scope (Alcance)**: Es fundamental respetar el campo ``conduc_MediosTrans`` (o ``tipo`` en consultas). No se debe asignar un control definido solo para Conductores (ej: "Licencia") a un Medio de Transporte.

* **Edición**: El campo ``editable`` en la respuesta indica si el usuario actual tiene permisos para modificar ese valor o si es un dato de solo lectura proveniente de otra integración.