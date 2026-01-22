# Recurso Ajuste (SACH)

El recurso **Ajuste** permite gestionar las correcciones físicas y monetarias sobre las operaciones de hacienda. Se utiliza principalmente para emitir Notas de Débito, Notas de Crédito (ajustes financieros) o realizar correcciones de stock (ajustes físicos) posteriores a una liquidación.

Este recurso maneja dos grandes flujos de trabajo:
1. **Ajustes Financieros**: Correcciones puramente monetarias (ej: diferencia de precio, error de facturación).
2. **Ajustes Físicos/Monetarios**: Correcciones que involucran cabezas, kilos o conceptos mixtos.

## 📋 Campos Principales (Schema)

### Ajuste Financiero (Crear)
Para la emisión de un ajuste financiero, se envía un objeto JSON con la estructura del comprobante.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idComprobanteSACHLiquidacion` | Int | ID de la liquidación origen que se ajusta. | No |
| `fechaEmision` | Date | Fecha del comprobante (ISO 8601). | Sí |
| `importeTotal` | Decimal | Monto total del ajuste. | Sí |
| `idTipoComprobante` | String | Código del tipo de comprobante (ND/NC). | Sí |
| `gastos` | Array | Lista de gastos/conceptos a ajustar. | No |
| `vencimientos` | Array | Cronograma de vencimientos del pago. | No |

### Ajuste Físico (Parámetros)
La emisión física suele realizarse por parámetros en la URL o Query String en lugar de un cuerpo único, definiendo el tipo y signo.

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| `iTipoAjuste` | Int | `1` = Físico, `2` = Monetario. |
| `iSignoAjuste` | Int | `1` = Débito (Suma), `2` = Crédito (Resta). |
| `idComprobanteSachLiquidacion` | Int | Liquidación a ajustar. |

---

## 🛠 Operaciones Disponibles

### 1. Búsqueda y Consultas
* **Listar Ajustes** (`busqueda`): Permite buscar ajustes históricos con múltiples filtros.
    * *Filtros*: `FechaDesde`, `FechaHasta`, `EsAjusteFisico`, `EsAjusteMonetario`, `IdTipoOperacion`.
* **Obtener Ajuste Financiero** (`consultaFinanciero`): Recupera el detalle de un ajuste financiero por ID.
* **Obtener Ajuste Físico** (`consultaFisico`): Recupera el detalle de un ajuste físico por ID.

### 2. Emisión (Escritura)
* **Crear Ajuste Financiero** (`emitirFinanciero`): Emite o pre-emite una Nota de Débito/Crédito financiera.
    * *Opción*: `bPreemision` (boolean) para validar antes de grabar.
* **Emisión Ajuste Físico/Monetario** (`emision`): Inicia el proceso de ajuste físico.
    * *Nota*: Este proceso puede requerir pasos intermedios de grabación temporal (`gastos-vencimientos-temp`) y emisión final (`emision-final`) dependiendo de la complejidad.

### 3. Maestros y Auxiliares
Endpoints para poblar las listas necesarias para cargar un ajuste.
* **Listar Tipos Comprobante** (`getTiposComprobantes`): Obtiene los tipos habilitados (ej: NDA, NCA) para ajustes financieros o físicos.
* **Listar Gastos** (`getGastos`): Catálogo de gastos disponibles para incluir en el ajuste.
* **Listar Tributos** (`getTributos`): Impuestos aplicables.
* **Obtener Cuentas Principales** (`getCuentasPrincipales`): Plan de cuentas habilitado para ajustes.

---

## 💡 Ejemplos de JSON

### 1. Crear Ajuste Financiero (Nota de Crédito)
Ajuste por diferencia de precio a favor del cliente.

**Operación**: `Crear Ajuste Financiero`

**JSON Body**:
```json
{
  "idComprobanteSACHLiquidacion": 12345,
  "fechaEmision": "2024-06-01T10:00:00.000Z",
  "idTipoComprobante": "NCA",
  "numero": "0001-00000055",
  "importeTotal": 15000.00,
  "observaciones": "Descuento comercial post-facturación",
  "gastos": [
    {
      "idGasto": 10,
      "importe": 15000.00,
      "detalle": "Bonificación Comercial"
    }
  ],
  "vencimientos": [
    {
      "fechaVencimiento": "2024-06-01T10:00:00.000Z",
      "importe": 15000.00,
      "contado": true
    }
  ]
}
```

### 2. Buscar Ajustes del Mes
Consultar todos los ajustes físicos realizados en junio.

**Operación**: ``Listar Ajustes ``

**Parámetros (Query)**:

* FechaDesde: ``2024-06-01T00:00:00``

* FechaHasta: ``2024-06-30T23:59:59``

* EsAjusteFisico: ``true``

---

## ⚠️ Notas Técnicas
* **Pre-Emisión**: La operación de creación financiera admite el parámetro ``bPreemision``. Se recomienda usarlo en ``true`` primero para validar reglas de negocio sin persistir datos, y luego en ``false`` para confirmar la operación.

* **Flujo Físico**: Los ajustes físicos suelen ser más complejos ya que afectan stock de cabezas. Asegúrese de tener el ID correcto de la liquidación (``idComprobanteSACHLiquidacion``) antes de intentar el ajuste.