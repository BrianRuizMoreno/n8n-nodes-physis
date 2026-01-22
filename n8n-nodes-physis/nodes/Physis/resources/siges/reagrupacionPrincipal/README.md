# Recurso Planes de Reagrupación Principal (SIGES)

El recurso **Planes de Reagrupación Principal** administra la **definición** de las clasificaciones analíticas para la contabilidad.

Su función es crear los "contenedores" o dimensiones donde luego se imputarán las cuentas contables. Los ejemplos más comunes configurados aquí son:
1.  **Centros de Costos** (Gastos por sector).
2.  **Cash Flow** (Flujo de fondos financieros).
3.  **Unidades de Negocio**.

Define las reglas estructurales (niveles, longitud del código, formato visual) y propiedades funcionales (si afecta al módulo financiero).

## 📋 Campos Principales

### Cabecera del Plan
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idReagPpal` | Int | Identificador de la Clasificación (ej: 5=Centro de Costos). |
| `nombre` | String | Nombre de la dimensión (ej: "Cash Flow"). |
| `intervieneCashFlow` | Boolean | Indica si esta agrupación se utiliza para reportes de flujo de fondos. |
| `permiteModificarCashFlow` | Boolean | Si se permite editar manualmente los valores en reportes financieros. |

### Niveles (Estructura)
Define la máscara de los códigos que tendrá esta reagrupación.
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idNivelReagPpal` | Int | Número de nivel jerárquico. |
| `tamanio` | Int | Cantidad de caracteres para este nivel. |

---

## 🛠 Operaciones Disponibles

### Consultas de Definición
* **Listar Planes** (`getTree`): Devuelve todos los planes de reagrupación principal configurados (ej: Centros de Costo, Cash Flow, Presupuesto).
* **Obtener Definición** (`get`): Recupera la configuración técnica de un plan específico.
* **Consultar Tamaño Total** (`getTotalSize`): Devuelve la longitud total de la cadena de código configurada para esta dimensión.

### Gestión (Configuración)
* **Crear** (`create`): Define una nueva dimensión analítica.
    * *Param*: `planReagPpaChashFlow` (Boolean) para marcarlo específicamente como flujo de fondos.
* **Modificar** (`update`): Actualiza nombres o propiedades de la estructura.
* **Eliminar** (`delete`): Borra una definición de plan (solo si no tiene cuentas o movimientos asociados).

---

## 💡 Ejemplos de Uso

### 1. Ver Dimensiones Disponibles
Consultar qué tipos de análisis contables están configurados en la empresa.

**Recurso**: `PlanesReagrupacionPpal` 

**Operación**: `Listar Planes`

**Respuesta**:
```json
[
  { "idReagPpal": 2, "nombre": "Cash Flow" },
  { "idReagPpal": 5, "nombre": "Centro de Costos" }
]
```

### 2. Crear Estructura de "Proyectos"
Definir una nueva dimensión para imputar gastos por proyecto.

**Recurso**: PlanesReagrupacionPpal 

**Operación**: Crear

**JSON Body**:

```json
{
  "idReagPpal": 10,
  "nombre": "Proyectos de Inversión",
  "intervieneCashFlow": false,
  "nivelesPlanReagPpal": [
    { "idNivelReagPpal": 1, "tamanio": 3, "nombre": "Tipo" },
    { "idNivelReagPpal": 2, "tamanio": 4, "nombre": "Proyecto" }
  ]
}
```

### 3. Consultar Longitud de Código
Validar cuántos caracteres debe tener un código de Centro de Costos (ID 5).

**Recurso**: `PlanesReagrupacionPpal` 

**Operación**: `Consultar Tamaño Total`

**Parámetro**: 

* idReagPpal: `5` Respuesta: `6` (ej: "ADM-01").

---

## ⚠️ Notas Técnicas
* **Distinción**:

    * **PlanesReagrupacionPpal** = `La Definición` (ej: "Existe algo llamado Centro de Costos").

    * **CuentasReagrupacionPpal** = `Los Nodos` (ej: "Administración", "Ventas").

    * **ReagrupacionCuentaPpal** = `La Relación` (ej: "La cuenta 'Sueldos' va a 'Administración'").

* **Typo en API**: Note que el parámetro query para marcar Cash Flow en **POST/PUT** puede aparecer documentado como `planReagPpaChashFlow` (con 'h' extra en Cash). Verifique la implementación exacta.

* **Parámetro Path**: En la operación Obtener Definición, aunque la ruta pueda indicar {`IdReagAuxi`} en algunas documentaciones swagger automáticas, funcionalmente se refiere al `idReagPpal` que se desea consultar.