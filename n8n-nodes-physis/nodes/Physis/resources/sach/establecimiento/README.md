# Recurso Establecimiento (SACH)

El recurso **Establecimiento** administra la gestión de las entidades físicas o lugares de producción y destino dentro del módulo de Hacienda. Se divide en dos tipologías principales:

1.  **Establecimiento Agropecuario**: Corresponde a los campos de cría o invernada (Origen). Se caracteriza por gestionar la información de **RENSPA** y **CUIG**.
2.  **Establecimiento Faenador**: Corresponde a los frigoríficos o plantas de faena (Destino). Se caracteriza por gestionar la **Matrícula** y la habilitación **ONCCA**.

Este recurso permite realizar el ABM (Alta, Baja, Modificación) de estos lugares y consultar sus vinculaciones regulatorias con los clientes.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON. Aunque comparten campos de ubicación, cada tipo tiene atributos regulatorios específicos.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idEstablecimiento` | String | Código identificador único del establecimiento. | Sí |
| `nombre` | String | Nombre o Razón Social del establecimiento. | Sí |
| `domicilio1` | String | Dirección principal. | No |
| `domicilioLocalidad` | String | Localidad del establecimiento. | No |
| `idPais` | Int | ID del país (ej: 1). | No |
| `idProvincia` | Int | ID de la provincia. | No |
| `clientesRenspa` | Array | **(Solo Agropecuario)** Lista de objetos con `renspa`, `cuig` e `idCtaAuxi`. | No |
| `clientesOncca` | Array | **(Solo Faenador)** Lista de objetos con `onca` e `idCtaAuxi`. | No |
| `matricula` | String | **(Solo Faenador)** Número de matrícula oficial. | No |

---

## 🛠 Operaciones Disponibles

Las operaciones son comunes para ambos tipos, seleccionando el recurso correspondiente en el nodo (`establecimientoAgropecuario` o `establecimientoFaenador`).

### Consultas Generales
* **Listar Todos** (`getAll`): Devuelve el listado completo de establecimientos del tipo seleccionado.
* **Obtener por ID** (`get`): Recupera el detalle de un establecimiento específico mediante su código.

### ABM (Escritura)
* **Crear** (`create`): Da de alta un nuevo establecimiento.
* **Actualizar** (`update`): Modifica los datos de un establecimiento existente, incluyendo sus listas de RENSPA u ONCCA.

### Consultas por Cliente
* **Listar por Cliente** (`getByCliente`): Obtiene los establecimientos vinculados a un cliente específico.
* **Listar RENSPA y Establecimientos** (`getRenspaByCliente`): **(Agropecuario)** Devuelve datos de RENSPA y establecimientos asociados a un cliente.
* **Listar ONCCA y Establecimientos** (`getOnccaByCliente`): **(Faenador)** Devuelve datos de ONCCA y establecimientos asociados a un cliente.

---

## 💡 Ejemplos de JSON

### 1. Crear Establecimiento Agropecuario
Registra un campo con su código RENSPA asociado a un productor.

**Recurso**: `Establecimiento Agropecuario`

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idEstablecimiento": "E-AGRO-01",
  "nombre": "Campo La Esperanza",
  "domicilioLocalidad": "Junín",
  "idProvincia": 2,
  "clientesRenspa": [
    {
      "idCtaAuxi": "C0050",
      "renspa": "02.005.0.00123/00",
      "cuig": "AB505"
    }
  ]
}
```
### 2. Crear Establecimiento Faenador
Registra un frigorífico con su matrícula y habilitación ONCCA.

**Recurso**: ``Establecimiento Faenador``

**Operación**: ``Crear``

**JSON Body**:

```json
{
  "idEstablecimiento": "FRIG-2024",
  "nombre": "Frigorífico del Sur S.A.",
  "matricula": "M-102030",
  "domicilio1": "Av. Circunvalación 1234",
  "clientesOncca": [
    {
      "idCtaAuxi": "C0099",
      "onca": "ONCCA-HAB-99"
    }
  ]
}
```

### 3. Consultar Establecimientos de Cliente
Ver qué establecimientos agropecuarios tiene asociados el cliente "P001".

**Recurso**: ``Establecimiento Agropecuario``

**Operación**: ``Listar por Cliente``

**Parámetros (Query)**:

* IdCtaAuxi: ``P001``

---

## ⚠️ Notas Técnicas
* **Estructura Arrays**: Al actualizar (``update``) las listas ``clientesRenspa`` o ``clientesOncca``, asegúrese de enviar la colección completa, ya que el sistema suele reemplazar la lista existente para ese establecimiento.

* **IDs Alfanuméricos**: El campo ``idEstablecimiento`` es de tipo ``string``, permitiendo códigos alfanuméricos definidos por el usuario o sistemas externos.

* **Endpoints Específicos**: Aunque comparten estructura, recuerde que son dos recursos distintos (``establecimientoAgropecuario`` y ``establecimientoFaenador``) con sus propios endpoints en la API.