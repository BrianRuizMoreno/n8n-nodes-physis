# Recurso Créditos (SIGES)

El recurso **Créditos** administra la política de riesgo crediticio de la empresa hacia sus terceros (Clientes).

Permite definir límites de crédito máximos, asignar tipos de bienes en garantía y, fundamentalmente, consultar el **Crédito Disponible** en tiempo real antes de autorizar una venta o emitir un pedido.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idAuxi` | Int | Identificador numérico del tercero (Cliente). |
| `idCtaAuxi` | String | Código alfanumérico alternativo del tercero. |
| `montoLimite` | Decimal | Límite máximo de deuda autorizada. |
| `disponible` | Decimal | Monto restante para operar (Límite - Deuda Actual). |
| `tipoBien` | Int | Clasificación de garantías o bienes asociados al crédito. |

---

## 🛠 Operaciones Disponibles

### Gestión de Límites (Configuración)
* **Consultar Crédito Asignado** (`getCredito`): Devuelve la configuración actual del crédito para un cliente específico (Límite total, vencimientos, garantías).
* **ABM de Créditos** (`insertUpdate`, `delete`): Permite crear, modificar o eliminar la asignación crediticia de un tercero.
    * *Nota*: La operación de inserción/actualización recibe un objeto JSON serializado.

### Control Operativo (Consulta de Disponible)
* **Consultar Disponible** (`getDisponible`): Verifica cuánto crédito tiene libre un cliente en este momento. Es el endpoint crítico para validar pedidos.
* **Detalle de Disponible** (`getDisponibleDetalle`): Desglose de cómo se compone el saldo y el crédito tomado.
* **Reporte de Situación** (`getDisponibleReporte`): Genera datos para informes de estado crediticio.

### Maestros Auxiliares
* **Tipos de Bienes** (`getTiposBienes`): Lista los tipos de garantías o bienes que pueden respaldar un crédito.
* **Formas de Cancelación** (`getFormasCancelacion`): Métodos admitidos para cancelar saldos crediticios.

---

## 💡 Ejemplos de Uso

### 1. Validar Pedido de Venta
Antes de confirmar un pedido de $500,000, verificar si el cliente (ID 1050) tiene cupo suficiente.

**Recurso**: `Créditos` 

**Operación**: `Consultar Disponible`

**Parámetros (Path)**:
* IdAuxi: `1050`
* IdCtaAuxi: `CLI-1050` (o vacío según config)

**Respuesta Esperada**:
```json
{
  "limiteTotal": 1000000,
  "deudaActual": 200000,
  "disponible": 800000,
  "estado": "Aprobado"
}
```
(Como 800k > 500k, el pedido se aprueba).

### 2. Asignar Nuevo Límite
Aumentar el límite de crédito de un cliente.

**Recurso**: `Créditos` 

**Operación**: `Insertar/Actualizar`

**Parámetro (Query)**:

* creditoJson: `{"idAuxi": 1050, "montoLimite": 2000000, "observaciones": "Ampliación por temporada"}`

---

## ⚠️ Notas Técnicas
* **JSON en Query String**: El endpoint de alta/modificación (`/api/siges/creditos/insertupdate`) tiene una particularidad: espera el objeto de datos completo serializado dentro de un parámetro string llamado `creditoJson` en la URL, en lugar de en el Body del request.

* **Claves de Tercero**: La mayoría de los endpoints requieren identificar al cliente. El sistema suele aceptar `IdAuxi` (Numérico interno) o `IdCtaAuxi` (Código de usuario). Generalmente basta con enviar uno de los dos válidos, pero algunos endpoints en la ruta (`/terceros/{IdAuxi}/{IdCtaAuxi}/...`) piden ambos por estructura; en esos casos, asegúrese de tener los datos correctos o usar comodines si el sistema lo permite.