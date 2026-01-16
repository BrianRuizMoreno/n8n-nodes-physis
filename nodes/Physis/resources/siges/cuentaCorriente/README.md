# Recurso Cuentas Corrientes (SIGES)

El recurso **Cuentas Corrientes** administra las cuentas operativas que la empresa mantiene en las distintas entidades financieras.

Se diferencia del recurso *Bancos* en que este último define la entidad (ej: "Banco Galicia"), mientras que este recurso define la cuenta específica (ej: "CC $ 1234/5 Sucursal Rosario") con sus configuraciones de moneda, medios de pago y conciliación.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idCuentaBancaria` | Long | Identificador único interno de la cuenta. |
| `idBanco` | String | Código del banco al que pertenece. |
| `numeroCuenta` | String | Número oficial de la cuenta en el banco. |
| `cbu` | String | Clave Bancaria Uniforme. |
| `idMoneda` | String | Moneda de operación (ej: 1=Pesos, 2=Dólares). |
| `exportaOP` | Boolean | Indica si la cuenta permite generar archivos de pago electrónico (Interbanking). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Devuelve el listado completo de cuentas bancarias de la empresa.
* **Obtener por ID** (`get`): Recupera la configuración detallada de una cuenta.
* **Vista Árbol** (`getTree`): Estructura jerárquica Banco > Cuentas, ideal para selectores de UI.
* **Filtros por Medios** (`getByPaymentMethods`): Permite buscar cuentas habilitadas para ciertos medios de pago o configuraciones electrónicas.

### Gestión (ABM)
* **Crear / Modificar** (`create`, `update`): Permite dar de alta o editar cuentas bancarias.
    * *Nota Técnica*: Estas operaciones utilizan el método `GET` con un parámetro query `cuentaCte` que contiene el JSON serializado, siguiendo un patrón legacy de la API.
* **Eliminar** (`delete`): Borra una cuenta bancaria (requiere enviar `idBanco` e `idCuentaBancaria`).

---

## 💡 Ejemplos de Uso

### 1. Listar Cuentas para Conciliación
Obtener todas las cuentas bancarias para mostrar en un dashboard de saldos.

**Recurso**: `Cuentas Corrientes Bancarias` 

**Operación**: `Listar Todas`

### 2. Buscar Cuentas para Pagos Electrónicos
Encontrar qué cuentas están habilitadas para exportar Órdenes de Pago (OP) electrónicas.

**Recurso**: `Cuentas Corrientes Bancarias` 

**Operación**: `Listar Todas` (Aplicando filtro en cliente o usando endpoints específicos como `/ExportaOP` si están expuestos en el flujo).

### 3. Crear Nueva Cuenta
Registrar una nueva Caja de Ahorro.

**Recurso**: `Cuentas Corrientes Bancarias` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idBanco": "011",
  "numeroCuenta": "558899/2",
  "cbu": "0110000000000055889922",
  "idMoneda": "1",
  "descripcion": "Caja Ahorro Nación",
  "exportaOP": true
}
```

---

## ⚠️ Notas Técnicas
* **Insert/Update Legacy**: A diferencia de otros recursos RESTful, la creación y actualización de cuentas bancarias en esta versión de la API se realiza mediante peticiones **GET** pasando el objeto JSON como un string en el parámetro `cuentaCte`. El nodo maneja esto automáticamente si seleccionas la operación `create` o `update`.

* **Identificación**: Para operaciones de borrado o consulta específica, a menudo se requiere el par `idBanco` + `idCuentaBancaria`, ya que la numeración puede depender del banco en estructuras antiguas.