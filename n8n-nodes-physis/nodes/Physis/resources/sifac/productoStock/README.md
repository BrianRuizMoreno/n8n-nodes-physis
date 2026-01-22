# Recurso Productos Stock (SIFAC)

El recurso **Productos Stock** es el encargado de la gestión de existencias y movimientos de mercadería.

Permite consultar el stock actual con distintos niveles de detalle (por depósito, por producto) y registrar movimientos manuales de inventario (Ajustes positivos/negativos, transferencias internas o cargas iniciales).

## 🛠 Operaciones Disponibles

### 1. Consultas de Existencia (Saldos)
* **Stock por Producto** (`/api/sifac/productos/{idProducto}/stock`): Devuelve cuánto hay de un producto específico, desglosado por cada depósito.
* **Stock por Depósito** (`/api/sifac/depositos/{idDeposito}/productos`): Devuelve el inventario completo de un depósito (todos los productos).
    * *Filtros*: `texto` (Búsqueda por nombre), `limit` (Paginación).
* **Reporte General** (`/api/sifac/depositos/productos/stock`): Listado masivo de todos los productos en todos los depósitos.

### 2. Movimientos (Kardex)
* **Historial de Movimientos** (`getMovimientos`): Consulta la trazabilidad (entradas y salidas) de un producto.
    * *Filtros*: `fechaDesde`, `fechaHasta`, `idDeposito`, `idPartida` (para seguir un lote específico).
* **Registrar Movimiento** (`createMovimiento`): Genera un ajuste de stock (Alta/Baja) o transferencia.
* **Firmar Movimiento** (`signMovimiento`): Asocia una firma digital a un movimiento de stock (ej: Firma de recepción en depósito).

---

## 💡 Ejemplos de Uso

### 1. Consultar Stock de un Producto
Saber en qué depósitos hay stock del producto "SEMILLA-SOJA".

**Recurso**: `Productos Stock` 

**Operación**: `Stock por Producto`

**Parámetros (Path)**:

* idProducto: `SEMILLA-SOJA`

**Respuesta Esperada**:
```json
[
  { "idDeposito": "CENTRAL", "cantidad": 1500.00 },
  { "idDeposito": "NORTE", "cantidad": 500.00 }
]
```

### 2. Consultar Inventario de un Depósito
Listar todos los productos almacenados en el depósito "CAMPO-1".

**Recurso**: ``Productos Stock ``

**Operación**: ``Stock por Depósito``

**Parámetros (Path)**:

* idDeposito: ``CAMPO-1``

### 3. Registrar un Ajuste de Stock (Entrada)
Dar de alta 10 unidades de "INSUMO-X" en el depósito "CENTRAL" por un ajuste de inventario.

**Recurso**: ``Productos Stock`` 

**Operación**: ``Registrar Movimiento``

**JSON Body**:

```json
{
  "idTipoComprobante": "AJU", // Tipo de ajuste (Ajuste Positivo)
  "fecha": "2026-01-14T00:00:00",
  "iddDeposito": "CENTRAL",   // Depósito destino
  "productos": [
    {
      "producto": "INSUMO-X",
      "cantidadUM": 10.00,
      "observaciones": "Ajuste por recuento físico"
    }
  ]
}
```

---

## ⚠️ Notas Técnicas
* **Movimientos vs Comprobantes**: Aunque este recurso permite crear movimientos (**POST**), generalmente los movimientos de stock se generan automáticamente al confirmar comprobantes de gestión (Remitos, Facturas). Use este endpoint solo para ajustes manuales o cargas iniciales.

* **Tipos de Comprobante**: Para el **POST** de movimientos, es crucial usar el ``idTipoComprobante`` correcto configurado en SIFAC para mover stock (ej: "AJU" para ajuste positivo, "DIF" para diferencias, etc.).

* **Firmas**: El endpoint **PATCH** y el de firmas permiten actualizar el estado de un movimiento ya creado, agregando la constancia de quién lo procesó físicamente.