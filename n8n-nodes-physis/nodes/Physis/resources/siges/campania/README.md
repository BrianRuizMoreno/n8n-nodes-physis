# Recurso Campañas (SIGES)

El recurso **Campañas** en el módulo SIGES administra los periodos de gestión o ejercicios productivos (ej: "2025-2026").

Aunque comparte concepto con el módulo agrícola, en SIGES la campaña actúa como un **filtro transversal** para la contabilidad de gestión, permitiendo segmentar análisis de costos, márgenes y resultados por ciclo productivo, independientemente del ejercicio contable fiscal.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codCampania` | Int | Código numérico identificador (ej: `2526`). |
| `descripcion` | String | Nombre del periodo (ej: "Campaña 25-26"). |
| `activa` | Boolean | Indica si es la campaña de trabajo actual. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Devuelve el histórico completo de campañas configuradas.
* **Obtener por ID** (`get`): Recupera los datos de una campaña específica.
* **Obtener Activa** (`getActive`): Devuelve la campaña que está marcada como vigente o predeterminada.
    * *Contexto*: Si la consulta se realiza con un usuario logueado, devuelve la campaña activa configurada en el perfil de ese usuario. Si no, devuelve la activa global del sistema.

---

## 💡 Ejemplos de Uso

### 1. Obtener Contexto Predeterminado
Al iniciar un proceso de integración, consultar cuál es la campaña activa para usarla como filtro por defecto en reportes posteriores.

**Recurso**: `Campañas` 

**Operación**: `Obtener Activa`

**Respuesta Esperada**:
```json
{
  "codCampania": 2526,
  "descripcion": "Campaña 2025/2026",
  "fechaInicio": "2025-05-01T00:00:00"
}
```

### 2. Listar Histórico para Selector
Llenar un combo de selección de campaña en un Dashboard Financiero.

**Recurso**: `Campañas` 

**Operación**: `Listar Todas`

---

## ⚠️ Notas Técnicas
* **Uso en Reportes**: La mayoría de los reportes de gestión en SIGES (`/api/siges/informe/...`) requieren el `codCampania` como parámetro obligatorio u opcional para acotar los datos. Utilice el endpoint `getActive` para automatizar este parámetro.

* **Diferencia con Ejercicio**: No confundir **Campaña** (Ciclo productivo/negocio) con **Ejercicio** (Ciclo contable fiscal). Un ejercicio contable puede abarcar partes de dos campañas y viceversa.