# Recurso Pesajes (SIGES)

El recurso **Pesajes** gestiona el circuito de control de carga a granel (camiones) en plantas y acopios.

Permite interactuar con las básculas físicas para obtener el peso en tiempo real y administrar el ciclo de vida de los **Tickets de Pesada**:
1.  **Entrada (Abrir Ticket)**: Registro del peso bruto o tara al ingresar.
2.  **Salida (Cerrar Ticket)**: Registro del segundo peso para calcular el neto.
3.  **Gestión**: Anulación, modificación de patentes y consulta de historial.

## 📋 Campos Principales

### Ticket de Pesada
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idTicket` | Int | Identificador único de la transacción de pesaje. |
| `patente` | String | Dominio o chapa del vehículo (Camión/Acoplado). |
| `estado` | String | Estado del flujo (ej: "Abierto", "Cerrado", "Anulado"). |
| `pesadaEntrada` | Objeto | Datos de la primera pesada (Peso, Fecha, ID Báscula). |
| `pesadaSalida` | Objeto | Datos de la segunda pesada al cerrar el circuito. |
| `idPlanta` | Int | Identificador del lugar físico donde se realiza la operación. |

### Báscula (Hardware)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idBascula` | Int | Identificador de la balanza física. |
| `descripcion` | String | Nombre o ubicación (ej: "Balanza Entrada 1"). |
| `pesoActual` | Decimal | (Solo lectura) Valor que indica la balanza en tiempo real. |

---

## 🛠 Operaciones Disponibles

### Gestión de Tickets (Transaccional)
* **Listar Tickets** (`getTickets`): Consulta el historial o la cola de camiones en planta.
    * *Filtros*: `Estado` (Abierto/Cerrado), `FechaHoraDesde`, `Patente`, `ListoParaSalir`.
* **Obtener Ticket** (`getTicket`): Recupera el detalle completo de una operación.
* **Abrir Ticket (Entrada)** (`openTicket`): Inicia un nuevo movimiento registrando la "Pesada de Entrada".
* **Cerrar Ticket (Salida)** (`closeTicket`): Finaliza el movimiento registrando la "Pesada de Salida" y calculando el neto.
* **Modificar Ticket** (`updateTicket`): Permite corregir datos (como la patente) en tickets abiertos.
* **Anular Ticket** (`voidTicket`): Cancela lógica de un ticket (Abierto o Cerrado).

### Gestión de Básculas (Dispositivos)
* **Listar Básculas** (`getScales`): Devuelve el catálogo de balanzas configuradas.
* **Leer Peso Actual** (`getScaleWeight`): Consulta el estado y peso instantáneo de una báscula específica (Ideal para integración con hardware IoT o validaciones).

---

## 💡 Ejemplos de Uso

### 1. Ingreso de Camión (Abrir Ticket)
Registrar la entrada de un camión con 15,000 kg en la balanza 1.

**Recurso**: `Pesajes` 

**Operación**: `Abrir Ticket`

**JSON Body**:
```json
{
  "patente": "AB123CD",
  "esperaHabilitacionParaSalir": false,
  "pesadaEntrada": {
    "idBascula": 1,
    "peso": 15000,
    "manual": true, // True si el operador digitó el peso, False si leyó del hardware
    "manualMotivo": "Lectura automática fallida"
  }
}
```

### 2. Salida de Camión (Cerrar Ticket)
El camión "AB123CD" (Ticket ID 5500) sale vacío (Tara 8,000 kg).

**Recurso**: `Pesajes` 

**Operación**: `Cerrar Ticket`

**Parámetros**: 

* IdTicket: `5500` 

**JSON Body**:

```json
{
  "idBascula": 1,
  "peso": 8000,
  "manual": false
}
```

### 3. Consultar Camiones en Planta
Ver qué vehículos están dentro (Tickets abiertos).

**Recurso**: `Pesajes` 

**Operación**: `Listar Tickets`

**Parámetros (Query)**:

* Estado: `Abierto`

* FechaHoraDesde: `2026-01-15T00:00:00`

---

## ⚠️ Notas Técnicas
* **Pesadas Manuales vs Automáticas**: Los objetos `pesadaEntrada` y `pesadaSalida` tienen una bandera manual. Si es true, se debe justificar con manualMotivo. Si el sistema está integrado con balanzas electrónicas, se intenta enviar manual: false para asegurar la integridad del dato.

* **Validación de Estado**: No se puede cerrar un ticket que ya está cerrado o anulado. No se puede modificar un ticket que ya tiene carta de porte asociada (Remitido).

* **Lectura de Hardware**: El endpoint Leer Peso Actual depende de que el servicio de API tenga conectividad directa con el concentrador de las balanzas.