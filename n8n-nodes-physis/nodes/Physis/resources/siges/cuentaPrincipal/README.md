# Recurso Cuentas Principales (SIGES)

El recurso **Cuentas Principales** administra el **Plan de Cuentas Contable** (Libro Mayor) de la empresa.

En la arquitectura de Physis/SIGES, una "Cuenta Principal" es la entidad contable pura (ej: "Deudores por Venta", "Caja", "Ventas de Hacienda"), la cual puede o no estar vinculada a auxiliares (Terceros) para un desglose detallado.

Este recurso permite definir la estructura jerárquica, las reglas de imputación y las configuraciones impositivas o monetarias de cada cuenta.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idCtaPpal` | String | Código contable jerárquico (ej: `1.1.01.001`). |
| `nombre` | String | Descripción o nombre de la cuenta. |
| `imputable` | Boolean | Indica si recibe asientos (`true`) o es un rubro agrupador (`false`). |
| `idAuxi` | Int | (Opcional) Vincula la cuenta a un Plan Auxiliar específico (ej: Solo acepta Clientes). |
| `idMoneda` | String | Moneda de la cuenta (ej: `1`=Pesos, `2`=Dólares). |
| `ajusta` | Boolean | Indica si la cuenta es monetaria o no monetaria (Ajuste por Inflación). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Devuelve el plan de cuentas completo.
* **Obtener por ID** (`get`): Recupera la configuración de una cuenta específica.
* **Vista Árbol** (`getTree`): Estructura optimizada para mostrar la jerarquía en selectores.
* **Búsqueda Avanzada** (`search`): Endpoint potente para filtrar cuentas por criterios combinados (Vigencia, Moneda, Relación con Terceros).
* **Obtener Siguiente ID** (`getNextId`): Utilidad para sugerir automáticamente el próximo código disponible al crear una sub-cuenta.

### Gestión (ABM)
* **Crear** (`create`): Alta de nuevas cuentas contables. Permite configurar si son imputables y su nivel.
* **Actualizar** (`update`): Modificación de nombre, configuraciones fiscales o comportamiento.
* **Eliminar** (`delete`): Baja de cuentas. El sistema valida estrictamente que no existan asientos contables imputados antes de permitir el borrado.

---

## 💡 Ejemplos de Uso

### 1. Obtener Cuentas de "Caja y Bancos"
Listar todas las cuentas disponibles bajo el rubro de disponibilidades (supongamos rubro 1.1.01).

**Recurso**: `Cuentas Principales` 

**Operación**: `Buscar (Avanzado)`

**JSON Body**:
```json
{
  "criterio": "1.1.01%", // Búsqueda por patrón de código
  "imputable": true      // Solo cuentas que reciben movimientos
}
```

### 2. Crear una Nueva Cuenta de Gasto
Dar de alta "Gastos de Librería" bajo el rubro "Gastos Administrativos" (4.1.05).

* **Paso 1**: Obtener el próximo ID libre. 

**Recurso**: `Cuentas Principales` 

**Operación**: `Obtener Siguiente ID` 

**Parámetro ID**: `4.1.05` -> Retorna `4.1.05.020` (ejemplo).

* **Paso 2**: Crear la cuenta. 

**Recurso**: `Cuentas Principales` 

**Operación**: `Crear Cuenta` 

**JSON Body**:

```json
{
  "idCtaPpal": "4.1.05.020",
  "nombre": "Gastos de Librería",
  "imputable": true,
  "ajusta": true
}
```

---

## ⚠️ Notas Técnicas
* **Jerarquía**: El `idCtaPpal` no es solo un identificador, contiene la estructura del árbol. Crear una cuenta con código `1.1.01` implica que es hija de `1.1` y nieta de `1`. El sistema valida que los padres existan.

* **Vinculación** con Auxiliares: El campo `idAuxi` es crítico. Si una cuenta principal (ej: "Proveedores Varios") tiene `idAuxi=200`, el sistema obligará a que cada movimiento en esa cuenta identifique también a un tercero del grupo "`Proveedores`".