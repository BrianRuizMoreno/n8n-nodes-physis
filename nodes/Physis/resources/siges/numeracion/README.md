# Recurso Numeración (SIGES)

El recurso **Numeración** administra los contadores y secuencias utilizados para identificar unívocamente los comprobantes en el sistema.

Define las reglas de numeración para cada tipo de documento (Facturas, Recibos, Órdenes de Pago). Permite configurar:
* **Numeradores Simples**: Secuencia única (1, 2, 3...). Usado para documentos internos como Asientos o Pases.
* **Numeradores por Prefijo**: Estructura de Punto de Venta + Número (0001-00000001). Usado para documentos fiscales y legales.
* **Datos Fiscales**: Configuración de CAI, vencimientos y Factura Electrónica por punto de venta.

## 📋 Campos Principales

### Cabecera de Numerador
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idNumerador` | Int | Identificador interno del tipo de secuencia (ej: 5 = Factura A). |
| `nombre` | String | Descripción del numerador (ej: "Facturas de Venta A"). |
| `idEjercicio` | Int | Ejercicio contable al que pertenece la configuración. |
| `porPrefijo` | Boolean | Indica si utiliza puntos de venta (`true`) o numeración corrida (`false`). |
| `reinicia` | Boolean | Si la numeración vuelve a 1 al cambiar de ejercicio. |

### Detalle de Prefijos (Puntos de Venta)
Lista contenida dentro del objeto numerador cuando `porPrefijo = true`.
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `nombre` | String | Número del punto de venta (ej: "0005"). |
| `numero` | Int | Último número emitido (contador actual). |
| `numeroCai` | String | Clave de Autorización de Impresión (para facturas preimpresas). |
| `fElectronica` | Boolean | Indica si este punto de venta emite Factura Electrónica (Web Service). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar por Ejercicio** (`getAllByExercise`): Devuelve todos los numeradores configurados para un año fiscal específico. Es la consulta estándar para selectores.
* **Obtener Detalle** (`get`): Recupera la configuración de un numerador, incluyendo el estado actual de sus contadores por punto de venta.
* **Consultar Último Número** (`getLastNumber`): Obtiene el último número utilizado para calcular el siguiente disponible (especialmente para numeradores sin prefijo).

### Gestión (ABM)
* **Crear** (`create`): Alta de un nuevo numerador y sus puntos de venta asociados.
* **Modificar** (`update`): Actualización de contadores, carga de nuevos CAI o cambio de configuraciones.
* **Eliminar** (`delete`): Baja de un numerador (Solo posible si no ha sido utilizado en comprobantes).

---

## 💡 Ejemplos de Uso

### 1. Listar Talonarios Disponibles
Ver qué numeradores existen para el ejercicio 2026.

**Recurso**: `Numeración` 

**Operación**: `Listar por Ejercicio`

**Parámetros (Path)**:
* idEjercicio: `2026`

### 2. Crear Numerador para Factura Electrónica
Configurar el talonario de "Factura B" con punto de venta 0002.

**Recurso**: `Numeración`  

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idEjercicio": 2026,
  "nombre": "Factura Venta B",
  "porPrefijo": true,
  "reinicia": false,
  "prefijos": [
    {
      "nombre": "0002",
      "numero": 0,
      "fElectronica": true,
      "numeroDesde": 1,
      "numeroHasta": 99999999
    }
  ]
}
```

### 3. Consultar Próximo Asiento
Para un numerador interno (sin prefijo), saber cuál fue el último número usado.

**Recurso**: `Numeración` 

**Operación**: `Consultar Último Número`

**Parámetros**:

* IdNumerador: `1` (Asientos)

* IdEjercicio: `2026`

---

## ⚠️ Notas Técnicas
* **Contexto de Ejercicio**: La numeración es dependiente del ejercicio. El talonario "Factura A" del 2025 es un objeto distinto al del 2026, aunque compartan lógica. Siempre especifique `idEjercicio`.

* **Seguridad de Secuencia**: Modificar manualmente el campo numero (último emitido) a través del update es riesgoso y puede causar duplicidad de comprobantes o huecos en la facturación. Hágalo con extrema precaución.