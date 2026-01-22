# Recurso Condiciones de Pago (SIFAC)

El recurso **Condiciones de Pago** administra el maestro de plazos y formas de financiación habilitadas para los clientes (ej: "Contado", "Cuenta Corriente 30 días", "Cheque a 30/60/90").

Estas entidades definen las reglas automáticas para el cálculo de las **fechas de vencimiento** de las facturas y la división de importes en cuotas. En la estructura interna de SIFAC, estas condiciones se manejan como "Reagrupaciones Auxiliares" imputables.

## 📋 Campos Principales (Schema)

La definición de una condición de pago puede ser simple (un solo vencimiento) o compleja (múltiples cuotas con porcentajes variables).

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCtaReagAuxi` | String | Código identificador (ej: "30DIAS"). | Sí |
| `nombre` | String | Descripción visible (ej: "A 30 Días F.F."). | Sí |
| `sigla` | String | Abreviatura para reportes. | No |
| `imputable` | Bool | Debe ser `true` para poder usarse en facturas. | Sí |
| `contado` | Bool | Indica si la condición se considera "Contado". | Sí |
| `cuotas` | Int | Cantidad de cuotas/pagos. | No |
| `vencimientosVariables` | Array | **Cronograma**: Define días y porcentajes para pagos desdoblados. | No |

### Estructura de `vencimientosVariables` (Array)
Para condiciones tipo "30 y 60 días":
* `renglon` (Int): Número de cuota.
* `dias` (Int): Días a sumar a la fecha de factura.
* `porcentaje` (Decimal): % del total a vencer en esa fecha.

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Da de alta una nueva forma de pago.
* **Modificar** (`update`): Actualiza la descripción o el esquema de cuotas.
* **Obtener por ID** (`get`): Recupera el detalle completo de una condición.
* **Eliminar** (`delete`): Borra una condición de pago.

### Consultas de Estructura
* **Árbol de Condiciones** (`getArbol`): Devuelve las condiciones organizadas jerárquicamente. Útil para selectores en la interfaz de usuario.
    * *Filtros*: `imputables` (solo hojas seleccionables), `noImputables` (carpetas/grupos).
* **Vencimientos Manuales** (`getVencimientosManuales`): Calcula o recupera la proyección de vencimientos para validaciones manuales.

---

## 💡 Ejemplos de JSON

### 1. Crear Condición "Contado"
Una condición simple, imputable y marcada como contado.

**Recurso**: `Condiciones de Pago` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idCtaReagAuxi": "CONTADO",
  "nombre": "Contado Efectivo",
  "sigla": "Ctdo",
  "imputable": true,
  "contado": true,
  "cuotas": 1,
  "diaVto": 0
}
```

### 2. Crear Condición "30 y 60 Días" (Desdoblado)
Condición compleja que divide el pago en dos cuotas del 50%.

**Recurso**: ``Condiciones de Pago`` 

**Operación**: ``Crear``

**JSON Body**:

```json
{
  "idCtaReagAuxi": "3060",
  "nombre": "30 y 60 Días Fecha Factura",
  "imputable": true,
  "contado": false,
  "cuotas": 2,
  "vencimientosVariables": [
    {
      "renglon": 1,
      "dias": 30,
      "porcentaje": 50.00,
      "porFecha": false
    },
    {
      "renglon": 2,
      "dias": 60,
      "porcentaje": 50.00,
      "porFecha": false
    }
  ]
}
```

### 3. Obtener Árbol para Selector
Obtener solo las condiciones de pago que se pueden usar en una factura (excluyendo carpetas organizativas).

**Recurso**: ``Condiciones de Pago`` 

**Operación**: ``Árbol``

**Parámetros (Query)**:

* imputables: ``true``

* noImputables: ``false``

---

## ⚠️ Notas Técnicas
* **Flag imputable**: Es crítico. En SIFAC, las tablas auxiliares suelen tener estructuras de árbol. Si ``imputable = false``, el sistema lo trata como una "Carpeta" o "Agrupador" y no permitirá seleccionarlo al cargar una factura.

* **Identificador**: El campo ``idCtaReagAuxi`` actúa como la clave primaria lógica (String). Al crear, asegúrese de que sea único y no contenga caracteres especiales si es posible.

* **Total de Porcentajes**: Al usar ``vencimientosVariables``, la suma de los campos ``porcentaje`` debe dar estrictamente 100.