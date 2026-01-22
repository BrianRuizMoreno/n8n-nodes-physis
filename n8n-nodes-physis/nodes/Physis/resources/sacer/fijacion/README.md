# Recurso Fijación (SACER)

El recurso **Fijación** permite gestionar el cierre de precio de los contratos de granos.

Cuando se realiza un contrato "A Fijar", el productor entrega la mercadería pero el precio queda abierto. Una operación de Fijación toma una porción de esos kilos (o el total) y establece un precio final en una fecha determinada, generando la deuda o el crédito correspondiente.

## 📋 Estructura de Datos (Schema)

Para las operaciones de **Crear** o **Actualizar**, el sistema espera un objeto JSON que vincule la fijación a un contrato existente.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `nroFijacion` | Int | **0** para crear nueva. ID para editar. |
| `nroContrato`* | String | Número del contrato padre (ej: "0001-12345"). |
| `codCampania`* | Int | ID de la campaña del contrato. |
| `fecha`* | Date | Fecha de la operación de fijación. |
| `kilos`* | Decimal | Cantidad de Kg a fijar. |
| `precio`* | Decimal | Precio pactado por tonelada/quintal. |
| `idMoneda` | Int | Moneda del precio (0: Pesos, 1: Dólares). |
| `tasa` | Decimal | Tipo de cambio (si aplica). |
| `codFormaDePago` | Int | Condición de pago para la liquidación resultante. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar General** (`getAll`): Busca fijaciones por fecha, cereal o productor.
* **Listar por Contrato** (`getByContrato`): Devuelve todas las fijaciones parciales asociadas a un contrato específico.
    * *Ruta*: `/api/sacer/campanias/{campania}/contratos/{contrato}/fijaciones`
* **Obtener Detalle** (`get`): Recupera una fijación específica.

### ABM (Escritura)
* **Crear** (`create`): Registra una nueva fijación de precio.
    * *Validación*: El sistema verificará que el contrato tenga saldo "A Fijar" suficiente.
* **Actualizar** (`update`): Modifica datos (ej: corregir el precio o la fecha).
* **Eliminar** (`delete`): Borra una fijación (solo si no ha sido liquidada/facturada).

---

## 💡 Ejemplos de Uso

### 1. Fijar Precio a un Contrato
El productor decide fijar precio a 30.000 Kg de su contrato de Soja.
**Operación**: `Crear`
**JSON Body**:
```json
{
  "nroFijacion": 0,
  "nroContrato": "0001-00005544",
  "codCampania": 24,
  "fecha": "2024-05-20T00:00:00.000Z",
  "kilos": 30000,
  "precio": 290.50,
  "idMoneda": 1,
  "tasa": 850.00,
  "observaciones": "Fijación parcial telefónica"
}
```

### 2. Ver Historial de Fijaciones de un Contrato
Para saber cuánto se ha fijado ya del contrato "0001-999". 

**Operación**: Listar por Contrato.

**Parámetros**:

* codCampania: 24

* nroContrato: 0001-999

---

## ⚠️ Notas Técnicas
* **Vinculación**: Es imposible crear una fijación sin un nroContrato y codCampania válidos que existan previamente.

* **Kilos Disponibles**: Si intentas fijar más kilos de los que el contrato tiene pendientes de fijar, la API devolverá un error de validación.

* **Moneda y Tasa**: Si el contrato es en Dólares (idMoneda: 1), asegúrate de enviar la tasa de cambio correcta del día si la operación requiere pesificación o liquidación inmediata.