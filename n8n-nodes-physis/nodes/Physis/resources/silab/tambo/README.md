# Recurso Tambo (SILAB)

El recurso **Tambo** administra las operaciones específicas de la producción lechera.

Permite monitorear los establecimientos dedicados al ordeñe, gestionar las actividades relacionadas y, lo más importante, consultar los registros de **Producción de Leche**, tanto a nivel consolidado (diario por campo) como detallado por animal (producción individual).

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `campo` | String | Identificador del establecimiento o tambo. |
| `caravana` | String | Identificador único del animal (Vaca) / ID Electrónico o Visual. |
| `actividad` | String | Tipo de registro (ej: "Ordeñe AM", "Ordeñe PM"). |
| `fecha` | Date | Fecha del registro de producción. |

---

## 🛠 Operaciones Disponibles

### Maestros y Configuración
* **Listar Campos de Tambo** (`getCampos`): Devuelve los establecimientos habilitados para la actividad lechera.
* **Listar Actividades** (`getActividades`): Devuelve los tipos de labores específicas de tambo (Ordeñe, Control Lechero, etc.).

### Consultas de Producción
* **Producción Individual** (`getProduccionIndividual`): Devuelve el histórico de litros producidos por un animal específico (`caravana`) en un rango de fechas.
* **Producción Diaria** (`getProduccionDiaria`): Devuelve el total de litros producidos por el tambo (`campo`) día a día, o el detalle diario de los animales.

---

## 💡 Ejemplos de Uso

### 1. Consultar Historial de una Vaca
Ver cuánto produjo el animal con caravana "A-105" durante el mes de Enero en el campo "La Lechería".

**Recurso**: `Tambo`  

**Operación**: `Producción Individual`

**Parámetros (Path)**:

* fechaDesde: `2026-01-01`
* fechaHasta: `2026-01-31`
* actividad: `ORD` (Ordeñe)
* campo: `TAMBO-01`
* caravana: `A-105`

### 2. Consultar Producción Diaria del Tambo
Ver el rendimiento diario del establecimiento para analizar la curva de producción.

**Recurso**: `Tambo`  

**Operación**: `Producción Diaria`

**Parámetros (Path)**:

* campo: `TAMBO-01`

---

## ⚠️ Notas Técnicas

* **Caravana**: Es la clave principal para el seguimiento individual. Asegúrese de utilizar el ID exacto (visual o electrónico) tal como está registrado en el sistema.
* **Formatos de Fecha**: Los endpoints que reciben fechas en la URL (`/fechaDesde/...`) suelen requerir un formato estándar (habitualmente `YYYY-MM-DD`), verifique la configuración regional de su instancia de Physis.
* **Alias**: Existen endpoints duplicados por compatibilidad (ej: `/getcampo` y `/campos`). Se recomienda utilizar las versiones RESTful estándar (`/campos`, `/actividades`) para nuevas integraciones.