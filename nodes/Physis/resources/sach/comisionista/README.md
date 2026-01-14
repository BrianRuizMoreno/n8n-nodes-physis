# Recurso Comisionista (SACH)

El recurso **Comisionista** administra la gestión de los agentes intermediarios o comisionistas que intervienen en las operaciones de hacienda. Permite configurar sus datos fiscales, las comisiones pactadas y su relación con Clientes (Compradores/Vendedores) y Lugares (Puestos de Remate).

Es fundamental para el cálculo automático de comisiones durante la liquidación de lotes y remates.

## 📋 Campos Principales (Schema)

Al utilizar la operación **Actualizar**, se envía un objeto JSON que define al comisionista y sus reglas de negocio.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCtaAuxi` | String | Código de cuenta auxiliar del comisionista. | Sí |
| `nombre` | String | Razón social o nombre. | Sí |
| `alias` | String | Nombre de fantasía o corto. | No |
| `imputable` | Bool | Si permite imputaciones contables. | No |
| `comisiones` | Array | Lista de reglas de comisión pactadas (por operación/tipo). | No |
| `clientes` | Array | Lista de clientes vinculados a este comisionista. | No |

---

## 🛠 Operaciones Disponibles

### 1. Consultas Generales
* **Listar Comisionistas** (`getAll`): Búsqueda por filtro de texto (nombre, código).
* **Obtener Detalle** (`get`): Recupera la ficha completa de un comisionista por su ID.
* **Árbol de Comisionistas** (`getArbol`): Devuelve la estructura jerárquica para selectores (activos o todos).

### 2. Gestión (Escritura)
* **Actualizar Comisionista** (`update`): Modifica los datos principales, reglas de comisiones y vínculos con clientes.

### 3. Relaciones y Asignación
Endpoints operativos para determinar qué comisionista corresponde en una operación.
* **Por Cliente** (`getByCliente`): Obtiene comisionistas vinculados a un cliente específico.
* **Para Lote (Cliente)** (`getParaLoteCliente`): Sugiere el comisionista automático para un lote según el cliente y tipo de operación.
* **Por Lugar** (`getByLugar`): Obtiene comisionistas asignados a un lugar físico o puesto.
* **Clientes del Comisionista** (`getClientesDeComisionista`): Consulta inversa para ver la cartera de clientes de un agente.

---

## 💡 Ejemplos de Uso

### 1. Buscar Comisionista
Encontrar un comisionista por su nombre o alias.

**Recurso**: `Comisionista` 

**Operación**: `Listar Comisionistas`

**JSON Body / Parámetros**:
```json
{
  "filtro": "GARCIA"
}
```

### 2. Determinar Comisionista para un Lote
Al cargar un lote de remate, el sistema consulta quién cobra la comisión.

**Recurso**: ``Comisionista``  

**Operación**: ``Para Lote (Cliente) ``

**Parámetros**:

* IdCtaAuxiCliente: ``C001``

* TipoCliente: ``1 (Comprador)``

* idTipoOperacion: ``REM``

* idCodLugar: ``RURAL``

---

## ⚠️ Notas Técnicas
* **Estructura Compleja**: El objeto de actualización (**PUT**) es complejo ya que anida arrays de comisiones y clientes. Al actualizar, se suele enviar la estructura completa para asegurar la integridad de las relaciones.

* **Lógica de Negocio**: La operación `getParaLote` es crítica en la carga de remates, ya que automatiza la asignación del comisionista evitando errores manuales en la pista.