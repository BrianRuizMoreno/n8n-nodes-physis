# Recurso Valores (SIGES)

El recurso **Valores** administra la cartera de instrumentos financieros de la empresa, centralizando la gestión de Tesorería.

Cubre el ciclo de vida de:
* **Valores de Terceros**: Cheques recibidos de clientes (Cartera).
* **Valores Propios**: Chequeras físicas y E-Cheqs emitidos.



## 🛠 Operaciones Disponibles

### Auditoría de Estado
* **Verificar Disponibilidad** (`checkAvailability`): Informa si un valor (asociado a un comprobante) está actualmente en cartera "Vivo" (Disponible para depositar o entregar).
* **Verificar Negociado** (`checkNegotiated`): Informa si el valor ya salió del patrimonio (fue depositado, entregado a proveedor o vendido).

### Gestión de Emisión
* **Último Nro Cheque** (`getLastCheckNumber`): Fundamental para la impresión de cheques propios. Consulta a la base de datos cuál fue el último número utilizado de una chequera específica para sugerir el siguiente.

### Consultas de Movimientos
* **Listar Valores Recibidos** (`getReceivedValues`): Devuelve el detalle de los cheques que componen un Recibo de Cobro específico.
* **Listar Envíos Electrónicos** (`getElectronicBatches`): Consulta el estado de los lotes de E-Cheqs transmitidos a la entidad bancaria.

---

## 💡 Ejemplos de Uso

### 1. Imprimir Cheque Propio
Antes de generar una Orden de Pago, consultar el próximo número disponible de la chequera del Banco Galicia.

**Recurso**: `Valores` 

**Operación**: `Último Nro Cheque`

**Parámetros**:
* idBanco: `007` (Galicia)
* idCuentaBancaria: `10025`
* idChequera: `5`

> *Respuesta*: `{ "ultimoNumero": 50012 }` -> El sistema imprimirá el 50013.

### 2. Ver Cheques de un Recibo
Consultar qué cheques me entregó el cliente en el Recibo N° 8888.

**Recurso**: `Valores` 

**Operación**: `Listar Valores Recibidos`

**Parámetros**:

* idComprobante: `8888` (ID interno del recibo)
* entrega: `false` (Son recibidos)

### 3. Validar Cheque en Cartera
Saber si el cheque asociado al ID de comprobante 999 sigue en mano (1) o ya fue usado.

**Recurso**: `Valores` 

**Operación**: `Verificar Disponibilidad`

**Parámetro**: 

* idComprobante: `999`

---

## ⚠️ Notas Técnicas

* **Echeqs**: La gestión de cheques electrónicos (`getElectronicBatches`) suele depender de parámetros específicos bancarios (`sCodBanco`, `sTipoConsulta`) que varían según la integración Interbanking/Coelsa configurada en el ERP.