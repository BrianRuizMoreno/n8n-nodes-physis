# Módulo SAVEC (Ventas y Comercialización)

El módulo **SAVEC** administra la gestión comercial de la empresa. A diferencia de SACER (focalizado en el acopio físico), SAVEC se centra en los **Negocios**, **Contratos** y la **Relación con el Cliente (CRM)**.

Gestiona desde la oportunidad comercial temprana y el seguimiento de actividades, hasta la formalización del contrato, la definición de tarifas y la consulta de las ventas liquidadas.

Este módulo expone recursos clave para el equipo comercial y administrativo.

---

## 🤝 1. Gestión Comercial y CRM
Recursos dedicados a la generación de negocios y seguimiento de clientes.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **CRM** | **(Nuevo)** Gestión integral de oportunidades de venta (Deals/Negocios), actividades de seguimiento, agenda de contactos y repositorio de documentos adjuntos. | [Ver detalle](./crm/README.md) |
| **Contrato** | Administración del ciclo de vida de los contratos de compra-venta de granos (Altas, consultas, cupos y condiciones). | [Ver detalle](./contrato/README.md) |
| **Venta Campo** | Recurso de consulta y reportes para operaciones de venta directa, liquidaciones emitidas y cartas de porte asociadas. | [Ver detalle](./ventaCampo/README.md) |

## ⚙️ 2. Configuraciones y Maestros
Definiciones estructurales que regulan el comportamiento del sistema comercial.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Tipo de Contrato** | Define las clases de acuerdos disponibles (ej: "Exportación", "A Fijar", "Canje") y sus reglas de negocio (si lleva certificado, si admite fijaciones). | [Ver detalle](./tipoContrato/README.md) |
| **Tipo de Formulario** | Configura el comportamiento contable y administrativo de los distintos comprobantes del sistema (cuentas por defecto, validaciones). | [Ver detalle](./tipoFormulario/README.md) |
| **Concepto** | Maestro de ítems facturables o liquidables (servicios, impuestos, bonificaciones) con su configuración impositiva. | [Ver detalle](./concepto/README.md) |
| **Definición** | Configuraciones generales y parámetros globales del módulo de ventas. | [Ver detalle](./definicion/README.md) |

## 📉 3. Logística y Costos
Control de movimientos de stock y tablas de precios de servicios.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Tarifas** | Administración unificada de tablas de costos: **Tarifas de Cosecha** (por rinde) y **Tarifas de Secado** (por humedad). | [Ver detalle](./tarifas/README.md) |
| **Motivo Retiro** | Catálogo de justificaciones para la salida de mercadería del stock (Ventas, Ajustes, Traslados). | [Ver detalle](./motivoRetiro/README.md) |

## 🗃️ 4. Auxiliares y Datos Base
End-points de utilidad para obtener datos maestros transversales.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Auxiliar** | Acceso rápido a maestros fundamentales: Listado de **Campañas** agrícolas, **Cereales** y consulta de **Stock Físico**. | [Ver detalle](./auxiliar/README.md) |

---

### ¿Por dónde empezar?

* Si estás integrando una herramienta de **Fuerza de Ventas** o App Móvil para comerciales, comienza por **[CRM](./crm/README.md)** y **[Contrato](./contrato/README.md)**.
* Si necesitas generar **Reportes de Gestión** o Dashboards de ventas, revisa **[Venta Campo](./ventaCampo/README.md)** y **[Auxiliar](./auxiliar/README.md)** (para obtener campañas y stocks).
* Si estás configurando una nueva implementación, define primero los **[Tipos de Contrato](./tipoContrato/README.md)** y **[Tarifas](./tarifas/README.md)**.