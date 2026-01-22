# Recurso Bancos (SIGES)

El recurso **Bancos** es el núcleo de la gestión financiera bancaria en SIGES.

Administra el catálogo de entidades financieras (Bancos), sus configuraciones técnicas (Interbanking, Formatos de exportación) y las cuentas bancarias asociadas tanto a la propia empresa como a terceros (Proveedores/Clientes).

Es fundamental para automatizar pagos electrónicos, conciliaciones bancarias y la gestión de tesorería.

## 📋 Campos Principales

### Entidad Banco
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idBanco` | String | Código identificador (ej: "011" para Banco Galicia). |
| `descripcion` | String | Nombre de la entidad. |
| `nroCUIT` | String | CUIT de la entidad financiera. |
| `idCtaPpal` | String | Cuenta contable asociada por defecto. |

### Cuenta Bancaria de Tercero
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `cbu` | String | Clave Bancaria Uniforme (22 dígitos). |
| `cuentaBancaria` | String | Número de cuenta interno. |
| `idAuxi` / `idCtaAuxi` | Int/String | Identificador del tercero (Proveedor/Cliente) dueño de la cuenta. |

---

## 🛠 Operaciones Disponibles

### Gestión de Entidades (Maestro)
* **Listar Bancos** (`getAll`): Devuelve el catálogo completo de bancos.
* **Obtener por ID** (`get`): Recupera el detalle de un banco específico.
* **ABM** (`create`, `update`, `delete`): Alta, baja y modificación de entidades bancarias.
* **Listar Árbol** (`getTree`): Estructura optimizada para selectores jerárquicos.

### Gestión de Cuentas de Terceros
Estas operaciones permiten administrar las CBUs donde se realizarán transferencias a proveedores.
* **Consultar Cuentas Terceros** (`getCuentasTerceros`): Busca las cuentas bancarias registradas para un proveedor específico.
* **ABM Cuentas Terceros** (`createCuentaTercero`, `updateCuentaTercero`, `deleteCuentaTercero`): Permite cargar o modificar CBUs de proveedores.

### Configuraciones y Filtros Especiales
* **Formatos Electrónicos** (`getFormatosElectronicos`): Obtiene configuraciones para exportación de archivos (Interbanking).
* **Cuentas Exporta OP** (`getCuentasExportaOP`): Filtra bancos habilitados para generar órdenes de pago automáticas.
* **Cuentas Caución** (`getCuentasCaucion`): Lista cuentas habilitadas para operatoria de valores en caución.

---

## 💡 Ejemplos de Uso

### 1. Listar Bancos para Selector
Llenar un combo en una pantalla de "Alta de Pago".

**Recurso**: `Bancos` 

**Operación**: `Listar Bancos`

**Respuesta Esperada (Simplificada)**:
```json
[
  { "idBanco": "011", "descripcion": "BANCO GALICIA" },
  { "idBanco": "072", "descripcion": "BANCO SANTANDER" }
]
```

### 2. Consultar CBU de un Proveedor
Antes de emitir una transferencia, verificar si el proveedor "Juan Perez" (ID Auxiliar 500) tiene cuenta cargada.

**Recurso**: `Bancos` 

**Operación**: `Consultar Cuentas Terceros`

**Parámetros (Query)**:

* IdAuxi: `500`

### 3. Cargar Nueva CBU a Proveedor
Registrar la cuenta bancaria para un nuevo proveedor.

**Recurso**: `Bancos` 

**Operación**: `Crear Cuenta Tercero`

**JSON Body**:

```json
{
  "idAuxi": 500,
  "idBanco": "011",
  "cbu": "0070000000000000000000",
  "titular": "Juan Perez",
  "porDefecto": 1
}
```

---

## ⚠️ Notas Técnicas
* **IDs de Banco**: Generalmente siguen la codificación del `BCRA` (3 dígitos), pero esto depende de la carga inicial del sistema.

* **Cuentas de Terceros**: Al crear una cuenta bancaria para un tercero, es crucial vincularla correctamente mediante `idAuxi` (ID interno del proveedor) o `idCtaAuxi` (Código de cuenta corriente), dependiendo de cómo esté configurado el plan de cuentas.

* **Seguridad**: Las operaciones de modificación de cuentas bancarias (**PUT**, **POST** en Cuentas Terceros) son sensibles y suelen estar auditadas por el campo `idUsuario`.