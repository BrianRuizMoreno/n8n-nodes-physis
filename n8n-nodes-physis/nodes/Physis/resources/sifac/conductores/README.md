# Recurso Conductores (SIFAC)

El recurso **Conductores** administra el maestro de choferes habilitados para el transporte de mercadería.

A diferencia del recurso *Transportes* (que representa a la empresa logística), el Conductor es la persona física que maneja el vehículo. Este dato es obligatorio para la confección de la **Carta de Porte Electrónica (CPE)** y el **COT** (Código de Operación de Traslado), requiriendo datos sensibles como el número de CUIL y la Licencia de Conducir.

## 📋 Campos Principales (Schema)

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idConductor` | Int | Identificador único (0 para crear nuevo). | Sí |
| `nombre` | String | Nombre y Apellido completo. | Sí |
| `nroDocumento` | String | DNI / CUIL del chofer. | Sí |
| `nroLicencia` | String | Número de registro de conducir. | Sí |
| `idAuxiTransportista` | Int | ID de la empresa de transporte a la que pertenece. | No |
| `patente1` | String | Patente del camión habitual (Default). | No |
| `patente2` | String | Patente del acoplado habitual (Default). | No |

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Registra un nuevo chofer en el sistema.
* **Modificar** (`update`): Actualiza datos personales, licencia o vehículo habitual.
* **Obtener por ID** (`get`): Recupera el detalle de un conductor.
* **Eliminar** (`delete`): Borra un conductor (si no tiene viajes asociados).

### Consultas
* **Listar Todos** (`getAll`): Búsqueda general de conductores.
    * *Filtros*: `consulta` (Texto libre), `pageSize`.
* **Grilla SACER** (`getGrid`): Vista optimizada para grillas visuales (Kendo UI), con paginación y ordenamiento avanzado.

---

## 💡 Ejemplos de JSON

### 1. Crear un Nuevo Conductor
Registrar al chofer "Roberto Gomez", perteneciente a la empresa de transporte ID 50.

**Recurso**: `Conductores` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idConductor": 0,
  "nombre": "Roberto Gomez",
  "nroDocumento": "20-12345678-9",
  "nroLicencia": "12345678",
  "telefono": "341-1112222",
  "idAuxiTransportista": 50,
  "transportista": "Logística Norte S.A.", 
  "patente1": "AA000BB",
  "observacion": "Habilitado para cargas peligrosas"
}
```

### 2. Buscar Conductores
Buscar choferes que contengan "Gomez" en su nombre.

**Recurso**: ``Conductores`` 

**Operación**: ``Listar Todos``

**Parámetros (Query)**:

* consulta: ``Gomez``

---

## ⚠️ Notas Técnicas
* **Relación con Transportista**: Aunque el JSON permite enviar el nombre del transportista (``transportista``), el vínculo relacional real se hace a través de ``idAuxiTransportista`` (que corresponde al ``idAuxi`` del recurso Transportes).

* **Patentes por Defecto**: Los campos ``patente1``, ``2`` y ``3`` en la ficha del conductor actúan como valores predeterminados. Al momento de generar un viaje, el sistema sugerirá estas patentes, pero pueden ser sobrescritas en el comprobante si el chofer cambia de vehículo.

* **Validaciones Fiscales**: Para Carta de Porte, el ``nroDocumento`` (CUIT/CUIL) debe ser válido en AFIP.