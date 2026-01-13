# Recurso Carta de Porte (SACER)

Gestiona el documento legal de tránsito de granos (CPG - Carta de Porte de Granos). Este recurso permite administrar el ciclo de vida completo del documento: emisión, solicitud de CTG (Código de Trazabilidad de Granos), recepción en planta, descarga y digitalización (PDF).

## 📋 Estructura de Datos (Schema)

Debido a la complejidad del objeto `CartaPorte`, los campos se agrupan en secciones lógicas. Al usar la operación **Crear**, se espera un JSON con esta estructura:

### 1. Cabecera y Documento
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idCartaDePorte` | Int | **0** para crear nueva. ID interno para actualizaciones. |
| `nroCartaDePorte`* | String | El número oficial de 12 dígitos (CPG). |
| `ctg` | String | Código de Trazabilidad de Granos (AFIP). |
| `codCampania`* | Int | ID de la campaña agrícola. |
| `estado` | Int | Estado del documento (0: Emitida, 1: Activa, etc.). |
| `fechaEmision`* | Date | Fecha de emisión (ISO 8601). |

### 2. Participantes (Objetos Anidados)
Cada participante (`productor`, `destinatario`, `transportista`, etc.) tiene la misma estructura interna:
```json
"productor": {
  "idAuxi": 1050,       // Código del tercero
  "idCtaAuxi": "1",     // Cuenta auxiliar (ej: "1")
  "cuit": "20123456789" // CUIT (Opcional si se envía ID)
}
```
* **Roles Clave**: remitente, corredor, entregador, destino (Establecimiento), destinatario (Comercial), transportista, cargador.

### 3. Carga y Granos
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codCereal`* | Int | Código del grano (ej: 1-Trigo, 2-Maíz). |    
| `codPlanta`* | Int | ID de la planta de origen (si sale de acopio). |
| `codEstablecimiento`* | Int | ID del establecimiento de origen (si sale de campo). |
| `kilosBrutos/Tara` | Decimal | Pesos de balanza. |
| `kilosNetos` | Decimal | Peso neto resultante.

### 4. Transporte y Chofer

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `patente/patenteAcoplado` | String | Dominios del vehículo. |
| `ìdConductor` | Int | ID del chofer registrado. |
| `fechaDescarga` | Date | Fecha de arribo/descarga en destino. |

### 🛠 Operaciones Disponibles

#### Consultas
#### * Listar (Filtros) (getAll): Búsqueda estándar.
* Filtros: FechaDesde, FechaHasta, Cereal, Productor, CTG, NroCartaDePorte.

#### * Listar (V2 / Grilla) (getAllV2): Vista alternativa que permite incluir/excluir anulados.
* Param: esAnulado (boolean).

#### * Obtener Detalle (get): Recupera todos los datos de una carta específica por su ID.

#### Gestión de Archivos
#### * Obtener PDF (getPdf): Genera y devuelve el enlace de descarga del PDF oficial de la Carta de Porte.
* Uso: Ideal para enviar automáticamente el PDF al chofer o productor por email/WhatsApp.

#### Creación (Ingreso / Emisión)
#### * Crear (create): Da de alta una nueva carta de porte en el sistema.
* Nota: Si grabaSavec=true, impacta en el stock físico.

## 💡 Ejemplos de Uso

### 1. Descargar PDF de una Carta de Porte
Para enviar el comprobante a un transportista:
* **Operación**: Obtener PDF.
* **ID**: 15430 (ID interno, no el número de CTG).
* **Salida**: { "link": "https://api.physis.../report.pdf" }

### 2. Consultar Cartas de Porte de Hoy

Para un reporte diario de ingresos:
* **Operación**: Listar (Filtros).
* **Parámetros**:FechaDesde: {{ $today.format('yyyy-MM-dd') }}
* **PlantaDestino**: 3 (Filtrar por planta específica).

### 3. Crear Carta de Porte (Ingreso Manual)
JSON mínimo para ingresar una carta en estado "Pendiente":
```json
{
  "idCartaDePorte": 0,
  "nroCartaDePorte": "123456789012",
  "ctg": "987654321",
  "codCampania": 24,
  "fechaEmision": "2024-03-20T08:00:00.000Z",
  "codCereal": 2,
  "kilosNetos": 30500,
  "productor": { "idAuxi": 500, "idCtaAuxi": "1" },
  "transportista": { "idAuxi": 102, "idCtaAuxi": "PRO" },
  "chofer": { "idConductor": 45 },
  "patente": "AA123BB"
}
```

## ⚠️ Notas Técnicas

* **Fechas**: El formato esperado es ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ). El sistema es sensible a la zona horaria.
* **Validación CTG**: Al crear, el sistema valida que el CTG no esté duplicado si la configuración de la planta lo impide.
* **Estados**: Al filtrar, ten en cuenta que las cartas pueden estar en estado Carga, Transito, Descargada, Anulada.