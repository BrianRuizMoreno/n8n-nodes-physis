# Recurso Proveedores (Auxiliares SIFAC)

El recurso **Proveedores Sifac** agrupa los endpoints necesarios para obtener las tablas maestras y parámetros de configuración utilizados en la gestión de proveedores y compras.

De manera análoga al recurso de Clientes, este set de operaciones se especializa en **Listados de Referencia** (Reagrupaciones). Estos listados son fundamentales para poblar los selectores (combos) en las interfaces de carga de proveedores u órdenes de compra, permitiendo asignar condiciones de pago, transportistas y compradores internos respetando los permisos del usuario.

## 📋 Parámetros Comunes

Todos los endpoints de este recurso comparten un mecanismo de filtrado por seguridad basado en el nivel de acceso del usuario.

| Parámetro | Tipo | Descripción | Default |
| :--- | :--- | :--- | :---: |
| `obtenerTambienSoloLectura` | Boolean | Determina el alcance de la consulta según permisos. Si es `true`, devuelve registros donde el usuario tiene permiso de "Consulta" (Nivel 3), además de "Alta" y "Acceso Total". | `true` |

---

## 🛠 Operaciones Disponibles

### 💰 Condiciones Comerciales y Financieras
* **Condiciones de Pago** (`getCondicionesDePagos`): Plazos y formas de pago pactadas con proveedores.
* **Topes de Crédito** (`getTopesDeCreditos`): Límites de crédito otorgados por el proveedor a la empresa.
* **Conexiones Contables** (`getConexionesContables`): Cuentas contables o modelos de imputación de gastos/compras.

### 🚚 Logística y Operaciones
* **Transportes** (`getTransportes`): Empresas de transporte habituales para la recepción de mercadería.
* **Observaciones** (`getObservaciones`): Notas predefinidas o categorías de observación para órdenes de compra.

### 🛒 Gestión de Compras
* **Compradores** (`getCompradores`): Listado del personal o sectores de la empresa autorizados para realizar compras (Contraparte de "Vendedores" en el módulo de Ventas).

---

## 💡 Ejemplos de Uso

### 1. Poblar Selector de Condiciones de Pago
Obtener todas las condiciones de pago disponibles para asignar a una nueva Orden de Compra, incluyendo aquellas de solo lectura.

**Recurso**: `Proveedores Sifac`

**Operación**: `Condiciones de Pago`

**Parámetros (Query)**:

* obtenerTambienSoloLectura: `true`

### 2. Filtrar Compradores Activos
Obtener la lista de compradores para asignar responsable a un proveedor.

**Recurso**: `Proveedores Sifac`

**Operación**: `Compradores`

**Parámetros (Query)**:

* obtenerTambienSoloLectura: `false`

---

## ⚠️ Notas Técnicas

* **Seguridad y Permisos**: El backend evalúa el rol del usuario conectado. El parámetro `obtenerTambienSoloLectura` es vital para llenar combos en modos de solo visualización vs. modos de edición.
* **Diferencia con ABM**: Este recurso **no** gestiona el alta o modificación de la ficha del proveedor (Razón Social, CUIT, Domicilio), sino que provee los datos auxiliares para categorizarlo.