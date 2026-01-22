# Recurso Establecimiento (SACER)

El recurso **Establecimiento** representa la unidad productiva o la "estancia" física. Es el eslabón intermedio en la jerarquía de Physis:
1.  **Tercero** (Productor/Dueño)
2.  **Establecimiento** (La Estancia/Finca)
3.  **Campo** (Subdivisión física)

Este nodo permite administrar estos lugares físicos, fundamentales para determinar el origen de la mercadería en las Cartas de Porte.

## 📋 Estructura de Datos (Schema)

Para las operaciones de **Crear** o **Actualizar**, el sistema espera un objeto JSON. Aunque el modelo completo es extenso, para vincular un establecimiento solo necesitas los siguientes campos clave:

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idEstablecimiento` | Int | **0** para crear uno nuevo. ID existente para editar. |
| `descripcion`* | String | Nombre de la estancia (ej: "La Soñada"). |
| `idAuxiTercero`* | Int | Código del Productor dueño del establecimiento. |
| `idCtaAuxiTercero`* | String | Cuenta auxiliar del productor (ej: "1"). |
| `codZona`* | Int | Código de la zona geográfica. |
| `localidad` | String | Ciudad o pueblo más cercano. |
| `domicilio` | String | Dirección o indicaciones de ruta. |
| `codONCCA` | Int | Código de planta/establecimiento en ONCCA (si aplica). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve el listado general de establecimientos.
* **Obtener por ID** (`get`): Recupera los datos de un establecimiento específico.
* **Listar por Tercero** (`getByTercero`): **(Muy Utilizado)** Devuelve todos los establecimientos pertenecientes a un productor específico.
    * *Parámetros*: `idAuxi` y `idCtaAuxi`.

### ABM (Escritura)
* **Crear** (`create`): Da de alta una nueva estancia/unidad productiva.
* **Actualizar** (`update`): Modifica datos (ej: corregir dirección o nombre).
* **Eliminar** (`delete`): Borra un establecimiento.

---

## 💡 Ejemplos de Uso

### 1. Obtener Establecimientos de un Cliente
Para llenar un selector en un formulario donde el cliente elige de dónde sale el grano:
* **Operación**: `Listar por Tercero`
* **Parámetro `idAuxi`**: `1050`
* **Parámetro `idCtaAuxi`**: `1`

### 2. Crear un Nuevo Establecimiento
Alta rápida de un campo arrendado nuevo:

**Operación**: `Crear`
**JSON Body**:
```json
{
  "idEstablecimiento": 0,
  "descripcion": "Campo Arrendado - Los Pinos",
  "idAuxiTercero": 2040,
  "idCtaAuxiTercero": "1",
  "codZona": 5,
  "localidad": "Rojas",
  "domicilio": "Ruta 31 Km 150 (Bajada de tierra)"
}
```

### 3. Actualizar Localidad
**Operación**: Actualizar JSON Body:

```json
{
  "idEstablecimiento": 455,
  "descripcion": "Campo Arrendado - Los Pinos",
  "localidad": "Pergamino",
  "codigoPostal": "2700"
}
```

---
## ⚠️ Notas Técnicas
* **Relación con Terceros**: Es obligatorio que un establecimiento esté vinculado a un idAuxiTercero válido. Si envías el objeto completo tercero anidado, el sistema podría intentar actualizar al productor también, por lo que se recomienda enviar solo los IDs de enlace (idAuxiTercero, idCtaAuxiTercero).

* **Jerarquía**: Recuerda que para crear Lotes o Campos específicos, primero debes tener creado el Establecimiento padre.