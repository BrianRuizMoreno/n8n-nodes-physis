# Recurso Precios (SIFAC)

El recurso **Precios** administra la asignación de valores monetarios a los productos dentro de las distintas Listas de Precios configuradas en el sistema.

Permite consultar cotizaciones vigentes, históricos de precios por producto y realizar actualizaciones masivas o puntuales de valores. Es el motor que alimenta los selectores de precios en Facturación y Pedidos.

## 📋 Estructura de Datos (Schema)

El objeto principal representa la intersección entre un **Producto**, una **Lista de Precios** y una **Fecha de Vigencia**.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idProducto` | String | Código del artículo. | Sí |
| `idCtaRegAuxiListaPrecio` | String | Código de la lista de precios. | Sí |
| `vigencia` | Date | Fecha a partir de la cual rige el precio. | Sí |
| `precio` | Decimal | Valor monetario unitario. | Sí |
| `moneda` | String | Código de moneda de la lista (ej: PES, DOL). | No (Lectura) |
| `borroRegistro` | Bool | Flag para eliminación lógica en actualizaciones (`POST`). | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listas de Precios** (`getListas`): Obtiene las cabeceras de listas disponibles (simplificado).
* **Productos por Lista** (`getProductosByLista`): Devuelve todo el catálogo de productos y sus precios para una lista específica (ej: "Ver todos los precios de la lista MAYORISTA").
* **Precios por Producto** (`getPreciosByProducto`): Devuelve en qué listas y a qué precio está cotizado un producto específico.
    * *Filtros*: `preciosConIva`, `todasLasVigencias` (historial).
* **Precio Específico** (`getPrecioByProductoAndLista`): Consulta puntual del precio de un artículo en una lista para una fecha dada.
* **Precios y Existencia** (`getPreciosExistencia`): Reporte combinado de stock y precio actual.

### Gestión (ABM)
* **Actualizar Precios** (`postListaPrecios`): Permite insertar, modificar o borrar precios de forma masiva para un producto. Se envía una lista de objetos precio.

---

## 💡 Ejemplos de Uso

### 1. Consultar Precio Vigente
Obtener el precio actual del producto "CEMENTO" en la lista "MINORISTA", calculado con IVA incluido.

**Recurso**: `Precios` 

**Operación**: `Precio Específico`

**Parámetros (Path)**:

* idProducto: `CEMENTO`
* idCtaReagAuxiListaPrecios: `MINORISTA`

**Parámetros (Query)**:

* preciosConIva: `true`

### 2. Actualizar Precio de un Producto
Fijar el nuevo precio de "CEMENTO" a $1500 en la lista "MINORISTA" a partir del 15 de Enero de 2026.

**Recurso**: `Precios` 

**Operación**: `Actualizar Precios`

**Parámetros (Path)**:

* idProducto: `CEMENTO`

**JSON Body (Array)**:
```json
[
  {
    "idCtaRegAuxiListaPrecio": "MINORISTA",
    "vigencia": "2026-01-15T00:00:00",
    "precio": 1500.00,
    "borroRegistro": false,
    
    // Campos técnicos requeridos por el modelo interno
    "idPpal": 0, "idAuxi": 0, "idReagAuxi": 0, "idAuxiProveedor": 0, "idCtaAuxiProveedor": ""
  }
]
```

### 3. Consultar Historial de Precios
Ver la evolución histórica de precios del producto "SOJA" en todas las listas.

**Recurso**: ``Precios`` 

**Operación**: ``Precios por Producto``

**Parámetros (Path)**:

* idProducto: ``SOJA``

**Parámetros (Query)**:

* todasLasVigencias: ``true``

---

## ⚠️ Notas Técnicas
* **Modelo de Vigencias**: SIFAC no sobrescribe el precio anterior. Guarda un nuevo registro con una nueva fecha de ``vigencia``. El sistema siempre toma el precio con la fecha de vigencia más cercana (pero no futura) a la fecha del comprobante.

* **Campos Técnicos en POST**: El endpoint de actualización (**POST**) es complejo y exige ciertos campos de infraestructura interna (``idPpal``, ``idReagAuxi``) aunque vayan en 0. Se recomienda hacer un **GET** previo del precio actual, modificar el JSON recibido (precio y vigencia) y enviarlo de vuelta en el **POST**.

* **Eliminación**: Para borrar un precio, no se usa **DELETE**, sino el **POST** enviando el objeto con el campo ``borroRegistro: true``.