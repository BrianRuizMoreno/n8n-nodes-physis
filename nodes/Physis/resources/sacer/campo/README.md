# Recurso Campo (SACER)

El recurso **Campo** es la entidad fundamental para la trazabilidad de origen en Physis. Representa la ubicación física donde se produce el grano.

Este nodo permite no solo gestionar los campos individuales, sino también consultar la **jerarquía completa** de producción (Zona > Establecimiento > Campo > Lote).

## 📋 Estructura de Datos (JSON)

Para las operaciones de **Crear** (`create`) o **Actualizar** (`update`), el sistema espera un objeto JSON con los siguientes campos clave.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codCampo` | Int | **0** para crear nuevo. ID existente para actualizar. |
| `descripcion`* | String | Nombre del campo (ej: "Lote Norte"). |
| `codZona`* | Int | Código de la zona geográfica a la que pertenece. |
| `idEstablecimiento`* | Int | ID del establecimiento padre (Unidad productiva). |
| `localidad` | String | Nombre de la localidad más cercana. |
| `domicilio` | String | Ubicación física o coordenadas descriptivas. |
| `idPpal` | Int | (Opcional) ID Principal del propietario/encargado. |
| `idAuxiEncargado` | Int | (Opcional) ID Auxiliar del encargado. |

---

## 🛠 Operaciones Disponibles

### 🌳 Jerarquía y Árbol (`getArbol`)
Esta es la operación más potente para integraciones de UI o selectores. Devuelve la estructura anidada completa.
* **Endpoint**: `/api/sacer/zonas-establecimientos-campos-lotes/arbol`
* **Filtros**:
    * `IdAuxi` (Productor): Filtra todo el árbol para mostrar solo propiedades de un productor específico.
    * `IdCtaAuxi`: Cuenta auxiliar del productor.

### Consultas
* **Listar Campos** (`getCampos`): Lista simple de campos.
    * *Filtro*: `CodZona` (Permite listar campos de una zona específica).
* **Obtener Detalle** (`getCampo`): Devuelve el objeto completo, incluyendo datos anidados de la Zona, Provincia, y el Tercero asociado.

### ABM (Escritura)
* **Crear Campo** (`createCampo`): Da de alta un nuevo campo físico.
* **Actualizar Campo** (`updateCampo`): Modifica datos (ej: corregir nombre o reasignar zona).
* **Eliminar Campo** (`deleteCampo`): Da de baja el campo (Soft Delete).

---

## 💡 Ejemplos de Uso

### 1. Obtener Campos de un Productor (Árbol)
Para mostrar en un formulario solo los campos válidos de un cliente:
* **Operación**: `Árbol: Estructura Completa`
* **Parámetro `id`**: `1050` (Código del Productor).
* **Parámetro `idCtaAuxi`**: `1` (Cuenta Auxiliar).

### 2. Crear un Nuevo Campo
Vinculando un campo nuevo al establecimiento #45 en la Zona #2.
* **Operación**: `Campos: Crear`
* **JSON Body**:
```json
{
  "codCampo": 0,
  "descripcion": "Campo La Invernada - Sector Sur",
  "codZona": 2,
  "idEstablecimiento": 45,
  "localidad": "Pergamino",
  "codigoPostal": "2700",
  "domicilio": "Ruta 8 Km 220"
}
```

### 3. Actualizar Encargado de un Campo
* **Operación**: Campos: Actualizar

* **JSON Body**:

```json
{
  "codCampo": 128,
  "descripcion": "Campo La Invernada - Sector Sur",
  "idAuxiEncargado": 99,
  "idCtaAuxiEncargado": "VEN"
}
```

## ⚠️ Notas Técnicas

* **Relación con Establecimientos**: Un campo siempre debe pertenecer a un idEstablecimiento. Si no tienes el ID del establecimiento, usa primero la operación getEstablecimientos (disponible en este mismo nodo) para buscarlo.

* **Validación**: El sistema valida que el codZona exista y esté activo.