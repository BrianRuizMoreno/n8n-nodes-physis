# Recurso Productos (SIFAC)

El recurso **Productos** administra el maestro de artículos y servicios comercializables o comprables de la empresa.

Este recurso actúa como un "Hub" de información: además de los datos estáticos (descripción, unidad de medida), centraliza las consultas de **Existencias (Stock)** y **Precios Vigentes**. Soporta una estructura jerárquica (Árbol de Productos) y manejo de piezas individuales (Pesables/Trazables).

## 📋 Estructura y Conceptos

El maestro de productos en SIFAC es jerárquico.

* **Nodos No Imputables**: Carpetas o Rubros (ej: "Bebidas", "Ferretería").
* **Nodos Imputables**: Los artículos transaccionables (ej: "Coca Cola 1.5L", "Tornillo T1").

### Campos Clave (Consultas)
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idProducto` | String | Código único del artículo. |
| `descripcion` | String | Nombre del producto. |
| `idPlanProducto` | Int | Identificador de la familia o plan de cuentas al que pertenece. |
| `idUM` | String | Unidad de Medida base (ej: "UNI", "KG"). |
| `imputable` | Bool | Define si se puede usar en comprobantes (`true`) o es un rubro (`false`). |

---

## 🛠 Operaciones Disponibles

### 1. Catálogo y Búsqueda
* **Búsqueda General** (`getAll`): Búsqueda rápida por texto (código o descripción). Ideal para *autocompletar*.
    * *Parámetros*: `texto`, `soloDatosBasicos`, `idDeposito`.
* **Árbol de Productos** (`getArbol`): Obtiene la jerarquía para llenar selectores de rubros/familias.
* **Consulta Avanzada** (`postConsultar`): Endpoint potente que permite activar columnas dinámicas (`colExistencia`, `colPrecio`, `colCosto`) y filtros complejos en una sola petición.

### 2. Gestión de Stock (Saldos)
* **Stock Disponible** (`getStockDisponible`): Consulta puntual y liviana de disponibilidad.
* **Saldos Detallados** (`getSaldos`): Desglose profundo del stock.
    * *Filtros*: Permite ver el stock por **Depósito**, desagregado por **Partida/Lote**, por **Propietario** (stock de terceros) y filtrar ubicaciones.
* **Existencia de Piezas** (`getPesos`): Para productos pesables (ej: Hormas de queso, Cortes de carne), devuelve el listado de piezas individuales y sus pesos.

### 3. Precios y Gestión
* **Consultar Precios** (`getPrecios`): Obtiene la cotización del producto en todas las listas.
* **Actualizar Precios** (`postListaPrecios`): Modificación masiva de precios para el producto.
* **Bloqueo de Piezas** (`bloqueo`/`desbloqueo`): Reserva temporal de una pieza específica (código de barra único) para evitar que dos usuarios la vendan simultáneamente.

---

## 💡 Ejemplos de Uso

### 1. Autocompletar Producto en Factura
Buscar productos que contengan "COL" y "CUAD" (ej: "Colita de Cuadril") para el depósito "CENTRAL".

**Recurso**: `Productos` 

**Operación**: `Búsqueda General`

**Parámetros (Query)**:
* texto: `COL CUAD`
* idDeposito: `CENTRAL`
* soloDatosBasicos: `true`

### 2. Consultar Stock Detallado (Con Partidas)
Saber cuánto stock hay del producto "VACUNA-X", desglosado por número de lote (partida) para controlar vencimientos.

**Recurso**: `Productos` 

**Operación**: `Saldos Detallados`

**Parámetros (Query)**:
* idProducto: `VACUNA-X`
* conPartidas: `true`
* todosDepositos: `true`

### 3. Consulta Avanzada (Grilla de Precios y Stock)
Obtener un listado de productos del rubro "BEBIDAS" (Padre: "100"), trayendo en la misma respuesta su stock total y su precio en la lista "MAYORISTA".

**Recurso**: `Productos` 

**Operación**: `Consulta Avanzada (POST)`

**JSON Body**:
```json
{
  "padre": "100",           // ID del Rubro Bebidas
  "jerarquico": true,       // Traer hijos
  "listaPrecio": "MAYORISTA",
  "colPrecio": true,        // Incluir columna precio en respuesta
  "colExistenciaTotal": true, // Incluir columna stock total
  "buscarConStock": true    // Solo productos con stock > 0
}
```

---

## ⚠️ Notas Técnicas
* **Performance en Saldos**: La operación ``getSaldos`` con los flags ``conPartidas`` o ``conPropietario`` en ``true`` puede ser costosa en bases de datos grandes. Úsela solo cuando el usuario expanda el detalle del producto.

* **Bloqueo de Piezas**: Los endpoints ``bloqueo`` y ``desbloqueo`` son críticos en industrias de "Pesables" (Frigoríficos). Al escanear un código de barras de una pieza única en el punto de venta, se debe invocar ``bloqueo`` para reservarla por unos minutos (parametro ``minutos``) hasta que se cierre la factura.

* **Unidad de Medida**: El stock siempre se reporta en la Unidad de Medida Primaria (``idUM``) definida en la configuración del producto.