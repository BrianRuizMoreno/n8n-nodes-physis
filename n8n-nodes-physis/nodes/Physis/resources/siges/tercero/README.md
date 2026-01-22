# Recurso Terceros (SIGES)

El recurso **Terceros** gestiona la entidad "Persona" o "Empresa" con la que interactúa la organización.

Es una extensión enriquecida del recurso *Cuentas Auxiliares*. Mientras que la Cuenta Auxiliar es el nodo contable, el Tercero contiene la información de negocio:
* Domicilios (Entrega, Postal).
* Contactos (Personas, Emails, Teléfonos).
* Cuentas Bancarias (CBU para transferencias).
* Datos Fiscales extendidos.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idAuxi` | Int | Identificador del Rubro (100=Clientes, 200=Proveedores). |
| `idCtaAuxi` | String | Código único del tercero (ej: "CLI-001"). |
| `nombre` | String | Razón Social o Nombre completo. |
| `numeroDocumento` | String | CUIT / DNI. |
| `domicilios` | Array | Lista de direcciones operativas. |
| `telefonos` | String | Información de contacto rápido. |

---

## 🛠 Operaciones Disponibles

### Búsqueda y Localización
* **Buscar (Autocomplete)** (`search`): Endpoint optimizado para barras de búsqueda ("Type-ahead"). Busca por nombre, código o CUIT parcialmente.
* **Buscar por Documento** (`getByDocument`): Encuentra terceros por su número de identificación fiscal exacto.
* **Consulta Avanzada** (`query`): Permite construir filtros complejos SQL-like (ej: "Buscar clientes de la localidad X con saldo mayor a Y").
* **Obtener Detalle** (`get`): Recupera la ficha completa de un tercero.

### Gestión de Datos Asociados
* **Listar Domicilios** (`getAddresses`): Devuelve las direcciones registradas.
* **Crear Domicilio** (`createAddress`): Agrega una nueva dirección (ej: Nuevo punto de entrega).
* **Cuentas Bancarias** (`getBankAccounts`): Lista los CBUs asociados para realizar pagos.
* **Contactos** (`getContacts`): Devuelve la agenda de personas de contacto dentro de la empresa tercera.

---

## 💡 Ejemplos de Uso

### 1. Autocomplete en Formulario
Buscar un proveedor escribiendo "Sancor".

**Recurso**: `Terceros` 

**Operación**: `Buscar (Autocomplete)`

**Parámetros**:

* texto: `Sancor`
* idAuxiFilter: `200` (Solo Proveedores)

### 2. Validar Existencia por CUIT
Verificar si el CUIT 30-11223344-5 ya está registrado antes de darlo de alta.

**Recurso**: `Terceros` 

**Operación**: `Buscar por Documento`

**Parámetro**: 

* nroDoc: `30112233445`

### 3. Agregar Dirección de Entrega
Añadir un depósito al cliente "CLI-500".

**Recurso**: `Terceros` 

**Operación**: `Crear Domicilio`

**Parámetros**:

* idAuxi: `100`
* idCtaAuxi: `CLI-500`

**JSON Body**:
```json
{
  "calle": "Av. Circunvalación",
  "numero": "1234",
  "localidad": "Rosario",
  "codigoPostal": "2000",
  "tipo": "Entrega", // O el ID correspondiente al tipo
  "nombre": "Depósito Central"
}
```

---

## ⚠️ Notas Técnicas
* **Clave Compuesta**: Al igual que en Cuentas Auxiliares, la identificación única siempre requiere el par `idAuxi` + `idCtaAuxi`.

* **Usuarios Portal**: El endpoint /me (no expuesto explícitamente en las operaciones principales pero disponible en la API) permite a un usuario logueado en el Portal de Proveedores/Clientes obtener sus propios datos sin conocer su ID.

* **Búsqueda Avanzada**: La operación query utiliza una estructura JSON específica para definir filtros (Operador, Campo, Valor) y ordenamiento, potente para reportes a medida.