# Módulo SACER (Acopio y Logística)

El módulo **SACER** es el núcleo operativo para la gestión de acopio de cereales. Administra el ciclo físico del grano: desde la definición del origen (campo), su transporte y recepción en planta, hasta el análisis de calidad y la gestión de contratos.

Este módulo expone **24 recursos** diseñados para controlar la trazabilidad y la administración granaria.

---

## 🚜 1. Gestión de Origen y Campo
Recursos para modelar la estructura productiva y la procedencia de la mercadería.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Campo** | Gestiona la jerarquía productiva (*Zona > Establecimiento > Campo > Lote*). | [Ver detalle](./campo/README.md) |
| **Establecimiento** | Administra las unidades productivas o "estancias" asociadas a un productor. | [Ver detalle](./establecimiento/README.md) |
| **Suelo** | Catálogo de tipos de suelo para la clasificación agronómica de los lotes. | [Ver detalle](./suelo/README.md) |
| **Tercero** | Maestro de entidades (Productores, Clientes, Proveedores) que interactúan con el sistema. | [Ver detalle](./tercero/README.md) |

## 🚚 2. Logística y Acopio
Control del flujo físico, transporte e infraestructura de almacenamiento.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Carta de Porte** | Gestión integral de CPG (Cartas de Porte de Granos). Búsqueda, creación y descarga de PDF. | [Ver detalle](./cartaPorte/README.md) |
| **Logística** | Administración de choferes, camiones y empresas de transporte. | [Ver detalle](./logistica/README.md) |
| **Tarifa Flete** | Tablas de costos de transporte (por Km o tarifa plana). | [Ver detalle](./tarifaFlete/README.md) |
| **Infraestructura** | Gestión de Plantas, Silos y Celdas. Control de capacidad y stock físico. | [Ver detalle](./infraestructura/README.md) |
| **Numerador** | Configuración de puntos de venta y secuencias de numeración para comprobantes. | [Ver detalle](./numerador/README.md) |

## 🌾 3. Comercial y Contratos
Gestión de acuerdos comerciales y seguimiento de saldos físicos.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Contrato** | Administración de contratos de compra-venta, canje y consignación. | [Ver detalle](./contrato/README.md) |
| **Tipo de Contrato** | Definición de modalidades de contratación y sus reglas de negocio. | [Ver detalle](./tipoContrato/README.md) |
| **Fijación** | Operaciones de fijación de precio para contratos "A Fijar". | [Ver detalle](./fijacion/README.md) |
| **Cta. Cte. Granos** | Consulta del "Libro Mayor" físico del productor (Entregado vs. Liquidado). | [Ver detalle](./cuentaCorrienteGranos/README.md) |
| **Campaña** | Definición de los ciclos agrícolas (ej: *Trigo 23/24*). | [Ver detalle](./campania/README.md) |

## 🧪 4. Calidad y Laboratorio
Definición de productos y parámetros analíticos.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Cereal** | Maestro de especies (Trigo, Soja, Maíz) y configuraciones base. | [Ver detalle](./cereal/README.md) |
| **Variedad** | Sub-clasificaciones genéticas o comerciales dentro de cada cereal. | [Ver detalle](./variedad/README.md) |
| **Calidad** | Rubros de análisis (Proteína, Dañados) y tablas de bonificación/rebaja. | [Ver detalle](./calidad/README.md) |
| **Humedad** | Tablas de merma por humedad para el cálculo de peso neto seco. | [Ver detalle](./humedad/README.md) |

## 📊 5. Administrativo y Contable
Configuraciones impositivas y de emisión de documentos.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Imputación IVA** | Tasas y alícuotas de IVA aplicables a los distintos conceptos. | [Ver detalle](./imputacionIVA/README.md) |
| **Imput. Contables** | Mapeo de cuentas contables para la generación automática de asientos. | [Ver detalle](./imputacionesContable/README.md) |
| **Forma de Pago** | Condiciones financieras habilitadas (Contado, 30 días, etc.). | [Ver detalle](./formaPago/README.md) |
| **Formato** | Definición de diseños de impresión para los comprobantes. | [Ver detalle](./formato/README.md) |
| **Tipo de Formato** | Clasificación y reglas de comportamiento para los formatos de impresión. | [Ver detalle](./tipoFormato/README.md) |
| **Varios** | Utilidades generales: Localidades, Sucursales y Consultas auxiliares. | [Ver detalle](./varios/README.md) |

---

### ¿Por dónde empezar?

* **Para Operativa Diaria**: Comienza por [Carta de Porte](./cartaPorte/README.md) (ingresos) y [Contrato](./contrato/README.md) (comercial).
* **Para Configuración Inicial**: Define primero [Cereal](./cereal/README.md), [Campaña](./campania/README.md) e [Infraestructura](./infraestructura/README.md).
* **Para Integración Contable**: Revisa [Imputaciones Contables](./imputacionesContable/README.md) y [Tercero](./tercero/README.md).