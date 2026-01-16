# Recurso Tipos de Comprobante (SIGES)

El recurso **Tipos de Comprobante** administra el catálogo de documentos operativos y contables del sistema.

Define **qué es** cada operación. Por ejemplo:
* `FAC`: Factura de Venta (Aumenta Deuda Cliente, Baja Stock, Genera IVA Venta).
* `REC`: Recibo de Cobro (Baja Deuda Cliente, Aumenta Caja).
* `REM`: Remito (Baja Stock, No mueve plata).

Es el metadato que gobierna el comportamiento de los comprobantes reales.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idTipoComprobante` | String | Código único (Primary Key). Ej: `FAC`. |
| `nombre` | String | Descripción legible. Ej: `Factura Venta Mercadería`. |
| `signo` | String | `+` o `-`. Define si suma o resta en la cuenta corriente. |
| `idTipoComprobanteAFIP` | String | Vinculación con AFIP (Ej: `FAC` -> `001`). |
| `afectacion` | Int | 0=Debe, 1=Haber. |
| `origen` | Int | Módulo al que pertenece (1=Ventas, 2=Compras, 3=Stock). |

---

## 🛠 Operaciones Disponibles

### Consultas Maestras
* **Listar Todos** (`getAll`): Devuelve el listado completo. Útil para poblar selectores en la UI.
* **Obtener Detalle** (`get`): Recupera todas las flags de configuración de un tipo (si mueve stock, si pide CAE, etc.).
* **Obtener Numeradores** (`getNumerators`): Devuelve qué puntos de venta (Prefijos) están habilitados para este comprobante y cuál es el próximo número a emitir.

### Consultas por Comportamiento
* **Listar por Afectación** (`getByAffectation`): Busca solo comprobantes que generen deuda (Debe) o pagos (Haber).
* **Listar por IVA** (`getByIVA`): Busca comprobantes que se registran en el libro de Compras o Ventas.

### Gestión
* **Crear / Modificar** (`create`, `update`): Permite configurar nuevos circuitos administrativos (ej: Crear un "Presupuesto Interno" que no mueva stock).

---

## 💡 Ejemplos de Uso

### 1. Llenar Combo de "Facturación"
Mostrar al usuario solo los comprobantes de Venta habilitados.

**Recurso**: `TiposComprobante` 

**Operación**: `Listar por IVA`

**Parámetros**:

* Tipo IVA: `Ventas (V)`

### 2. Consultar Próximo Número de Factura A
Antes de emitir, verificar qué número toca.

**Recurso**: `TiposComprobante` 

**Operación**: `Obtener Numeradores`

**Parámetro**: 

* idTipoComprobante: `FAC-A`

> *Respuesta*: `[{ "idNumerador": 1, "puntoVenta": 4, "ultimoNumero": 1050 }]` -> El próximo es el 1051.

### 3. Crear Tipo "Remito Interno"
Configurar un documento para mover mercadería entre depósitos sin valor fiscal.

**Recurso**: `TiposComprobante` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idPpal": 1,
  "idTipoComprobante": "REM-INT",
  "nombre": "Remito Interno Movimiento",
  "mascara": 0,
  "idNumerador": 5,
  "fechaAlta": "2026-01-16T19:17:31.716Z",
  "fechaBaja": null,
  "copias": 1,
  "externo": false,
  "idTipoComprobanteAFIP": "",
  "iva": "V", 
  "porDefecto": false,
  "observaciones": "Movimiento interno de mercadería entre depósitos",
  "idUsuario": 1,
  "fechaHora": "2026-01-16T19:17:31.716Z",
  "idAuxi": 0,
  "ivaafip": "",
  "afectacion": 0,
  "tipoCarga": 0,
  "acceso": 0,
  "idSistema": "",
  "idImpresion": "",
  "letra": "X",
  "signo": "+",
  "permiteDuplic": false,
  "fechaAuditoria": "2026-01-16T19:17:31.716Z",
  "origen": 3, 
  "comprRetAFIP": 0,
  "comprobRestitucion": false,
  "idTipoFormato": 10,
  "idFormato": 100,
  "alcance": 0,
  "imprimeEnProceso": true,
  "terceroAdicional": false,
  "perfeccionaPorPresupuesto": false,
  "informaIIBBPropios": false,
  "servidor": "",
  "noRegistrable": true,
  "baseRelacionada": "",
  "imprimeAsientoEnProceso": false,
  "esReciboCobrador": false,
  "idTipoFormatoCobrador": 0,
  "idFormatoCobrador": 0,
  "codOperacionAFIP": "",
  "soloDeposito": true,
  "idLibro": 0,
  "cFyGastosAlCompras": false,
  "dFeIngresosAlVentas": false,
  "claseMovimiento": "",
  "subsistema": "",
  "claseMovimientoDesc": "",
  "subsistemaDesc": "",
  "signoFac": 1,
  "permiteTercero": false,
  "ultimaCompra": false,
  "referencia": "",
  "idTipoFormato2": 0,
  "idFormato2": 0,
  "copias2": 0,
  "permiteCumplido": false,
  "permiteProductoDesdoblado": false,
  "idConceptoStock": 1,
  "reqAutorizacion": false,
  "baseRelacionadaFac": "",
  "precioReposicion": false,
  "costeoPEPS": true,
  "informado": false,
  "datosExportacion": false,
  "soloCtrlPrefijos": false,
  "calculaImpuesto": false,
  "compEnLinea": false,
  "generaAsiento": false,
  "tipoVenta": false,
  "incideEstadoContrato": false,
  "canje": 0,
  "nroNumInterno": 0,
  "terceros": "",
  "ivaDesc": "",
  "tipoComprobanteAFIP": "",
  "nombreNumerador": "",
  "afectacionDesc": "",
  "origenDesc": "Stock",
  "alcanceDesc": "",
  "impresion": "",
  "usuario": "",
  "tipoCargaDesc": "",
  "accesoDesc": "",
  "cuentasPrincipales": [],
  "cctcPuente": "",
  "ccPpalPuente": "",
  "ccAuxiPuente": "",
  "cctcPuenteNombre": "",
  "ccPpalPuenteNombre": "",
  "ccAuxiPuenteNombre": "",
  "hayComprobantes": false
}
```

---

## ⚠️ Notas Técnicas
**Impacto Crítico**: Modificar un Tipo de Comprobante (ej: cambiarle el signo o la afectación de stock) impacta retroactivamente en la interpretación de los datos o en los futuros movimientos. Se recomienda usar **UPDATE** con extrema precaución.

**Endpoint All**: El endpoint `/all` suele ser más rápido si no se requieren filtros de fecha, ya que evita lógica de validación de vigencias en el servidor.