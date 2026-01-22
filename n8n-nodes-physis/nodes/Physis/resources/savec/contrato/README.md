# Recurso Contrato (SAVEC)

El recurso **Contrato** permite administrar los acuerdos comerciales de compra y venta de granos. Es la entidad central donde se definen las condiciones de negocio (precios, volúmenes, plazos) antes de la entrega física.

Permite responder preguntas como:
* ¿Cuántas toneladas se comprometieron entregar en esta campaña?
* ¿Cuáles son las condiciones de precio y moneda pactadas?
* ¿Quiénes son los intermediarios (Corredor, Entregador) y el Comprador final?

## 📋 Campos Principales (Schema)

Para las operaciones de **Creación** o **Actualización**, se utiliza un objeto JSON que representa el acuerdo comercial.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `nroContrato` | String | Identificador único del contrato. | Sí |
| `codCampania` | Int | Ciclo agrícola (ej: 24). | Sí |
| `codCereal` | Int | Tipo de grano (ej: 1-Trigo, 2-Soja). | Sí |
| `fechaContrato` | Date | Fecha de celebración del acuerdo. | Sí |
| `precioPorTn` | Decimal | Valor pactado por tonelada. | No |
| `idMoneda` | String | Divisa del contrato (ej: "DOLA"). | No |
| `kilosMax` | Decimal | Volumen total acordado (Kilos). | No |
| `fechaEntregaMax` | Date | Fecha límite para entregar la mercadería. | No |
| `idAuxiComprador` | Int | Código del tercero Comprador. | No |

---

## 🛠 Operaciones Disponibles

### 1. Listar Contratos (Búsqueda)
* **Operación**: `getAll` (o ruta raíz `/savec/contratos`).
* **Descripción**: Devuelve un listado de contratos aplicando filtros.
* **Datos típicos**: ID de Cereal, ID de Campaña, Parte del número de contrato.
* **Uso**: Búsqueda general para grillas o selectores de contratos.

### 2. Consultar Detalle (Un Contrato)
* **Operación**: `get`.
* **Descripción**: Recupera la información completa de un contrato específico, incluyendo datos de liquidación final y estado de kilos.
* **Uso**: Visualización de la ficha completa del contrato o edición.

### 3. Gestión de Contrato (Alta/Modificación)
* **Operación**: `create`.
* **Descripción**: Crea un nuevo contrato o actualiza uno existente si la combinación `nroContrato` + `codCampania` ya existe.
* **Uso**: Registro de nuevos negocios cerrados por la mesa comercial.

### 4. Maestros y Auxiliares
* **Operación**: `getCorredores`, `getEntregadores`, `getTransportistas`, `getMonedas`.
* **Descripción**: Endpoints de ayuda que devuelven listas de terceros filtrados por rol o catálogos del sistema.
* **Uso**: Poblar listas desplegables (combos) en interfaces de carga.

---

## 💡 Ejemplos de Uso

### 1. Registrar un Nuevo Negocio
Dar de alta un contrato de Soja para la campaña 24.
* **Operación**: `Gestión de Contrato` (`create`)
* **JSON Body**:
    ```json
    {
      "nroContrato": "CTR-2024-SOJA",
      "codCampania": 24,
      "codCereal": 2,
      "fechaContrato": "2024-05-20T00:00:00.000Z",
      "precioPorTn": 310.50,
      "idMoneda": "DOLA",
      "kilosMax": 100000,
      "idAuxiComprador": 1050
    }
    ```

### 2. Buscar Contratos de un Cliente
Ver contratos donde interviene un comprador específico en la campaña actual.
* **Operación**: `Listar Contratos` (`getAll`)
* **Parámetros**:
    * `idComprador`: `1050`
    * `codCampania`: `24`

---

## ⚠️ Notas Técnicas

* **Clave Primaria**: La unicidad del contrato está dada por la combinación de **Número de Contrato** + **Código de Campaña**.
* **Contratos de Terceros**: Existe una operación específica (`getContratosTerceros`) para consultar contratos donde la empresa actúa como intermediaria y no como parte principal.
* **Formato de Fechas**: Se recomienda usar formato ISO 8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`) para evitar ambigüedades.