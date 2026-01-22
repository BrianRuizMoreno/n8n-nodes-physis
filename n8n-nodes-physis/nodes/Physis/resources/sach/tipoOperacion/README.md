# Recurso Tipo Operación (SACH)

El recurso **Tipo Operación** administra el catálogo de modalidades comerciales disponibles en el sistema (ej: "Remate Feria", "Negocio Directo", "Invernada a Campo").

Este maestro es uno de los más críticos en cuanto a configuración, ya que define las **reglas de negocio** que regirán la carga de lotes y la liquidación. A través de sus múltiples "flags" (booleanos), determina si la operación lleva corrales, si valida guías, si controla numeración de boletos, si calcula comisiones, etc.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, se envía un objeto JSON con la configuración exhaustiva de la operación.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idTipoOperacion` | String | Código identificador (ej: "REM"). | Sí |
| `descripcion` | String | Nombre descriptivo (ej: "Remate Feria"). | Sí |
| `remate` | Bool | Indica si la operación es un Remate (afecta la interfaz de carga). | No |
| `comisiones` | Bool | Si calcula comisiones automáticamente. | No |
| `corral` | Bool | Si requiere asignar corrales a los lotes. | No |
| `numeroBoleto` | Bool | Si gestiona número de boleto. | No |
| `controlaRepeticionBoleto` | Bool | Valida unicidad del boleto. | No |
| `obligaGuiaCompradora` | Bool | Exige carga de datos de guía para el comprador. | No |
| `obligaGuiaVendedora` | Bool | Exige carga de datos de guía para el vendedor. | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Tipos** (`getAll`): Devuelve la lista completa de operaciones configuradas.
* **Obtener por ID** (`get`): Recupera la configuración detallada de un tipo específico.
* **Consulta Avanzada** (`searchV2`): Búsqueda potente con filtros, paginado y ordenamiento (`/api/sach/v2/tipos-operaciones`).

### Consultas Adicionales
* **Numeración de Operaciones** (`getNumeracion`): Devuelve el estado de la numeración de remates u operaciones para una fecha y tipo dado.
    * *Parámetros*: `IdTipoOperacion`, `Fecha`.

### ABM (Escritura)
* **Crear** (`create`): Da de alta una nueva modalidad operativa.
* **Actualizar** (`update`): Modifica las reglas de negocio de una operación existente.
* **Eliminar** (`delete`): Borra un tipo de operación.

---

## 💡 Ejemplos de JSON

### 1. Crear Tipo "Remate Feria"
Configura una operación estándar de remate que utiliza corrales y valida guías.

**Recurso**: `Tipo Operación` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idTipoOperacion": "REM",
  "descripcion": "Remate Feria General",
  "remate": true,
  "corral": true,
  "comisiones": true,
  "numeroBoleto": true,
  "obligaGuiaCompradora": true,
  "obligaGuiaVendedora": true,
  "controlaRepeticionBoleto": true
}
```

### 2. Consultar Numeración
Ver la numeración actual para los remates ("REM") a la fecha actual.

**Recurso**: ``Tipo Operación`` 

**Operación**: ``Numeración de Operaciones``

**Parámetros (Query)**:

* IdTipoOperacion: ``REM``

* Fecha: ``2026-01-14T00:00:00``

### 3. Consulta Avanzada (V2)
Buscar tipos de operación que sean "Remates Televisados".

**Recurso**: ``Tipo Operación`` 

**Operación**: ``Consulta Avanzada``

**JSON Body**:

```json
{
  "filtros": {
    "filtros": [
      "RemateTelevision = 1"
    ],
    "logico": "AND"
  }
}
```

---

## ⚠️ Notas Técnicas
* **Impacto en UI**: La configuración de este recurso (flags como ``corral`` o ``numeroBoleto``) suele habilitar o deshabilitar campos enteros en la interfaz de usuario de carga de Lotes (``/api/sach/lotes``).

* **Identificador**: El ``idTipoOperacion`` es un String corto. Se recomienda mantener consistencia (ej: "REM", "DIR", "CON").

* **Numeración**: El endpoint de numeración es útil para pre-validar o sugerir números de remate antes de abrir uno nuevo.