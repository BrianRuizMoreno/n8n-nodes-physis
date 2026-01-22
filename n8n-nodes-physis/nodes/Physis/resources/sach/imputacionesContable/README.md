# Recurso Imputaciones Contables (SACER)

El recurso **Imputaciones Contables** administra las reglas de asignación de cuentas contables e impuestos (IVA, Retenciones, Percepciones) aplicables a los comprobantes de granos. Define "qué cuenta toca" cada operación según el cereal, la planta y el tipo de formulario.

## 📋 Estructura de Datos (Schema)

### Objeto Imputacion
Define la regla contable.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idImputacion` | Int | **0** para crear. ID único del registro. |
| `descripcion`* | String | Nombre descriptivo de la imputación. |
| `codClase` | Int | Clase de operación. |
| `codTipoFormulario` | Int | Tipo de comprobante al que aplica. |
| `codPlanta` | Int | Planta asociada (0 = Todas). |
| `codCereal` | Int | Cereal asociado (0 = Todos). |
| `idCtappal` | Int | ID de la Cuenta Contable Principal (Debe). |
| `idCtaAuxi` | Int | ID del auxiliar contable (si aplica). |
| `idRegimen` | String | Código de régimen de retención/percepción. |

---

## 🛠 Operaciones Disponibles

### 🔍 Consultas
* **Listar Todos** (`getAll`): Recupera imputaciones filtrando por criterios clave.
    * *Filtros*: `CodCereal`, `CodPlanta`, `CodTipoFormulario`, `CodClase`, `RetenPercep`.
* **Obtener Detalle** (`get`): Busca una regla específica por ID.
* **Listar Regímenes** (`getRegimenes`): Devuelve los códigos de regímenes impositivos disponibles para asociar.

### ⚙️ Gestión
* **Crear** (`create`): Registra una nueva regla contable.
* **Modificar** (`update`): Actualiza cuentas o condiciones de una regla existente.
* **Eliminar** (`delete`): Borra una imputación.

---

## 💡 Ejemplos de Uso

### 1. Consultar Imputaciones de Soja
Ver reglas contables para el cereal Soja (ID 1) en la Planta 5.

**Recurso**: `ImputacionContable`
**Operación**: `Listar Todos`
**Parámetros**:
* **CodCereal**: `1`
* **CodPlanta**: `5`

### 2. Crear Regla para Flete
Asignar cuenta de gasto de flete para Maíz.

**Recurso**: `ImputacionContable`
**Operación**: `Crear`
**JSON Body**:
```json
{
  "idImputacion": 0,
  "descripcion": "Flete Maíz - Gasto Comercial",
  "codCereal": 2,
  "idCtappal": 450020,
  "codTipoFormulario": 15
}
```

---

## ⚠️ Notas Técnicas
**Prioridad**: El sistema suele buscar primero la regla más específica (Cereal + Planta + Formulario) y si no encuentra, busca las genéricas (Cereal 0 o Planta 0).