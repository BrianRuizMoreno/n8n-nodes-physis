# Recurso Imágenes (SIFAC)

El recurso **Imágenes (FacImagen)** permite gestionar archivos adjuntos (generalmente escaneos, fotos de comprobantes o remitos firmados) asociados a una Cabecera de SIFAC.

Este recurso es útil para digitalización documental, permitiendo adjuntar la evidencia física al registro digital del comprobante.

## 📋 Campos Clave

Este recurso utiliza una combinación de claves para identificar el archivo:

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `IdCabecera` | Int | ID del comprobante al que pertenece la imagen. | Sí |
| `IdImagen` | Int | ID secuencial de la imagen dentro del comprobante. | Sí (en Get/Update/Delete) |
| `origen` | Int | Tipo de circuito (ej: 1=Ventas, 2=Compras, etc.). | Sí |
| `extension` | String | Formato del archivo (ej: "jpg", "pdf", "png"). | Sí (en Alta/Modif) |
| `payload` | String | Contenido del archivo (usualmente Base64 o binario). | Sí (en Body) |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar por Documento** (`getAll`): Devuelve la lista de adjuntos para un comprobante específico.
* **Obtener Una** (`get`): Recupera el contenido de una imagen específica.

### Gestión
* **Subir (Insertar)** (`create`): Agrega un nuevo adjunto a un comprobante.
* **Actualizar** (`update`): Reemplaza el contenido o metadatos de una imagen.
* **Eliminar** (`delete`): Borra el adjunto.

---

## 💡 Ejemplos de JSON

### 1. Listar Imágenes de una Factura
Ver todos los adjuntos de la Cabecera ID 5000 (Origen 1).

**Recurso**: `Imágenes` 

**Operación**: `Listar por Documento`

**JSON Body (Filtros)**:
```json
{
  "IdCabecera": 5000,
  "origen": 1
}
```

### 2. Subir una Foto (JPG)
Adjuntar un escaneo a la Cabecera 5000. Nota: En n8n, el contenido del archivo debe pasarse en la propiedad payload.

**Recurso**: ``Imágenes`` 

**Operación**: ``Subir (Insertar)``

**JSON Body**:

```json
{
  "IdCabecera": 5000,
  "origen": 1,
  "extension": "jpg",
  "Descripcion": "Escaneo Remito Firmado",
  "payload": "/9j/4AAQSkZJRgABAQEAYABgAAD..." // Base64 del archivo
}
```

### 3. Eliminar una Imagen
Borrar la imagen ID 2 asociada a la Cabecera 5000.

**Recurso**: ``Imágenes`` 

**Operación**: ``Eliminar``

**JSON Body (Filtros)**:

```json
{
  "IdCabecera": 5000,
  "IdImagen": 2,
  "origen": 1
}
```

---

## ⚠️ Notas Técnicas
**Manejo de Body**: Debido a cómo está diseñada esta API (mezcla Query Params con Body), en el nodo n8n se ha implementado una lógica especial para POST y PUT:

* Todo lo que esté dentro de la propiedad ``payload`` del JSON se enviará como el Cuerpo (Body) de la petición.

* El resto de las propiedades del JSON se enviarán como Query String.

**Origen**: Es fundamental enviar el código de ``origen`` correcto, ya que el mismo ``IdCabecera`` puede existir en diferentes tablas (Ventas vs Compras).