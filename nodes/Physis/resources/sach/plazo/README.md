# Recurso Plazo (SACH)

El recurso **Plazo** administra las condiciones de pago y financiación utilizadas en las operaciones de hacienda. Define cómo se liquidarán los lotes (ej: "30 y 60 días", "Contado", "90 días libres"), estableciendo los vencimientos, porcentajes de capital y el cálculo de intereses.

Es un maestro fundamental que impacta directamente en la generación de vencimientos de las Liquidaciones y en la cuenta corriente.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, se envía un objeto JSON que define la cabecera del plazo y el detalle de sus cuotas o días.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idPlazo` | Int | Identificador numérico (0 para crear nuevo). | Sí |
| `descripcion` | String | Nombre descriptivo (ej: "30, 60 y 90 días"). | Sí |
| `formaLiquidacion` | String | Código de la forma de cálculo (ej: "Fijo", "Libre"). | No |
| `cartel` | String | Texto para mostrar en carteles de remate. | No |
| `dias` | Array | **Cronograma**: Lista de cuotas con sus días y porcentajes. | Sí |
| `diasFinancieros` | Int | Días adicionales para el cálculo financiero. | No |

### Estructura de `dias` (Array)
Cada objeto dentro del array `dias` define una cuota:
* `dias` (Int): Cantidad de días desde la operación.
* `porcentaje` (Decimal): % del total a pagar en esa cuota.
* `intereses` (Bool): Si aplica intereses.

---

## 🛠 Operaciones Disponibles

### 1. Consultas Generales
* **Listar Plazos** (`getAll`): Devuelve la lista completa de plazos configurados.
* **Obtener por ID** (`get`): Recupera el detalle de un plazo específico, incluyendo su cronograma de días.
* **Consulta Avanzada** (`searchV2`): Búsqueda potente con filtros, paginado y ordenamiento (`/api/sach/v2/plazos`).

### 2. ABM (Escritura)
* **Crear** (`create`): Da de alta una nueva condición de pago.
* **Actualizar** (`update`): Modifica la descripción o las cuotas de un plazo existente.
* **Eliminar** (`delete`): Borra un plazo del sistema.

### 3. Consultas de Contexto
* **Plazos por Cliente/Lugar** (`getByCliente`): Devuelve los plazos **habilitados** para una operación específica. Filtra según las reglas de negocio del Lugar, el Cliente (Comprador/Vendedor) y el Tipo de Operación.
    * *Uso*: Fundamental para llenar combos en la carga de Lotes, asegurando que solo se elijan plazos válidos.

---

## 💡 Ejemplos de JSON

### 1. Crear Plazo "30 y 60 Días"
Registra un plazo desdoblado en dos cuotas iguales.

**Recurso**: `Plazo`  

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idPlazo": 0,
  "descripcion": "30 y 60 días",
  "cartel": "30/60",
  "dias": [
    {
      "dias": 30,
      "porcentaje": 50.0,
      "intereses": false
    },
    {
      "dias": 60,
      "porcentaje": 50.0,
      "intereses": true
    }
  ]
}
```

### 2. Consultar Plazos Disponibles para un Lote
Ver qué plazos puedo asignarle al Comprador (1) "C001" en un Remate (REM) en la Rural.

**Recurso**: ``Plazo``  

**Operación**: ``Plazos por Cliente/Lugar``

**Parámetros (Query)**:

* IdLugar: ``RURAL``

* IdCtaAuxi: ``C001``

* iCompraVenta: ``1`` (``Comprador``)

* IdTipoOperacion: ``REM``

---

## ⚠️ Notas Técnicas
* **Validación de Totales**: Al crear un plazo con múltiples ``días`` en el array dias, asegúrese de que la suma de los campos ``porcentaje`` sea igual a 100.

* **Operativa Diaria**: La operación ``getByCliente`` es la más utilizada en las interfaces de carga (Front-end) ya que aplica la lógica de restricciones comerciales (ej: "Este cliente no tiene habilitado pago a 90 días en este mercado").