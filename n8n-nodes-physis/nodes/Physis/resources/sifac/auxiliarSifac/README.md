# Recurso Auxiliar (SIFAC)

El recurso **Auxiliar SIFAC** agrupa un conjunto de operaciones de consulta utilitarias y de configuración global del sistema de facturación.

Permite acceder a los **Parámetros del Sistema** (configuraciones de comportamiento como stock negativo, cuentas por defecto, decimales), consultar los **Módulos instalados** y obtener valores predeterminados para agilizar la carga de comprobantes (ej: Factura Mostrador).

## 📋 Parámetros de Consulta

Este recurso se maneja principalmente a través de identificadores de parámetros o claves de clientes para obtener configuraciones específicas.

| Parámetro | Tipo | Descripción | Operaciones donde aplica |
| :--- | :--- | :--- | :--- |
| `nombreParametroSifac` | String | Clave única del parámetro de configuración (ej: "IdIvaDefault"). | `getParametro` |
| `idAuxi` | Int | Tipo de auxiliar del tercero (1=Cliente, 2=Proveedor). | `getParametrosFactura`, `getReagrupaciones` |
| `idCtaAuxi` | String | Código de cuenta del tercero. | `getParametrosFactura`, `getReagrupaciones` |

---

## 🛠 Operaciones Disponibles

### ⚙️ Configuración y Parámetros
* **Listar Parámetros** (`getParametros`): Devuelve el listado completo de variables de configuración de SIFAC.
* **Obtener Parámetro** (`getParametro`): Recupera el valor de un parámetro específico por su nombre.
    * *Claves comunes*: `IdIvaDefault`, `StockNegativo`, `Decimales_Precios`, `IdDepositoDefault`.

### 🏢 Gestión de Terceros y Defaults
* **Defaults Factura Mostrador** (`getParametrosFactura`): Obtiene los valores predeterminados (lista de precios, condición de pago, etc.) para iniciar una factura, ya sea genérica o para un cliente específico.
* **Reagrupaciones Default** (`getReagrupaciones`): Devuelve las clasificaciones estadísticas o contables asignadas por defecto a un cliente o proveedor.

### 📦 Sistema
* **Listar Módulos** (`getModulos`): Devuelve la lista de módulos y vectores activos en la licencia de la empresa.

---

## 💡 Ejemplos de Uso

### 1. Consultar Configuración de IVA por Defecto
Verificar qué tasa de IVA utiliza el sistema predeterminadamente.

**Recurso**: `Auxiliar SIFAC`

**Operación**: `Obtener Parámetro`

**Parámetros**:
* nombreParametroSifac: `IdIvaDefault`

### 2. Obtener Defaults para un Cliente
Recuperar condiciones comerciales pre-cargadas para el cliente "C001" al abrir la pantalla de facturación.

**Recurso**: `Auxiliar SIFAC`

**Operación**: `Defaults Factura Mostrador`

**Parámetros**:
* idAuxi: `1` (Cliente)

* idCtaAuxi: `C001`

### 3. Listar Parámetros Generales
Obtener todas las configuraciones del sistema para cachear en el inicio de la aplicación.

**Recurso**: `Auxiliar SIFAC`

**Operación**: `Listar Parámetros`

---

## ⚠️ Notas Técnicas

* **Nombres de Parámetros**: La operación `getParametro` valida contra una lista cerrada de claves (Enum). Asegúrese de enviar el nombre exacto (case-sensitive en algunos entornos), por ejemplo: `IdCondPagoDefault`, `PermiteFechaAnteriorAAnticipada`, `ControlaStockDisponible`.
* **Uso en UI**: El endpoint de `getParametrosFactura` es vital para la experiencia de usuario (UX) en puntos de venta, ya que precarga la información del cliente evitando errores manuales.