# Recurso Regímenes (SIGES)

El recurso **Regímenes** administra la lógica de cálculo impositivo del sistema.

En SIGES, un "Régimen" encapsula las reglas para calcular Retenciones (Pagos) y Percepciones (Cobros). Define alícuotas, montos no imponibles, escalas progresivas y códigos de AFIP (SICORE).

Su función principal es la automatización: Al imputar una factura a una Cuenta Contable (ej: "Honorarios"), el sistema busca si esa cuenta tiene un Régimen asociado (ej: "Retención Ganancias 4ta Categoría") y calcula el impuesto automáticamente.



## 📋 Campos Principales

### Objeto Régimen
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idRegimen` | String | Código interno (ej: `R-GAN-01`). |
| `descripcion` | String | Nombre (ej: "Ret. Ganancias Enajenación de Bienes"). |
| `idImpuesto` | String | Tipo de tributo (ej: `GAN`=Ganancias, `IVA`=IVA, `SUSS`=Seguridad Social). |
| `alicuotaInscripto` | Decimal | Porcentaje a retener si el sujeto está inscripto. |
| `minimoDePago` | Decimal | Importe mínimo debajo del cual no se efectúa la retención. |
| `regimenEscalas` | Array | (Opcional) Tabla de escalas para cálculos progresivos. |

---

## 🛠 Operaciones Disponibles

### Gestión de Reglas (ABM)
* **Listar Todos** (`getAll`): Devuelve todos los regímenes activos.
* **Obtener Detalle** (`get`): Recupera la configuración profunda (incluyendo escalas y cuentas contables asociadas para el asiento de la retención).
* **Crear / Modificar** (`create`, `update`): Configura nuevos impuestos o actualiza alícuotas vigentes.

### Vinculación Contable
Esta es la parte operativa más importante.
* **Ver Regímenes de Cuenta** (`getByAccount`): Consulta qué impuestos están vinculados a un concepto contable (ej: ¿La cuenta "Fletes" dispara retenciones?).
* **Asociar a Cuenta** (`associateAccount`): Crea el vínculo **Cuenta Contable -> Régimen**.

---

## 💡 Ejemplos de Uso

### 1. Consultar Retención de Honorarios
Verificar la configuración del régimen "G-HO" (Ganancias Honorarios) para ver el mínimo no imponible.

**Recurso**: `Regimenes` 

**Operación**: `Obtener Detalle`

**Parámetro**: 

* idRegimen: `G-HO`

### 2. Configurar Automatización
Hacer que cada vez que se use la cuenta "Alquileres Pagados" (5.2.01.05), el sistema calcule "Retención Ganancias Alquileres" (R-ALQ).

**Recurso**: `Regimenes` 

**Operación**: `Asociar a Cuenta`

**JSON Body (Array)**:
```json
[
  {
    "idRegimen": "R-ALQ",
    "idPpal": 1,
    "idCtaPpal": "5.2.01.05"
  }
]
```

### 3. Actualizar Alícuota de IIBB
Cambiar la alícuota de retención de Ingresos Brutos Santa Fe al 3.5%.

**Recurso**: `Regimenes` 

**Operación**: `Modificar Régimen`

**JSON Body**:

```json
{
  "regimen": {
    "idRegimen": "R-IIBB-SF",
    "descripcion": "Retención IIBB Santa Fe - General",
    "vencimEmision": "0",
    "idImpuesto": "IIBB",
    "idOperacion": 0,
    "idCondicion": "INSCRIPTO",
    "idAplicativo": 0,
    "cantCopiasCertificado": 1,
    "imprimeEnProceso": true,
    "modoCalculo": "PORCENTAJE",
    "fechaBaja": "2100-01-01T00:00:00.000Z",
    "tipoCalculo": "AUTOMATICO",
    
    "alicuotaInscripto": 3.5, 
    "alicuotaNoInscripto": 4.5,
    "alicuotaEspecial": 0,
    
    "montoNoImponible": 0,
    "retencionMinima": 500,
    "idUsuario": 1,
    "fechaActualiz": "2026-01-15T00:00:00.000Z",
    "fechaRetenAuto": "2026-01-15T00:00:00.000Z",
    "montoMaximoIva": 0,
    "disminuyebase": false,
    "alicuotaNoGravada": 0,
    
    "codigoAFIP": "921",
    "idPais": 1,
    "idProvincia": 21,
    
    "idTipoFormato": 0,
    "idFormato": 0,
    "alicuotaObDir": 0,
    "alicuotaObDirOtra": 0,
    "alicuotaConMulti": 0,
    "alicuotaConMultiOtra": 0,
    "emiteCertificado": true,
    "noAnalizaBI": false,
    "esRegimenGeneral": true,
    "alicuotaObDirRI": 0,
    "alicuotaObDirOtraRI": 0,
    "alicuotaConMultiRI": 0,
    "alicuotaConMultiOtraRI": 0,
    "regimenAsociadoAlConcepto": 0,
    "tomaTotalComprobante": false,
    "minimoDePago": 0,
    "acumNoImpo": 0,
    "precio": 0,
    "bienes_Restantes": 0,
    "tomaOrdenDePago": true,
    "codigoAFIP_1": "",
    "codigoAFIP_2": "",
    "codigoAFIP_3": "",
    "codigoAFIP_4": "",
    
    "regimenPpalRetencion": [
      {
        "idRegimen": "R-IIBB-SF",
        "idPpal": 1,
        "idCtaPpal": "2.1.04.05.021" 
      }
    ],
    "regimenPpalBaseImponible": [],
    "regimenEscalas": []
  },
  "restoActividades": true,
  "bienes": true,
  "respMono": false,
  "cuentasBaseImpo": ""
}
```

---

## ⚠️ Notas Técnicas
* **Estructura Compleja**: El objeto Regimen en **POST** y **PUT** es anidado. Contiene listas como `regimenEscalas` (para impuestos escalonados) y `regimenPpalRetencion` (para definir a qué cuenta va el pasivo de la retención). Se recomienda hacer un **GET** primero para obtener la estructura base antes de editar.

* **Códigos AFIP**: Es vital configurar correctamente los campos `codigoAFIP` para que luego el sistema pueda exportar los archivos de texto para el **SICORE** o **SIRE**.