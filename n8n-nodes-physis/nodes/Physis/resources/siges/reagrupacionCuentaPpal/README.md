# Recurso Reagrupación Cuenta Principal (SIGES)

El recurso **Reagrupación Cuenta Principal** administra el mapeo entre el Plan de Cuentas Contable (Cuentas Principales) y las dimensiones analíticas (Reagrupaciones Principales).

Es fundamental para la contabilidad de gestión, ya que permite definir reglas como:
* "La cuenta 'Gastos de Librería' (4.1.05) pertenece al Centro de Costos 'Administración' (CC-01)".
* "La cuenta 'Ventas por Menor' suma en la línea 'Ingresos Operativos' del Cash Flow".

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idCtaPpal` | String | Código de la cuenta contable (ej: `4.1.05.001`). |
| `idReagPpal` | Int | Identificador del Tipo de Agrupación (ej: `5`=Centros de Costo). |
| `idCtaReagPpal` | String | Código del nodo analítico destino (ej: `ADM` para Administración). |
| `cuentasPrincipales` | String | (En asignación masiva) Lista de cuentas separadas por coma o serializadas. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Asignadas** (`getSelected`): Devuelve qué cuentas contables ya están vinculadas a un nodo analítico específico.
* **Listar Disponibles** (`getAvailable`): Muestra las cuentas contables que aún no han sido asignadas (o que pueden ser asignadas) a la reagrupación seleccionada.
* **Listar Disponibles (Árbol)** (`getAvailableTree`): Versión jerárquica para selectores visuales.
* **Obtener Detalle** (`getDetail`): Recupera la información de una relación específica.

### Gestión (Asignación)
* **Asignar Cuenta a Grupo** (`assignAccount`): Vincula una cuenta contable específica a una categoría analítica.
* **Asignar Cuentas Masivas** (`assignBatch`): Permite vincular múltiples cuentas contables a un mismo nodo de reagrupación en una sola operación (pasando la lista en un string).

---

## 💡 Ejemplos de Uso

### 1. Ver Cuentas en "Centro de Costos Ventas"
Saber qué cuentas contables imputan gastos al sector Ventas.

**Recurso**: `ReagrupacionCuentaPpal` 

**Operación**: `Listar Asignadas`

**Parámetros (Query)**:

* IdReagPpal: `5` (Centros de Costo)
* IdCtaReagPpal: `VTA` (Sector Ventas)

### 2. Asignar Cuentas a Cash Flow
Vincular la cuenta "Ventas" al rubro "Ingresos" del Cash Flow.

**Recurso**: `ReagrupacionCuentaPpal`  

**Operación**: `Asignar Cuenta a Grupo`

**JSON Body**:
```json
[
  {
    "idCtaPpal": "4.1.01.001",    // Cuenta Ventas
    "idReagPpals": "2",           // ID Cash Flow (como string en este endpoint)
    "idCtaReagPpals": "ING-01"    // Nodo Ingresos
  }
]
```

### 3. Asignación Masiva
Asignar varias cuentas de gastos al nodo "Administración".

**Recurso**: `ReagrupacionCuentaPpal` 

**Operación**: `Asignar Cuentas Masivas`

**JSON Body**:

```json
[
  {
    "idReagPpal": "5",
    "idCtaReagPpal": "ADM",
    "cuentasPrincipales": "5.1.01.001, 5.1.01.002, 5.1.01.003"
  }
]
```

---

## ⚠️ Notas Técnicas
**Unicidad**: Dependiendo de la configuración de la reagrupación (multiple = true/false en `PlanesReagrupacionPpal`), una cuenta contable puede pertenecer a un solo nodo (ej: un gasto es de UN solo centro de costo) o a varios.

**Formatos de ID**: Preste atención a que algunos endpoints de este recurso esperan los IDs numéricos (`idReagPpal`) como cadenas de texto (string) en el cuerpo del JSON, debido a firmas legacy de la API.