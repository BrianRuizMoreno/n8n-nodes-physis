# Módulo SACER (Acopio y Logística)

El módulo **SACER** es el corazón operativo para empresas de acopio de cereales. Gestiona el ciclo de vida completo del grano: desde que se define el campo de origen, pasando por el transporte (Carta de Porte) y su ingreso a planta, hasta la liquidación y análisis de calidad.

Este módulo expone **22 recursos** divididos en 5 áreas funcionales para controlar cada aspecto del negocio.

---

## 🚜 1. Gestión de Origen y Campo
Recursos dedicados a la trazabilidad del lugar físico de producción.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Campo** | Gestiona la estructura jerárquica de producción (*Zona > Establecimiento > Campo > Lote*). Fundamental para la trazabilidad. | [Ver detalle](./campo/README.md) |
| **Establecimiento** | Administra las unidades productivas o "estancias" asociadas a un productor (Tercero). | [Ver detalle](./establecimiento/README.md) |
| **Lote** | (Accesible vía *Campo* o *Varios*) Define las parcelas específicas de siembra dentro de un campo. | [Ver detalle](./lote/README.md) |
| **Suelo** | Configuración de tipos de suelo para clasificación agronómica de los lotes. | [Ver detalle](./suelo/README.md) |

## 🚚 2. Logística y Documentación
Control del movimiento físico y transporte de la mercadería.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Carta de Porte** | Gestión integral de CPG (Cartas de Porte de Granos). Permite buscar, crear y descargar PDFs de los documentos de tránsito. | [Ver detalle](./cartaPorte/README.md) |
| **Logística** | Administración de **Conductores** (Choferes) y su relación con transportistas. | [Ver detalle](./logistica/README.md) |
| **Tarifa Flete** | Tablas de precios de transporte por kilómetro o zona. | [Ver detalle](./tarifaFlete/README.md) |
| **Motivo Retiro / Venta a Campo** | Gestión de movimientos directos o retiros de mercadería sin paso por planta. | [Ver detalle](./motivoRetiro/README.md) |

## 🏭 3. Infraestructura y Planta
Administración de los activos físicos de acopio.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Infraestructura** | Gestión de **Plantas** (Centros de acopio) y **Silos** (Celdas de almacenaje físico). Control de stock físico. | [Ver detalle](./infraestructura/README.md) |
| **Numerador** | Configuración de secuencias y puntos de venta para la emisión de documentos en cada planta. | [Ver detalle](./numerador/README.md) |
| **Formatos** | Definición de los formatos de impresión y tipos de comprobantes habilitados. | [Ver detalle](./formato/README.md) |

## 🌾 4. Comercial y Contratos
Gestión de los acuerdos comerciales y la cuenta corriente granaria.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Contrato** | Administración de contratos de compra-venta, canje y consignación. | [Ver detalle](./contrato/README.md) |
| **Fijación** | Operaciones de fijación de precio sobre contratos a fijar. | [Ver detalle](./fijacion/README.md) |
| **Cuenta Corriente Granos** | Consulta del estado de cuenta físico del productor (Entregado vs. Liquidado/Retirado). | [Ver detalle](./cuentaCorrienteGranos/README.md) |
| **Campaña** | Definición de ciclos agrícolas (ej: *Trigo 23/24*) para segmentar la operación. | [Ver detalle](./campania/README.md) |

## 🧪 5. Calidad y Definiciones
Parámetros técnicos y maestros del sistema.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Cereal** | Maestro de especies (Trigo, Soja, Maíz, etc.) y sus configuraciones base. | [Ver detalle](./cereal/README.md) |
| **Variedad** | Sub-tipos o variedades específicas dentro de cada cereal. | [Ver detalle](./variedad/README.md) |
| **Calidad** | Definición de rubros de calidad (Proteína, Materia Grasa, Dañados) para los análisis de laboratorio. | [Ver detalle](./calidad/README.md) |
| **Humedad** | Tablas de merma por humedad para el cálculo de peso neto. | [Ver detalle](./humedad/README.md) |
| **Imputación IVA** | Configuración contable para la correcta alícuota de impuestos en las operaciones. | [Ver detalle](./imputacionIVA/README.md) |
| **Forma de Pago** | Condiciones de pago habilitadas para las transacciones comerciales. | [Ver detalle](./formaPago/README.md) |
| **Varios** | Utilidades diversas: Descarga de **Liquidaciones (PDF)**, consulta de **Muestras**, Localidades y Sucursales. | [Ver detalle](./varios/README.md) |

---

### ¿Por dónde empezar?
Si estás automatizando la **entrada de camiones**, comienza por [Carta de Porte](./cartaPorte/README.md).
Si necesitas sincronizar **datos maestros**, revisa [Campo](./campo/README.md) y [Cereal](./cereal/README.md).

Si necesitas ayuda para comenzar, contáctanos!