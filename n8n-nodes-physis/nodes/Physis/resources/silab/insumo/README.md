# Recurso Insumos (SILAB)

El recurso **Insumos** administra el catálogo de productos consumibles utilizados en la producción agropecuaria (Semillas, Agroquímicos, Fertilizantes, Combustibles).

Este recurso no solo provee la información maestra del artículo, sino que permite realizar consultas en tiempo real sobre **Stock (Existencias)**, Costos y Precios, parametrizando la consulta por depósito.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `IdProducto` | String | Código identificador (ej: "GLIFO", "UREA"). |
| `Descripcion` | String | Nombre comercial o técnico. |
| `sProductoPadre` | String | Código del producto genérico o activo principal (si aplica). |
| `Existencia` | Decimal | Stock actual (Calculado si se solicita). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Insumos** (`getAll`): Devuelve la lista de productos.
    * *Columnas Dinámicas*: Soporta flags (`bColExistencia`, `bColPrecio`, `bColCosto`) para incluir datos calculados.
    * *Filtros*: `sDeposito` (Stock de un lugar específico), `sProductoPadre`.
* **Obtener por ID** (`get`): Recupera el detalle de un insumo específico.
* **Insumos por Labor** (`getByLabor`): Devuelve la lista de insumos asociados a una tarea específica (la "receta" estándar).

---

## 💡 Ejemplos de Uso

### 1. Consultar Stock de un Depósito
Obtener listado de insumos con su existencia actual en el depósito "Central".

**Recurso**: `Insumos` 

**Operación**: `Listar Insumos`

**Parámetros (Query)**:

* sDeposito: `CENTRAL`
* bColExistencia: `true`

### 2. Listado Ligero para App Móvil
Obtener solo ID y Nombre para un selector (Combo), sin calcular stocks (más rápido).

**Recurso**: `Insumos` 

**Operación**: `Listar Insumos`

**Parámetros (Query)**:

* reducido: `true`

### 3. Consultar Receta de Aplicación
Ver qué insumos se requieren para la labor ID 500 (Pulverización Soja).

**Recurso**: `Insumos` 

**Operación**: `Insumos por Labor`

**Parámetros (Path)**:

* IdLabor: `500`

---

## ⚠️ Notas Técnicas

* **Rendimiento**: Calcular existencias (`bColExistencia=true`) consume más recursos del servidor. Úselo solo cuando sea necesario mostrar el stock al usuario.
* **Integración**: Este recurso suele ser el origen de datos para llenar los detalles de consumo en las Órdenes de Trabajo.