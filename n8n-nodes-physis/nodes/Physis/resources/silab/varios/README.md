# Recurso Varios (SILAB)

El recurso **Varios** de SILAB agrupa utilidades de consulta para datos maestros simples y tablas de equivalencia.

## 🛠 Operaciones Disponibles

### 1. Cereales (Cultivos)
Administra el maestro de tipos de cultivo (ej: Soja, Trigo, Maíz).
* **Obtener por ID** (`getCereal`): Recupera el detalle de un cultivo específico mediante su `CodCereal`.

### 2. Código de Intercambio (Integraciones)
Endpoint de utilidad para resolver mapeos de IDs entre Physis y sistemas externos. Permite buscar a qué registro interno corresponde un código foráneo.

* **Consultar Mapeo** (`getCodigoIntercambio`): Busca en una tabla específica un registro por su código de intercambio.

---

## 💡 Ejemplos de Uso

### 1. Consultar Detalle de un Cultivo
Obtener el nombre y configuración del Cereal código 1 (usualmente Trigo).

**Recurso**: `Varios` 

**Operación**: `Cereal: Obtener por ID`

**Parámetro ID**: `1`

### 2. Resolver Código Externo
Un sistema de maquinaria agrícola envía datos para el lote con código externo "L-99". Necesitamos saber cuál es el ID interno en Physis.

**Recurso**: `Varios` 

**Operación**: `Intercambio: Consultar Mapeo`

**JSON Body**:
```json
{
  "Tabla": "Lotes",
  "CodigoIntercambio": "L-99"
}
```

---

## ⚠️ Notas Técnicas
**Tablas de Intercambio**: La operación ``getCodigoIntercambio`` requiere conocer el nombre exacto de la tabla de mapeo configurada en Physis (ej: "Lotes", "Insumos", "Personal"). Si el nombre de la tabla es incorrecto, la consulta no devolverá resultados.