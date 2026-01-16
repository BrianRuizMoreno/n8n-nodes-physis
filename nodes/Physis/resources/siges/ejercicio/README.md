# Recurso Ejercicios (SIGES)

El recurso **Ejercicios** administra los periodos contables o años fiscales de la empresa.

Es una de las dimensiones principales de la contabilidad en SIGES. Todo comprobante contable (Factura, Asiento, Pago) debe pertenecer obligatoriamente a un **Ejercicio**, el cual define las fechas de inicio y cierre, y controla si el periodo está abierto para la carga de datos o cerrado.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idEjercicio` | Int | Identificador numérico (Usualmente el año, ej: `2026`, o un ID secuencial). |
| `nombre` | String | Descripción del periodo (ej: "Ejercicio 2026"). |
| `fechaInicio` | Date | Fecha de inicio del año fiscal. |
| `fechaCierre` | Date | Fecha de fin del año fiscal. |
| `estado` | String | Estado del ejercicio (ej: "Abierto", "Cerrado"). |
| `oculto` | Boolean | Si el ejercicio está visible en los selectores. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todos** (`getAll`): Devuelve el histórico de ejercicios contables.
* **Obtener por ID** (`get`): Recupera la configuración de un ejercicio específico.

### Gestión de Contexto (Sesión)
Estas operaciones son útiles para integraciones que simulan la navegación de un usuario.
* **Obtener Actual** (`getActive`): Devuelve cuál es el ejercicio seleccionado en la sesión actual.
* **Fijar Actual** (`setActive`): Cambia el contexto de trabajo al ejercicio especificado.

### Gestión Transaccional (ABM)
* **Crear / Actualizar** (`create`, `update`): Permite definir nuevos periodos o modificar fechas de cierre.

---

## 💡 Ejemplos de Uso

### 1. Seleccionar Ejercicio de Trabajo
Al iniciar un flujo de carga de facturas, asegurarse de que el sistema esté posicionado en el año correcto (2026).

**Recurso**: `Ejercicios` 

**Operación**: `Fijar Actual`

**Parámetro ID**: `2026`

### 2. Buscar Ejercicio por Fecha
Saber a qué ejercicio contable corresponde la fecha "2026-05-15".

**Recurso**: `Ejercicios` 

**Operación**: `Listar Todos`

**Parámetro Fecha**: `2026-05-15`

### 3. Cerrar un Ejercicio
Marcar el ejercicio 2025 como cerrado para impedir nuevas cargas.

**Recurso**: `Ejercicios` 

**Operación**: `Actualizar Ejercicio`

**JSON Body**:
```json
{
  "idEjercicio": 2025,
  "estado": "Cerrado",
  "fechaCierre": "2025-12-31T00:00:00"
}
```

---

## ⚠️ Notas Técnicas
* **Diferencia con Campañas**: No confundir Ejercicio (Contable/Fiscal, estructurado por año calendario o fiscal) con Campaña (Productivo/Agronómico, estructurado por ciclo de cultivo). Un ejercicio puede contener partes de varias campañas.

* **Validación de Fechas**: Al crear comprobantes, la fecha del documento debe estar comprendida obligatoriamente entre la `fechaInicio` y `fechaCierre` del `idEjercicio` asignado.