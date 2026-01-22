# Recurso Tipos de Documento (SIGES)

El recurso **Tipos de Documento** administra el catálogo de identificaciones válidas en el sistema para Personas Físicas y Jurídicas.

Define qué documentos pueden cargarse al crear un Tercero (ej: DNI, CUIT, CUIL, Pasaporte) y establece las validaciones básicas, como si aplica la máscara de formato de CUIT (xx-xxxxxxxx-x).

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idTipoDocumento` | String | Código identificador (Suele seguir estándar AFIP: "80"=CUIT, "96"=DNI). |
| `descripcion` | String | Nombre descriptivo (ej: "Documento Nacional de Identidad"). |
| `personaFisica` | Boolean | Indica si es válido para individuos humanos. |
| `personaJuridica` | Boolean | Indica si es válido para empresas/sociedades. |
| `mascaraCUIT` | Boolean | Si `true`, el frontend debe validar/formatear como un CUIT. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve todos los tipos configurados.
    * *Filtros opcionales*: `personaFisica=true/false`, `personaJuridica=true/false` para filtrar la lista según el tipo de entidad que se esté cargando.
* **Obtener Detalle** (`get`): Recupera la configuración de un tipo específico por su ID.

### Gestión (ABM)
* **Crear** (`create`): Agrega un nuevo tipo de identificación al sistema.
* **Modificar** (`update`): Actualiza nombres o reglas de validación.
* **Eliminar** (`delete`): Borra un tipo de documento (solo si no está en uso).

---

## 💡 Ejemplos de Uso

### 1. Llenar Combo para "Nueva Empresa"
Al crear una persona jurídica, mostrar solo los documentos válidos (CUIT, CDI).

**Recurso**: `TiposDocumento` 

**Operación**: `Listar Todos`

**JSON Body (Filtros)**:
```json
{
  "personaJuridica": true,
  "personaFisica": false
}
```

### 2. Validar qué es el código "80"
El sistema recibe una integración con idTipoDocumento: "80" y necesita saber el nombre.

**Recurso**: `TiposDocumento` 

**Operación**: `Obtener Detalle`

**Parámetro**: 

* id: `80`

* Respuesta: `{ "descripcion": "CUIT", "mascaraCUIT": true ... }`

### 3. Crear Tipo "Pasaporte Extranjero"
Agregar una nueva opción para clientes internacionales.

**Recurso**: `TiposDocumento` 

**Operación**: `Crear`

**JSON Body**:

```json
{
  "idTipoDocumento": "PAS",
  "descripcion": "Pasaporte",
  "personaFisica": true,
  "personaJuridica": false,
  "mascaraCUIT": false
}
```

---

## ⚠️ Notas Técnicas
* **Estándar AFIP**: Se recomienda fuertemente utilizar los códigos estandarizados por ARCA (Agencia fiscal argentina) para asegurar la compatibilidad con la Factura Electrónica (ej: ``80=CUIT``, ``86=CUIL``, ``96=DNI``, ``94=Pasaporte``).

* **Parámetro Delete**: A diferencia de la mayoría de endpoints RESTful que usan el ID en el path (``DELETE /resource/{id}``), este recurso espera el ID como un query parameter (``DELETE /resource?idTipoDocumento=...``). El handler ya gestiona esto automáticamente.