# Recurso Variedades (SACER)

El recurso **Variedades** permite la clasificación específica de los granos dentro de un cultivo o cereal. Es fundamental para la gestión agronómica y de acopio, permitiendo identificar la genética de la semilla (ej. "Don Mario", "Nidera", "Baguette") y asociar datos productivos como el rendimiento esperado.

## 📋 Estructura de Datos (Schema)

### 1. Objeto Variedad
Define la genética o subtipo de un cereal.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codigo` | Int | **0** para crear nueva. ID para editar o consultar. |
| `descripcion`* | String | Nombre comercial o técnico de la variedad (ej: "DM 46i20"). |
| `codCereal`* | Int | ID del Cereal al que pertenece (ej: 1 para Soja, 2 para Maíz). |
| `rindePotencial` | Int/Float | Rendimiento esperado (kg/ha) para estimaciones productivas. |
| `observaciones` | String | Notas adicionales sobre características o manejo. |

---

## 🛠 Operaciones Disponibles

### 🔍 Consultas
* **Obtener Detalle** (`getVariedad`): Devuelve la información de una variedad específica buscando por su código.

### ⚙️ Gestión
* **Crear** (`createVariedad`): Registra una nueva variedad asociada a un cereal.
* **Modificar** (`updateVariedad`): Actualiza datos como la descripción o el rinde potencial.
* **Eliminar** (`deleteVariedad`): Da de baja una variedad del sistema.

---

## 💡 Ejemplos de Uso

### 1. Registrar Nueva Variedad de Soja
Alta de una variedad "Intacta" para el cereal Soja (Código 1).

**Recurso**: `Variedades`

**Operación**: `Crear`

**JSON Body**:
```json
{
  "codigo": 0,
  "descripcion": "Soja DM 40R16 IPRO",
  "codCereal": 1,
  "rindePotencial": 4500,
  "observaciones": "Ciclo corto, alta resistencia a vuelco."
}
```
### 2. Actualizar Rinde Potencial
Corregir la estimación de rinde para la variedad ID 105.

**Recurso**: ``Variedades``

**Operación**: ``Modificar``

**JSON Body**:

```json
{
  "codigo": 105,
  "descripcion": "Trigo Baguette 620",
  "codCereal": 3,
  "rindePotencial": 6000,
  "observaciones": "Ajuste post-campaña."
}
```
### 3. Consultar una Variedad
Obtener los datos técnicos de la variedad código 22.

**Recurso**: ``Variedades``

**Operación**: ``Obtener Detalle``

**Parámetros**:

* codVariedad: ``22``

---

## ⚠️ Notas Técnicas
**Relación con Cereal**: Es obligatorio indicar un ``codCereal`` válido existente en el maestro de Cereales. La variedad no puede existir de forma aislada.

**Identificadores**:

* Para Consultas (``GET``), el parámetro se denomina ``codVariedad``.

* Para Eliminación (``DELETE``), el parámetro se denomina ``idvariedades``.

* En el Body (``POST``/``PUT``), el campo identificador es ``codigo``.