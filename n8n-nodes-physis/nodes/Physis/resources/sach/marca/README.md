# Recurso Marca (SACH)

El recurso **Marca** permite la gestión de las marcas de ganado asociadas a un Cliente (Tercero) específico. Las marcas son los diseños visuales o hierros utilizados para identificar la propiedad de la hacienda y son un requisito obligatorio para la emisión de guías y DTEs.

Este recurso permite consultar las marcas registradas de un productor, dar de alta nuevos diseños (con su imagen digitalizada) y mantener el catálogo actualizado.

## 📋 Campos Principales (Schema)

Para las operaciones de **Crear** o **Actualizar**, se requiere identificar al cliente propietario y los datos de la marca.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idMarca` | Int | Código identificador de la marca (0 para nueva). | Sí |
| `idAuxi` | Int | Tipo de auxiliar (ej: 1 para Cliente). | Sí |
| `idCtaAuxi` | String | Código de la cuenta del cliente propietario. | Sí |
| `descripcion` | String | Nombre o detalle descriptivo de la marca. | Sí |
| `imagen` | String | Cadena de texto con la imagen (usualmente Base64). | No |
| `inmutable` | Int | Indicador de estado o bloqueo (0/1). | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Marcas de Cliente** (`getAll`): Devuelve todas las marcas asociadas a un tercero específico.
    * *Requiere*: `IdAuxi` y `IdCtaAuxi`.
* **Obtener Marca** (`get`): Recupera el detalle de una marca puntual.
    * *Requiere*: `IdMarca`, `IdAuxi` y `IdCtaAuxi`.

### ABM (Escritura)
* **Crear** (`create`): Asigna una nueva marca a un cliente.
* **Actualizar** (`update`): Modifica la descripción o imagen de una marca existente.
* **Eliminar** (`delete`): Quita una marca del perfil del cliente.

---

## 💡 Ejemplos de JSON

### 1. Registrar Nueva Marca
Dar de alta una marca para el cliente "C0050".

**Recurso**: `Marca` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idAuxi": 1,
  "idCtaAuxi": "C0050",
  "idMarca": 0,
  "descripcion": "Marca Principal - Estancia El Trebol",
  "imagen": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGBg+A8AAQQBAHAgZQsAAAAASUVORK5CYII=" 
}
```

### 2. Listar Marcas de un Productor
Ver qué diseños tiene registrados el cliente "P020".

**Recurso**: ``Marca`` 

**Operación**: ``Listar Marcas de Cliente``

**Parámetros (Query)**:

* IdAuxi: ``1``

* IdCtaAuxi: ``P020``

--- 

## ⚠️ Notas Técnicas
* **Dependencia del Cliente**: A diferencia de otros maestros globales, la Marca no existe por sí sola; siempre es un atributo de un Cliente. Por ello, en todas las operaciones (incluso ``get`` y ``delete``) es obligatorio enviar el par ``IdAuxi`` + ``IdCtaAuxi``.

* **Imágenes**: El campo ``imagen`` está diseñado para almacenar la representación gráfica de la marca, vital para la impresión de documentos oficiales. Se recomienda verificar el formato de codificación esperado (generalmente Base64).