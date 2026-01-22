# Módulo SIFAC (Facturación, Compras y Stock)

El módulo **SIFAC** es el núcleo administrativo del ERP. A diferencia de los módulos de granos (SACER/SAVEC), SIFAC se encarga de la **comercialización de insumos**, **mercaderías generales** y **servicios**.

Administra el ciclo completo de la operación estándar: desde la gestión del inventario y listas de precios, pasando por el circuito de ventas (Pedidos, Remitos, Facturas) y compras, hasta la logística de entrega.

Este módulo expone recursos fundamentales para integraciones de E-commerce, Apps de Preventa y Tableros de Control.

---

## 📦 1. Productos y Stock
Recursos destinados a la administración del catálogo, precios y control de inventario.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Productos** | Maestro de artículos. Consulta de datos técnicos, impuestos y stock disponible por depósito. | [Ver detalle](./productos/README.md) |
| **Productos Stock** | Gestión de inventario físico. Permite realizar **Ajustes de Stock**, consultas de saldos y movimientos (Kardex). | [Ver detalle](./productosStock/README.md) |
| **Precios** | Administración de Listas de Precios. Actualizaciones masivas, vigencias y consulta de cotizaciones. | [Ver detalle](./precios/README.md) |
| **Unidades** | Maestro de unidades de medida (Kgs, Lts, Uni) y sus homologaciones fiscales (Códigos AFIP). | [Ver detalle](./unidades/README.md) |

## 🤝 2. Gestión Comercial (Ventas)
Recursos para el ciclo de venta, desde la captación del cliente hasta la entrega.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Clientes** | Maestro de clientes (Deudores). Gestión de datos fiscales, domicilios de entrega y condiciones de venta. | [Ver detalle](./clientes/README.md) |
| **Pedidos** | **(Nota de Venta)** Inicio del circuito comercial. Creación de pedidos, reserva de mercadería y autorización. | [Ver detalle](./pedidos/README.md) |
| **CC Insumos** | **(Reportes)** Trazabilidad comercial. Permite consultar el estado de cumplimiento (¿Cuánto se entregó de un pedido? ¿Cuánto se facturó?). | [Ver detalle](./ccInsumos/README.md) |
| **Descuentos** | Configuración de bonificaciones comerciales (Porcentuales o Importes Fijos) asignables a clientes. | [Ver detalle](./descuentosClientes/README.md) |
| **Vendedores** | Gestión de la fuerza de ventas, estructura jerárquica y comisiones. | [Ver detalle](./vendedores/README.md) |
| **Zonas** | Segmentación geográfica o lógica de clientes para distribución y logística. | [Ver detalle](./zonas/README.md) |

## 🚚 3. Logística y Distribución
Administración de la flota y entidades de transporte.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Transportes** | Maestro de empresas de transporte y logística. | [Ver detalle](./transportes/README.md) |
| **Conductores** | Maestro de choferes. Datos de licencias y documentos para Cartas de Porte y COT. | [Ver detalle](./conductores/README.md) |

## 🛡️ 4. Seguridad y Permisos
Configuraciones de seguridad a nivel de datos (Row Level Security) para grupos de usuarios.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Grupos Permisos** | Restricciones de visibilidad de **Productos** y **Depósitos** por grupo de usuario. | [Ver detalle](./gruposPermisos/README.md) |
| **Grupos Prov.** | Restricciones sobre condiciones de compra (Pagos, Transportes habilitados) por grupo. | [Ver detalle](./gruposProveedores/README.md) |
| **Grupos Cuentas** | (En *Varios*) Restricción de visibilidad de Clientes/Proveedores específicos. | [Ver detalle](./varios/README.md) |

## ⚙️ 5. Configuraciones y Utilidades
Tablas maestras y herramientas transversales.

| Recurso | Descripción Breve | Documentación |
| :--- | :--- | :---: |
| **Tipos Comp.** | Definición de documentos (Facturas, Remitos) y su comportamiento (Mueve stock, Signo, Numeración). | [Ver detalle](./tiposComprobante/README.md) |
| **Tipos Tasas** | Tabla de alícuotas impositivas (IVA, Impuestos Internos). | [Ver detalle](./tiposTasas/README.md) |
| **Observaciones** | Catálogo de notas predefinidas para estandarizar leyendas en comprobantes. | [Ver detalle](./observaciones/README.md) |
| **Imágenes** | Gestión de adjuntos y digitalización de documentos asociados a comprobantes. | [Ver detalle](./imagenes/README.md) |
| **Varios** | Utilidades generales: Conceptos (Items no stockeables) y Motor de Consultas Dinámicas de Terceros. | [Ver detalle](./varios/README.md) |

---

### ¿Por dónde empezar?

* **Integración E-commerce / App B2B:**
    * Comienza sincronizando **[Productos](./productos/README.md)** y **[Precios](./precios/README.md)**.
    * Gestiona el alta de **[Clientes](./clientes/README.md)**.
    * Envía las órdenes mediante **[Pedidos](./pedidos/README.md)**.

* **Tableros de BI / Reporting:**
    * Utiliza **[CC Insumos](./ccInsumos/README.md)** para analizar pendientes de entrega y facturación.
    * Usa **[Varios (Consulta Terceros)](./varios/README.md)** para reportes ad-hoc de la cartera de clientes.

* **App de Logística:**
    * Consulta **[Transportes](./transportes/README.md)** y **[Conductores](./conductores/README.md)** para asignar viajes.