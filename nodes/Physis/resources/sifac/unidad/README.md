# Recurso Unidades (SIFAC)

El recurso **Unidades** administra la tabla maestra de **Unidades de Medida** (UM).

Define los códigos que se asignan a los productos para cuantificar su stock y comercialización (ej: Kilogramos, Metros, Unidades). Además, gestiona la **homologación fiscal** (Códigos AFIP y ARBA), un requisito obligatorio para validar facturas electrónicas y generar libros de IVA digitales.

## 📋 Campos Principales (Schema)

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idUnidad` | String | Código interno (ej: "KG", "UNI"). | Sí |
| `descripcion` | String | Nombre completo (ej: "Kilogramos"). | Sí |
| `codigoAFIP` | String | Código numérico oficial de AFIP (ej: "1" para Kg). | Sí |
| `codigoARBA` | String | Código para la agencia tributaria de Bs. As. | No |

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Da de alta una nueva unidad de medida.
* **Modificar** (`update`): Actualiza descripción o códigos fiscales.
    * *Nota*: Requiere el parámetro `idUnidadAnterior` si se está cambiando el código primario.
* **Obtener por ID** (`get`): Recupera el detalle de una unidad.
* **Eliminar** (`delete`): Borra una unidad (si no está usada en productos).

### Consultas
* **Listar Todas** (`getAll`): Devuelve el catálogo completo.
    * *Filtro*: `mostrarDadosBaja` (Permite ver unidades históricas inhabilitadas).

---

## 💡 Ejemplos de Uso

### 1. Consultar Unidades Disponibles
Obtener el listado de todas las unidades activas para llenar un combo de "Alta de Producto".

**Recurso**: `Unidades` 

**Operación**: `Listar Todas`

**Parámetros (Query)**:

* mostrarDadosBaja: `false`

### 2. Crear Unidad "Litros"
Registrar la unidad Litros, vinculándola con el código AFIP "02".

**Recurso**: `Unidades` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idUnidad": "LTS",
  "descripcion": "Litros",
  "codigoAFIP": "02",
  "codigoARBA": "03"
}
```

---

## ⚠️ Notas Técnicas
* **Importancia Fiscal**: El campo ``codigoAFIP`` es crítico. Si un producto tiene una unidad asignada sin este código (o con uno incorrecto), la emisión de la Factura Electrónica fallará en el webservice de AFIP.

* **Uso en Productos**: El valor de ``idUnidad`` es el que se debe asignar en el campo ``idUM`` al crear o modificar un Producto.

* **Clave Primaria Mutable**: El endpoint **PUT** permite cambiar el código de la unidad (ej: corregir "KGS" a "KG"). Para esto, se debe enviar el código viejo en el query param ``idUnidadAnterior`` y el nuevo en el body JSON.