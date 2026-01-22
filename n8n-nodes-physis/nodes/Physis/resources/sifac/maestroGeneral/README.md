# Maestros Generales (SIFAC)

Este módulo agrupa recursos transversales del sistema SIFAC que sirven como base para la operatividad de los demás módulos. Incluye herramientas de búsqueda rápida de comprobantes (**Cabeceras**), la estructura del plan de cuentas para imputaciones (**Contables**) y las tablas de referencia del sistema (**Dominios**).

Son recursos mayoritariamente de consulta y referencia, esenciales para la navegación, reportes y configuración contable.

---

## 📑 1. Recurso Cabeceras
**Búsqueda rápida y listados de comprobantes.**

A diferencia del recurso `Comprobantes` (que maneja la transacción completa con ítems e impuestos), **Cabeceras** proporciona una vista optimizada y ligera. Es ideal para alimentar grillas de historial, reportes de control o dashboards donde solo se requieren los datos principales (Fecha, Número, Tercero, Importe) sin la carga pesada del detalle.

### 📋 Parámetros de Búsqueda
La operación principal es una consulta GET con múltiples filtros opcionales.

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| `subSistema` | String | Filtro por módulo (ej: "V" = Ventas). |
| `fechaDesde` | Date | Inicio del rango de fechas de emisión. |
| `fechaHasta` | Date | Fin del rango de fechas de emisión. |
| `tiposComprobante` | String | Códigos a buscar separados por coma (ej: "FAC,ND,NC"). |
| `distribuidores` | Bool | Filtra comprobantes asociados a distribuidores. |
| `topReg` | String | Límite de registros a devolver (Paginación/Top). |

### 🛠 Operación Disponible
* **Búsqueda de Cabeceras** (`getCabeceras`): Devuelve una lista plana de documentos según los filtros.

---

## 🌳 2. Recurso Contables
**Árbol de imputaciones y cuentas.**

El recurso **Contables** administra la estructura jerárquica de cuentas contables asignables a clientes y comprobantes. En SIFAC, estas entidades funcionan como "Reagrupaciones Auxiliares".

Permite navegar el árbol para seleccionar la cuenta correcta (ej: "Deudores por Venta", "Deudores Varios") al momento de configurar un cliente o realizar una imputación manual.

### 🛠 Operación Disponible
* **Árbol Contable** (`getArbol`): Devuelve las cuentas organizadas jerárquicamente (Carpeta -> Cuenta).
    * **Filtros Clave**:
        * `imputables`: `true` (Hojas seleccionables).
        * `noImputables`: `true` (Carpetas agrupadoras).
        * `cuentaPadre`: Permite obtener solo una rama específica del árbol.

---

## 📚 3. Recurso Dominios
**Tablas maestras y enumeradores del sistema.**

El recurso **Dominios** expone las tablas de referencia internas (Enums). Gestiona valores constantes que definen comportamientos o clasificaciones estándar, como los Estados de un comprobante o los códigos para regímenes de información (PLA - Prevención de Lavado de Activos).

### 🛠 Operaciones Disponibles
* **Listar Todos** (`getAll`): Devuelve el catálogo completo de dominios.
* **Obtener por ID** (`get`): Recupera los valores de un dominio específico.
* **Dominios PLA** (`getDominiosPla`): Consulta específica para obtener códigos relacionados con Prevención de Lavado de Activos (Ids 2, 5, 8) filtrados por tipos de recibos y remitos (`RECP`, `REMP`, etc.).

---

## 💡 Ejemplos de Uso

### 1. Listar Facturas del Mes (Cabeceras)
Obtener todas las Facturas ("FAC") y Notas de Débito ("ND") de Enero 2026.

**Recurso**: `Cabeceras` 

**Operación**: `Búsqueda`

**Parámetros (Query)**:
* fechaDesde: `2026-01-01T00:00:00`
* fechaHasta: `2026-01-31T23:59:59`
* tiposComprobante: `FAC,ND`
* orden: `2` (Por Fecha)

### 2. Poblar Selector de Cuentas (Contables)
Obtener todas las cuentas contables válidas (imputables) para asignar a un nuevo cliente.

**Recurso**: `Contables` 

**Operación**: `Árbol Contable`

**Parámetros (Query)**:
* imputables: `true`
* noImputables: `false`

### 3. Consultar Códigos PLA (Dominios)
Obtener los códigos de referencia para reportes de lavado de activos.

**Recurso**: `Dominios` 

**Operación**: `Dominios PLA`

---

## ⚠️ Notas Técnicas

* **Performance (Cabeceras)**: Utilice siempre `getCabeceras` en lugar de `Comprobantes/Consulta` para listados visuales. La respuesta es JSON plano y mucho más rápido.
* **Solo Lectura (Dominios)**: Este recurso es puramente informativo. No existen métodos para crear o modificar dominios vía API, ya que son definiciones estructurales del núcleo ("hardcoded" en la lógica de negocio).
* **Formatos**: El campo `tiposComprobante` en Cabeceras espera los códigos internos sin espacios (ej: `FAC,REM`).