# Módulo SIGES (Sistema Integrado de Gestión)

El módulo **SIGES** constituye el **núcleo administrativo, financiero y contable** de la plataforma Physis. Es el corazón del ERP donde convergen las operaciones de todas las áreas (Ventas, Compras, Stock) para su registro fiscal y financiero.

Gestiona desde la configuración del comportamiento de los comprobantes y la lógica impositiva (IVA, Retenciones), hasta la administración compleja de la Tesorería (Valores, Billeteras, Cashflow) y la Inteligencia de Negocios (BI).

Este módulo es esencial para integraciones de **Fintechs**, **Tableros de Control Financiero**, **Automatización Contable** y **Apps de Aprobación**.

---

## 💰 1. Tesorería y Finanzas
Gestión del flujo de fondos, instrumentos financieros y conciliaciones.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Valores** | **(Core)** Gestión de la cartera de cheques (Propios y Terceros), E-Cheqs y disponibilidad financiera. | [Ver detalle](./Valores/README.md) |
| **Billeteras** | Integración con billeteras virtuales, conciliación de cobros QR y movimientos digitales. | [Ver detalle](./Billetera/README.md) |
| **Interdepósitos** | Gestión de lotes de clearing bancario, transferencias de fondos y envíos logísticos. | [Ver detalle](./Interdeposito/README.md) |
| **Vencimientos** | Análisis de **Cash Flow**. Proyección de deuda vencida y a vencer agrupada por zonas o rubros. | [Ver detalle](./Vencimientos/README.md) |
| **Control Diario** | Herramienta de conciliación masiva de movimientos bancarios mediante importación de archivos. | [Ver detalle](./ControlDiario/README.md) |

## 📊 2. Contabilidad e Impuestos
Definiciones fiscales y herramientas para reportes contables masivos.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Conceptos IVA** | Administración de alícuotas (21%, 10.5%) y categorías impositivas para artículos y servicios. | [Ver detalle](./ConceptosIVA/README.md) |
| **Retenciones** | Consulta de regímenes fiscales (Ganancias, IIBB) y validación de certificados emitidos. | [Ver detalle](./Retenciones/README.md) |
| **Tipos Comp. AFIP** | Tabla de homologación entre comprobantes internos y códigos oficiales de AFIP (FE, FCE). | [Ver detalle](./TiposComprobantesAFIP/README.md) |
| **Cuentas Temp** | **Buffer de Selección**. Permite seleccionar masivamente cuentas o terceros para generar reportes pesados. | [Ver detalle](./CuentasTemp/README.md) |

## ⚙️ 3. Configuración y Maestros
El "Cerebro" del sistema. Define las reglas de negocio y comportamiento de los documentos.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Tipos Comprobante** | Maestro de documentos (FAC, REM, REC). Define si mueven stock, generan asientos o piden CAE. | [Ver detalle](./TiposComprobante/README.md) |
| **Modelos** | Plantillas predefinidas para agilizar la carga (Defaults de vendedor, listas de precios, etc.). | [Ver detalle](./Modelo/README.md) |
| **Sistemas** | Catálogo de módulos funcionales activos en la instancia (Ventas, Compras, Stock). | [Ver detalle](./Sistemas/README.md) |
| **Combos** | Listas ligeras optimizadas para poblar selectores en UI (Vendedores, Condiciones de Venta). | [Ver detalle](./Combos/README.md) |
| **Textos** | Gestión de leyendas legales, plantillas de email y observaciones predefinidas. | [Ver detalle](./Texto/README.md) |

## 🚀 4. Operativa, Control y Varios
Herramientas para el flujo de trabajo diario, validaciones y utilidades específicas.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Comp. Pendientes** | Bandeja de entrada de documentos que requieren autorización, envío a AFIP o corrección. | [Ver detalle](./ComprobantePendiente/README.md) |
| **Firmas** | Captura y almacenamiento de firmas biométricas y evidencia digital (fotos DNI/Entrega). | [Ver detalle](./Firmas/README.md) |
| **QR** | Utilidad para leer y decodificar automáticamente el QR de facturas de AFIP (PDF/Imágenes). | [Ver detalle](./Qr/README.md) |
| **Varios** | Utilidades diversas: Nómina de **Firmantes**, validación de fechas contables y carga de gastos menores. | [Ver detalle](./Varios/README.md) |
| **Historia** | Acceso a expedientes clínicos (Exclusivo para verticales de Salud/Veterinaria). | [Ver detalle](./Historia/README.md) |

## 📈 5. Inteligencia de Negocios
Herramientas de análisis de datos.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **BI** | Gestión de Tableros de Comando, Cubos OLAP y persistencia de configuración de grillas (AgGrid). | [Ver detalle](./BI/README.md) |

---

### ¿Por dónde empezar?

* **Si estás construyendo un Dashboard Financiero:**
    * Comienza por **[Vencimientos](./Vencimientos/README.md)** para obtener la proyección de flujo de caja.
    * Utiliza **[BI](./BI/README.md)** para acceder a los cubos multidimensionales ya procesados.

* **Si desarrollas una App de Cobranzas/Pagos:**
    * Utiliza **[Comprobantes Pendientes](./ComprobantePendiente/README.md)** para ver qué hay que pagar/autorizar.
    * Consulta **[Valores](./Valores/README.md)** para ver la disponibilidad de cheques.
    * Usa **[Combos](./Combos/README.md)** para llenar los selectores de la interfaz rápidamente.

* **Si automatizas la carga de comprobantes (OCR/IA):**
    * Usa **[QR](./Qr/README.md)** para extraer datos fiables de los PDFs de AFIP.
    * Consulta **[Modelos](./Modelo/README.md)** para obtener los valores por defecto y completar la carga.
    * Valida los impuestos con **[Conceptos IVA](./ConceptosIVA/README.md)**.