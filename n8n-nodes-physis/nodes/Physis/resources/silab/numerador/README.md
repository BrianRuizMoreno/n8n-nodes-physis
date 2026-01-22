# Recurso Numerador (SILAB)

El recurso **Numerador** administra las secuencias de numeración utilizadas para los documentos del sistema (Órdenes de Trabajo, Partes, Remitos, etc.).

En Physis, cada tipo de comprobante debe estar asociado a un numerador que garantiza la correlatividad y unicidad de los registros. Estos numeradores pueden ser simples (secuenciales) o compuestos (con prefijo/punto de venta).

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idNumerador` | Int | Identificador único de la secuencia. |
| `descripcion` | String | Nombre del numerador (ej: "Numerador Parte de Siembra"). |
| `prefijo` | String/Int | (Opcional) Número de Punto de Venta o sucursal. |
| `ultimoNumero` | Int | Último número emitido (para referencia). |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve el catálogo completo de numeradores configurados en el sistema.
* **Filtrar por Prefijo** (`getByPrefijo`): Permite obtener separadamente los numeradores que trabajan con "Punto de Venta" (Prefijo) de los que son puramente secuenciales internos.

---

## 💡 Ejemplos de Uso

### 1. Obtener Numeradores para Comprobantes Oficiales
Si se está integrando una App que genera remitos electrónicos, se necesitan los numeradores que tienen Prefijo (Punto de Venta).

**Recurso**: `Numerador` 

**Operación**: `Filtrar por Prefijo`

**Parámetros (Query)**:
* prefijo: `true`

### 2. Listar Secuencias Internas
Obtener numeradores para documentos internos (como Órdenes de Trabajo) que no requieren punto de venta fiscal.

**Recurso**: `Numerador` 

**Operación**: `Filtrar por Prefijo`

**Parámetros (Query)**:
* prefijo: `false`

---

## ⚠️ Notas Técnicas

* **Asignación**: Generalmente, el `idNumerador` se asigna previamente en la configuración del **Tipo de Comprobante** o **Tipo de Parte**. Es raro que el usuario final elija el numerador manualmente, salvo que tenga múltiples puntos de venta disponibles para una misma operación.
* **Concurrencia**: Este recurso es de consulta. No se debe utilizar para "reservar" números. La asignación del número real ocurre transaccionalmente al guardar la Orden o Parte (`OrdenesPartes`).