# Recurso Clientes (Auxiliares SIFAC)

El recurso **Clientes Sifac** agrupa los endpoints necesarios para obtener las tablas maestras y parámetros de configuración utilizados en la gestión de clientes.

A diferencia del ABM principal de Terceros (Altas/Bajas/Modificaciones de clientes), este recurso se especializa en **Listados de Referencia** (Reagrupaciones). Estos listados son fundamentales para poblar los selectores (combos) en las interfaces de carga de clientes o pedidos, permitiendo asignar vendedores, listas de precios, zonas y condiciones comerciales respetando los permisos del usuario.

## 📋 Parámetros Comunes

Todos los endpoints de este recurso comparten un mecanismo de filtrado por seguridad basado en el nivel de acceso del usuario.

| Parámetro | Tipo | Descripción | Default |
| :--- | :--- | :--- | :---: |
| `obtenerTambienSoloLectura` | Boolean | Determina el alcance de la consulta según permisos. Si es `true`, devuelve registros donde el usuario tiene permiso de "Consulta" (Nivel 3), además de "Alta" y "Acceso Total". | `true` |

---

## 🛠 Operaciones Disponibles

### 💰 Condiciones Comerciales
* **Listas de Precios** (`getListasDePrecios`): Tablas de precios asignables a clientes.
* **Condiciones de Pago** (`getCondicionesDePagos`): Plazos y formas de pago habilitadas.
* **Condiciones de Venta** (`getCondicionesDeVentas`): Reglas de venta (ej: Mayorista, Minorista).
* **Descuentos** (`getDescuentos`): Esquemas de bonificación primaria.
* **Descuentos 2** (`getDescuentos2`): Esquemas de bonificación secundaria/adicional.
* **Topes de Crédito** (`getTopesDeCreditos`): Categorías de límite de deuda permitida.

### 🚚 Logística y Distribución
* **Zonas** (`getZonas`): Regiones geográficas o comerciales.
* **Transportes** (`getTransportes`): Empresas de transporte asociadas.
* **Distribuidores** (`getDistribuidores`): Canales de distribución.

### 🏢 Gestión y Contabilidad
* **Vendedores** (`getVendedores`): Fuerza de ventas asignable a la cartera de clientes.
* **Conexiones Contables** (`getConexionesContables`): Cuentas contables o modelos de imputación.
* **Observaciones** (`getObservaciones`): Notas predefinidas o categorías de observación.

---

## 💡 Ejemplos de Uso

### 1. Poblar Selector de Listas de Precios
Obtener todas las listas de precios disponibles para que el usuario asigne una a un nuevo cliente, incluyendo aquellas de solo lectura.

**Recurso**: `Clientes Sifac`

**Operación**: `Listas de Precios`

**Parámetros (Query)**:
* obtenerTambienSoloLectura: `true`

### 2. Filtrar Vendedores por Permisos
Obtener solo los vendedores sobre los cuales el usuario tiene permisos de edición/gestión directa (excluyendo los de solo consulta).

**Recurso**: `Clientes Sifac`

**Operación**: `Vendedores`

**Parámetros (Query)**:
* obtenerTambienSoloLectura: `false`

---

## ⚠️ Notas Técnicas

* **Seguridad y Permisos**: El backend evalúa el rol del usuario conectado. El parámetro `obtenerTambienSoloLectura` permite ampliar el conjunto de resultados para incluir aquellos registros que el usuario puede *ver* pero quizás no *administrar*, lo cual es útil para referencias cruzadas.
* **Uso en Frontend**: Estos endpoints están diseñados para ser consumidos al inicio de la carga de formularios (ej: "Nuevo Cliente" o "Nuevo Pedido") para llenar las listas desplegables con opciones válidas.