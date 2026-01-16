# Recurso Planes de Cuentas Principal (SIGES)

El recurso **Planes de Cuentas Principal** administra la **estructura y configuración** del Árbol de Cuentas Contables.

Define la "máscara" o formato que deben respetar los códigos de las cuentas contables (ej: `X.XX.XXX.XXXX`), la cantidad de niveles jerárquicos permitidos y las propiedades visuales (fuentes, negritas) para la impresión del Libro Mayor y Balances.

> **Diferencia Clave**:
> * `CuentasPpal`: Gestiona los datos (ej: "1.1.01.01 Caja").
> * `PlanesCuentasPpal`: Gestiona la regla (ej: "Nivel 1 tiene 1 dígito, Nivel 2 tiene 2 dígitos").

## 📋 Campos Principales

### Cabecera del Plan
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idPpal` | Int | Identificador de la estructura del plan (Generalmente `1` para el plan contable oficial). |
| `tamaniototal` | Int | Suma total de caracteres de la máscara completa. |

### Niveles (Configuración Jerárquica)
Lista de objetos que definen cada segmento del código contable.
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idNivelPpal` | Int | Número de nivel (1, 2, 3, 4...). |
| `tamanio` | Int | Cantidad de dígitos que ocupa este nivel. |
| `fontBold` | Boolean | Indica si este nivel se imprime en negrita en los balances. |
| `foreColor` | Int | Color de la fuente para reportes. |

---

## 🛠 Operaciones Disponibles

### Consultas de Estructura
* **Obtener Definición** (`get`): Devuelve la configuración completa de niveles y formatos de un plan.
* **Obtener Estructura** (`getStructure`): Endpoint optimizado para conocer la jerarquía vigente.
* **Consultar Tamaño Total** (`getTotalSize`): Devuelve la longitud total de la cadena de código de cuenta (útil para validaciones de input).

### Gestión (Configuración)
* **Crear / Modificar** (`create`, `update`): Permite definir o alterar la estructura del plan de cuentas.
    * **⚠️ Advertencia**: La documentación de la API marca estos métodos como **DESHABILITADOS** o con firma modificada en versiones recientes (`NetSigesAPI.dll`). Modificar la estructura de un plan contable con datos existentes es una operación crítica que generalmente no se realiza vía API REST.
* **Eliminar** (`delete`): Borra una definición de plan.

---

## 💡 Ejemplos de Uso

### 1. Validar Formato de Cuenta
Antes de crear una cuenta contable nueva, consultar la estructura para saber cuántos dígitos debe tener cada nivel (Validación de Máscara).

**Recurso**: `PlanesCuentasPpal` 

**Operación**: `Obtener Definición`

**Parámetro**: idPpal: `1`

**Respuesta Esperada (Simplificada)**:
```json
{
  "idPpal": 1,
  "niveles": [
    { "idNivelPpal": 1, "tamanio": 1 }, // ej: 1. (Activo)
    { "idNivelPpal": 2, "tamanio": 1 }, // ej: 1.1. (Corriente)
    { "idNivelPpal": 3, "tamanio": 2 }, // ej: 1.1.01. (Caja y Bancos)
    { "idNivelPpal": 4, "tamanio": 3 }  // ej: 1.1.01.001 (Caja Central)
  ]
}
```

### 2. Obtener Estilos para Reporte Externo
Un sistema de BI necesita replicar el formato visual del Balance de Sumas y Saldos.

**Recurso**: `PlanesCuentasPpal` 

**Operación**: `Obtener Definición`

(Se utilizan los campos `fontBold`, `fontSize`, `backColor` para renderizar el reporte).

---

## ⚠️ Notas Técnicas
* **Operación Restringida**: Debido al impacto crítico que tiene cambiar la máscara de cuentas en un sistema ERP en marcha, las operaciones de escritura (**POST**, **PUT**, **DELETE**) suelen estar restringidas, deshabilitadas o requieren permisos de "`Súper Usuario`" a nivel de base de datos.

* **Uso Principal**: Este recurso es fundamentalmente de Lectura para integraciones, permitiendo que sistemas externos validen correctamente los formatos de las cuentas contables antes de enviarlas al recurso `CuentasPpal`.