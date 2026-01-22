# Recurso Chequeras (SIGES)

El recurso **Chequeras** administra los talonarios de cheques (físicos o electrónicos/E-cheqs) asociados a las cuentas bancarias de la empresa.

Es un componente vital para la emisión de pagos (Órdenes de Pago). Permite controlar la numeración de los cheques emitidos, gestionar el stock de formularios y configurar si los valores son diferidos o al día.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idChequera` | Int | Identificador numérico del talonario dentro de la cuenta. |
| `idBanco` | String | Código del banco emisor. |
| `idCuentaBancaria` | Int | Identificador interno de la cuenta corriente bancaria. |
| `nroInicio` / `nroFin` | Int | Rango de números de cheques que contiene la chequera. |
| `nroProximo` | Int | Próximo número de cheque disponible para emitir. |
| `electronico` | Boolean | Indica si gestiona E-Cheqs (Cheques electrónicos). |
| `diferido` | Boolean | Indica si los cheques son de pago diferido. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Chequeras** (`getAll`): Devuelve las chequeras configuradas.
    * *Filtros*: `IdBanco`, `IdCuentaBancaria`, `TodosLosBancos` (Booleano para ver de todos los bancos o filtrar).
* **Obtener por ID** (`get`): Recupera el detalle de una chequera específica. Requiere una **clave compuesta** (Chequera + Banco + Cuenta).
* **Listar con Filtro Electrónico** (`getByElectronicFilter`): Endpoint especializado para filtrar chequeras según si son para valores electrónicos o físicos.
* **Obtener Próximo ID** (`getNextId`): Obtiene el siguiente ID disponible para dar de alta una nueva chequera en una cuenta.

### Gestión (ABM)
* **Crear** (`create`): Da de alta un nuevo talonario.
* **Modificar** (`update`): Actualiza datos (ej: corrección del `nroProximo` si hubo un error de impresión).
* **Eliminar** (`delete`): Borra una chequera (Requiere la clave compuesta completa).

---

## 💡 Ejemplos de Uso

### 1. Listar Chequeras de una Cuenta
Ver qué talonarios están disponibles para la cuenta del Banco Nación.

**Recurso**: `Chequeras` 

**Operación**: `Listar Chequeras`

**Parámetros (Query)**:
* IdBanco: `011` (Nación)
* IdCuentaBancaria: `5501` (ID interno de la cuenta)

### 2. Consultar Detalle
Obtener la configuración de la chequera ID 1 del Banco Galicia.

**Recurso**: `Chequeras` 

**Operación**: `Obtener por ID`

**Parámetros (Path)**:
* IdChequera: `1`
* IdBanco: `007`
* IdCuentasBancarias: `2020`

### 3. Crear Talonario de E-Cheqs
Dar de alta una chequera virtual para emitir cheques electrónicos.

**Recurso**: `Chequeras` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idBanco": "007",
  "idCuentaBancaria": 2020,
  "identificador": "E-CHEQ-2026",
  "nroInicio": 1,
  "nroFin": 999999,
  "diferido": true,
  "electronico": true,
  "porDefecto": true
}
```

---

## ⚠️ Notas Técnicas
* **Clave Compuesta**: Este recurso utiliza una clave primaria compleja de tres partes para todas las operaciones de identificación única (**GET** single, **DELETE**): `IdChequera` + `IdBanco` + `IdCuentasBancarias`. Asegúrese de enviar los tres valores.

* **Control de Numeración**: El sistema incrementa automáticamente el `nroProximo` al emitir pagos. Modificar este campo manualmente mediante `update` debe hacerse con precaución para evitar duplicidad de cheques o huecos en la numeración.