# Recurso Cliente (SACH)

El recurso **Cliente** permite la gestión y consulta de los terceros (Compradores y Vendedores) que operan en el mercado de hacienda.

Además de la búsqueda básica, este recurso es fundamental para la operativa diaria ya que permite:
* Identificar clientes con **liquidaciones pendientes de emitir**.
* Consultar el padrón de categorías **RFOCB** (Registro Fiscal de Operadores de Cadenas Bovinas y Bubalinas).
* Obtener subcuentas asociadas para la imputación correcta.

## 📋 Filtros de Consulta

La mayoría de las operaciones son de consulta (Lectura). A continuación se detallan los parámetros clave para filtrar la información.

| Parámetro | Tipo | Descripción | Operación Asociada |
| :--- | :--- | :--- | :--- |
| `filtro` | String | Parte del nombre, código o alias del cliente. | Listar Clientes |
| `IdCtaAuxi` | String | Código único de la cuenta auxiliar del cliente. | Obtener, Subcuentas, RFOCB |
| `IdTipoOperacion` | String | Código de la operación (ej: REMATE). | Pendientes de Emisión |
| `FechaOperacion` | Date | Fecha del movimiento o remate. | Pendientes, RFOCB |
| `sTipoCliente` | String | "Comprador" o "Vendedor". | Categorías RFOCB (All) |

---

## 🛠 Operaciones Disponibles

### 1. Búsqueda y Detalle
* **Listar Clientes** (`getAll`): Búsqueda rápida por nombre o código.
* **Obtener Cliente** (`get`): Recupera la ficha de un cliente específico mediante su `IdCtaAuxi`.

### 2. Gestión Operativa
* **Clientes Pendientes de Emisión** (`getPendientesEmision`): Devuelve la lista de clientes que participaron en una operación (ej: Remate) y aún no se les ha generado la liquidación correspondiente.
    * *Filtros*: `IdTipoOperacion`, `IdTipoHacienda`, `IdLugar`, `FechaOperacion`.

### 3. Consultas Auxiliares
* **Listar Subcuentas** (`getSubcuentas`): Obtiene las subdivisiones de la cuenta corriente del cliente.
* **Categorías RFOCB** (`getCategoriasRFOCB`): Consulta la situación del cliente frente al registro fiscal bovino para una fecha y especie determinada.

---

## 💡 Ejemplos de Uso

### 1. Buscar un Cliente
Encontrar clientes que contengan "DON" en su razón social.

**Recurso**: `Cliente` 

**Operación**: `Listar Clientes`

**JSON Body / Parámetros**:
```json
{
  "filtro": "DON"
}
```

### 2. Consultar Pendientes de Liquidar
Ver qué compradores deben ser liquidados por el remate del día 13/01/2026.

**Recurso**: ``Cliente`` 

**Operación**: ``Clientes Pendientes de Emisión`` 

**JSON Body**:

```json
{
  "IdTipoOperacion": "REM",
  "IdTipoHacienda": "INV",
  "IdLugar": "RURAL",
  "CompraVenta": "V",
  "FechaOperacion": "2026-01-13T00:00:00.000Z"
}
```

### 3. Verificar Categoría RFOCB
Consultar la categoría fiscal de un cliente para operaciones con Bovinos (ID 1).

**Recurso**: ``Cliente`` 

**Operación**: ``Categorías RFOCB`` 

**JSON Body**:

```json
{
  "IdCtaAuxi": "C0015",
  "IdEspecie": 1,
  "FechaOperacion": "2026-01-13T00:00:00.000Z"
}
```

---

## ⚠️ Notas Técnicas
* **Identificador**: El campo clave para este recurso es ``IdCtaAuxi`` (**String**), que representa el código contable/auxiliar del tercero.

* **RFOCB**: Las consultas a este padrón son vitales para calcular correctamente las retenciones y percepciones impositivas al momento de liquidar.