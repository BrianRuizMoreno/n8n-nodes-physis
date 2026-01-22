# Módulo SILAB (Agricultura y Laboratorio)

El módulo **SILAB** administra la gestión técnica y productiva de la empresa agropecuaria. A diferencia de SAVEC (focalizado en la venta), SILAB se centra en **la tierra, el cultivo y las labores**.

Gestiona desde la definición de la estructura productiva (Campos y Lotes) y la planificación de campañas, hasta la ejecución de órdenes de trabajo, consumo de insumos y registro de lluvias o producción lechera (Tambo).

Este módulo es el backend fundamental para aplicaciones de **Agricultura de Precisión**, **Apps de Operarios** y **Tableros de Gestión Agronómica**.

---

## 🚜 1. Planificación y Ejecución de Labores
El núcleo transaccional del sistema. Gestión de las tareas que se realizan en el campo.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Órdenes y Partes** | **(Core)** Gestión del ciclo de trabajo completo: Planificación (**Orden**) y Reporte de ejecución (**Parte**). Vincula lotes, insumos y personal. | [Ver detalle](./ordenesPartes/README.md) |
| **Actividades** | Maestro de tareas genéricas (ej: "Siembra", "Cosecha"). Nivel macro de agrupación. | [Ver detalle](./actividades/README.md) |
| **Labores** | Definición específica de tareas (ej: "Siembra de Maíz 1ra"). Define la "receta" agronómica. | [Ver detalle](./labores/README.md) |
| **Insumos** | Catálogo de productos consumibles (Semillas, Agroquímicos). Consulta de **Stock** y costos en tiempo real. | [Ver detalle](./insumos/README.md) |

## 🌍 2. Estructura Productiva
Definición de la tierra y el tiempo.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Campañas** | Dimensión temporal principal (ej: "25-26"). Agrupa toda la producción de un ciclo. | [Ver detalle](./campanias/README.md) |
| **Campos** | Maestro de establecimientos físicos o estancias. | [Ver detalle](./campos/README.md) |
| **Lotes** | Unidad mínima de producción. Gestión de hectáreas y asignación de cultivos. Soporta estructuras de árbol. | [Ver detalle](./lotes/README.md) |

## 🛠 3. Recursos y Maquinaria
Gestión de los activos y recursos humanos necesarios para la producción.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Personal** | Maestro de empleados y operarios. Asignación de tareas y control de horas. | [Ver detalle](./personal/README.md) |
| **Implementos** | Parque de herramientas de arrastre y maquinarias generales (Sembradoras, Cosechadoras). | [Ver detalle](./implementos/README.md) |
| **Tractores** | Vista específica de unidades tractoras/propulsoras para asignación de tracción. | [Ver detalle](./tractores/README.md) |

## 🥛 4. Producción Pecuaria (Tambo)
Módulo específico para la gestión de lechería.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Tambo** | Gestión de establecimientos lecheros, rodeos y consulta de **Producción de Leche** (Diaria e Individual). | [Ver detalle](./tambo/README.md) |

## ⚙️ 5. Configuraciones y Maestros
Definiciones estructurales y utilidades técnicas.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Tipos** | Configuración de **Tipos de Parte** (Operativo/App) y **Tipos de Formulario** (Contable/Imputación). | [Ver detalle](./tipos/README.md) |
| **Numerador** | Gestión de secuencias de numeración para los documentos y partes de trabajo. | [Ver detalle](./numerador/README.md) |
| **Dominio** | Listas de valores estáticos y máscaras de configuración para validaciones de UI. | [Ver detalle](./dominio/README.md) |
| **Varios** | Utilidades: Maestro de **Cereales** (Cultivos) y Tablas de **Intercambio** (Mapeo de IDs externos). | [Ver detalle](./varios/README.md) |

---

### ¿Por dónde empezar?

* **Si estás desarrollando una App para Operarios (Offline/Online):**
    * Comienza por **[Tipos](./tipos/README.md)** (para saber qué formularios mostrar) y **[Personal](./personal/README.md)** (Login).
    * Sincroniza **[Órdenes y Partes](./ordenesPartes/README.md)** filtrando por el operario.
    * Descarga los maestros de **[Lotes](./lotes/README.md)**, **[Labores](./labores/README.md)** e **[Insumos](./insumos/README.md)** (usando parámetros `reducido=true`).

* **Si estás integrando un Tablero de Gestión Agronómica:**
    * Inicia consultando **[Campañas](./campanias/README.md)** para establecer el contexto.
    * Analiza la estructura de **[Lotes](./lotes/README.md)**.
    * Consume **[Insumos](./insumos/README.md)** para reportes de stock y costos.

* **Si integras maquinaria o monitores de rendimiento:**
    * Utiliza **[Varios (Intercambio)](./varios/README.md)** para mapear los IDs de tu sistema con los de Physis.
    * Reporta lo ejecutado mediante **[Órdenes y Partes](./ordenesPartes/README.md)**.