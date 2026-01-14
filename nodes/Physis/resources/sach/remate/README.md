# Recurso Remate (SACH)

El recurso **Remate** administra el circuito operativo completo de un Remate Feria. Este módulo es uno de los más extensos del sistema, ya que gestiona el flujo físico y comercial de la hacienda en el predio ferial, dividiéndose en tres etapas clave:

1.  **Descarga**: Recepción de la hacienda y generación de la "Boleta de Descarga" (DTE, Guías, Transportista).
2.  **Embrete**: Clasificación de los animales en corrales y determinación del orden de venta.
3.  **Venta (Pista)**: Adjudicación de los lotes a los compradores (Boleta de Remate) y fijación de precios/plazos.

## 📋 Campos Principales (Schema)

Debido a la complejidad del recurso, los esquemas de datos varían según la etapa del proceso.

### 1. Boleta de Descarga (Recepción)
Objeto para ingresar la hacienda al predio.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idPuestoCarga` | Int | Puesto de trabajo (Clave). | Sí |
| `idRemateFeria` | Int | ID del remate (Clave). | Sí |
| `idCtaAuxi` | String | Código del Vendedor/Productor. | Sí |
| `nroDeRemitoOGuia` | String | Número de documento de tránsito. | No |
| `transportista` | String | Nombre del transportista. | No |
| `items` | Array | Detalle de cabezas por categoría/especie. | Sí |
| `imagenes` | Array | Fotos de la descarga/documentos. | No |

### 2. Embrete (Clasificación)
Objeto para asignar la hacienda descargada a un corral específico.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idEmbrete` | Int | ID único (0 para nuevo). | Sí |
| `sigla` | String | Código del corral (ej: "A-10"). | Sí |
| `cantidadCabezas` | Int | Cantidad de animales en el corral. | Sí |
| `boletasDescargaAfectadas` | Array | Vinculación con el origen (Descarga). | Sí |

### 3. Boleta de Remate (Venta)
Objeto para registrar la venta (martillo).

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idBoletaDeRemate` | Int | ID de la boleta (0 si es nueva asignación). | Sí |
| `idEmbrete` | Int | ID del lote que se está vendiendo. | Sí |
| `precio` | Decimal | Precio de venta (por Kg o Cabeza). | Sí |
| `idCtaAuxiCom` | String | Código del Comprador. | Sí |
| `idPlazoCom` | Int | ID del plazo de pago acordado. | No |
| `kilosBrutos` | Decimal | Pesaje de salida (si aplica). | No |

---

## 🛠 Operaciones Disponibles

### 1. Gestión de Remates y Corrales
* **Listar Remates** (`getAll`): Lista los eventos de remate disponibles.
* **Obtener Detalle** (`get`): Datos de cabecera de un remate específico.
* **Listar Corrales** (`getCorrales`): Maestros de corrales del lugar.

### 2. Etapa Descarga (Ingreso)
* **Listar Descargas** (`getBoletasDescarga`): Ver ingresos registrados.
* **Crear Descarga** (`createBoletaDescarga`): Dar de alta una nueva boleta de recepción.
* **Gestión de Imágenes** (`addImagen`, `getImagenes`): Adjuntar fotos a la descarga.

### 3. Etapa Embrete (Corrales)
* **Listar Pendientes** (`getPendientesEmbretar`): Ver qué descargas aún no tienen corral asignado.
* **Crear Embrete** (`createEmbrete`): Asignar hacienda a un corral.
* **Orden de Venta** (`getOrdenVenta`, `setOrdenVenta`): Gestionar la secuencia de salida a pista.

### 4. Etapa Venta (Martillo)
* **Listar Pendientes de Venta** (`getPendientesVenta`): Lotes embretados listos para rematar.
* **Asignar Comprador** (`asignarComprador`): **Operación Crítica**. Registra la venta, asignando precio y comprador al lote.
* **Modificar Kilos** (`updateKilos`): Ajuste de pesaje posterior a la venta.

---

## 💡 Ejemplos de JSON

### 1. Registrar Descarga (Ingreso de Hacienda)
Recepción de 20 Terneros del productor "P001".

**Operación**: `Crear Descarga`

```json
{
  "idPuestoCarga": 1,
  "idRemateFeria": 500,
  "idBoletaDeDescarga": 0,
  "fecha": "2026-01-14T08:00:00.000Z",
  "idCtaAuxi": "P001",
  "nroDeRemitoOGuia": "1234-5678",
  "transportista": "Transportes El Rápido",
  "items": [
    {
      "idEspecie": 1,
      "idCategoria": 5,
      "cabezasAnotadas": 20
    }
  ]
}
```

### 2. Registrar Venta (Asignar Comprador)
Venta del Embrete 105 al Comprador "C020" a $2200 el kilo.

**Operación**: ``Asignar Comprador``

```json
{
  "idPuestoCarga": 1,
  "idRemateFeria": 500,
  "idBoletaDeRemate": 0,
  "idEmbrete": 105,
  "precio": 2200.00,
  "precioSeRefiereALosKilos": true,
  "idCtaAuxiCom": "C020",
  "observaciones": "Lote parejo"
}
```

### 3. Consultar Lotes Vendidos
Ver qué se vendió en el remate actual.

**Operación**: ``Listar Boletas Compradas (Endpoint /boletas-de-remate/compradas)``

**Parámetros**:

* IdPuestoCarga: ``1``

* IdRemateFeria: ``500``

---

## ⚠️ Notas Técnicas
* **Clave Compuesta**: La identificación de cualquier entidad dentro de un remate (Descarga, Embrete, Venta) requiere obligatoriamente el par ``IdPuestoCarga`` + ``IdRemateFeria``.

* **Flujo Secuencial**: El sistema valida el stock físico lógica: No se puede embretar (asignar corral) una cantidad mayor a la descargada, y no se puede vender (asignar comprador) un lote que no esté embretado.

* **Boleta de Remate**: La operación ``POST`` ``/boletas-de-remate`` es idempotente en cuanto a edición: si se envía ``idBoletaDeRemate: 0`` crea una nueva venta; si se envía un ID existente, modifica los datos de esa venta (ej: cambio de comprador o precio).