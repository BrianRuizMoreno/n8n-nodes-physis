# Recurso Cuentas Auxiliares (SIGES)

El recurso **Cuentas Auxiliares** gestiona el sub-mayor de la contabilidad en SIGES. Representa a los terceros con los que interactúa la empresa: **Clientes, Proveedores, Vendedores, Bancos y Empleados**.

A diferencia de las Cuentas Principales (Plan de Cuentas Contable), las Auxiliares permiten un seguimiento detallado e individualizado de saldos, cuentas corrientes y datos fiscales (CUIT, Domicilios, IIBB).

## 📋 Campos Principales

### Cabecera Cuenta Auxiliar
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idAuxi` | Int | Identificador del Plan Auxiliar o Rubro (ej: 100=Clientes, 200=Proveedores). |
| `idCtaAuxi` | String | Código único de la cuenta (ej: `CLI-0050`). |
| `nombre` | String | Razón Social o Nombre del tercero. |
| `imputable` | Boolean | Indica si la cuenta recibe movimientos (True) o es agrupapora (False). |

### Objeto Tercero (Detalle)
Este objeto anidado (`tercero`) contiene la información comercial y fiscal.
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `numeroDocumento` | String | CUIT / CUIL / DNI. |
| `condicionAfip` | Int | Situación frente al IVA (RI, Monotributo, Exento). |
| `domicilios` | Array | Lista de direcciones operativas y fiscales. |
| `cuentasBancarias` | Array | CBU y datos bancarios para transferencias. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Catálogo completo de auxiliares.
* **Obtener por Código** (`get`): Recupera la ficha completa de un tercero específico.
* **Listar por Plan** (`getByPlan`): Filtra cuentas por rubro. Útil para obtener "Solo Clientes" o "Solo Proveedores".
* **Vista Árbol** (`getTree`): Estructura jerárquica para mostrar en selectores de UI.
* **Obtener Siguiente ID** (`getNextId`): Generador de secuencias para altas automáticas.

### Gestión (ABM)
* **Crear** (`create`): Alta de nuevo tercero/cuenta. Requiere enviar el objeto `tercero` con sus datos fiscales.
* **Actualizar** (`update`): Modificación de datos (cambio de domicilio, condición de IVA, etc.).
* **Eliminar** (`delete`): Baja de cuenta (sujeto a validación de integridad referencial; no se borra si tiene movimientos).

---

## 💡 Ejemplos de Uso

### 1. Buscar Datos de un Cliente
Obtener la ficha del cliente código "CLI-100".

**Recurso**: `Cuentas Auxiliares` 

**Operación**: `Obtener por Código`

**Parámetro ID**: `CLI-100`

### 2. Listar Solo Proveedores
Obtener la lista para llenar un combo de selección de proveedores (asumiendo que el Plan Auxiliar de Proveedores es el ID 200).

**Recurso**: `Cuentas Auxiliares`  

**Operación**: `Listar por Plan`

**Parámetros**:
* idAuxi (Plan): `200`

### 3. Crear Nuevo Proveedor
Dar de alta una empresa proveedora.

**Recurso**: `Cuentas Auxiliares`  

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idAuxi": 200,
  "idCtaAuxi": "PROV-999",
  "nombre": "Insumos del Agro S.A.",
  "imputable": true,
  "tercero": {
    "numeroDocumento": "30112233445",
    "tipoPersona": "Jurídica",
    "condicionAfip": 1,
    "domicilios": [
      { "calle": "Ruta 9 km 100", "localidad": "Rosario", "codigoPostal": "2000" }
    ]
  }
}
```

---

## ⚠️ Notas Técnicas
* **Estructura Dual**: Una "Cuenta Auxiliar" es el nodo contable, pero casi siempre está vinculada a un objeto "Tercero" que contiene los datos reales de negocio. Al crear o editar, asegúrese de poblar correctamente el objeto anidado tercero.

* **Claves**: La clave primaria lógica es `idCtaAuxi` (String), pero técnicamente el sistema valida la unicidad compuesta con `idAuxi` (Plan) y `idPpal` (si aplica multi-empresa).

* **Validación CUIT**: El sistema suele validar que el numeroDocumento (CUIT) sea válido y no esté duplicado en el mismo plan auxiliar.