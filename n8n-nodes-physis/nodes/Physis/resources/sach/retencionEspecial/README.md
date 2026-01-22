# Recurso Retención Especial (SACH)

El recurso **Retención Especial** permite administrar configuraciones impositivas o de gastos específicos que se aplican a los clientes en situaciones particulares. A diferencia de los impuestos generales, estas retenciones se definen por la combinación de **Cliente**, **Tipo de Operación**, **Tipo de Hacienda** y **Lugar**.

Es fundamental para gestionar excepciones fiscales o acuerdos comerciales específicos donde se deben aplicar alícuotas de gastos (ej: IIBB, Sellos, tasas municipales) distintas a la norma general.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, se envía un objeto JSON que define el alcance de la retención y los gastos asociados.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idRetencion` | Int | Identificador único (0 para crear nueva). | Sí |
| `idCtaAuxi` | String | Código del Cliente al que aplica. | Sí |
| `idTipoOperacion` | String | Tipo de operación (ej: "REM"). | No |
| `idTipoHacienda` | String | Tipo de hacienda (ej: "INV"). | No |
| `idLugar` | String | Lugar físico de la operación. | No |
| `gastos` | Array | **Detalle**: Lista de gastos/tasas a aplicar. | Sí |
| `observaciones` | String | Comentarios internos. | No |

### Estructura de `gastos`
* `idGasto` (Int): Código del concepto de gasto.
* `alicuota` (Decimal): Porcentaje o valor a aplicar.
* `fechaVencimiento` (Date): Fecha límite de aplicación.

---

## 🛠 Operaciones Disponibles

### 1. Gestión (ABM)
* **Listar Todas** (`getAll`): Devuelve la lista completa. Permite filtrar por rango de clientes (`IdCtaAuxiDesde`, `IdCtaAuxiHasta`).
* **Obtener por ID** (`get`): Recupera una configuración específica.
* **Crear** (`create`): Da de alta una nueva regla de retención.
* **Actualizar** (`update`): Modifica una regla existente.
* **Eliminar** (`delete`): Borra una retención.
    * *Modo*: Admite borrado por ID (`modo=1`) o por clave compuesta (`modo=2` usando `idGasto`, `idTipoOperacion`, etc.).

### 2. Consultas Avanzadas
* **Consulta Avanzada (Retenciones)** (`search`): Búsqueda potente sobre la cabecera de retenciones con filtros y paginado.
* **Consulta Avanzada (Gastos)** (`searchGastos`): Búsqueda específica sobre los ítems de gastos dentro de las retenciones.

### 3. Consultas por Contexto
* **Listar por Cliente** (`getByCliente`): Obtiene las retenciones que aplican a un cliente para una operación, lugar y formulario específicos.
* **Listar por Gasto** (`getByGasto`): Filtra las reglas que contienen un gasto específico.
* **Listar por Gasto y Cliente** (`getByGastoCliente`): Combina filtros de gasto y rango de clientes.

---

## 💡 Ejemplos de JSON

### 1. Crear Retención Especial para un Cliente
Configurar una alícuota especial del 3% en un gasto de sellos para el cliente "C001" en operaciones de Remate.

**Recurso**: `Retención Especial` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idRetencion": 0,
  "idCtaAuxi": "C001",
  "idTipoOperacion": "REM",
  "idLugar": "RURAL",
  "observaciones": "Alícuota especial acordada",
  "gastos": [
    {
      "idGasto": 50,
      "alicuota": 3.00,
      "fechaVencimiento": "2026-12-31T00:00:00.000Z"
    }
  ]
}
```

## 2. Consultar Retenciones de un Cliente
Ver qué retenciones aplican al cliente "C001" para una venta de Invernada en la Rural.

**Recurso**: ``Retención Especial``  

**Operación**: ``Listar por Cliente``

**Parámetros (Query)**:

* IdCtaAuxi: ``C001``

* IdTipoOperacion: ``REM``

* IdTipoHacienda: ``INV``

* IdLugar: ``RURAL``

---

## ⚠️ Notas Técnicas
* **Jerarquía de Aplicación**: El sistema suele priorizar estas "Retenciones Especiales" por sobre las configuraciones generales de gastos. Si existe un registro aquí que coincida con la operación, se tomará esta alícuota.

* **Eliminación Compleja**: La operación ``delete`` es polimórfica. Si conoce el ID, úselo directamente. Si necesita borrar una regla basada en su definición comercial (sin saber el ID), debe enviar los parámetros de contexto y establecer ``modo=2``.