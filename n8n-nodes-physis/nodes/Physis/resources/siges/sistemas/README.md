# Recurso Sistemas (SIGES)

El recurso **Sistemas** permite consultar el catálogo de módulos funcionales instalados o disponibles en la instancia del ERP.

Generalmente, Physis divide su lógica en subsistemas identificados numéricamente. Por ejemplo:
* **1**: Ventas
* **2**: Compras
* **3**: Stock / Inventario
* **4**: Tesorería / Fondos

Este recurso es útil para obtener metadatos sobre estas divisiones, como descripciones o configuraciones globales por módulo.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idSistemas` | Int | Identificador único del módulo. |
| `descripcion` | String | Nombre del sistema (ej: "Gestión de Ventas"). |
| `activo` | Boolean | Indica si el módulo está habilitado para operar. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Sistemas** (`getAll`): Devuelve todos los módulos registrados.
* **Obtener Sistema** (`get`): Obtiene detalles de un módulo específico.

---

## 💡 Ejemplos de Uso

### 1. Listar Módulos Disponibles
Saber qué áreas del ERP están activas para mostrar en un dashboard de selección.

**Recurso**: `Sistemas` 

**Operación**: `Listar Sistemas`

*Respuesta*:
```json
[
  { "idSistemas": 1, "descripcion": "Ventas" },
  { "idSistemas": 2, "descripcion": "Compras" },
  { "idSistemas": 5, "descripcion": "Contabilidad" }
]
```

---

## ⚠️ Notas Técnicas

* **IDs Fijos**: En muchas implementaciones de SIGES, los IDs de los sistemas "Core" (Ventas, Compras, Stock) son constantes y no suelen cambiar, lo que permite utilizarlos como constantes (hardcoded) en flujos de automatización si es necesario.