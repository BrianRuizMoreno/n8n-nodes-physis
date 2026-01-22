# Recurso Personal (SILAB)

El recurso **Personal** administra el maestro de empleados, operarios y técnicos habilitados para realizar tareas en el módulo agrícola.

Este catálogo es esencial para la asignación de recursos humanos en las **Órdenes de Trabajo**. Permite identificar quién ejecutó una labor, calculando horas trabajadas y eficiencias por operario.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `IdPersonal` | Int | Identificador numérico único del empleado. |
| `Nombre` | String | Nombre completo o razón social (si es contratista). |
| `Legajo` | String | (Opcional) Código interno de recursos humanos. |

---

## 🛠 Operaciones Disponibles

### Consultas Generales
* **Listar Personal** (`getAll`): Devuelve la lista completa de operarios y empleados activos.
* **Obtener por ID** (`get`): Recupera la ficha de un empleado específico.

### Consultas por Capacidad (Labor)
* **Personal por Labor** (`getByLabor`): Devuelve la lista de empleados habilitados o capacitados para realizar una tarea específica.
    * *Uso*: Fundamental para filtrar selectores en la creación de órdenes. Por ejemplo, si la labor es "Pulverización", solo debería mostrar operarios con licencia para aplicar agroquímicos.

---

## 💡 Ejemplos de Uso

### 1. Listar Operarios para Asignación
Obtener la nómina completa para cargar en el selector de "Maquinista" de una App.

**Recurso**: `Personal` 

**Operación**: `Listar Personal`

**Respuesta Esperada (Ejemplo)**:
```json
[
  { "IdPersonal": 201, "Nombre": "Perez, Juan" },
  { "IdPersonal": 205, "Nombre": "Gomez, Maria" }
]
```

### 2. Buscar Operarios para Cosecha
Encontrar qué empleados están calificados para la labor de Cosecha (ID 100).

**Recurso**: ``Personal`` 

**Operación**: ``Personal por Labor``

**Parámetros (Path)**:

* IdLabor: ``100``

---

## ⚠️ Notas Técnicas
* **Relación con Órdenes de Trabajo**: El ``IdPersonal`` se utiliza dentro del array personal en los ítems del recurso ``OrdenesPartes``.

* **Roles**: Dependiendo de la configuración de Physis, este maestro puede incluir tanto personal propio (en relación de dependencia) como contratistas externos que prestan servicios de labor.