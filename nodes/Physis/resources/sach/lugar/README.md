# Recurso Lugar (SACH)

El recurso **Lugar** administra los espacios físicos o virtuales donde se realizan las operaciones de comercialización de hacienda (ej: "Sociedad Rural de Junín", "Mercado Agroganadero", "Negocio Particular").

Este maestro es fundamental para configurar las reglas de negocio específicas de cada ubicación, tales como:
* **Comisionistas Asociados**: Quiénes operan habitualmente en ese lugar.
* **Plazos de Pago**: Condiciones financieras por defecto para ese mercado.
* **Prefijos de Facturación**: Puntos de venta asociados para la emisión de comprobantes.
* **Ubicación Geográfica**: País, Provincia y Partido para la trazabilidad (DTE).

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, se envía un objeto JSON que define el lugar y sus configuraciones anidadas.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idLugar` | String | Código identificador (ej: "RURAL"). | Sí |
| `descripcion` | String | Nombre descriptivo del lugar. | Sí |
| `idPais` | Int | ID del país. | No |
| `idProvincia` | Int | ID de la provincia. | No |
| `idPartido` | Int | ID del partido/departamento. | No |
| `informaNroGuia` | Bool | Si requiere informar número de guía. | No |
| `plazos` | Array | Lista de plazos habilitados para el lugar. | No |
| `prefijos` | Array | Puntos de venta asociados. | No |
| `comisionistasLugares` | Array | Agentes asociados al lugar. | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Lugares** (`getAll`): Devuelve la lista completa de lugares configurados.
* **Obtener por ID** (`get`): Recupera el detalle de un lugar específico mediante su código.
* **Consulta Avanzada** (`tableSearch`): Búsqueda potente con filtros, paginado y ordenamiento (`/api/sach/v2/lugares`).
* **Listar Partidos** (`getPartidos`): Devuelve el maestro de partidos/departamentos disponibles.
* **Listar Prefijos** (`getPrefijos`): Obtiene los prefijos de comprobantes utilizables en lugares.

### ABM (Escritura)
* **Crear** (`create`): Da de alta un nuevo lugar con toda su configuración.
* **Actualizar** (`update`): Modifica los datos de un lugar existente.
* **Eliminar** (`delete`): Borra un lugar del sistema.

---

## 💡 Ejemplos de JSON

### 1. Crear un Lugar de Remate
Registra un predio ferial con configuración de ubicación.

**Recurso**: `Lugar` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idLugar": "PREDIO-NORTE",
  "descripcion": "Predio Ferial Norte",
  "idPais": 1,
  "idProvincia": 2,
  "idPartido": 15,
  "informaNroGuia": true,
  "noFacturable": false,
  "plazos": [
    {
      "idPlazo": 5,
      "plazoDe": "30 y 60 días"
    }
  ]
}
```

### 2. Consulta Avanzada
Buscar lugares que contengan "Mercado" en su descripción, paginado.

**Recurso**: ``Lugar`` 

**Operación**: ``Consulta Avanzada``

**JSON Body**:

```json
{
  "filtros": {
    "filtros": [
      "Descripcion LIKE '%Mercado%'"
    ],
    "logico": "AND"
  },
  "paginado": {
    "paginaActual": 1,
    "registrosPorPagina": 10
  }
}
```

### 3. Actualizar Relación con Comisionistas
Asociar un comisionista al lugar.

**Recurso**: ``Lugar``  

**Operación**: ``Actualizar``

**JSON Body**:

```json
{
  "idLugar": "PREDIO-NORTE",
  "descripcion": "Predio Ferial Norte",
  "comisionistasLugares": [
    {
      "idPpalComisionista": 1,
      "idAuxiComisionista": 1,
      "idCtaAuxiComisionista": "COM-001",
      "nombreComisionista": "Consignataria S.A."
    }
  ]
}
```

---

## ⚠️ Notas Técnicas
* **Identificador de Texto**: El campo ``idLugar`` es de tipo ``string``. Esto permite definir códigos mnemotécnicos (ej: "LINIERS", "ROSARIO") en lugar de solo números.

* **Relaciones**: Al actualizar listas como ``plazos`` o ``comisionistasLugares``, el sistema suele esperar la lista completa vigente. Es decir, reemplaza la colección anterior por la nueva enviada en el PUT.

* **Geografía**: Los campos ``idPais``, ``idProvincia`` y ``idPartido`` deben corresponder a IDs válidos en los maestros geográficos del sistema para asegurar la correcta emisión de documentos de tránsito (DTE).