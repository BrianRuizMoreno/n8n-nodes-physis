# Recurso Modelos (SIGES)

El recurso **Modelos** permite consultar las plantillas de operación predefinidas en el sistema.

Un "Modelo" en Physis es un conjunto de valores por defecto asociado a un Tipo de Comprobante.
Ejemplo: Para el tipo `FAC` (Factura), puedo tener el Modelo 1 "Venta Salón" (Lista Precios 1, Vendedor Mostrador) y el Modelo 2 "Venta Mayorista" (Lista Precios 3, Depósito Central).

Este recurso es útil para **descubrir qué configuraciones preestablecidas existen** antes de generar un comprobante, permitiendo replicar la lógica de negocio del ERP en las automatizaciones.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idModelo` | Int | Identificador único de la plantilla. |
| `nombre` | String | Descripción del modelo (ej: "Factura A Exportación"). |
| `idTipoComprobante` | String | El documento base al que aplica (ej: `FAC`, `PED`). |
| `idPpal` | Int | Contexto del plan de cuentas (habitualmente 1). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Modelos** (`getAll`): Devuelve las plantillas disponibles, permitiendo filtrar por tipo de documento.
* **Obtener Modelo** (`get`): Recupera el detalle de un modelo específico.

---

## 💡 Ejemplos de Uso

### 1. Buscar Modelos de Facturación
Quiero saber qué plantillas de facturas existen para que el usuario elija en un bot de Telegram.

**Recurso**: `Modelo` 

**Operación**: `Listar Modelos`

**Parámetro**: 
* Tipo Comprobante: `FAC`

*Respuesta*:
```json
[
  { "idModelo": 10, "nombre": "Factura Electrónica Local" },
  { "idModelo": 12, "nombre": "Factura de Crédito MiPyME" }
]
```

### 2. Obtener Configuración de Modelo
Recuperar los defaults del Modelo 10 para usarlos al crear un comprobante.

**Recurso**: `Modelo` 

**Operación**: `Obtener Modelo`

**Parámetro**: 

* idModelo: `10`

---

## ⚠️ Notas Técnicas

* **Uso en Automatizaciones**: Al crear comprobantes (Recurso `Comprobantes`), suele ser más seguro y rápido enviar el `IdModelo` para que el sistema complete los datos faltantes automáticamente, en lugar de intentar mapear cada campo manualmente.