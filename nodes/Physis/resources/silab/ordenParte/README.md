# Recurso Órdenes y Partes (SILAB)

El recurso **Órdenes y Partes** administra el ciclo de vida de la labor agrícola. Engloba dos conceptos que, en Physis, comparten la misma estructura de datos pero representan momentos distintos:

1.  **Orden de Trabajo (OT)**: Es la instrucción planificada. Se envía al personal indicando qué labor realizar, en qué lotes y con qué insumos.
2.  **Parte de Trabajo**: Es el reporte de ejecución. Confirma que la labor se realizó, ajustando las cantidades reales de insumos consumidos, horas máquina y superficie trabajada.



Este recurso es el corazón de la trazabilidad en SILAB, vinculando Lotes, Labores, Insumos, Maquinaria y Personal.

## 📋 Estructura de Datos

La estructura es compleja y jerárquica (Cabecera -> Ítems -> Detalles).

### Cabecera (El Documento)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codCampania` | Int | Campaña agrícola del trabajo (Obligatorio). |
| `idParteDeLabores` | Int | ID único. Si es `0` en un POST, crea un registro nuevo. |
| `fecha` | DateTime | Fecha de emisión de la orden o ejecución del parte. |
| `codCampo` | Int | Establecimiento donde se realiza el trabajo. |
| `claEtapa` | Objeto | Define el estado (ej: "Pendiente", "Finalizado", "Anulado"). |

### Ítems (Los Lotes y Labores)
Dentro de la lista `items`:
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codLote` | Int | Lote específico donde se trabaja. |
| `idLabor` | Int | La tarea realizada (ej: Siembra, Cosecha). |
| `superficie` | Decimal | Hectáreas trabajadas. |
| `insumos` | Array | Lista de productos consumidos (ID, Dosis, Cantidad, Depósito). |
| `implementos` | Array | Maquinaria utilizada. |
| `personal` | Array | Empleados asignados a esta labor específica. |

---

## 🛠 Operaciones Disponibles

### Gestión Principal (ABM)
* **Listar Órdenes/Partes** (`getAll`): Búsqueda avanzada con filtros por fecha, campo, labor, personal o estado.
* **Obtener Detalle** (`get`): Recupera una OT completa por su ID y Campaña.
* **Crear / Modificar** (`createUpdate`): Endpoint único para alta y edición.
    * **Alta**: Enviar `idParteDeLabores: 0`.
    * **Modificación**: Enviar `idParteDeLabores` existente.
* **Eliminar** (`delete`): Borra una orden o parte (requiere `CodCampania` e `IdParteDeLabores`).

### Funciones Móviles y Operativas
* **Partes por Personal** (`getByPersonal`): Obtiene las tareas asignadas a un empleado específico (Ideal para Apps de operarios).
* **Actualizar Estados** (`updateStates`): Permite cambiar masivamente el estado de varios ítems (ej: marcar como "Realizado" desde una App).

### Auditoría e Integraciones
* **Partes Eliminados** (`getDeleted`): Log de auditoría de eliminaciones.
* **Exportación PUMA** (`getPuma`): Formato específico para integración con sistemas de gestión PUMA.

---

## 💡 Ejemplos de Uso

### 1. Consultar Trabajo Realizado (Filtro)
Ver todas las labores de "Cosecha" (IdLabor 100) realizadas en el Campo 5 durante Enero 2026.

**Recurso**: `Ordenes Partes` 

**Operación**: `Listar Órdenes/Partes`

**JSON Body (Filtros)**:
```json
{
  "codCampania": 2526,
  "codCampo": 5,
  "idLabor": 100,
  "fechaInicio": "2026-01-01T00:00:00",
  "fechaFin": "2026-01-31T23:59:59"
}
```

### 2. Crear una Orden de Trabajo (Simplificado)
Planificar una labor en el Lote 101.

**Recurso**: ``Ordenes Partes`` 

**Operación**: ``Crear / Modificar``

**JSON Body**:

```json
{
  "codCampania": 2526,
  "idParteDeLabores": 0,      // 0 = Nueva Orden
  "fecha": "2026-01-14T09:00:00",
  "codCampo": 5,
  "items": [
    {
      "codLote": 101,
      "idLabor": 50,          // ej: Pulverización
      "superficie": 50.5,     // Has a trabajar
      "insumos": [
        {
          "idProducto": "GLIFO",
          "dosis": 2.5,
          "cantidad": 126.25, // Dosis * Sup
          "deposito": "CENTRAL"
        }
      ]
    }
  ]
}
```

### 3. Consultar Tareas de un Empleado
Ver qué tiene asignado el maquinista Juan Perez (ID 450).

**Recurso**: ``Ordenes Partes`` 

**Operación**: ``Partes por Personal``

**Parámetros (Path)**:

* IdPersonal: ``450``

---

## ⚠️ Notas Técnicas
* **Clave Compuesta**: A diferencia de otros recursos, para identificar unívocamente un Parte se necesitan dos datos: ``CodCampania`` e ``IdParteDeLabores``. Ambos son obligatorios en las operaciones de **GET** (Single), **PUT** y **DELETE**.

* **Consumo de Stock**: Al pasar una Orden a estado "``Finalizado``" (Parte), el sistema descuenta automáticamente el stock de los insumos indicados en el array insumos del depósito seleccionado.

* **Validaciones**: El sistema validará que los insumos pertenezcan a la "``Receta``" de la labor si hay restricciones estrictas configuradas, aunque generalmente permite adiciones libres.