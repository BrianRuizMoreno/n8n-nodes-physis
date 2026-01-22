# Recurso Venta Campo (SAVEC)

El recurso **Venta Campo** centraliza la consulta de operaciones de venta originadas en la producción propia o acopio en campo. Su objetivo principal es proveer reportes de gestión comercial y acceso a documentos específicos como liquidaciones y cartas de porte.

Permite responder preguntas como:
* ¿Cuál es el volumen de ventas de Soja en la campaña actual?
* ¿Qué liquidaciones se emitieron en un rango de fechas?
* ¿Cuáles son las cartas de porte asociadas a un puesto de carga?

## 📋 Filtros de Consulta

La mayoría de las operaciones de este recurso son de **Lectura (GET)**. Para filtrar los resultados, se utiliza el campo **JSON Body** con los parámetros correspondientes a cada operación.

| Parámetro | Tipo | Descripción | Operación Asociada |
| :--- | :--- | :--- | :--- |
| `fechaDesde` / `fechaHasta` | Date | Rango de fechas para reportes de ventas. | Reportes de Ventas |
| `codCampania` | Int | Filtrar por ciclo agrícola (ej: 24). | Reportes, Liquidaciones |
| `idCereal` | Int | Filtrar por grano (ej: 2-Soja). | Reportes de Ventas |
| `filtro` | String | Texto para buscar por nombre o razón social. | Corredores, Compradores |
| `numeroComprobante` | String | Buscar una liquidación específica. | Liquidaciones |
| `codFlete` | String | Código de flete para rastrear cartas de porte. | Cartas de Porte |

---

## 🛠 Operaciones Disponibles

### 1. Reportes de Ventas
Generación de informes de gestión comercial.
* **Reporte de Ventas** (`getVentas`): Resumen general de operaciones de venta.
* **Reporte de Ventas (Detallado)** (`getVentasDetallado`): Desglose pormenorizado operación por operación.

### 2. Consulta de Documentos
Búsqueda específica de comprobantes.
* **Listar Liquidaciones** (`getLiquidaciones`): Recupera liquidaciones aplicando filtros complejos (fecha contable, campaña, tipo comprobante).
* **Listar Cartas de Porte** (`getCartasPorte`): Busca cartas de porte por puesto de carga o código de flete.

### 3. Maestros y Auxiliares
Endpoints para obtener listas de selección y datos de referencia.
* **Listar Campos** (`getCampos`): Obtiene los establecimientos o campos configurados.
* **Listar Corredores** (`getCorredores`): Directorio de corredores.
* **Listar Compradores** (`getCompradores`): Directorio de compradores.
* **Listar Tipos de Comprobantes** (`getTiposComprobantes`): Catálogo de tipos documentales.
* **Obtener Empresa** (`getEmpresa`): Datos de la firma propia.

---

## 💡 Ejemplos de Uso

### 1. Generar Reporte de Ventas de Soja
Obtener un resumen de las ventas de Soja (ID 2) para la campaña 24 en lo que va del año.
* **Operación**: `Reporte de Ventas` (`getVentas`)
* **JSON Body**:
    ```json
    {
      "codCampania": 24,
      "idCereal": 2,
      "fechaDesde": "2024-01-01T00:00:00.000Z",
      "fechaHasta": "2024-12-31T23:59:59.000Z",
      "esMovimiento": true
    }
    ```

### 2. Buscar una Liquidación Específica
Encontrar una liquidación por su número dentro de la campaña 24.
* **Operación**: `Listar Liquidaciones` (`getLiquidaciones`)
* **JSON Body**:
    ```json
    {
      "idCampania": 24,
      "numeroComprobante": "0001-12345678"
    }
    ```

### 3. Buscar un Comprador
Filtrar la lista de compradores que contengan "AGRO" en su nombre.
* **Operación**: `Listar Compradores` (`getCompradores`)
* **JSON Body**:
    ```json
    {
      "filtro": "AGRO"
    }
    ```

---

## ⚠️ Notas Técnicas

* **Serialización Automática**: Para las operaciones `getLiquidaciones` y `getCartasPorte`, la API real espera un parámetro *query string* llamado `filtro` que contenga un JSON serializado. **El nodo de n8n maneja esto automáticamente**: tú solo debes pasar el objeto JSON limpio en el campo `jsonBody`, y el nodo se encarga de convertirlo al formato requerido por el endpoint.
* **Fechas**: Se recomienda utilizar siempre el formato ISO 8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`) para asegurar la correcta interpretación de los rangos temporales.