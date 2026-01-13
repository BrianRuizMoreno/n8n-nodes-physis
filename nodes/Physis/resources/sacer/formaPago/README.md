# Recurso Forma de Pago (SACER)

El recurso **Forma de Pago** administra las condiciones de cobro y pago utilizadas en las transacciones comerciales de granos.

Permite definir reglas como "Contado", "30 días fecha factura", o "A Cosecha", especificando si el pago es en cuotas o tiene vencimientos fijos. Estas definiciones son consumidas por los módulos de **Contratos** y **Liquidación**.

## 📋 Estructura de Datos (Schema)

Para las operaciones de **Crear** o **Actualizar**, el sistema espera un objeto JSON con la configuración financiera:

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codigo` | Int | **0** para crear nueva. ID existente para editar. |
| `descripcion`* | String | Nombre visible (ej: "30 Días FF"). |
| `sigla` | String | Abreviatura para reportes (ej: "30D"). |
| `numeroCuotas` | Int | Cantidad de pagos parciales (1 para pago único). |
| `tipoVencimiento` | Int | Lógica de cálculo (0: Días, 1: Fecha Fija, etc.). |
| `diaVencimiento` | Int | Día específico de corte (si aplica). |
| `observacion` | String | Notas internas. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Devuelve el maestro completo de condiciones de pago.
* **Obtener por ID** (`get`): Recupera el detalle de una forma de pago específica.

### ABM (Escritura)
* **Crear** (`create`): Da de alta una nueva condición comercial.
* **Actualizar** (`update`): Modifica la descripción o los plazos.
* **Eliminar** (`delete`): Borra una forma de pago (si no está usada en contratos históricos).

---

## 💡 Ejemplos de Uso

### 1. Crear Condición "60 Días"
Configurar una forma de pago simple a 60 días.
**Operación**: `Crear`
**JSON Body**:
```json
{
  "codigo": 0,
  "descripcion": "60 Días Fecha Factura",
  "sigla": "60D",
  "numeroCuotas": 1,
  "tipoVencimiento": 0, // 0 = Días desde emisión
  "diaVencimiento": 60,
  "observacion": "Condición estándar para Maíz"
}
```

### 2. Listar para Selector
Obtener todas las formas de pago para llenar un campo desplegable en un formulario de alta de contrato. 

**Operación**: Listar Todas (Sin parámetros adicionales)

---

## ⚠️ Notas Técnicas
* **Uso en Contratos**: El codigo que obtienes aquí es el que debes enviar en el campo codFormaDePago al crear un Contrato o una Fijación.

* **Integración con Gestión**: Estas formas de pago suelen estar sincronizadas o repercuten en la previsión financiera (Cashflow) del módulo SIGES.