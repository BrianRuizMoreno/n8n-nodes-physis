# Recurso Varios (SACER)

El recurso **Varios** actúa como un módulo de utilidades generales y tablas maestras auxiliares dentro de SACER. Agrupa funcionalidades diversas esenciales para la operación diaria, que van desde la trazabilidad de origen (Lotes) y control de calidad (Muestras), hasta servicios de infraestructura (Sucursales, Localidades) y generación de documentos oficiales (PDFs).

---

## 📋 Estructuras de Datos Principales

A diferencia de otros recursos, este módulo maneja múltiples entidades distintas. A continuación se detallan las más complejas:

### 1. Objeto Lote
Identifica el origen físico de la producción (campo/lote). Es crítico para la confección de Cartas de Porte y Contratos.
* **Identificación**: Se puede referenciar por un ID único (`codLote`) o por la combinación de Productor (`idAuxi`) + Cuenta (`idCtaAuxi`) + Establecimiento.

### 2. Objeto Muestra
Representa la extracción física de granos (calada) de un camión para su análisis de laboratorio.
* **Estados posibles**:
    * `0`: Nueva (Recién ingresada).
    * `1`: Aprobada (Conforme).
    * `2`: En Espera (Revisión).
    * `3`: Rechazada (Se rechaza el camión).
    * `5`: Pesada (Ya pasó por balanza).

---

## 🛠 Operaciones Disponibles

### 🌾 Gestión de Lotes (Origen)
Permite buscar los lotes donde se origina el cereal.

* **Obtener por Código** (`getLoteByCodigo`): Recupera un lote específico utilizando su identificador numérico único.
* **Buscar Lotes de Productor** (`getLoteByCuenta`): Devuelve los lotes asociados a un titular y cuenta específica.
    * *Filtros*: `CodCampania`, `idEstablecimiento`, `NroContrato`.

### 🧪 Calidad y Muestras
Gestión del calado y análisis de calidad de los camiones.

* **Listar Muestras** (`getMuestras`): Consulta general de muestras registradas.
    * *Filtros*:
        * `estado`: Filtrar por aprobación/rechazo.
        * `idCartaPorte`: Ver muestras de un viaje específico.
        * `codCampania`: Filtrar por ciclo productivo.
* **Obtener Detalle** (`getMuestra`): Datos específicos de una muestra individual (`idCartaPorte` + `NroMuestra`).

### 🌍 Geografía e Infraestructura
Tablas maestras para validación de datos.

* **Listar Localidades** (`getLocalidades`): Consulta el maestro de localidades, códigos postales y códigos ONCCA.
    * *Filtros*: `nombreLocalidad` (búsqueda parcial), `idProvincia`, `idPartido`, `idLocalidadOncca`.
* **Listar Sucursales** (`getSucursales`): Devuelve las plantas, sucursales y silos operativos del Centro de Costos activo.

### 📄 Documentación y Maestros
Utilidades para reportes y categorización.

* **Descargar PDF** (`getCertificadoPdf`): Genera y devuelve el enlace de descarga para el PDF oficial de un certificado o comprobante (ej. Certificado 1116A).
* **Tipos de Tercero** (`getTiposTercero`): Devuelve el catálogo de roles comerciales disponibles (ej. Corredor, Entregador, Destinatario, Comprador).

---

## 💡 Ejemplos de Uso

### 1. Buscar Lote para Carta de Porte
El usuario selecciona un productor y necesita ver sus lotes disponibles para la campaña actual (ID 25) en el establecimiento "La Estancia" (ID 4).

**Recurso**: `Varios`
**Operación**: `Lotes: Buscar por Cuenta`
**Parámetros**:
* **idAuxi**: `1020` (Código del Productor)
* **idCtaAuxi**: `PRO` (Cuenta Proveedor)
* **CodCampania**: `25`
* **idEstablecimiento**: `4`

### 2. Verificar Calidad de un Camión
Consultar si la muestra tomada al camión del viaje 9988 fue aprobada o rechazada.

**Recurso**: `Varios`
**Operación**: `Muestras: Listar`
**Parámetros**:
* **idCartaPorte**: `9988`
* **estado**: `4` (Traer todas las muestras, sin importar estado)

### 3. Obtener PDF de Certificado
Descargar la impresión oficial del certificado ID 5020 del ejercicio 2026.

**Recurso**: `Varios`
**Operación**: `Certificados: Generar PDF`
**Parámetros**:
* **idEjercicio**: `2026`
* **idComprobante**: `5020`

### 4. Normalizar Localidad
Buscar el código ONCCA para la localidad de "Pergamino".

**Recurso**: `Varios`
**Operación**: `Localidades: Listar`
**Parámetros**:
* **nombreLocalidad**: `Pergamino`
* **idProvincia**: `1` (Buenos Aires)

---

## ⚠️ Notas Técnicas
**Inputs Variables**: Al ser un recurso agrupador ("Varios"), preste especial atención a los campos que aparecen en pantalla al cambiar de **Operación**. Los parámetros requeridos para *Lotes* son completamente diferentes a los de *Certificados PDF*.

**Filtro de Localidades**: Se recomienda usar siempre al menos 3 caracteres en `nombreLocalidad` para evitar respuestas demasiado voluminosas del servidor que puedan causar timeout.