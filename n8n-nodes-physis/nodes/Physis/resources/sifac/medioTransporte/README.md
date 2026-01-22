# Recurso Medios de Transporte (SIFAC)

El recurso **Medios de Transporte** administra el parque automotor y los equipos de carga (Camiones, Chasis, Acoplados) disponibles en el sistema para la logística.

Estos vehículos son asignados a los **Transportistas** y son un dato obligatorio al momento de confeccionar la documentación de traslado (Remitos, Cartas de Porte Electrónicas). El recurso permite gestionar sus datos técnicos, patentes (dominios) y habilitaciones sanitarias (SENASA).

## 📋 Campos Principales (Schema)

Al dar de alta un vehículo, es crítico vincularlo correctamente a su titular (Transportista) y definir su patente.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idMedioTransporte` | Int | Identificador único (0 para crear nuevo). | Sí |
| `dominio` | String | Patente / Matrícula del vehículo. | Sí |
| `descripcion` | String | Marca/Modelo o nombre interno. | No |
| `tipoMedioTransporte` | Int | Clasificación (ej: 0=Camión, 1=Acoplado). | Sí |
| `idCtaReagAuxiTransportista` | String | Código del Transportista titular. | Sí |
| `habilitacionSenasa` | String | Nro de habilitación sanitaria para cargas alimenticias. | No |
| `titular` | String | Nombre del dueño (si difiere del transportista). | No |

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Registra un nuevo vehículo en la flota.
* **Modificar** (`update`): Actualiza datos como la patente o habilitación.
* **Obtener por ID** (`get`): Recupera el detalle de un vehículo específico.
* **Eliminar** (`delete`): Borra un medio de transporte (si no tiene viajes asociados).

### Consultas
* **Listar Todos** (`getAll`): Búsqueda general de vehículos.
    * *Nota*: Ver advertencia en notas técnicas sobre esta vista.
* **Listar por Transportista** (`getByTransportista`): Devuelve toda la flota asignada a una empresa de transporte específica.
    * *Filtros*: `incluirMediosTransporteSinAsignar` (true/false), `incluirBajas`.

---

## 💡 Ejemplos de Uso

### 1. Crear un Camión Nuevo
Registrar un camión Scania patente "AA123BB" para el transportista "TRANS-001".

**Recurso**: `Medios de Transporte` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idMedioTransporte": 0,
  "descripcion": "Scania R450",
  "tipoMedioTransporte": 1,
  "dominio": "AA123BB",
  "habilitacionSenasa": "S-99999",
  "idAuxiTransportista": 2, 
  "idCtaReagAuxiTransportista": "TRANS-001"
}
```

### 2. Consultar Flota de un Transportista
Ver todos los camiones y acoplados activos de la empresa "Logística Sur".

**Recurso**: ``Medios de Transporte`` 

**Operación**: ``Listar por Transportista``

**Parámetros (Path)**:

* idCtaReagAuxiTransportista: ``LOG-SUR``

**Parámetros (Query)**:

* incluirBajas: ``false``

---

## ⚠️ Notas Técnicas
* **Rectificación de Vista (getAll)**: La documentación técnica indica una anomalía en el endpoint de búsqueda general (``/api/sifac/medios-transporte`` GET). Aunque el endpoint se llama "MediosTransporte", podría estar devolviendo datos de Conductores en ciertas versiones. Se recomienda usar ``getByTransportista`` o ``get`` por ID para obtener datos fiables de vehículos hasta que esto se rectifique.

* **Validación de Dominio**: El campo ``dominio`` es vital para la validación con AFIP (COT/CTG). Debe cargarse sin guiones ni espacios en formatos nuevos (ej: "AA123BB") o viejos (ej: "ABC1234").

* **Relación**: Un Medio de Transporte debe pertenecer a un Transportista (``idCtaReagAuxiTransportista``), aunque el sistema permite consultarlos como "Sin Asignar" en ciertos filtros.