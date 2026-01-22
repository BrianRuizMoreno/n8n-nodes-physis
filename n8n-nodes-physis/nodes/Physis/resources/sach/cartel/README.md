# Recurso Cartel (SACH)

El recurso **Cartel** administra la configuración de los "carteles" o identificadores visuales utilizados en los remates y operaciones de hacienda. Estos carteles definen cómo se agrupa y visualiza la mercadería (ej: por Corral, por Lote, por Categoría) y contienen la información clave para la impresión de listados y la operación en pista.

Permite vincular un tipo de operación, el tipo de hacienda y el lugar físico (corral/puesto).

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCartel` | Int | Código identificador (0 para crear uno nuevo). | Sí |
| `detalle` | String | Descripción o nombre del cartel (ej: "Corral 1 - Novillos"). | Sí |
| `idTipoOperacion` | String | Código del tipo de operación (ej: "REM" para Remate). | No |
| `idTipoHacienda` | String | Clasificación de la hacienda (ej: "INVERNADA"). | No |
| `idLugar` | String | Identificador del lugar físico o corral. | No |
| `letra` | String | Letra del comprobante asociada (si aplica). | No |
| `lineaImpresion` | Int | Orden o línea para la impresión de catálogos. | No |
| `idPuesto` | Int | Puesto de trabajo asociado. | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Carteles** (`getAll`): Devuelve el listado completo de carteles configurados.
* **Obtener por ID** (`get`): Recupera el detalle de un cartel específico.
* **Consulta Avanzada** (`tableSearch`): Permite realizar búsquedas complejas con paginado, ordenamiento y filtros específicos (Endpoint `/consulta`).

### ABM (Escritura)
* **Crear** (`create`): Da de alta un nuevo cartel.
* **Actualizar** (`update`): Modifica los datos de un cartel existente.
* **Eliminar** (`delete`): Borra un cartel del sistema.

---

## 💡 Ejemplos de JSON

### 1. Crear un Cartel para Remate
Registra un cartel para identificar un lote de Invernada en el remate físico.

**Recurso**: `Cartel`  

**Operación**: `Crear`

**JSON Body**:

```json
{
  "idCartel": 0,
  "detalle": "Lote 5 - Terneros Invernada",
  "idTipoOperacion": "REMATE",
  "idTipoHacienda": "INV",
  "idLugar": "CORRAL-05",
  "lineaImpresion": 10
}
```

### 2. Consulta Avanzada (Buscador)
Buscar carteles que contengan la palabra "Novillo" en el detalle.

**Recurso**: ``Cartel`` 

**Operación**: ``Consulta Avanzada ``

**JSON Body**:

```json
{
  "filtros": {
    "filtros": [
      {
        "campo": "Detalle",
        "valor": "Novillo",
        "operador": 8  // 8 = Contiene
      }
    ],
    "logico": 0 // 0 = AND
  },
  "paginado": {
    "paginaActual": 1,
    "registrosPorPagina": 50
  }
}
```

---

## ⚠️ Notas Técnicas
* **IDs de Referencia**: Los campos ``idTipoOperacion``, ``idTipoHacienda`` y ``idLugar`` son claves foráneas que deben existir previamente en sus respectivos maestros.

* **Impresión**: El campo ``lineaImpresion`` es crítico para determinar el orden en que aparecerán los lotes en los catálogos de remate impresos.

* **Consulta**: El endpoint de ``consulta`` (``POST``) es mucho más potente que el ``getAll`` simple, ya que permite paginar resultados en listas grandes de carteles.