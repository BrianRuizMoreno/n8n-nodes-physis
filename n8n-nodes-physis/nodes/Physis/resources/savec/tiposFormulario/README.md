# Recurso Tipo de Formulario (SAVEC)

El recurso **Tipo de Formulario** administra las configuraciones de los distintos documentos o comprobantes que se utilizan en el sistema. Su función principal es definir el comportamiento administrativo y contable de cada formulario, estableciendo validaciones de carga y cuentas por defecto.

Permite configurar si un comprobante requiere obligatoriamente una cuenta contable principal, si debe imputarse a un tercero (auxiliar) o si los movimientos generados deben agruparse en el asiento contable.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idTipoFormulario` | Int | Código identificador (0 para crear uno nuevo). | Sí |
| `descripcion` | String | Nombre descriptivo del formulario. | Sí |
| `nroCuentaPrincipal`| String | Cuenta contable principal por defecto. | No |
| `idCuentaAuxiliar` | String | Cuenta auxiliar (rubro de terceros) por defecto. | No |
| `obligaCtaPpal` | Bool | Si `true`, exige ingresar cuenta contable al cargar. | No |
| `obligaIdAux` | Bool | Si `true`, exige seleccionar un tercero. | No |
| `agruparCuentas` | Bool | Si `true`, agrupa renglones iguales en el asiento. | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve el catálogo completo de tipos de formulario configurados.
* **Obtener por ID** (`get`): Recupera la configuración detallada de un tipo de formulario específico.

### ABM (Escritura)
* **Crear** (`create`): Da de alta un nuevo tipo de formulario en el sistema.
* **Actualizar** (`update`): Modifica las reglas de negocio de un formulario existente.
* **Eliminar** (`delete`): Borra una configuración (siempre que no existan comprobantes emitidos con este tipo).

---

## 💡 Ejemplos de JSON

### 1. Crear Tipo "Gasto General"
Configura un formulario para gastos varios, donde es obligatorio imputar la cuenta de pérdida y el proveedor.

**Recurso**: `Tipo Formulario` > **Operación**: `Crear`
**JSON Body**:
```json
{
  "idTipoFormulario": 0,
  "descripcion": "Gasto General Administrativo",
  "nroCuentaPrincipal": "5.1.01.001",
  "obligaCtaPpal": true,
  "obligaIdAux": true,
  "agruparCuentas": false
}
```

### 2. Actualizar Configuración
Habilita la agrupación de cuentas para el formulario con ID 20.

**Recurso**: ``Tipo Formulario`` 

**Operación**: ``Actualizar`` 

**JSON Body**:

```json
{
  "idTipoFormulario": 20,
  "descripcion": "Pago Proveedores (Agrupado)",
  "agruparCuentas": true
}
```

---

## ⚠️ Notas Técnicas
* **Validaciones de Frontend**: Los flags ``obligaCtaPpal`` y ``obligaIdAux`` son utilizados principalmente por las interfaces de usuario (o validaciones de API de alto nivel) para bloquear la carga de comprobantes incompletos.

* **Agrupación Contable**: El campo ``agruparCuentas`` impacta en la generación del asiento contable. Si está activo, múltiples líneas del comprobante que apunten a la misma cuenta contable se resumirán en una sola línea en el libro diario.

* **Identificadores**: Para la creación, siempre se debe enviar ``idTipoFormulario: 0``. En la actualización, este campo debe coincidir con el ID del recurso que se desea modificar.