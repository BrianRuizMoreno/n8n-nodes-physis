# Recurso Transportes (SIFAC)

El recurso **Transportes** administra el maestro de **Empresas de Transporte** o Logística.

Es importante distinguir este recurso del de *Medios de Transporte*:
* **Transportes (Este recurso)**: Representa a la **empresa** o entidad comercial encargada del flete (ej: "Andreani", "Transporte Gomez S.A.", "Fletes del Sur").
* **Medios de Transporte**: Representa a la unidad física (Camión, Acoplado, Patente).

Este recurso permite dar de alta a estas empresas para asignarlas en Clientes, Proveedores y Comprobantes (Remitos, Facturas) para la gestión logística y de cartas de porte.

## 📋 Campos Principales (Schema)

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCtaReagAuxi` | String | Código único del transporte (ej: "TRA-001"). | Sí |
| `nombre` | String | Razón Social o Nombre de fantasía. | Sí |
| `sigla` | String | Abreviatura o nombre corto. | No |
| `numerodocumento` | String | CUIT / Identificación fiscal. | No |
| `domicilioCalle` | String | Dirección comercial. | No |
| `imputable` | Bool | Define si se puede usar en operaciones (`true`) o es un grupo (`false`). | Sí |

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Registra una nueva empresa de transporte.
* **Modificar** (`update`): Actualiza datos de contacto o fiscales.
* **Obtener por ID** (`get`): Recupera el detalle de un transporte específico.
* **Eliminar** (`delete`): Borra una empresa de transporte (si no tiene historial).

### Consultas
* **Listar Todos** (`getAll`): Devuelve el listado plano de transportistas.
    * *Filtro*: `subSistema` (Permite filtrar transportes habilitados para Ventas 'V' o Compras 'C').
* **Estructura de Árbol** (`getArbol`): Devuelve los transportistas organizados jerárquicamente (útil para selectores agrupados por zona o tipo).

---

## 💡 Ejemplos de Uso

### 1. Registrar una Empresa de Transporte
Dar de alta a "Logística Rápida S.A." con código "LOG-RAP".

**Recurso**: `Transportes` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idCtaReagAuxi": "LOG-RAP",
  "nombre": "Logística Rápida S.A.",
  "sigla": "LOGRAP",
  "numerodocumento": "30-11223344-5",
  "domicilioCalle": "Av. Circunvalación 1234",
  "localidad": "Rosario",
  "telefonos": "0341-4445555",
  "imputable": true
}
```

### 2. Listar Transportes de Venta
Obtener todos los transportistas disponibles para asignar en un Remito de Venta.

**Recurso**: ``Transportes`` 

**Operación**: ``Listar Todos``

**Parámetros (Query)**:

* subSistema: ``V``

### 3. Consultar Detalle
Obtener datos de contacto del transporte "TRA-001".

**Recurso**: ``Transportes`` 

**Operación**: ``Obtener por ID``

**Parámetros (Path)**:

* idCtaReagAuxi: ``TRA-001``

---

## ⚠️ Notas Técnicas
* **Subsistema**: El parámetro ``subSistema`` en el listado es útil porque algunas empresas separan los transportistas que les traen mercadería (Compras) de los que distribuyen sus productos (Ventas). Por defecto es 'V'.

* **Jerarquía**: Aunque lo habitual es una lista plana, el sistema soporta una estructura de árbol. Si ``imputable`` es ``false``, el registro actúa como una "Carpeta" contenedora de otros transportes.

* **Integración**: Al crear un ``Viaje`` en un comprobante, el campo ``idTransporte`` o ``idAuxiTrans`` se refiere a este código (``idCtaReagAuxi``).