# Recurso Cuentas de Reagrupación Principal (SIGES)

El recurso **Cuentas de Reagrupación Principal** administra las estructuras de clasificación analítica para el Plan de Cuentas Contable (Cuentas Principales).

Mientras que el Plan de Cuentas tradicional sigue una estructura jerárquica rígida (Activo, Pasivo, etc.), las Reagrupaciones Principales permiten crear "vistas" alternativas o dimensiones de análisis (ej: Centro de Costos, Unidad de Negocio, Flujo de Efectivo) asignando cuentas contables a estas nuevas categorías.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idReagPpal` | Int | Identificador del Tipo de Reagrupación (ej: 1=Centro de Costos, 2=Cash Flow). |
| `idCtaReagPpal` | String | Código jerárquico del nodo (ej: "10.01" para "Gerencia General"). |
| `nombre` | String | Descripción o etiqueta de la clasificación. |
| `imputable` | Boolean | Indica si es un nodo hoja (recibe cuentas) o un nodo rama (agrupador). |
| `nivel` | Int | Profundidad en el árbol de jerarquía. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Devuelve el listado plano de cuentas de reagrupación. Requiere filtrar por el Tipo de Reagrupación (`idReagPpal`).
* **Obtener por ID** (`get`): Recupera el detalle de un nodo específico.
* **Vistas Jerárquicas** (`getTree`, `getTreeList`): Estructuras optimizadas para mostrar el árbol de clasificación en interfaces de usuario.
* **Obtener Siguiente ID** (`getNextId`): Sugiere el próximo código disponible para crear una nueva categoría dentro de un padre.

### Gestión (ABM)
* **Crear** (`create`): Alta de una nueva categoría o centro de costos.
* **Actualizar** (`update`): Modificación de nombre u otras propiedades.
* **Eliminar** (`delete`): Baja de una categoría.

---

## 💡 Ejemplos de Uso

### 1. Listar Centros de Costos
Obtener la estructura de Centros de Costos definida en la empresa (asumiendo que es la Reagrupación ID 5).

**Recurso**: `CuentasReagrupacionPpal` 

**Operación**: `Listar Todas`

**Parámetros (Query)**:
* idReagPpal: `5`

### 2. Crear Nuevo Centro "Marketing"
Agregar un nuevo nodo al árbol de Centros de Costos.

**Recurso**: `CuentasReagrupacionPpal` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idReagPpal": 5,
  "idCtaReagPpal": "03.02",
  "nombre": "Marketing Digital",
  "imputable": true,
  "nivel": 2
}
```

### 3. Obtener Estructura para Reporte
Recuperar el árbol completo de "Cash Flow" para armar un cuadro de mando financiero.

**Recurso**: `CuentasReagrupacionPpal` 

**Operación**: `Vista Árbol (Tree)`

**Parámetros (Query)**:

* idReagPpal: `2` (Cash Flow)

---

## ⚠️ Notas Técnicas
* **Diferencia con Auxiliares**: Este recurso clasifica Cuentas Contables (Gastos de Luz, Ventas), mientras que las Reagrupaciones Auxiliares clasifican Entidades (Clientes, Proveedores).

* **Clave Compuesta**: Al igual que en las auxiliares, la identificación única requiere `idReagPpal` + `idCtaReagPpal`.

* **Imputabilidad**: En este contexto, `imputable = true` significa que se pueden asociar Cuentas Principales a este nodo de reagrupación.