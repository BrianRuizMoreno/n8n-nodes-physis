# Recurso Planes de Cuentas Auxiliares (SIGES)

El recurso **Planes de Cuentas Auxiliares** administra la definición de los **Rubros de Terceros** en el sistema.

Mientras que el recurso *Cuentas Auxiliares* gestiona los datos de "Juan Perez" o "Banco Nación", este recurso define la **estructura** que los agrupa. Por ejemplo, define que existe un Plan "Clientes" (ID 100) cuyos códigos tienen 4 dígitos, o un Plan "Proveedores" (ID 200) con códigos alfanuméricos.

Su función principal es configurar la máscara, la longitud de los códigos y las reglas de negocio para cada tipo de entidad.

## 📋 Campos Principales

### Cabecera del Plan
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idAuxi` | Int | Identificador del Plan o Rubro (ej: `100`=Clientes, `200`=Proveedores). |
| `nombre` | String | Nombre del plan (ej: "Clientes Varios"). |
| `sigla` | String | Abreviatura utilizada en reportes (ej: "CLI"). |
| `permiteImputacionContable` | Boolean | Indica si las cuentas de este plan pueden usarse en asientos. |
| `compartido` | Boolean | Si el plan es visible para todas las empresas del grupo (Multiempresa). |

### Niveles (Estructura)
Define la máscara de entrada para los códigos de las cuentas dentro de este plan.
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idNivelAuxi` | Int | Número de nivel jerárquico. |
| `tamanio` | Int | Cantidad de caracteres permitidos para este nivel. |

---

## 🛠 Operaciones Disponibles

### Consultas de Definición
* **Listar Todos** (`getAll`): Devuelve todos los planes auxiliares configurados en la empresa.
* **Obtener por ID** (`get`): Recupera la configuración completa de un plan específico.
* **Obtener Niveles** (`getLevels`): Devuelve el detalle de la jerarquía y tamaños definidos para un plan.
* **Consultar Tamaño Total** (`getTotalSize`): Devuelve la longitud total de la cadena de código para validaciones de input en el frontend.
* **Selectores y Combos** (`getCombo`, `getGeneralCombo`): Endpoints optimizados para llenar listas desplegables en interfaces de usuario (mezclando Planes, Cuentas y Reagrupaciones).

### Gestión (Configuración)
* **Crear** (`create`): Alta de un nuevo rubro de terceros (ej: Crear un plan para "Vendedores").
* **Modificar** (`update`): Cambiar el nombre o propiedades de un plan existente.
* **Eliminar** (`delete`): Borra un plan auxiliar (solo si no tiene cuentas asociadas).

---

## 💡 Ejemplos de Uso

### 1. Cargar Combo de Tipos de Tercero
En una pantalla de reportes, llenar un selector para que el usuario elija entre "Clientes", "Proveedores" o "Bancos".

**Recurso**: `PlanesCuentasAuxi` 

**Operación**: `Listar Todos` (o `Selectores/Combo`)

### 2. Validar Input de Código
Antes de permitir al usuario crear un nuevo Cliente (Plan 100), consultar cuántos caracteres debe tener el código.

**Recurso**: `PlanesCuentasAuxi` 

**Operación**: `Consultar Tamaño Total`

**Parámetro**: idAuxi: `100`

**Respuesta**: `6` (El frontend debe limitar el input a 6 caracteres).

### 3. Crear Plan para "Empleados"
Configurar un nuevo rubro para gestionar cuentas corrientes de personal.

**Recurso**: `PlanesCuentasAuxi` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idAuxi": 300,
  "nombre": "Personal y Empleados",
  "sigla": "EMP",
  "permiteImputacionContable": true,
  "nivelesCuentasAuxi": [
    { "idNivelAuxi": 1, "tamanio": 4 } // Códigos de 4 dígitos
  ]
}
```

## ⚠️ Notas Técnicas
* **Distinción Importante**: No confundir este recurso con `CuentasAuxi`.

    * **PlanesCuentasAuxi** = La Clase o Categoría (ej: "Clientes").

    * **CuentasAuxi** = La Instancia o Dato (ej: "Cliente Juan").

* **Integridad**: Eliminar un Plan (**DELETE**) es una operación destructiva que impedirá el acceso a todas las cuentas y movimientos asociados a ese rubro. El sistema suele bloquear esto si ya existen datos.