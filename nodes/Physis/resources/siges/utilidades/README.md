# Recurso Utilidades (SIGES)

El recurso **Utilidades** agrupa operaciones misceláneas de control, validación y gestión de entidades auxiliares que no justifican un recurso independiente.

## 🛠 Operaciones Disponibles

### Gestión de Identidad
* **Listar Firmantes** (`listSignatories`): Devuelve la nómina de personas autorizadas para firmar documentación en el sistema.

### Validaciones Contables
* **Controlar Fecha Subdiario** (`checkSubjournalDate`): Verifica si es posible registrar un comprobante en una fecha determinada. Valida:
    * Que el ejercicio contable esté abierto.
    * Que la fecha no sea anterior al último cierre.
    * Que respete la correlatividad de fechas del subdiario.
* **Verificar Devolución IVA** (`checkIvaRefundStatus`): Controla si un comprobante específico ya tiene asociado un proceso de reintegro de IVA (Turistas/Exportación), evitando duplicidad.

### Interfaz Contable
* **Insertar Comprobante Tercero** (`createThirdPartyVoucher`): Permite inyectar comprobantes (generalmente gastos o compras menores) con imputación directa a cuentas contables, sin pasar por el circuito completo de compras y stock.

---

## 💡 Ejemplos de Uso

### 1. Validar Fecha de Carga
Antes de intentar insertar una factura con fecha 10/01/2026, verificar si el sistema permite esa fecha para el ejercicio actual.

**Recurso**: `Utilidades` 

**Operación**: `Controlar Fecha Subdiario`

**Parámetros**:
* idEjercicio: `2026`
* idTipoComprobante: `FAC`
* fecha: `2026-01-10`

### 2. Cargar Gasto Menor (Fondo Fijo)
Registrar un ticket de taxi como comprobante de tercero.

**Recurso**: `Utilidades` 

**Operación**: `Insertar Comprobante Tercero`

**JSON Body**:
```json
[
  {
    "fechaInt": "2026-01-16T10:00:00Z",
    "idTipoComprobanteInt": "GAS",
    "nombreTipoComprobanteInt": "Gasto Varios",
    "numComprobanteInt": "0001-00000055",
    "numDocumento": "20999999999", // CUIT Taxista
    "comprobantedeTerceroDetalle": [
      {
        "detalle": "Viaje a Reunión",
        "debe": 5000,
        "haber": 0,
        "idAuxi": 0
      }
    ],
    "usuario": 1
  }
]
```

---

## ⚠️ Notas Técnicas
* **Estructura Array**: La operación `createThirdPartyVoucher` espera obligatoriamente un Array de objetos en el cuerpo de la petición, incluso si se envía un solo comprobante.

* **Fechas**: El control de fechas es estricto en SIGES. Si `checkSubjournalDate` devuelve error o false, cualquier intento posterior de inserción fallará a nivel de base de datos.