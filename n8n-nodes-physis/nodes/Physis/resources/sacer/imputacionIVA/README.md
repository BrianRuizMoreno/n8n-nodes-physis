# Recurso Imputación IVA (SACER)

El recurso **Imputación IVA** gestiona la configuración fiscal y contable de las alícuotas de impuestos.

Cada vez que se liquida un contrato o se factura un servicio, el sistema utiliza esta tabla para saber qué porcentaje de IVA aplicar y, lo más importante, a qué cuentas contables imputar el Débito Fiscal, Crédito Fiscal y las percepciones asociadas.

## 📋 Estructura de Datos (Schema)

Para las operaciones de **Crear** o **Actualizar**, se requiere un objeto JSON con la definición completa de las cuentas.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idIva` | Int | **0** para crear nueva. ID para editar. |
| `descripcion`* | String | Nombre (ej: "IVA 10.5% Granos"). |
| `alicuota`* | Decimal | Porcentaje del impuesto (ej: 10.5). |
| `tipoDeIVA` | Bool | Indica si es un IVA estándar o especial. |
| `ctaPpalDeb` | String | Cuenta Contable Débito Fiscal (Ventas). |
| `ctaPpalCred` | String | Cuenta Contable Crédito Fiscal (Compras). |

*Nota*: Existen múltiples campos adicionales (`ctaPpalRestDeb`, `ctaPpalDebitoServicios`) para manejar casos específicos como Restituciones o IVA Servicios.

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Devuelve el maestro de alícuotas configuradas.
* **Obtener por ID** (`get`): Recupera el detalle de cuentas de una alícuota.

### ABM (Escritura)
* **Crear** (`create`): Da de alta una nueva configuración impositiva.
* **Actualizar** (`update`): Modifica las cuentas contables asociadas.
* **Eliminar** (`delete`): Borra una imputación (solo si no tiene movimientos).

---

## 💡 Ejemplos de Uso

### 1. Listar Alícuotas Disponibles
Para llenar un combo en una pantalla de facturación manual.
**Operación**: `Listar Todas`
**Resultado Esperado**:
```json
[
  { "idIva": 1, "descripcion": "Exento", "alicuota": 0 },
  { "idIva": 4, "descripcion": "IVA 10.5%", "alicuota": 10.5 },
  { "idIva": 5, "descripcion": "IVA 21%", "alicuota": 21.0 }
]
```

### 2. Actualizar Cuenta Contable de IVA 21%
Cambiar la cuenta de mayor a la que imputa el Crédito Fiscal. 

**Operación**: Actualizar 
**JSON Body**:

```json
{
  "idIva": 5,
  "descripcion": "IVA 21% General",
  "alicuota": 21.0,
  "ctaPpalCred": "21050201" // Nuevo plan de cuentas
}
```

---

## ⚠️ Notas Técnicas
* **Integración Contable**: Los códigos de cuenta (ctaPpal...) deben existir previamente en el Plan de Cuentas (módulo SIGES). Si envías una cuenta inexistente, la operación fallará.

* **Uso en Cereal**: Al crear un Cereal, se debe especificar el idIva correspondiente para que el sistema sepa cómo liquidarlo automáticamente.