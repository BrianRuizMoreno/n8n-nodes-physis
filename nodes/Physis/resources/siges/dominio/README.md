# Recurso Dominios (SIGES)

El recurso **Dominios** en SIGES actúa como un maestro de configuraciones técnicas y auxiliares.

Su función principal es proveer al frontend o a sistemas externos de información estática necesaria para la interfaz de usuario, como ser:
* **Máscaras de entrada**: Formatos visuales para campos (ej: CUIT, Teléfonos).
* **Listas de Valores**: Opciones predefinidas para llenar combos o listas desplegables (Tipos de IVA, Categorías estáticas).

Es un recurso de **solo lectura** utilizado típicamente durante la inicialización de la aplicación o formularios para obtener reglas de validación y opciones disponibles.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idDominio` | Int | Identificador numérico del grupo de datos o configuración. |
| `descripcion` | String | Nombre legible del dominio (ej: "Tipos de Documento", "Máscara Importe"). |
| `mascara` | String | (Opcional) Cadena de caracteres que define el formato visual o regex de validación. |
| `valores` | Array | (Opcional) Lista de opciones permitidas dentro de este dominio. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve la colección completa de dominios configurados en el sistema. Ideal para cargar cachés locales de configuración al inicio de sesión.
* **Obtener por ID** (`get`): Recupera la configuración específica de un dominio (ej: obtener las opciones del dominio ID 5).

---

## 💡 Ejemplos de Uso

### 1. Inicializar Selectores de UI
Obtener todas las listas de opciones estáticas para poblar los combos de "Condición de IVA" y "Tipo de Documento" en una pantalla de alta de clientes.

**Recurso**: `Dominios` 

**Operación**: `Listar Todos`

### 2. Obtener Máscara de CUIT
Consultar el dominio específico que define cómo se debe validar y formatear un número de CUIT en la interfaz.

**Recurso**: `Dominios` 

**Operación**: `Obtener por ID`

**Parámetros (Path)**:
* idDominio: `10` (Supongamos que 10 es el ID para validaciones fiscales).

**Respuesta Esperada**:
```json
{
  "idDominio": 10,
  "descripcion": "Validación CUIT",
  "mascara": "99-99999999-9",
  "regex": "^\\d{2}-\\d{8}-\\d{1}$"
}
```

---

## ⚠️ Notas Técnicas
* **Solo Lectura**: Este recurso no permite la creación o modificación de dominios a través de la API. Las configuraciones de dominio son estructurales de la base de datos de Physis.

* **Caché**: Dado que es información que raramente cambia (metadatos), se recomienda encarecidamente cachear la respuesta de `getAll` en el cliente para reducir el tráfico de red.