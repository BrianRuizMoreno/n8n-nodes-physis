# Recurso Autorización (SIGES)

El recurso **Autorización** administra el circuito de aprobación de movimientos financieros internos, conocidos como "Pases" en el sistema SIGES.

Permite gestionar el flujo de fondos controlando quién autoriza la salida de dinero o el movimiento entre cuentas. Este endpoint es utilizado para construir **Bandejas de Entrada de Aprobaciones** para gerentes o tesoreros.

> **Nota Importante**: Este recurso gestiona los autorizantes generales de tesorería. No confundir con los "Autorizantes de Comprobantes de Proveedores" (Circuito de Compras/Pagos), que tienen sus propios endpoints.

## 📋 Campos Principales

### Pase (Movimiento)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idPase` | Int | Identificador único del movimiento dentro del comprobante. |
| `idComprobante` | Int | Identificador del asiento o documento contable. |
| `idEjercicio` | Int | Año fiscal o ejercicio contable. |
| `importe` | Decimal | Monto original del movimiento. |
| `importeAutorizado` | Decimal | Monto aprobado (Si es 0, implica desautorización/rechazo). |
| `fechaFinanciera` | Date | Fecha efectiva de pago o disponibilidad de fondos. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Autorizantes** (`getAutorizantes`): Devuelve la nómina de usuarios habilitados para aprobar pases de tesorería.
    * *Alias*: Existen dos endpoints (`/autorizantes` y `/autorizadores`) que cumplen la misma función.
* **Listar Pases Pendientes** (`getPasesPendientes`): Obtiene los movimientos que requieren aprobación.
    * *Filtros*: `autorizador` (ID del aprobador), `importe` (Filtrar por montos mayores a X), `idAuxi` (Filtrar por cuenta de tercero).

### Gestión (Transaccional)
* **Actualizar Pase** (`updatePase`): Operación versátil para modificar el estado o condiciones de un pase.
    * **Autorizar**: Enviar el `ImporteAutorizado` (igual al importe del pase).
    * **Rechazar/Desautorizar**: Enviar `ImporteAutorizado = 0`.
    * **Reprogramar**: Enviar solo `FechaFinanciera` (esto no altera la autorización, solo la fecha de caja).
    * **Observar**: Modificar el campo `Observaciones`.

---

## 💡 Ejemplos de Uso

### 1. Bandeja de Pendientes del Gerente
Obtener todos los pases que están esperando aprobación por parte del autorizador "JuanPerez".

**Recurso**: `Autorización` 

**Operación**: `Listar Pases Pendientes`

**Parámetros (Query)**:
* autorizador: `JuanPerez` (o su ID numérico, según configuración).

### 2. Autorizar un Pago
Aprobar un movimiento de $10,000.

**Recurso**: `Autorización` 

**Operación**: `Actualizar Pase`

**JSON Body**:
```json
{
  "idEjercicio": 2026,
  "idComprobante": 50021,
  "idPase": 1,
  "importeAutorizado": 10000
}
```

3. Reprogramar Fecha de Pago
Mover la fecha financiera de un pase para la semana próxima sin cambiar su estado de autorización.

**Recurso**: `Autorización` 

**Operación**: `Actualizar Pase`

**JSON Body**:

```json
{
  "idEjercicio": 2026,
  "idComprobante": 50021,
  "idPase": 1,
  "fechaFinanciera": "2026-01-25T00:00:00"
}
```

---

## ⚠️ Notas Técnicas
* **Clave Primaria Compuesta**: Para identificar un pase único y poder modificarlo, es obligatorio enviar siempre la tríada: `idEjercicio`, `idComprobante` e `idPase`.

* **Restricción de SP (Stored Procedure)**: Al modificar la `fechaFinanciera`, el sistema ignora cualquier otro cambio enviado en el mismo request (como observaciones o importes). Si necesita cambiar fecha y autorizar, debe hacer dos llamadas separadas.