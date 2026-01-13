# Recurso Formatos (SACER)

El recurso **Formatos** administra los diseños de impresión y modelos de documentos disponibles en el sistema.

Cada comprobante en Physis (una Carta de Porte, un Contrato) pertenece a un "Tipo de Formato", pero puede tener múltiples "Formatos" de impresión (ej: "Original Pre-impreso", "Copia A4", "Formato PDF Email"). Este nodo permite gestionar esas variantes.

## 📋 Estructura de Datos (Schema)

Para las operaciones de **Crear** o **Actualizar**, el sistema utiliza un objeto JSON simple:

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idFormato` | Int | **0** para crear nuevo. ID existente para editar. |
| `idTipoFormato`* | Int | ID de la categoría (ej: 1=Carta Porte, 2=Contrato). |
| `nombre`* | String | Nombre visible del formato (ej: "A4 Standard"). |
| `reportWidth` | Int | Ancho del reporte (configuración de impresión). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve todos los formatos del sistema.
    * *Filtro Opcional*: `idTipoFormato` (para ver solo los formatos de Contratos, por ejemplo).
* **Listar por Tipo** (`getByTipo`): Endpoint específico para obtener las variantes de un tipo de documento.
    * *Ruta*: `/api/sacer/tipos-formato/{idTipo}/formatos`
* **Obtener Detalle** (`get`): Recupera un formato específico.

### ABM (Escritura)
* **Crear** (`create`): Registra un nuevo diseño de impresión.
* **Actualizar** (`update`): Modifica el nombre o configuración.
* **Eliminar** (`delete`): Borra un formato.

---

## 💡 Ejemplos de Uso

### 1. Listar Formatos de "Carta de Porte"
Supongamos que el ID de Tipo para Carta de Porte es `5`.
**Operación**: `Listar Todos`
**Parámetro**: `idTipoFormato` = `5`

### 2. Crear un Nuevo Formato de Impresión
**Operación**: `Crear`
**JSON Body**:
```json
{
  "idFormato": 0,
  "idTipoFormato": 5,
  "nombre": "Carta de Porte - Formato Email PDF",
  "reportWidth": 100
}
```
---

## ⚠️ Notas Técnicas
Relación: Para conocer qué IDs usar en idTipoFormato, puedes consultar el recurso hermano Tipo de Formato (si está disponible) o listar los existentes.

Uso: Estos IDs de formato suelen ser requeridos por los endpoints de generación de PDFs (como en Carta de Porte > Obtener PDF) para saber qué diseño renderizar.