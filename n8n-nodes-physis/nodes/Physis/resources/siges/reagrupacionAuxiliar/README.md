# Recurso Planes de Reagrupación Auxiliar (SIGES)

El recurso **Planes de Reagrupación Auxiliar** administra la **definición y estructura** de las clasificaciones analíticas secundarias.

Mientras que *CuentasReagrupacionAuxi* gestiona los nodos individuales ("Zona Norte", "Vendedor A"), este recurso define **qué es** esa clasificación (ej: "Zonas Geográficas", "Fuerza de Ventas") y qué reglas sigue (longitud del código, niveles jerárquicos).

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idAuxi` | Int | Identificador del Plan Base (ej: 100=Clientes). |
| `idReagAuxi` | Int | Identificador de la Clasificación (ej: 1=Zonas). |
| `nombre` | String | Nombre de la clasificación (ej: "Zonas Geográficas"). |
| `intervieneOlap` | Boolean | Indica si esta dimensión se exporta a cubos de inteligencia de negocios. |
| `nivelesReagrupacionAuxi` | Array | Lista de niveles que definen la máscara del código (Jerarquía). |

---

## 🛠 Operaciones Disponibles

### Consultas de Estructura
* **Listar Planes** (`getAll`): Muestra todas las clasificaciones disponibles para un rubro (ej: Ver qué tipos de agrupaciones tienen los Clientes).
* **Obtener Definición** (`get`): Recupera la configuración técnica de un plan (máscara, niveles).
* **Consultar Tamaño** (`getTotalSize`): Devuelve la longitud total permitida para los códigos de esta agrupación.

### Consultas de Contenido (Nodos)
* **Listar Nodos** (`getAccounts`): Devuelve las categorías creadas bajo este esquema (ej: Si el plan es "Zonas", devuelve "Norte", "Sur", "Este").
* **Ver Terceros Asociados** (`getAssociatedAuxiliaries`): Dado un nodo específico (ej: "Zona Norte"), devuelve la lista de Clientes o Proveedores que pertenecen a él. Es fundamental para reportes de segmentación.

### Gestión (Configuración)
* **Crear / Modificar** (`create`, `update`): Permite definir nuevas dimensiones de análisis.
* **Eliminar** (`delete`): Borra una definición de reagrupación.

---

## 💡 Ejemplos de Uso

### 1. Ver clasificaciones de Clientes
Saber de qué formas puedo agrupar a mis clientes (Plan 100).

**Recurso**: `PlanesReagrupacionAuxi` 

**Operación**: `Listar Planes`

**Parámetro**: 

* idAuxi: `100`

**Respuesta**:
```json
[
  { "idReagAuxi": 1, "nombre": "Zonas" },
  { "idReagAuxi": 2, "nombre": "Actividad Económica" },
  { "idReagAuxi": 5, "nombre": "Vendedores" }
]
```

### 2. ¿Qué clientes son de "Zona Norte"?
Obtener el listado de clientes asignados al nodo "01" (Norte) de la reagrupación 1 (Zonas).

**Recurso**: `PlanesReagrupacionAuxi` 

**Operación**: `Ver Terceros Asociados`

**Parámetros**:

* idAuxi: `100`

* idReagAuxi: `1`

* idCtaReagAuxi: `01`

### 3. Crear Clasificación por "Canal de Venta"
Definir una nueva forma de agrupar clientes con códigos de 2 dígitos.

**Recurso**: `PlanesReagrupacionAuxi` 

**Operación**: `Crear Plan`

**JSON Body**:

```json
{
  "idAuxi": 100,
  "idReagAuxi": 10,
  "nombre": "Canales de Venta",
  "nivelesReagrupacionAuxi": [
    { "idNivelReagAuxi": 1, "tamanio": 2, "nombreNivel": "Canal" }
  ]
}
```

---

## ⚠️ Notas Técnicas
* **Claves Compuestas**: La unicidad de estos planes siempre depende del par `idAuxi` (Qué estoy agrupando) + `idReagAuxi` (Cómo lo estoy agrupando).

* **Uso en OLAP**: El flag `intervieneOlap` es crítico para la configuración de reportes de Business Intelligence. Si está en `true`, esta reagrupación aparecerá como una dimensión en los cubos de datos.