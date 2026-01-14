# Recurso Campañas (SILAB)

El recurso **Campañas** administra los ciclos agrícolas (ej: "24-25", "25-26").

En el contexto de SILAB (Laboratorio y Agro), la Campaña es la dimensión temporal principal para agrupar lotes, ensayos, análisis y rendimientos. Define el periodo productivo en el que se realizan las actividades.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `CodCampania` | Int | Código numérico único (ej: `2526` para 2025/2026). |
| `Descripcion` | String | Nombre legible (ej: "Trigo 2025", "Campaña 25-26"). |
| `FechaInicio` | Date | Fecha de comienzo del ciclo. |
| `FechaFin` | Date | Fecha de finalización del ciclo. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Devuelve el listado completo de campañas agrícolas configuradas en el sistema.
    * *Filtro*: `idUsuario` (Permite listar solo las campañas visibles o asignadas a un usuario específico).
* **Obtener por ID** (`get`): Recupera los detalles de una campaña específica mediante su código.

---

## 💡 Ejemplos de Uso

### 1. Poblar Selector de Campaña
Obtener las campañas disponibles para que el usuario seleccione el contexto de trabajo al iniciar la aplicación.

**Recurso**: `Campañas` 

**Operación**: `Listar Todas`

**Respuesta Esperada (Ejemplo)**:
```json
[
  { "CodCampania": 2425, "Descripcion": "Campaña 2024/2025" },
  { "CodCampania": 2526, "Descripcion": "Campaña 2025/2026" }
]
```

### 2. Filtrar Campañas por Usuario
Si un agrónomo solo tiene permiso para ver campañas antiguas o específicas, se puede filtrar la lista.

**Recurso**: ``Campañas`` 

**Operación**: ``Listar Todas``

**Parámetros (Query)**:

* idUsuario: ``99``

⚠️ Notas Técnicas
* **Formato del Código**: Habitualmente el ``CodCampania`` sigue una estructura lógica de 4 dígitos concatenando los años (ej: 2526 para el ciclo que inicia en 2025 y termina en 2026), aunque esto depende de la parametrización interna de Physis.

* **Contexto Global**: Este recurso suele ser el primer filtro que se debe aplicar en cualquier dashboard o reporte agropecuario, ya que los mismos lotes (geográficamente) cambian de cultivo y rendimiento según la campaña seleccionada.