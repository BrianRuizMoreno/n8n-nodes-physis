# Recurso Cuentas Temporales (SIGES)

El recurso **Cuentas Temporales** actúa como un **Carrito de Compras de Selección**.

En sistemas ERP robustos, a veces es necesario ejecutar un reporte (ej: Mayor Contable, Saldo de Clientes) filtrando por miles de cuentas específicas que no siguen un patrón consecutivo. Enviar 5,000 códigos por la URL es inviable.

**Solución**:
1.  Se abre una "sesión" (`IdConexion`).
2.  Se insertan las cuentas deseadas en tablas temporales del servidor asociadas a esa sesión.
3.  El reporte final solo recibe el `IdConexion` y lee las cuentas desde la tabla temporal.



## 🛠 Operaciones Disponibles

### Gestión de Sesión
* **Iniciar/Limpiar Selección** (`clean`): Elimina datos previos asociados a una conexión o, si se envía 0, genera un nuevo ID de conexión limpio.

### Inserción de Filtros
* **Seleccionar Cuentas Principales** (`insertPrincipal`): Carga cuentas contables (ej: "1.1.01.01").
* **Seleccionar Auxiliares** (`insertAuxiliary`): Carga códigos de terceros (ej: Clientes, Proveedores).
* **Seleccionar Reagrupaciones** (`insertRegroupingPrincipal`, `insertRegroupingAuxiliary`): Carga códigos de centros de costo, zonas o rubros.

---

## 💡 Ejemplos de Uso

### Flujo Completo: Reporte de Deudores Específicos

Supongamos que queremos sacar un reporte solo para los clientes "CLI-001", "CLI-055" y "CLI-099".

**Paso 1: Obtener ID de Sesión**
Llamamos a limpiar enviando 0 para que nos devuelva un ID nuevo.
**Recurso**: `CuentasTemp`  

**Operación**: `Iniciar/Limpiar Selección`

**Parámetro**: IdConexion: `0`

> *Respuesta*: `12345` (Este es nuestro token).

**Paso 2: Cargar Clientes**
Usamos el token obtenido.
**Recurso**: `CuentasTemp`  

**Operación**: `Seleccionar Auxiliares`

**Parámetros**:

* IdConexion: `12345`
* IdAuxi: `100` (Plan Clientes)
* Cuentas: `"CLI-001, CLI-055, CLI-099"`

**Paso 3: Ejecutar Reporte (En otro recurso)**
Ahora vamos al reporte de Saldos (ejemplo hipotético) y le pasamos el token.
**Recurso**: `Reportes`  

**Operación**: `Saldo Clientes`

**Parámetro**: 

* IdConexion: `12345`

---

## ⚠️ Notas Técnicas

* **CSV**: El campo `Cuentas` espera un **string** con los códigos separados por coma. No envíe un array JSON.
* **Persistencia**: Estas tablas son temporales. Generalmente se limpian automáticamente tras un tiempo de inactividad o al reiniciar el servicio. Se recomienda usarlas dentro de un mismo flujo de trabajo inmediato.
* **GET vs POST**: Aunque estas operaciones modifican datos en el servidor (insertan/borran), la API de Physis utiliza el método HTTP `GET` para todas ellas.