# Recurso Gasto (SACH)

El recurso Gasto administra el catálogo de conceptos deducibles o imponibles que se aplican en las liquidaciones de hacienda. Incluye comisiones, impuestos, fletes, gastos de pista y otros conceptos administrativos.

Es un maestro crítico para la facturación, ya que define:

* Cómo se calcula el importe (porcentaje, fijo, por cabeza).
* Su tratamiento impositivo (IVA, Ganancias).
* Su homologación con organismos fiscales (AFIP).
* Reglas de imputación contable automática.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la definición del gasto.
| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :--- |
| ``idGasto`` | Int | **0** para crear uno nuevo. ID para editar. | Sí |
| ``descripcion`` | String | Nombre del concepto (ej: "Comisión Casa"). | Sí |
| ``tipoGasto`` | String | Define la base de cálculo (ej: "P"=Porcentaje, "F"=Fijo). | Sí |
| ``claseGasto`` | String | Naturaleza ("D"=Débito/Gasto, "C"=Crédito). | Sí |
| ``conceptoIVA`` | String | Código de alícuota de IVA aplicable. | No |
| ``gastoAFIP`` | Int | Código de homologación para factura electrónica. | No |
| ``distribuible`` | Bool | Si el gasto se prorratea entre los ítems. | No |
| ``soloParaAjuste`` | Bool | Si es exclusivo para Notas de Débito/Crédito de ajuste. | No |

## 🛠 Operaciones Disponibles

**Consultas**

* **Listar Todos** (``getAll``): Devuelve la lista completa de gastos configurados.
* **Obtener por ID** (``get``): Recupera el detalle de un gasto específico.
* **Consulta Avanzada** (``searchV2``): Endpoint V2 que permite filtrar, ordenar y paginar resultados mediante un objeto JSON de consulta.
* **Gastos para Lote** (``getForLot``): Recupera los gastos aplicables a un lote específico basándose en el contexto de la operación (Comprador/Vendedor, Lugar, Tipo de Hacienda, etc.). Fundamental para la carga de liquidaciones.

**ABM (Escritura)**

* **Crear** (``create``): Da de alta un nuevo concepto de gasto.
* **Actualizar** (``update``): Modifica las reglas de un gasto existente.
* **Eliminar** (``delete``): Borra un gasto del sistema.

## 💡 Ejemplos de JSON

### 1. Crear Gasto de Comisión

Registra una comisión porcentual al 21% de IVA.

**Recurso**: ``Gasto``

**Operación**: ``Crear``

**JSON Body**:

```json
{
  "idGasto": 0,
  "descripcion": "Comisión por Venta",
  "tipoGasto": "P",
  "claseGasto": "D",
  "conceptoIVA": "21",
  "gastoAFIP": 5,
  "distribuible": true,
  "imprimeAlicuotaEnComprobante": true
}
```

### 2. Consultar Gastos Aplicables a un Lote
Obtener qué gastos se deben cargar al **Comprador** (TipoCliente "1") en un **Remate** (REM) de **Invernada** (INV).

**Recurso**: ``Gasto``

**Operación**: ``Gastos para Lote``

**JSON Body / Query Params**:

```json
{
  "TipoCliente": "1", 
  "idTipoOperacion": "REM",
  "idTipoHacienda": "INV",
  "idCodLugar": "RURAL",
  "IdEspecie": 1,
  "DestinoProvincia": 2
}
```

### 3. Consulta Avanzada (V2)
Buscar gastos que contengan "Flete" en su descripción.

**Recurso**: ``Gasto``

**Operación**: ``Consulta Avanzada``: 

**JSON Body (Consulta)**:

```json
{
  "filtros": {
    "filtros": ["Descripcion LIKE '%Flete%'"],
    "logico": "AND"
  },
  "paginado": {
    "paginaActual": 1,
    "registrosPorPagina": 10
  }
}
```

---

## ⚠️ Notas Técnicas
* **Contexto de Liquidación**: La operación ``getForLot`` es vital para la UI de facturación. No devuelve todos los gastos, sino solo aquellos que, según la configuración de "Imputaciones Contables" y reglas de negocio, tienen sentido para ese lote y cliente específico.
* **Tipos de Gasto**: El campo ``tipoGasto`` determina la fórmula matemática interna. Asegúrese de enviar el código correcto (ej: 'P' para porcentaje sobre el bruto, 'K' para valor por kilo, 'C' para valor por cabeza).
* **AFIP**: El campo ``gastoAFIP`` es obligatorio si el concepto debe aparecer discriminado en el libro de IVA digital o webservice de factura electrónica.