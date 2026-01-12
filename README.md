<<<<<<< HEAD
<h1 align="center">n8n-nodes-physis</h1>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/Written%20in-TypeScript-3178C6)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Physis-ERP-22BC18)](https://physis.com.ar)
[![Status](https://img.shields.io/badge/Status-Private%20%2F%20Internal-red)]()

</div>

<div align="center">
  <img src="https://physis.com.ar/wp-content/uploads/2025/02/physis.png" alt="Physis Logo" width="200"/>
  <br>
  <p><strong>Integración de Physis Informática S.R.L. para n8n</strong></p>
  <p><em>Uso exclusivo para personal autorizado e implementaciones locales.</em></p>
</div>

---

## 🚀 Introducción

**n8n-nodes-physis** permite conectar los flujos de trabajo de automatización de n8n con la potencia del Sitema **Physis**. Esta integración soporta los 6 módulos principales del sistema, permitiendo controlar desde la contabilidad hasta la producción agropecuaria directamente desde tus workflows.

> ⚠️ **Aviso Importante**: Este nodo no se distribuye públicamente. Su instalación debe realizarse de manera manual en servidores autorizados.

## 📦 Instalación

Al ser un nodo privado, existen dos formas principales de instalarlo en tu instancia de n8n:

### Opción 1: Instalación desde Archivo `.tgz` (Producción)
Si has recibido el paquete empaquetado (`.tgz`), sigue estos pasos:

1.  Copia el archivo `.tgz` al servidor donde corre n8n (ej: `/home/usuario/.n8n/`).
2.  Navega al directorio de n8n:
    ```bash
    cd ~/.n8n
    ```
3.  Instala el paquete directamente desde el archivo:
    ```bash
    npm install /ruta/al/archivo/n8n-nodes-physis-0.3.0.tgz
    ```
4.  Reinicia n8n.

### Opción 2: Instalación Local (Desarrollo / Código Fuente)
Si tienes acceso al código fuente y necesitas realizar modificaciones:

1.  Clona el repositorio en tu máquina.
2.  En la carpeta del nodo, construye el proyecto:
    ```bash
    npm install
    npm run build
    ```
3.  Vincula el paquete globalmente:
    ```bash
    npm link
    ```
4.  Ve a tu carpeta de configuración de n8n (usualmente `~/.n8n`) y vincula el nodo:
    ```bash
    cd ~/.n8n
    npm link n8n-nodes-physis
    ```
5.  Inicia n8n.

---

## 🔐 Credenciales

El nodo utiliza autenticación basada en API Token (JWT).

1.  En n8n, agrega una nueva credencial de tipo **Physis API**.
2.  **Base URL**: Ingresa la URL de tu servidor Physis (ej: `https://api.tu-empresa.com`).
3.  **Access Token**: Ingresa el token proporcionado por el administrador del sistema Physis.

---

## 🛠 Módulos y Recursos Disponibles

El nodo está organizado modularmente para reflejar la estructura de Physis:

### 🏢 SIGES (Gestión y Contabilidad)
*El núcleo administrativo. Ideal para sincronización de maestros y reportes.*
* **Entidades**: Terceros (Clientes/Proveedores), Usuarios.
* **Finanzas**: Bancos, Chequeras, Valores (E-Cheq), Cuentas Corrientes.
* **Contabilidad**: Comprobantes, Asientos, Planes de Cuentas, Monedas.
* **Reportes**: Saldos, Libro Mayor, Resúmenes.

### 🛒 SIFAC (Facturación y Ventas)
*Motor comercial para la gestión del ciclo de venta.*
* **Catálogo**: Productos, Listas de Precios, Depósitos.
* **Ventas**: Pedidos, Remitos de Salida, Facturación Electrónica.
* **Stock**: Consulta de existencia multi-depósito y movimientos.
* **Logística**: Transportes, Zonas, Vendedores.

### 🌾 SAVEC (Granos)
*Gestión comercial de cereales y contratos.*
* **Contratos**: Canje, Compra-Venta.
* **CRM**: Negocios, Actividades con productores.
* **Operativa**: Ventas a Campo, Liquidaciones.

### 🚚 SACER (Acopio)
*Logística de planta y movimiento físico de granos.*
* **Documentación**: Cartas de Porte (CPG), Descarga de PDFs.
* **Calidad**: Análisis de laboratorio, Mermas.
* **Logística**: Choferes, Camiones, Tarifas.
* **Infraestructura**: Silos y Plantas.

### 🐄 SACH (Hacienda)
*Solución vertical para el mercado ganadero.*
* **Eventos**: Remates Feria.
* **Animales**: Lotes, Categorías, Razas.
* **Comercial**: Liquidaciones de Compra/Venta.

### 🚜 SILAB (Agro)
*Producción a campo y trazabilidad.*
* **Producción**: Campañas, Lotes, Establecimientos.
* **Labores**: Órdenes de Trabajo (OT), Partes de Labor.
* **Recursos**: Maquinaria, Insumos, Personal.

---

## 🤝 Soporte y Contribución

Este proyecto es mantenido internamente.
Si encuentras un error o necesitas una nueva funcionalidad:

1.  Contacta al equipo de desarrollo interno.
2.  Reporta el incidente en el sistema de tickets de la empresa.

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.
Desarrollado por **BrianRuizMoreno**.

---
<div align="center">
  <sub>Integración Privada - Physis Informática S.R.L.</sub>
=======
<h1 align="center">n8n-nodes-physis</h1>

<div align="center">

[![npm version](https://img.shields.io/npm/v/n8n-nodes-physis?color=red)](https://www.npmjs.com/package/n8n-nodes-physis)
[![n8n](https://img.shields.io/badge/n8n-Community%20Node-ff6d5a)](https://n8n.io)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/Written%20in-TypeScript-3178C6)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Physis-ERP-22BC18)](https://physis.com.ar)

</div>

<div align="center">
  <img src="https://physis.com.ar/wp-content/uploads/2025/02/physis.png" alt="Physis Logo" width="200"/>
  <br>
  <p><strong>Integración completa de Physis Informática S.A. para n8n</strong></p>
</div>

## Physis Node

Este proyecto comenzó como una necesidad de conectar los flujos de trabajo de automatización con la potencia de **Physis**. Hoy, **n8n-nodes-physis** ha crecido hasta convertirse en una integración completa que soporta los 6 módulos principales del sistema, permitiendo controlar desde la contabilidad hasta la producción agropecuaria directamente desde tus workflows.

Actualmente, el nodo no se limita a consultas básicas. Integra funcionalidades complejas como la gestión de **Hacienda (SACH)**, **Acopio (SACER)**, **Facturación (SIFAC)** y **Producción (SILAB)**, ofreciendo un array de más de 40 recursos disponibles.

## Módulos Soportados

El nodo soporta múltiples tipos de conexiones a los distintos servicios de Physis, permitiendo una integración flexible y potente:

- **SIGES (Gestión y Contabilidad)**:
  - El núcleo administrativo. Permite el control total de entidades, tesorería, contabilidad y usuarios del sistema.
  - Ideal para sincronizar clientes, conciliar bancos y generar reportes contables automatizados.

- **SIFAC (Facturación y Ventas)**:
  - El motor comercial. Gestiona el ciclo de vida completo de la venta, desde el pedido hasta la factura electrónica.
  - Soporta listas de precios, stock multi-depósito y gestión de logística.

- **SACH (Hacienda)**:
  - Solución vertical para el mercado ganadero. Gestiona remates, lotes de animales y liquidaciones de compra/venta.

- **SAVEC (Granos)**:
  - Especializado en la comercialización de cereales. Administra contratos, fijaciones y la relación CRM con el productor.

- **SACER (Acopio)**:
  - Logística y planta. Controla el flujo físico de granos, cartas de porte, descargas en planta y calidad.

- **SILAB (Agro)**:
  - Producción a campo. Gestiona órdenes de trabajo, labores, insumos y trazabilidad de lotes agrícolas.

## Recursos e Integraciones

El nodo proporciona acceso a una vasta lista de recursos organizados por módulo. A continuación se detallan las capacidades:

### 🏢 SIGES (Core)
* **Entidades**: Gestión completa de Terceros (Clientes/Proveedores) y Usuarios.
* **Finanzas**: Bancos, Chequeras, Valores (Cheques/E-Cheq) y Cuentas Corrientes.
* **Contabilidad**: Comprobantes, Ejercicios Contables, Monedas y Planes de Cuentas.
* **Reportes**: Informes de Saldos, Resúmenes de Cuenta y Libro Mayor.
* **Utilidades**: Estructura Geográfica (Países/Provincias) y Tipos de Comprobante.

### 🛒 SIFAC (Ventas)
* **Catálogo**: Productos y Listas de Precios.
* **Transaccional**: Pedidos de Venta, Remitos y Facturación (Comprobantes).
* **Stock**: Consulta de existencia por Depósito y movimientos.
* **Logística**: Gestión de Transportes, Zonas y Vendedores.
* **Compras**: Órdenes de Compra y Remitos de Ingreso.

### 🐄 SACH (Hacienda)
* **Remates Feria**: Gestión de eventos de remate.
* **Animales**: Administración de Lotes, Categorías, Razas y Especies.
* **Liquidación**: Generación de liquidaciones de compra y venta.
* **Entidades**: Clientes específicos y Comisionistas.

### 🌾 SAVEC (Granos)
* **Contratos**: Administración de contratos de canje y compra-venta.
* **CRM Agrícola**: Gestión de Negocios, Actividades y Contactos.
* **Operativa**: Ventas a Campo y Liquidaciones.
* **Definiciones**: Maestros de Cereales y Campañas.

### 🚚 SACER (Acopio)
* **Documentación**: Gestión de Cartas de Porte (CPG) y descarga de PDFs.
* **Laboratorio**: Análisis de Calidad y Variedades.
* **Logística**: Choferes, Tarifas de Flete y Transportistas.
* **Infraestructura**: Gestión de Plantas y Silos.

### 🚜 SILAB (Agro)
* **Producción**: Gestión de Campañas y Actividades.
* **Labor**: Órdenes de Trabajo y Partes de Labor (Upsert/Delete).
* **Campo**: Estructura de Lotes y Establecimientos.
* **Recursos**: Maquinaria (Tractores/Implementos), Insumos y Personal.
* **Tambo**: Control de producción diaria.

## Instalación

Para utilizar este nodo en tu instancia de n8n:

1.  Ve a tu carpeta de nodos personalizados (ej: `~/.n8n/custom`).
2.  Ejecuta el enlace del paquete:
    ```bash
    npm link n8n-nodes-physis
    ```
3.  Reinicia n8n.

## Credenciales

El nodo utiliza autenticación basada en Token contra la API de Physis.

- **Base URL**: La dirección de tu servidor (ej: `https://api.tu-empresa.com`).
- **Access Token**: Tu JWT o API Key proporcionada por Physis.

## Licencia

Este proyecto está bajo la licencia **MIT**.

1.  **Uso Libre**: Eres libre de usar, modificar y distribuir este nodo.
2.  **Sin Garantía**: El software se proporciona "tal cual", sin garantía de ningún tipo.

---
<div align="center">
  <sub>Desarrollado para la comunidad de n8n y usuarios de Physis.</sub>
>>>>>>> b7319d8b76a654549e2abdeb482227fb7a5a3542
</div>