# Recurso Interdepósitos (SIGES)

El recurso **Interdepósitos** administra las operaciones de transferencia, consolidación o envío de valores y mercancías agrupadas.

Generalmente se utiliza para:
1.  **Clearing Bancario**: Agrupación de cheques para depósito en banco.
2.  **Logística**: Gestión de envíos o lotes de transporte ("Números de Envío").

## 🛠 Operaciones Disponibles

### Gestión de Comprobantes
* **Obtener Interdepósito** (`get`): Consulta el detalle de un movimiento puntual mediante su ID de comprobante y ejercicio.
* **Obtener Próximo ID** (`getNextId`): Utilidad para averiguar cuál es el siguiente número correlativo disponible para generar un nuevo interdepósito.

### Gestión de Lotes y Envíos
* **Listar Números de Envío** (`getShipmentNumbers`): Dada una fecha, devuelve todos los números de lote generados ese día.
* **Buscar por Fecha y Envío** (`getByDateAndShipment`): Recupera el contenido (items) de un lote específico.
* **Última Fecha Exportable** (`getLastExportDate`): Consulta de control para saber hasta cuándo se han procesado envíos externos.

### Medios
* **Listar Medios** (`getMeans`, `getAllMeans`): Consulta los canales o tipos de transporte/depósito disponibles en el sistema.

---

## 💡 Ejemplos de Uso

### 1. Consultar Lotes del Día
El tesorero quiere ver cuántos lotes de depósito se generaron hoy.

**Recurso**: `Interdepositos` 

**Operación**: `Listar Números de Envío`

**Parámetro**: 

* Fecha: `2026-01-16`

### 2. Auditar un Envío Específico
Verificar qué cheques o items contenía el Lote N° 5 del día de ayer.

**Recurso**: `Interdepositos` 

**Operación**: `Buscar por Fecha y Envío`

**Parámetros**:

* Fecha: `2026-01-15`
* Número de Envío: `5`

### 3. Generar Nuevo Depósito
Antes de guardar, consultar qué ID usar.

**Recurso**: `Interdepositos` 

**Operación**: `Obtener Próximo ID`

> *Respuesta*: `{ "nextId": 10054 }`

---

## ⚠️ Notas Técnicas

* **Fecha**: Los endpoints de fecha esperan un formato compatible con `DateTime` (ISO 8601), aunque internamente la API puede trabajar con fechas contables.
* **Exportable**: La bandera `Exportable` en "Medios" suele indicar si ese tipo de depósito genera interfaces para otros sistemas (ej: Interbanking).