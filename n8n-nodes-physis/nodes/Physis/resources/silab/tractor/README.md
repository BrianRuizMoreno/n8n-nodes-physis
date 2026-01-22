# Recurso Tractores (SILAB)

El recurso **Tractores** administra específicamente el parque de unidades tractoras o propulsoras del sistema.

Si bien existe el recurso general de *Maquinarias* (que engloba cosechadoras, pulverizadoras, etc.), este endpoint suele utilizarse para listados específicos donde se requiere identificar exclusivamente a los vehículos encargados de la tracción de implementos.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `IdTractor` | Int | Identificador numérico único de la unidad. |
| `Descripcion` | String | Nombre o modelo del tractor (ej: "Pauny 500", "John Deere 6J"). |
| `Horas` | Decimal | (Generalmente disponible) Horómetro acumulado actual. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Tractores** (`getAll`): Devuelve la lista completa de unidades tractoras activas.
* **Obtener por ID** (`get`): Recupera la ficha técnica de un tractor específico.

---

## 💡 Ejemplos de Uso

### 1. Listar Unidades para Asignación
Obtener la lista de tractores para que el operario seleccione cuál está utilizando al iniciar un Parte de Trabajo.

**Recurso**: `Tractores` 

**Operación**: `Listar Tractores`

**Respuesta Esperada (Ejemplo)**:
```json
[
  { "IdTractor": 10, "Descripcion": "New Holland T7" },
  { "IdTractor": 12, "Descripcion": "Massey Ferguson 4200" }
]
```

### 2. Consultar Detalle de Unidad
Ver datos específicos del Tractor ID 10.

**Recurso**: ``Tractores`` 

**Operación**: ``Obtener por ID``

**Parámetros (Path)**:

* IdTractor: ``10``

---

## ⚠️ Notas Técnicas
* **Relación con Órdenes de Trabajo**: En el recurso ``OrdenesPartes``, dentro del array de implementos utilizado en los ítems, existe el campo ``idTractor``. Este recurso es el maestro validador para ese campo.

* **Diferencia con Maquinarias**: Mientras que el recurso Maquinarias es el catálogo general de activos fijos móviles, Tractores es una vista filtrada específicamente para la lógica de "Unidad que arrastra un Implemento".