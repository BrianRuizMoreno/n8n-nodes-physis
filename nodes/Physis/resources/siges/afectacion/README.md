# Recurso Afectación (SIGES)

El recurso **Afectación** (también conocido como Imputación o Aplicación) administra el cruce entre documentos de cuenta corriente.

Permite consultar el "saldo vivo" de los comprobantes, identificando cuáles están pendientes de pago/cobro y cuáles ya han sido cancelados.



## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `Comprobante` | String | Identificador del documento. |
| `Estado` | Int | Estado de la imputación (1=Pendiente, 2=Parcial, 3=Cancelado). |
| `Signo` | Int | Naturaleza del movimiento (+1 Deuda, -1 Pago). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Pendientes de Afectar** (`getPending`): Devuelve una lista de comprobantes que tienen saldo remanente "por usar" o "por pagar".
    * *Uso*: Ideal para llenar una grilla de "Facturas a Pagar" en una Orden de Pago.
* **Ver Detalle de Afectación** (`getAffectedDetails`): Permite auditar un comprobante para ver contra qué otros documentos se cruzó.
    * *Uso*: "¿Por qué esta factura tiene saldo cero? -> Porque se imputó con el Recibo X y la Nota de Crédito Y".

---

## 💡 Ejemplos de Uso

### 1. Buscar Facturas Impagas (Deudores)
Obtener todos los comprobantes con signo positivo (Facturas/Débitos) que están pendientes (Estado 1 o 2).

**Recurso**: `Afectacion` 

**Operación**: `Listar Pendientes de Afectar`

**Parámetros**:

* Signo: `Positivo (1)`
* Estado: `Pendiente Total (1)`

### 2. Buscar Anticipos sin Usar (Acreedores)
Buscar Recibos o Notas de Crédito (Signo Negativo) que aún tienen saldo a favor disponible para imputar a futuras facturas.

**Recurso**: `Afectacion` 

**Operación**: `Listar Pendientes de Afectar`

**Parámetros**:

* Signo: `Negativo (-1)`
* Estado: `Pendiente (1)`

### 3. Auditar un Recibo
Ver qué facturas canceló el Recibo "REC-0001-555".

**Recurso**: `Afectacion` 

**Operación**: `Ver Detalle de Afectación`

**Parámetro**: 

* comprobante: `REC-0001-555`

---

## ⚠️ Notas Técnicas

* **Lógica del Signo**: Es crucial entender el signo contable para filtrar correctamente.
    * Generalmente: **Facturas de Venta = +1**, **Recibos de Cobro = -1**.
* **Estados**: Aunque el Swagger indica valores `1, 2, 3`, la interpretación estándar en SIGES suele ser:
    * `1`: Pendiente Total (Saldo == Importe Original).
    * `2`: Pendiente Parcial (Saldo < Importe Original).
    * `3`: Cancelado (Saldo == 0).