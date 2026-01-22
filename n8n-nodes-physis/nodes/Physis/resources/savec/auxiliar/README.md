# Recurso Auxiliar (SAVEC)

El recurso **Auxiliar** agrupa endpoints de "Maestros" o datos estáticos fundamentales para la operatoria de granos. Su función principal es proveer los catálogos necesarios para poblar listas desplegables (combos) y validar información en otros procesos.

Incluye la gestión de consulta de:
* **Campañas**: Ciclos agrícolas (ej: "Trigo 23/24", "Soja 24").
* **Cereales**: Especies de granos (ej: Trigo, Maíz, Girasol) y su stock físico.

## 📋 Filtros de Consulta

Al ser un recurso de lectura para obtención de listas maestras, no se envían objetos JSON complejos en el cuerpo. Los parámetros principales se envían para filtrar o formatear la respuesta.

| Parámetro | Tipo | Descripción | Operación Asociada |
| :--- | :--- | :--- | :--- |
| `incluirRowTodos` | Boolean | Agrega una opción "Todos" al inicio de la lista (ideal para selectores "Todas las campañas"). | Listados generales |
| `idUsuario` | Int | Filtra las campañas habilitadas para un usuario específico. | Listar Campañas por Usuario |
| `codCampania` | Int | Código de la campaña para consultar stock. | Consultar Stock |
| `fecha` | Date | Fecha de corte para el cálculo de stock físico. | Consultar Stock |

---

## 🛠 Operaciones Disponibles

### 1. Gestión de Campañas
Endpoints para obtener los ciclos agrícolas vigentes.
* **Listar Campañas** (`getCampanias`): Devuelve todas las campañas del sistema.
* **Listar Campañas por Usuario** (`getCampaniasUsuario`): Devuelve solo aquellas campañas que el usuario tiene permiso de visualizar o imputar.

### 2. Gestión de Cereales
Endpoints para obtener el catálogo de productos agrícolas.
* **Listar Cereales** (`getCereales`): Devuelve la lista maestra de granos configurados.
* **Consultar Stock de Cereales** (`getCerealesStock`): Obtiene la posición física (kilos) de un cereal a una fecha y campaña determinada.

---

## 💡 Ejemplos de Uso

### 1. Poblar un Combo de Campañas
Obtener la lista para que el usuario seleccione una campaña, incluyendo la opción "Todos".
* **Operación**: `Listar Campañas`
* **Parámetros**:
    * `incluirRowTodos`: `true`

### 2. Consultar Stock Físico
Verificar cuánto stock de Maíz (supongamos cereal ID 2) hay en la campaña actual a la fecha de hoy.
* **Operación**: `Consultar Stock de Cereales`
* **Parámetros**:
    * `codCampania`: `24`
    * `fecha`: `2024-05-20T00:00:00.000Z`

### 3. Obtener Campañas de un Usuario
Para un login o validación de permisos.
* **Operación**: `Listar Campañas por Usuario`
* **Parámetros**:
    * `idUsuario`: `45`

---

## ⚠️ Notas Técnicas

* **Uso en Frontend**: Este recurso está optimizado para alimentar componentes de interfaz de usuario (Dropdowns/Selects).
* **Parámetro `incluirRowTodos`**: Al activarlo, el primer elemento del array devuelto suele tener ID `0` o `-1` con la descripción "Todos", facilitando la lógica de "sin filtro" en los reportes.
* **Stock**: La operación de stock devuelve valores físicos (kilos), no monetarios.