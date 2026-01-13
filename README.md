<h1 align="center">n8n-nodes-physis</h1>

<div align="center">

[![Status](https://img.shields.io/badge/Status-Private%20%2F%20Internal-red)]()
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/Written%20in-TypeScript-3178C6)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Physis-Informatica-22BC18)](https://physis.com.ar)

</div>

<div align="center">
  <img src="https://physis.com.ar/wp-content/uploads/2025/02/physis.png" alt="Physis Logo" width="200"/>
  <br>
  <p><strong>Integración de Physis Informática S.R.L. para n8n</strong></p>
  <p><em>Uso exclusivo para personal autorizado e implementaciones locales.</em></p>
</div>

---

## 🚀 Introducción

**n8n-nodes-physis** es un nodo personalizado que permite conectar los flujos de trabajo de automatización de n8n con la potencia del **Sistema Physis**.

Esta integración está diseñada para interactuar nativamente con los diferentes módulos del sistema (Gestión, Facturación, Granos, Hacienda, etc.), permitiendo la lectura y escritura de información en tiempo real directamente desde tus workflows.

> ⚠️ **Aviso Importante**: Este paquete no se distribuye públicamente en npm. Su instalación debe realizarse de manera manual en servidores autorizados por el cliente.

---

## 📦 Instalación

Al ser un nodo privado, la instalación se realiza cargando el paquete en el servidor donde se ejecuta n8n.

### Pasos para la instalación (Archivo `.tgz`)

1.  Copia el archivo `.tgz` del paquete al servidor (ej: `/home/usuario/.n8n/`).
2.  Accede al directorio de configuración de n8n:
    ```bash
    cd ~/.n8n
    ```
3.  Instala el paquete indicando la ruta absoluta del archivo:
    ```bash
    npm install /ruta/absoluta/a/n8n-nodes-physis-0.3.0.tgz
    ```
4.  Reinicia la instancia de n8n para que cargue los nuevos nodos.

---

## 🔐 Configuración y Credenciales

Este nodo utiliza una única credencial global para autenticarse en todos los módulos.

1.  En n8n, busca y selecciona la credencial **Physis API**.
2.  Completa los siguientes campos obligatorios:
    * **Base URL**: La dirección web del servidor Physis del cliente (ej: `https://api.cliente-physis.com`).
    * **Access Token**: El token de seguridad (JWT o API Key) proporcionado por el administrador del sistema.

---

## 🛠 Módulos Disponibles

El nodo actúa como una puerta de entrada a todo el ecosistema Physis. Selecciona un módulo a continuación para ver su **documentación detallada** y lista de recursos:

| Módulo | Descripción | Documentación |
| :--- | :--- | :---: |
| **🏢 SIGES** | Gestión, Contabilidad y Finanzas. El núcleo administrativo. | [Ver Documentación](./nodes/Physis/resources/siges/README.md) |
| **🛒 SIFAC** | Facturación y Ventas. Ciclo comercial y stock. | [Ver Documentación](./nodes/Physis/resources/sifac/README.md) |
| **🌾 SAVEC** | Gestión de Granos. Contratos y CRM agrícola. | [Ver Documentación](./nodes/Physis/resources/savec/README.md) |
| **🚚 SACER** | Acopio y Logística. Cartas de porte y movimientos físicos. | [Ver Documentación](./nodes/Physis/resources/sacer/README.md) |
| **🐄 SACH** | Hacienda. Gestión de remates y lotes ganaderos. | [Ver Documentación](./nodes/Physis/resources/sach/README.md) |
| **🚜 SILAB** | Producción Agropecuaria. Labores, campañas e insumos. | [Ver Documentación](./nodes/Physis/resources/silab/README.md) |

---

## 🤝 Soporte

Si encuentras un error o necesitas reportar un problema con la integración:

* Por favor, abre un **Issue** en el repositorio oficial de GitHub.
* Incluye detalles del error y el flujo de trabajo donde ocurrió.

---

<div align="center">
  <sub>Desarrollado por Physis Informática S.R.L. - Todos los derechos reservados.</sub>
</div>