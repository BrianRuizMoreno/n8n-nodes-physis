# Recurso Saldos (SIGES)

El recurso **Saldos** permite consultar el estado acumulado (saldo) de una cuenta contable en un momento determinado.

Su potencia radica en la capacidad de **filtrar por intersecciones analíticas**. No solo responde "¿Cuál es el saldo de Deudores por Venta?", sino que permite preguntar:
* "¿Cuánto me debe el Cliente X?" (Filtrando por Auxiliar).
* "¿Cuánto se gastó en Papelería en el sector Administración?" (Filtrando por Reagrupación Principal).

## 📋 Campos Principales

El endpoint devuelve un valor numérico (decimal) representando el saldo. Para consultar, se utilizan combinaciones de los siguientes IDs:

| Campo Query | Descripción |
| :--- | :--- |
| `IdEjercicio` | Año contable de la consulta. |
| `IdCtaPpal` | La cuenta contable base (ej: `1.1.01.01`). |
| `IdAuxi` / `IdCtaAuxi` | (Opcional) Para filtrar por un Tercero específico (Cliente/Proveedor). |
| `IdReagPpal` / `IdCtaReagPpal` | (Opcional) Para filtrar por Centro de Costos o dimensión principal. |
| `IdReagAuxi` / `IdCtaReagAuxi` | (Opcional) Para filtrar por agrupación de tercero (ej: Zona). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Obtener Saldo (Registro)** (`getBalance`): Devuelve el importe en la moneda legal/contable (Pesos).
* **Obtener Saldo (Multimoneda)** (`getMultiCurrencyBalance`): Devuelve el importe en la moneda funcional o secundaria (Dólares) si la empresa es bimonetaria.

---

## 💡 Ejemplos de Uso

### 1. Saldo de Caja
Saber cuánto dinero hay en la "Caja Central" (1.1.01.001) en el ejercicio 2026.

**Recurso**: `Saldos` 

**Operación**: `Obtener Saldo`

**Parámetros**:

* IdEjercicio: `2026`
* IdCtaPpal: `1.1.01.001`
* IdPpal: `1`

### 2. Saldo de un Cliente (Cuenta Corriente)
Saber cuánto debe el cliente "Juan Perez" (ID CLI-005) en la cuenta de Deudores por Venta (1.1.02.001).

**Recurso**: `Saldos` 

**Operación**: `Obtener Saldo`

**Parámetros**:

* IdCtaPpal: `1.1.02.001` (Cuenta Madre de Deudores)

* **JSON Body**:

```json
{
  "IdAuxi": 100,
  "IdCtaAuxi": "CLI-005"
}
```

### 3. Gasto por Centro de Costo
Consultar el saldo de la cuenta "Sueldos" (5.1.01) imputado al Centro de Costos "Ventas" (ID 5, Nodo VTA).

**Recurso**: `Saldos` 

**Operación**: `Obtener Saldo`

**Parámetros**:

* IdCtaPpal: `5.1.01`

**JSON Body**:

```json
{
  "IdReagPpal": 5,
  "IdCtaReagPpal": "VTA"
}
```

---

## ⚠️ Notas Técnicas
* **Naturaleza del Saldo**: El sistema devuelve el saldo con signo (positivo/negativo) según la naturaleza de la cuenta y los movimientos. Generalmente, Deudor es positivo y Acreedor negativo, o viceversa según configuración, pero siempre consistente dentro del mismo ejercicio.

* **Precisión**: Al usar `getMultiCurrencyBalance`, asegúrese de que la empresa tenga activada la contabilidad bimonetaria y que los asientos tengan cargada la cotización correspondiente, de lo contrario podría devolver 0 o valores no representativos.
