# Recurso Contrato (SACER)

El recurso **Contrato** administra los acuerdos comerciales de compra-venta, canje o consignación de granos.

Es el documento que establece las condiciones de negocio: precio (fijo o a fijar), fecha de entrega, procedencia, y los kilos comprometidos. Actúa como el nexo entre la cuenta corriente del productor y el stock físico.

## 📋 Estructura de Datos (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON. Aunque el modelo es extenso, estos son los campos críticos:

### Cabecera y Condiciones
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `nroContrato`* | String | Número identificador del contrato (ej: "0001-12345678"). |
| `codCampania`* | Int | ID de la campaña agrícola asociada. |
| `codCereal`* | Int | ID del grano negociado. |
| `fechaContrato`* | Date | Fecha de firma (ISO 8601). |
| `fechaMax` | Date | Fecha límite de entrega. |
| `idMoneda` | Int | Moneda del contrato (0: Pesos, 1: Dólares). |

### Precios y Cantidades
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `precioAFijar` | Bool | `true` si es "A Fijar", `false` si tiene precio cerrado. |
| `precioPorTn` | Decimal | Precio pactado (si no es a fijar). |
| `kilosNetos` | Decimal | Cantidad total de toneladas pactadas. |
| `idFormaPago` | Int | Código de la condición de pago. |

### Participantes (Terceros)
Todos los participantes requieren el par `idAuxi` (Código) y `idCtaAuxi` (Cuenta Auxiliar).
* **Productor**: `idAuxiProductor` / `idCtaAuxiProductor`
* **Corredor**: `idAuxiCorredor` / `idCtaAuxiCorredor`
* **Comisionista**: `idAuxiComisionista` / `idCtaAuxiComisionista`

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar (Filtros)** (`getAll`): Búsqueda general con múltiples filtros de estado.
    * *Filtros Clave*: `pendientesEntrega`, `pendientesLiquidar`, `contratoCerrado`, `precioAFijar`.
* **Obtener Detalle** (`get`): Busca un contrato específico por Campaña y Número (`api/sacer/contratos/{codCampania}/{nroContrato}`).
* **Contratos de un Tercero** (`getByTercero`): Endpoint optimizado para ver la historia de un productor.
    * *Ruta*: `/api/sacer/terceros/{idAuxi}/{idCtaAuxi}/contratos`

### ABM (Escritura)
* **Crear** (`create`): Da de alta un nuevo contrato.
* **Actualizar** (`update`): Modifica condiciones (ej: extender fecha de entrega).
* **Eliminar** (`delete`): Borra un contrato (solo si no tiene aplicaciones o entregas vinculadas).

---

## 💡 Ejemplos de Uso

### 1. Crear Contrato "A Fijar"
Contrato de 100 Tn de Soja, precio abierto.
**Operación**: `Crear`
**JSON Body**:
```json
{
  "nroContrato": "0001-00005544",
  "codCampania": 24,
  "codCereal": 2,
  "fechaContrato": "2024-04-01T00:00:00.000Z",
  "fechaMax": "2024-05-30T00:00:00.000Z",
  "precioAFijar": true,
  "precioPorTn": 0,
  "kilosNetos": 100000,
  "idAuxiProductor": 1050,
  "idCtaAuxiProductor": "1",
  "idMoneda": 1,
  "observaciones": "Soja a fijar s/Rosario"
}
```
### 2. Consultar Pendientes de Entrega
Para saber qué contratos aún no se han cumplido físicamente. Operación: Listar (Filtros) Parámetros:

* pendientesEntrega: true

* codCereal: 2 (Opcional, para filtrar por grano).

### 3. Historial de un Productor
**Operación**: Contratos de un Tercero Parámetros:

* idAuxi: 1050

* idCtaAuxi: 1

## ⚠️ Notas Técnicas
* **Identificación Única**: A diferencia de otros recursos que usan un ID autoincremental simple, el contrato se identifica funcionalmente por la combinación de Campaña + Número de Contrato.

* **Estado "Cerrado"**: El filtro contratoCerrado en true devuelve los históricos finalizados. Para ver los activos, usa false.

* **Kilos Pendientes**: El sistema calcula automáticamente los campos kilosPendientesEntrega y kilosPendientesLiquidar basándose en las Cartas de Porte y Liquidaciones vinculadas.