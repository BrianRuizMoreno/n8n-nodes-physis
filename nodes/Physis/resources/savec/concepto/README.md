# Recurso Concepto (SAVEC)

El recurso **Concepto** administra los ítems o rubros utilizables en la facturación, liquidación y contratos de granos. Estos conceptos definen *qué* se está cobrando, pagando o ajustando (ej: "Flete", "Paritaria", "Gastos Administrativos", "Bonificación").

Permite configurar sus fórmulas de cálculo, alícuotas de IVA y cuentas contables asociadas.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `codConcepto` | Int | Código identificador (0 para crear uno nuevo). | Sí |
| `descripcion` | String | Nombre del concepto (ej: "Gastos de Sellado"). | Sí |
| `clase` | String | Clasificador o categoría del concepto. | No |
| `sigla` | String | Abreviatura para reportes. | No |
| `formula` | String | Expresión para cálculo automático. | No |
| `alicuota` | Decimal | Porcentaje de IVA aplicable. | No |
| `codCereal` | Int | Grano asociado (si aplica solo a uno). | No |
| `nroCuentaPrincipal`| String | Cuenta contable principal. | No |
| `kilos` | Decimal | Valor por defecto en kilos (si aplica). | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Conceptos** (`getAll`): Recupera el listado maestro de conceptos.
    * *Filtros opcionales*: `clase` (ej: 'RET' para retenciones), `codConcepto`.
* **Obtener por ID** (`get`): Obtiene el detalle de un concepto específico mediante su código.

### ABM (Escritura)
* **Crear** (`create`): Da de alta un nuevo concepto en el sistema.
* **Actualizar** (`update`): Modifica la configuración de un concepto existente.
* **Eliminar** (`delete`): Borra un concepto (si no está siendo utilizado en movimientos).

---

## 💡 Ejemplos de JSON

### 1. Crear un Concepto de "Flete Corto"
Registra un nuevo ítem para facturar fletes con una alícuota de IVA del 21%.

**Recurso**: `Concepto` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "codConcepto": 0,
  "descripcion": "Flete Corto a Puerto",
  "clase": "FLETES",
  "sigla": "FLE01",
  "iva": 1,
  "alicuota": 21.0,
  "nroCuentaPrincipal": "4.1.01.001",
  "codCereal": 0
}
```
### 2. Buscar Conceptos de una Clase
Obtener todos los conceptos clasificados como "Impuestos" o con una clase específica.

**Recurso**: ``Concepto`` 

**Operación**: ``Listar Conceptos`` 

**JSON Body (Filtros)**:
```json

{
  "clase": "IMPUESTOS"
}
```