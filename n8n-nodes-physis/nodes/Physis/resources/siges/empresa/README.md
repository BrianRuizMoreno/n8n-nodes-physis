# Recurso Empresa (SIGES)

El recurso **Empresa** proporciona acceso a la información de la entidad o razón social sobre la cual está operando la sesión actual.

Es fundamental en entornos multi-empresa para identificar el contexto de trabajo, validar licencias (serial), consultar los módulos habilitados (aplicaciones) o buscar identificadores internos a partir de un CUIT.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `nombre` | String | Razón Social o nombre de fantasía de la empresa. |
| `cuit` | String | Clave Única de Identificación Tributaria (sin guiones). |
| `serial` | String | Identificador único de la instalación/licencia de la empresa en Physis. |
| `aplicaciones` | Array | Lista de módulos o subsistemas habilitados para esta empresa. |

---

## 🛠 Operaciones Disponibles

### Contexto Actual
Estas operaciones devuelven información basada en el token o sesión del usuario logueado.
* **Obtener Datos Actuales** (`getCurrent`): Devuelve la ficha completa de la empresa activa.
* **Obtener Nombre** (`getName`): Recupera únicamente el nombre de la empresa (útil para encabezados de reportes o UI).
* **Listar Aplicaciones** (`getApplications`): Devuelve los módulos contratados o activos (ej: "Contabilidad", "Sueldos", "Granos").

### Búsqueda Global
* **Buscar por CUIT** (`getByCuit`): Permite obtener el `serial` (ID interno) de una empresa buscando por su número de CUIT.
    * *Nota*: Si existen múltiples empresas con el mismo CUIT en la base de datos, el sistema devuelve la primera coincidencia encontrada.

---

## 💡 Ejemplos de Uso

### 1. Validar Contexto de Ejecución
Al iniciar un flujo de automatización, verificar en qué empresa se está ejecutando para evitar procesar datos en el entorno equivocado.

**Recurso**: `Empresa` 

**Operación**: `Obtener Nombre`

**Respuesta Esperada**:
```json
{
  "nombre": "Agropecuaria El Horizonte S.A."
}
```

### 2. Obtener Serial para Integraciones
Algunos procesos externos requieren el "Serial" de la empresa para validar licencias o conectar APIs de terceros.

**Recurso**: `Empresa` 

**Operación**: `Buscar por CUIT`

**Parámetro (Path)**:

* cuit: `30112233445`

---

## ⚠️ Notas Técnicas
* **Dependencia de Sesión**: A excepción de la búsqueda por CUIT, todos los endpoints asumen el contexto de la empresa definida en el token de autenticación del usuario. Si el usuario tiene acceso a múltiples empresas, asegúrese de haber realizado el login o cambio de contexto previo correcto.

* **Unicidad de CUIT**: Aunque el sistema permite (técnicamente) tener múltiples empresas con el mismo CUIT (ej: distintas unidades de negocio fiscales bajo la misma razón social), la búsqueda por CUIT no distingue entre ellas y retornará arbitrariamente la primera.