# Recurso Liquidación (SACH)

El recurso **Liquidación** administra el documento comercial principal del mercado de hacienda (Cuenta de Venta y Líquido Producto). Este recurso permite registrar, consultar y gestionar la "Liquidación" propiamente dicha, la cual detalla los animales negociados, los precios, los gastos aplicados, los plazos de pago y los datos de trazabilidad (partidos/guías).

Este recurso es central en el módulo, ya que vincula la operación física (cabezas/kilos) con la financiera (importes/vencimientos) y fiscal (retenciones/IVA).

## 📋 Campos Principales (Schema)

La creación de una liquidación es una operación compleja que requiere un objeto JSON anidado con los detalles del negocio.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idLiquidacion` | Int | Identificador único (0 para crear nueva). | Sí |
| `codigoOperacion` | String | Código interno de la operación. | No |
| `idTipoOperacion` | String | Tipo de operación (ej: "REM" para Remate). | Sí |
| `idTipoHacienda` | String | Tipo de hacienda (ej: "INV"). | Sí |
| `idLugar` | String | Lugar físico donde ocurre la operación. | Sí |
| `idFormularioOperacion` | String | Tipo de formulario legal (ej: "A", "B"). | No |
| `categorias` | Array | **Detalle de la hacienda**: Especie, Categoría, Kilos, Precios. | Sí |
| `partidos` | Array | **Trazabilidad**: Datos de DTE, Guías y ubicación física. | No |
| `plazos` | Array | **Condiciones de Pago**: Días libres, tasas de interés y vencimientos. | Sí |
| `gasto` | String | Perfil de gastos aplicado (opcional). | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Liquidaciones** (`getAll`): Devuelve el listado general de liquidaciones registradas.
* **Obtener por ID** (`get`): Recupera el detalle completo (cabecera + ítems) de una liquidación específica.
* **Árbol de Liquidaciones** (`getArbol`): Devuelve una estructura jerárquica de liquidaciones, útil para visualizadores tipo *Tree View*.
* **Listar Comprobantes** (`getComprobantes`): Obtiene comprobantes asociados a un ejercicio fiscal específico.
* **Ver Comisiones** (`getComisiones`): Detalla las comisiones generadas por una liquidación particular.

### ABM (Escritura)
* **Crear** (`create`): Registra una nueva liquidación en el sistema.
    * *Nota*: Requiere enviar la estructura completa de `categorias` y `plazos`.
* **Actualizar** (`update`): Modifica los datos de una liquidación existente.
* **Eliminar** (`delete`): Borra una liquidación (si el estado lo permite).

---

## 💡 Ejemplos de JSON

### 1. Estructura Básica para Crear (Simplificada)
Ejemplo de cómo se estructura el JSON para dar de alta una liquidación de venta con un ítem de hacienda.

**Recurso**: `Liquidación`

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idLiquidacion": 0,
  "idTipoOperacion": "REM",
  "idTipoHacienda": "INV",
  "idLugar": "RURAL",
  "idUsuario": 1,
  "categorias": [
    {
      "idEspecie": 1,
      "idCategoria": 5,
      "categoria": {
        "descripcion": "Novillitos",
        "cria": false
      },
      "especie": {
        "descripcion": "Bovinos"
      }
    }
  ],
  "plazos": [
    {
      "plazo": {
        "descripcion": "30 y 60 días",
        "dias": [
          { "dias": 30, "porcentaje": 50 },
          { "dias": 60, "porcentaje": 50 }
        ]
      }
    }
  ]
}
```
### 2. Consultar Comisiones de una Liquidación
Verificar las comisiones calculadas para el comprobante ID 10050 del ejercicio 2025.

**Recurso**: ``Liquidación`` 

**Operación**: ``Ver Comisiones``

**Parámetros**:

* idEjercicio: ``2025``

* idComprobante: ``10050``

---

## ⚠️ Notas Técnicas
* **Complejidad del Objeto**: A diferencia de maestros simples, la Liquidación es un documento transaccional complejo. El array ``categorias`` es crítico, ya que define qué se vendió. El array ``plazos`` define cómo se paga.

* **Validaciones**: Al crear (``POST``), el sistema validará que la ``Especie`` y ``Categoría`` sean consistentes, y que los porcentajes en ``plazos`` sumen el 100% (o cumplan la lógica de negocio del plazo seleccionado).

* **Campos Relacionales**: Los campos como ``categoria``, ``especie`` y ``plazo`` dentro de los arrays suelen requerir al menos el ID para vincularse, aunque el esquema completo permite enviar descripciones para la generación del documento impreso.