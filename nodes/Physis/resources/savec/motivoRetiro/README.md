# Recurso Motivo Retiro (SAVEC)

El recurso **Motivo Retiro** administra las causales o justificaciones por las cuales se produce una salida física de cereal del stock. Estos motivos clasifican los egresos de mercadería permitiendo distinguir, por ejemplo, entre una venta, un ajuste de inventario, un consumo propio o un traslado.

Los "flags" booleanos (`ventaInterna`, `ajusteStock`, etc.) determinan cómo impacta ese movimiento en los reportes de gestión.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `codMotivo` | Int | Código identificador (0 para crear uno nuevo). | Sí |
| `descripcion` | String | Nombre del motivo (ej: "Venta Interna"). | Sí |
| `ventaInterna` | Bool | Indica si el retiro se considera una venta. | No |
| `ajusteStock` | Bool | Indica si es un ajuste (ej: mermas, diferencias). | No |
| `traspasoStock` | Bool | Indica si es un movimiento entre depósitos/silos. | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve el listado completo de motivos de retiro configurados.
* **Obtener por ID** (`get`): Recupera el detalle de un motivo específico mediante su código.

### ABM (Escritura)
* **Crear** (`create`): Da de alta un nuevo motivo de retiro.
* **Actualizar** (`update`): Modifica la configuración de un motivo existente.
* **Eliminar** (`delete`): Borra un motivo (si no está siendo utilizado en movimientos).

---

## 💡 Ejemplos de JSON

### 1. Crear Motivo "Consumo Animal"
Registra una causal de retiro para alimentación de ganado propio (no es venta, es consumo interno).

**Recurso**: `Motivo Retiro`

**Operación**: `Crear`

**JSON Body**:
```json
{
  "codMotivo": 0,
  "descripcion": "Consumo Animal (Feedlot)",
  "ventaInterna": false,
  "ajusteStock": false,
  "traspasoStock": false
}
```

### 2. Crear Motivo "Ajuste por Merma"
Registra una causal para corregir diferencias de stock por secado o zarandeo.

**Recurso**: ``Motivo Retiro``

**Operación**: ``Crear`` 

**JSON Body**:

```json
{
  "codMotivo": 0,
  "descripcion": "Ajuste por Merma Volátil",
  "ventaInterna": false,
  "ajusteStock": true,
  "traspasoStock": false
}
```