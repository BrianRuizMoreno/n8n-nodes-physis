# Recurso Tipo Hacienda (SACH)

El recurso **Tipo Hacienda** administra las clasificaciones de negocio utilizadas para categorizar las operaciones ganaderas (ej: "Invernada", "Gordo/Faena", "Cría", "Reproductores").

Este maestro es vital porque define el **comportamiento fiscal y operativo** de los lotes y liquidaciones asociados. Configura reglas automáticas como:
* Si la operación liquida IVA.
* Si es obligatorio cargar el número de caravana/RP.
* Si aplica para el régimen de Liquidación Pecuaria Electrónica (LSP).
* Qué categorías de animales son válidas para este tipo de negocio.

Además, este recurso incluye consultas auxiliares para obtener categorías específicas y datos de RENSPA.

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, se envía un objeto JSON con la configuración de las reglas de negocio.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idTipoHacienda` | String | Código identificador (ej: "INV"). | Sí |
| `descripcion` | String | Nombre descriptivo (ej: "Hacienda de Invernada"). | Sí |
| `idEspecie` | Int | Especie predeterminada (0 = Varias). | No |
| `liquidaIVA` | Bool | Indica si calcula IVA en la liquidación. | No |
| `cargaRP` | Bool | Si exige identificación individual (caravana) en los lotes. | No |
| `aplicaLSP` | Bool | Si las operaciones se informan a AFIP bajo régimen LSP. | No |
| `motivoAFIP` | Int | Código de motivo oficial para LSP. | No |
| `categorias` | Array | Lista de categorías habilitadas para este tipo. | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Tipos de Hacienda** (`getAll`): Devuelve la lista completa de tipos configurados.
* **Obtener por ID** (`get`): Recupera el detalle de un tipo específico mediante su código (ej: "INV").
* **Consulta Avanzada** (`searchV2`): Búsqueda potente con filtros, paginado y ordenamiento (`/api/sach/v2/tipos-hacienda`).

### Consultas Adicionales
* **Listar Categorías de Hacienda** (`getCategoriasHacienda`): Devuelve las categorías disponibles (ej: Toro, Novillo) filtradas por especie.
    * *Parámetro*: `idEspecie` (ej: 1 para Bovino).
* **Consultar RENSPA** (`getRenspa`): Obtiene información de RENSPA asociada a una cuenta.
    * *Parámetros*: `idPpal`, `idAuxi`, `idCtaAuxi`.

### ABM (Escritura)
* **Crear** (`create`): Da de alta una nueva clasificación de hacienda.
* **Actualizar** (`update`): Modifica las reglas o descripción de un tipo existente.
* **Eliminar** (`delete`): Borra un tipo de hacienda del sistema.

---

## 💡 Ejemplos de JSON

### 1. Crear Tipo "Invernada"
Configura un tipo de hacienda para invernada, que liquida IVA y aplica LSP, pero no exige carga de RP individual.

**Recurso**: `Tipo Hacienda`  

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idTipoHacienda": "INV",
  "descripcion": "Hacienda Invernada",
  "liquidaIVA": true,
  "aplicaLSP": true,
  "cargaRP": false,
  "motivoAFIP": 1,
  "categorias": [
    {
      "idCategoria": 5,
      "idEspecie": 1
    }
  ]
}
```

### 2. Listar Categorías de Bovinos
Obtener todas las categorías asociadas a la especie Bovinos (ID 1).

**Recurso**: ``Tipo Hacienda`` 

**Operación**: ``Listar Categorías de Hacienda``

**Parámetros (Query)**:

* idEspecie: ``1``

### 3. Consultar RENSPA de Cliente
Verificar datos de RENSPA para el cliente "C0050".

**Recurso**: ``Tipo Hacienda`` 

**Operación**: ``Consultar RENSPA``

**Parámetros (Query)**:

* idAuxi: ``1``

* idCtaAuxi: ``C0050``

---

## ⚠️ Notas Técnicas
* **Identificador de Texto**: El campo ``idTipoHacienda`` es un String de longitud limitada (usualmente 3 o 4 caracteres). Se recomienda usar códigos mnemotécnicos claros (ej: "INV", "CRI", "EXP").

* **Reglas de Negocio**: Los campos booleanos como ``cargaRP`` o ``liquidaIVA`` tienen impacto directo en la validación de los recursos Lote y Liquidación. Si ``cargaRP`` es true, el sistema no permitirá cerrar un lote sin detallar los caravaneos.