# Recurso Logística (SACER)

El recurso **Logística** centraliza la gestión del transporte. Se divide en dos grandes áreas funcionales:

1.  **Conductores**: Gestión de choferes, sus licencias y los vehículos (patentes) que conducen.
2.  **Tarifas**: Tablas de precios de fletes y servicios, configurables por distancia, zona o transportista.

## 📋 Estructura de Datos (Schema)

### 1. Objeto Conductor
Utilizado para dar de alta choferes que luego aparecerán en las Cartas de Porte.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codConductor` | Int | **0** para crear nuevo. ID para editar. |
| `nombre`* | String | Nombre completo del chofer. |
| `nroDocumento`* | String | DNI / CUIT del chofer. |
| `nroLicencia` | String | Número de registro de conducir habilitante. |
| `patente1`* | String | Dominio del camión (Chasis). |
| `patente2` | String | Dominio del acoplado. |
| `transportista` | String | Nombre o referencia del transportista habitual. |

### 2. Objeto Tarifa
Define el costo de un servicio (flete, secado, paritarias).

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codigo` | String | Código interno de la tarifa. |
| `descripcion`* | String | Nombre (ej: "Flete Corta Distancia"). |
| `codCampania` | Int | Campaña a la que aplica. |
| `idMoneda` | Int | Moneda del valor (Pesos/Dólares). |
| `tercero` | Object | Define el valor base y el proveedor (`idAuxi`, `valor`). |

---

## 🛠 Operaciones Disponibles

### 🚚 Gestión de Conductores
* **Listar Todos** (`getConductores`): Devuelve la nómina completa.
    * *Filtro*: `sinTransportista=true` (Para ver choferes libres).
* **Listar por Transportista** (`getConductoresByTransportista`): Obtiene los choferes vinculados a una empresa de transporte específica.
* **Crear / Actualizar**: ABM de datos del chofer y sus patentes.

### 💰 Gestión de Tarifas
* **Listar Tarifas** (`getTarifas`): Consulta precios vigentes.
    * *Filtros*: `IdAuxi` (Proveedor), `CodCereal`, `CodCampania`.
* **Crear Tarifa** (`createTarifa`): Configura una nueva lista de precios.
* **Obtener Imputaciones** (`getImputaciones`): Ver cuentas contables asociadas a una tarifa.

---

## 💡 Ejemplos de Uso

### 1. Registrar un Nuevo Chofer
Para que esté disponible al emitir una Carta de Porte.
**Recurso**: `Logística` 

**Operación**: `Conductor: Crear`

**JSON Body**:
```json
{
  "codConductor": 0,
  "nombre": "Roberto Sanchez",
  "nroDocumento": "2033444555",
  "nroLicencia": "LIC-2033444555",
  "patente1": "AA123BB",
  "patente2": "AC999ZZ",
  "telefono": "3415555666",
  "domicilioLocalidad": "Rosario"
}
```

## 2. Consultar Tarifas de un Transportista
Ver qué precios tiene acordados el transportista "Logística Sur" (ID 1020). 

**Recurso**: `Logística`  

**Operación**: `Tarifa: Listar Parámetro` 

**IdAuxi**: `1020`

## 3. Listar Choferes de una Empresa
**Recurso**: `Logística`

**Operación**: `Conductores por Transportista` 

**Parámetros**:

* **idAuxi**: `1020`

* **idCtaAuxi**: `PRO (Cuenta Proveedor)`

---

## ⚠️ Notas Técnicas
**Patentes**: Aunque el sistema permite guardar patente1, patente2 y patente3 en la ficha del chofer, estos son valores "por defecto". Al hacer la Carta de Porte, se pueden sobrescribir si el chofer cambia de camión ese día.

**Vínculo**: La relación fuerte entre Chofer y Transportista suele gestionarse mediante la operación de asignación o implícitamente por el uso en los comprobantes.