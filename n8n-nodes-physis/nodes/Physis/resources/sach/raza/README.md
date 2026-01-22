# Recurso Raza (SACH)

El recurso **Raza** administra la clasificación zootécnica de los animales dentro de cada especie (ej: "Aberdeen Angus", "Hereford" dentro de Bovinos).

Esta clasificación es importante para:
* **Descripción de la Mercadería**: Detallar qué se está vendiendo en los lotes y remates.
* **Homologación Oficial**: Vincular con los códigos de raza de AFIP requeridos para cierta documentación electrónica.

## 📋 Campos Principales (Schema)

La raza es una entidad dependiente de la **Especie**. Al crear o editar, se deben especificar ambos identificadores.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idRaza` | Int | Código identificador (0 para nueva). | Sí |
| `idEspecie` | Int | Especie a la que pertenece (ej: 1=Bovinos). | Sí |
| `descripcion` | String | Nombre de la raza. | Sí |
| `razaAFIP` | Int | Código oficial de AFIP. | No |
| `idRazaF` | String | Código alfanumérico alternativo. | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Razas** (`getAll`): Devuelve el listado de razas.
    * *Filtro opcional*: `IdEspecie` (para ver solo las de un tipo de animal).
* **Obtener por ID** (`get`): Recupera el detalle de una raza específica.
    * *Nota*: Requiere `IdRaza` y `IdEspecie`.
* **Árbol de Razas** (`getArbol`): Estructura jerárquica Especie -> Razas, ideal para componentes de selección (Tree View).

### ABM (Escritura)
* **Crear** (`create`): Da de alta una nueva raza.
* **Actualizar** (`update`): Modifica los datos de una raza existente.
* **Eliminar** (`delete`): Borra una raza del sistema.
    * *Nota*: Requiere `IdRaza` y `IdEspecie`.

---

## 💡 Ejemplos de JSON

### 1. Crear Raza "Aberdeen Angus"
Registra una nueva raza para la especie Bovinos (ID 1).

**Recurso**: `Raza` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idRaza": 0,
  "idEspecie": 1,
  "descripcion": "Aberdeen Angus",
  "razaAFIP": 10
}
```

### 2. Listar Razas de una Especie
Ver todas las razas configuradas para Equinos (supongamos ID 3).

**Recurso**: ``Raza`` 

**Operación**: ``Listar Razas``

**Parámetros (Query)**:

* IdEspecie: ``3``

---

## ⚠️ Notas Técnicas
* **Clave Compuesta**: La identificación única de una raza requiere siempre el par ``IdRaza`` + ``IdEspecie``. No es posible obtener o eliminar una raza enviando solo su ID numérico, ya que el ID 1 podría existir tanto para Bovinos como para Porcinos.

* **Árbol**: El endpoint ``getArbol`` es muy eficiente para llenar selectores en cascada en interfaces de usuario, evitando múltiples llamadas al backend.