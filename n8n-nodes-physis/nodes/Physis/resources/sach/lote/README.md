# Recurso Lote (SACH)

El recurso **Lote** administra la unidad fundamental de transacción en el mercado de hacienda. Un "Lote" representa un grupo de animales (cabezas) de una determinada especie y categoría que se comercializan en una operación (Remate o Negocio Particular).

Este recurso es el corazón operativo del módulo, ya que vincula:
* **Datos Físicos**: Cantidad de cabezas, kilos, corrales.
* **Datos Comerciales**: Precio, Comprador, Vendedor, Plazos.
* **Datos Económicos**: Comisiones, Gastos y Fletes aplicados a la operación.
* **Trazabilidad**: Guías, DTE y datos de sanidad.

## 📋 Campos Principales (Schema)

La operación de **Crear/Modificar** (`upsert`) es compleja y requiere un objeto JSON extenso que define todas las condiciones del negocio para ambas partes (Comprador y Vendedor).

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idLote` | Int | Número de lote (0 para nuevo). Parte de la clave única. | Sí |
| `idPuestoCarga` | Int | Identificador del puesto de carga/trabajo. Parte de la clave única. | Sí |
| `fechaOperacion` | Date | Fecha del movimiento. | Sí |
| `cabezas` | Int | Cantidad de animales. | Sí |
| `kilos` | Decimal | Peso total del lote. | Sí |
| `precio` | Decimal | Precio unitario (por kilo o por cabeza). | Sí |
| `idCtaAuxiCom` | String | Código del cliente **Comprador**. | Sí |
| `idCtaAuxiVen` | String | Código del cliente **Vendedor**. | Sí |
| `comisiones` | Array | Lista de reglas de comisión aplicables. | No |
| `gastos` | Array | Lista de gastos adicionales (ej: pista, martillo). | No |
| `fletes` | Array | Lista de fletes vinculados. | No |

---

## 🛠 Operaciones Disponibles

### 1. Gestión de Lotes (Unitario)
* **Listar Todos** (`getAll`): Recupera lotes aplicando filtros de negocio (fechas, tipo operación, facturados/no facturados).
* **Obtener por ID** (`get`): Obtiene el detalle de un lote específico.
    * *Nota*: Requiere `IdLote` y `IdPuestoCarga`.
* **Crear/Modificar** (`upsert`): Da de alta o actualiza un lote completo (Cabecera + Gastos/Comisiones).
* **Eliminar** (`delete`): Borra un lote del sistema.

### 2. Gestión por Carga (Masiva)
Operaciones optimizadas para manejar grupos de lotes asociados a una "Carga" logística.
* **Por Carga: Listar** (`getByCarga`): Obtiene todos los lotes de una carga.
* **Por Carga: Upsert Masivo** (`upsertByCarga`): Envía un array de lotes para procesar en bloque.
* **Por Carga: Eliminar** (`deleteByCarga`): Elimina todos los lotes de una carga.

### 3. Utilidades y Consultas Auxiliares
* **Util: Pendientes Emisión** (`getPendientes`): Lista los lotes que aún no han sido liquidados/facturados.
* **Util: Próximo Nro** (`getProximo`): Sugiere el siguiente número de lote disponible para un puesto.
* **Util: Gasto/Comisión** (`getGastoComisionTotal`): Calcula las alícuotas totales aplicables según las condiciones del negocio.
* **Util: Existe Boleto** (`getExisteBoleto`): Valida si un número de boleto ya fue utilizado.

---

## 💡 Ejemplos de JSON

### 1. Crear un Lote (Simplificado)
Alta de un lote de remate con un gasto asociado.

**Recurso**: `Lote` > **Operación**: `Crear/Modificar`

**JSON Body**:
```json
{
  "idLote": 0,
  "idPuestoCarga": 1,
  "fechaOperacion": "2026-01-13T00:00:00.000Z",
  "idTipoOperacion": "REM",
  "idTipoHacienda": "INV",
  "cabezas": 20,
  "kilos": 4000,
  "precio": 2200.50,
  "idCtaAuxiCom": "C001",
  "idCtaAuxiVen": "P005",
  "gastos": [
    {
      "idGasto": 10,
      "claseGasto": "D",
      "aplicacion": 15000.00
    }
  ]
}
```
### 2. Listar Lotes Pendientes de Liquidar
Consultar qué lotes vendidos ("Venta") en el Remate ("REM") del día de hoy están pendientes de facturar.

**Recurso**: ``Lote``  

**Operación**: ``Util: Pendientes Emisión``

**JSON Body (Parámetros Query)**:

```json
{
  "IdTipoOperacion": "REM",
  "CompraVenta": "2", 
  "FechaOperacion": "2026-01-13T00:00:00.000Z",
  "IdLugar": "RURAL"
}
```
### 3. Eliminar un Lote
Para borrar un lote se requiere su clave compuesta completa.

**Recurso**: ``Lote`` 

**Operación**: ``Eliminar``

**Parámetros**:

* id: ``105`` (``IdLote``)

**JSON Body**:

```json
{
  "IdPuestoCarga": 1
}
```

---

## ⚠️ Notas Técnicas
* **Clave Compuesta**: La identificación única de un lote siempre requiere el par ``IdLote`` + ``IdPuestoCarga``. No es posible obtener o eliminar un lote enviando solo el número de lote.

* **Arrays Anidados**: Al usar ``upsert``, si se envían los arrays ``comisiones``, ``gastos`` o ``fletes``, el sistema reemplazará la configuración existente por la nueva enviada.

* **Validaciones**: El sistema validará la consistencia entre Especie/Categoría y las cuentas de los clientes (que estén habilitados y no bloqueados) antes de aceptar el lote.