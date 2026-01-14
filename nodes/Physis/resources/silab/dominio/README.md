# Recurso Dominio (SILAB)

El recurso **Dominio** es un endpoint de configuración técnica utilizado principalmente para alimentar interfaces de usuario (Combos, Selectores) y obtener máscaras de formato.

Agrupa configuraciones estáticas o paramétricas del sistema SILAB que no varían frecuentemente pero son necesarias para validar datos o formatear entradas en la aplicación.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idDominio` | Int | Identificador numérico (Valores fijos: 1 al 6). |
| `mascara` | String | Formato visual o regla de validación asociada. |
| `descripcion` | String | Nombre o etiqueta del grupo de datos. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve la lista completa de dominios configurados.
* **Obtener por ID** (`get`): Recupera la configuración específica de un dominio (ej: Reglas de formato para un tipo de dato).

---

## 💡 Ejemplos de Uso

### 1. Cargar Combos de Configuración
Al iniciar una App Móvil, consultar los dominios para saber qué opciones mostrar en ciertos selectores técnicos.

**Recurso**: `Dominio` 

**Operación**: `Listar Todos`

### 2. Consultar Configuración Específica
Obtener las reglas del Dominio 1.

**Recurso**: `Dominio`  

**Operación**: `Obtener por ID`

**Parámetro ID**: `1`

---

## ⚠️ Notas Técnicas

* **Valores Fijos**: Los IDs de dominio están predefinidos en el sistema (1 al 6) y corresponden a estructuras internas de Physis. No es un recurso donde se puedan crear nuevos dominios (Solo Lectura).