# Recurso Tipo de Formato (SACER)

El recurso **Tipo de Formato** administra las definiciones de los documentos o plantillas de impresión dentro del sistema. Permite configurar qué "vista" (template o recurso de reporte) se utiliza para visualizar o imprimir un comprobante y bajo qué condiciones lógicas aplica.

Es clave para la flexibilidad del sistema, permitiendo tener múltiples diseños para un mismo tipo de operación (ej. "Carta de Porte Automotor" vs "Ferroviaria", o formatos "A4" vs "Ticket").

## 📋 Estructura de Datos (Schema)

### 1. Objeto TipoFormato
Define la configuración técnica y visual de un documento.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idTipoFormato` | Int | **0** para crear nuevo. ID para editar o consultar. |
| `nombre`* | String | Nombre descriptivo del formato (ej: "Liquidación Estándar A4"). |
| `vista` | String | Nombre técnico de la vista, reporte o plantilla asociada en el backend. |
| `expresionLogica` | String | Fórmula o condición SQL/Script que determina cuándo usar este formato. |
| `definido` | Int | Indicador de tipo de definición (ej: 0=Usuario, 1=Sistema). |

---

## 🛠 Operaciones Disponibles

### 🔍 Consultas
* **Listar Todos** (`getTiposFormato`): Devuelve el catálogo completo de formatos disponibles.
* **Obtener Detalle** (`getTipoFormato`): Consulta la configuración de un formato específico por su ID.

### ⚙️ Gestión
* **Crear** (`createTipoFormato`): Registra una nueva definición de formato en el sistema.
* **Modificar** (`updateTipoFormato`): Actualiza la vista asociada o la lógica de aplicación.
* **Eliminar** (`deleteTipoFormato`): Borra una configuración de formato.

---

## 💡 Ejemplos de Uso

### 1. Crear Nuevo Formato de Liquidación
Registrar un formato específico para impresión en hoja A4.

**Recurso**: `TipoFormato`

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idTipoFormato": 0,
  "nombre": "Liquidación Primaria Granos (A4)",
  "definido": 0,
  "vista": "rpt_Liquidacion_A4_v2",
  "expresionLogica": "1=1"
}
```

### 2. Modificar la Vista Asociada
Actualizar el reporte técnico que utiliza el formato con ID 5.

**Recurso**: `TipoFormato`

**Operación**: `Modificar`

**JSON Body**:

```json
{
  "idTipoFormato": 5,
  "nombre": "Certificado de Depósito Electrónico",
  "definido": 1,
  "vista": "rpt_Certificado_Electronico_2026",
  "expresionLogica": "TipoMovimiento = 'E'"
}
```

### 3. Consultar Detalle
Ver qué vista utiliza el formato ID 12.

**Recurso**: `TipoFormato`

**Operación**: `Obtener Detalle`

**Parámetros**:

* idTipoFormato: `12`

## ⚠️ Notas Técnicas
**Expresión Lógica**: El campo `expresionLogica` es fundamental para la selección automática de formatos. El sistema evalúa esta cadena (usualmente sintaxis SQL o Expression Language interno) para decidir si el formato aplica al documento que se está procesando.

**Campo Vista**: Debe coincidir exactamente con el nombre del recurso de reporte (`.rpt`, `.jasper` o nombre de vista en base de datos) que el motor de reportes espera encontrar.