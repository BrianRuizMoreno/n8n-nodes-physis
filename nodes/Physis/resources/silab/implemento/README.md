# Recurso Implementos y Maquinarias (SILAB)

El recurso **Implementos y Maquinarias** administra el parque de equipos agrícolas disponibles para realizar las labores de campo.

Es fundamental distinguir los dos conceptos que gestiona este recurso:
* **Maquinarias**: Unidades propulsoras o principales (ej: Tractores, Cosechadoras, Pulverizadoras autopropulsadas).
* **Implementos**: Herramientas que se acoplan o arrastran (ej: Sembradoras, Arados, Tolvas).

Estos activos se asignan a las "Labores" (Tareas) para calcular costos operativos, consumo de combustible y eficiencia de trabajo.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `IdImplemento` / `IdMaquinaria` | Int | Código numérico identificador del equipo. |
| `Descripcion` | String | Nombre del equipo (ej: "Tractor John Deere 730"). |
| `IdLabor` | Int | (En búsquedas asociadas) Identificador de la tarea que puede realizar. |

---

## 🛠 Operaciones Disponibles

### Consultas Generales
* **Listar Implementos** (`getAllImplementos`): Devuelve el listado de herramientas de arrastre/acople.
* **Listar Maquinarias** (`getAllMaquinarias`): Devuelve el listado de unidades tractoras/propulsoras.
    * *Filtro*: `NoImputables` (Ver equipos que actúan como agrupadores).

### Búsquedas Específicas
* **Obtener Implemento por ID** (`getImplemento`): Recupera datos técnicos de un implemento específico.
* **Buscar por Nombre** (`searchByName`): Busca implementos o maquinarias que coincidan con un texto (ej: "Sembradora").

### Asociaciones por Labor
Estas operaciones son vitales para configurar una Orden de Trabajo, ya que filtran qué equipos son aptos para una tarea específica.
* **Implementos por Labor** (`getImplementosByLabor`): ¿Qué herramientas sirven para la labor X? (Ej: Qué sembradoras sirven para la labor de Siembra).
* **Maquinarias por Labor** (`getMaquinariasByLabor`): ¿Qué tractores sirven para la labor X?

---

## 💡 Ejemplos de Uso

### 1. Listar Parque de Maquinaria
Obtener todos los tractores y cosechadoras activos.

**Recurso**: `Implementos` 

**Operación**: `Listar Maquinarias`

**Parámetros (Query)**:
* NoImputables: `false`

### 2. Buscar una Herramienta Específica
Buscar implementos que contengan la palabra "Disco" en su nombre.

**Recurso**: `Implementos` 

**Operación**: `Buscar por Nombre` (Endpoint Implementos)

**Parámetros**:
* nombre: `Disco`

### 3. Configurar una Labor de Pulverización
Consultar qué máquinas están habilitadas para realizar la labor ID 50 (Pulverización).

**Recurso**: `Implementos` 

**Operación**: `Maquinarias por Labor`

**Parámetros**:
* IdLabor: `50`

---

## ⚠️ Notas Técnicas

* **Formatos de Exportación**: Al igual que otros recursos de SILAB, soporta el parámetro `formatoRespuesta` para obtener salidas en CSV o TSV, ideal para reportes de inventario de activos fijos.
* **Relación Labor-Máquina**: La base de datos de Physis suele tener pre-configurada la relación entre labores y equipos (ej: No permite asignar una Cosechadora a una labor de Siembra). Utilice los endpoints `ByLabor` para respetar estas reglas de negocio en su integración.