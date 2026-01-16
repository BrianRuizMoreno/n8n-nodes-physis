# Recurso Reagrupación Cuenta Auxiliar (SIGES)

El recurso **Reagrupación Cuenta Auxiliar** gestiona la asignación de cuentas corrientes a sus respectivas categorías de clasificación.

Permite responder y gestionar preguntas como:
* "¿Qué clientes pertenecen a la Zona Norte?"
* "Asignar el Cliente 'Juan Perez' al Vendedor 'Gómez'."

No crea cuentas ni categorías, sino que administra los enlaces entre el recurso `CuentasAuxi` y el recurso `CuentasReagrupacionAuxi`.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idAuxi` | Int | Identificador del Plan Base (ej: 100=Clientes). |
| `idCtaAuxi` | String | Código de la cuenta del tercero (ej: "CLI-001"). |
| `idReagAuxi` | Int | Identificador del Tipo de Agrupación (ej: 1=Zonas). |
| `idCtaReagAuxi` | String | Código de la categoría destino (ej: "ZN" para Zona Norte). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Asignadas** (`getAssigned`): Devuelve la lista de cuentas auxiliares que ya están vinculadas a una categoría específica.
* **Listar Disponibles** (`getAvailable`): Muestra las cuentas auxiliares que pueden ser asignadas a una categoría (útil para interfaces de "drag & drop" o selección múltiple).
* **Listar Disponibles (Árbol)** (`getAvailableTree`): Versión jerárquica de la lista de disponibles.

### Gestión (Asignación)
* **Asignar / Relacionar** (`assign`): Vincula una o varias cuentas auxiliares a un nodo de reagrupación.
    * *Nota*: Esta operación suele sobrescribir la asignación anterior si la reagrupación es de tipo "Simple" (un cliente solo puede tener una Zona), o agregarla si es "Múltiple".

---

## 💡 Ejemplos de Uso

### 1. Ver Clientes en "Zona Norte"
Obtener todos los clientes (Plan 100) asignados a la Zona 01.

**Recurso**: `ReagrupacionCuentaAuxiliar`  

**Operación**: `Listar Asignadas`

**Parámetros (Query)**:

* IdAuxi: `100`
* IdReagAuxi: `1` (Zonas)
* IdCtaReagAuxi: `01` (Norte)

### 2. Asignar Clientes a un Vendedor
Vincular el cliente "CLI-500" y "CLI-501" al Vendedor "VEN-02".

**Recurso**: `ReagrupacionCuentaAuxiliar`  

**Operación**: `Asignar / Relacionar`

**JSON Body**:
```json
[
  {
    "idAuxi": 100,
    "idCtaAuxi": "CLI-500",
    "idReagAuxi": 5,
    "idCtaReagAuxi": "VEN-02"
  },
  {
    "idAuxi": 100,
    "idCtaAuxi": "CLI-501",
    "idReagAuxi": 5,
    "idCtaReagAuxi": "VEN-02"
  }
]
```

---

## ⚠️ Notas Técnicas
* **Operación en Lote**: El endpoint de asignación (**POST**) acepta un Array de objetos, permitiendo realizar múltiples vinculaciones en una sola llamada de red.

* **Integridad**: Para realizar una asignación, tanto la Cuenta Auxiliar como la Cuenta de Reagrupación deben existir previamente.

* **Reversibilidad**: Para "desasignar", generalmente se asigna la cuenta a un nodo "Sin Asignar" o se utiliza la lógica de negocio de moverla a otra categoría, ya que todo auxiliar suele requerir una clasificación por defecto.