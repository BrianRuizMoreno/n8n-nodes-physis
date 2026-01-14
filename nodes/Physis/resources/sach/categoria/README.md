# Recurso Categoría (SACH)

El recurso **Categoría** administra la clasificación de la hacienda dentro de cada especie. Define los tipos de animales que se comercializan o producen (ej: "Novillo", "Ternero", "Vaca Conserva") y sus atributos regulatorios.

Estas categorías son fundamentales para:
* **Clasificación Comercial**: Definir qué se está vendiendo en los remates.
* **Reportes Oficiales**: Mapeo con códigos de organismos como AFIP (DGI/SISA) o ONCCA.
* **Gestión Productiva**: Distinguir si es categoría de cría, invernada, etc.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCategoria` | Int | Código identificador (0 para crear nueva). | Sí |
| `idEspecie`* | Int | Código de la especie a la que pertenece (ej: 1-Bovinos). | Sí |
| `descripcion` | String | Nombre de la categoría (ej: "Novillo Pesado"). | Sí |
| `sigla` | String | Abreviatura para planillas. | No |
| `cria` | Bool | Indica si es una categoría de cría. | No |
| `categoriaAFIP` | Int | Código de homologación para AFIP. | No |
| `rpInforma` | Bool | Si se informa en el Romaneo de Playa. | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Categorías** (`getAll`): Devuelve el listado plano de categorías.
    * *Filtro opcional*: `IdEspecie` (para ver solo categorías de una especie).
* **Obtener por ID** (`get`): Recupera el detalle de una categoría específica.
    * *Nota*: Requiere `IdCategoria` y `IdEspecie`.
* **Árbol de Categorías** (`getArbol`): Devuelve una estructura jerárquica Especie -> Categorías, ideal para componentes de selección (Tree View).
* **Categorías Mercado** (`getMercado`): Listado específico para el Mercado Ganadero.

### ABM (Escritura)
* **Crear** (`create`): Da de alta una nueva categoría.
* **Actualizar** (`update`): Modifica los datos de una categoría existente.
* **Eliminar** (`delete`): Borra una categoría del sistema.

---

## 💡 Ejemplos de JSON

### 1. Crear Categoría "Novillo Exportación"
Registra una nueva categoría para la especie Bovinos (ID 1).

**Recurso**: `Categoría`  

**Operación**: `Crear`
**JSON Body**:

```json
{
  "idCategoria": 0,
  "idEspecie": 1,
  "descripcion": "Novillo Exportación UE",
  "sigla": "NOV-EX",
  "cria": false,
  "categoriaAFIP": 52,
  "rpInforma": true
}
```

### 2. Listar Categorías de Porcinos
Obtener todas las categorías asociadas a la especie Porcinos (supongamos ID 3).

**Recurso**: ``Categoría`` 

**Operación**: ``Listar Categorías`` 

**Parámetros (Query)**:

* IdEspecie: ``3``

---

## ⚠️ Notas Técnicas
* **Clave Compuesta**: Aunque ``idCategoria`` parece único, funcionalmente la categoría depende siempre de una Especie. Por eso, para operaciones de obtención (``get``) o eliminación (``delete``), es obligatorio enviar también el ``IdEspecie``.

* **Códigos Fiscales**: Los campos ``categoriaAFIP``, ``categoriaDGI`` y sa``gp son críticos para la facturación electrónica y la emisión de Documentos de Tránsito (DTE).