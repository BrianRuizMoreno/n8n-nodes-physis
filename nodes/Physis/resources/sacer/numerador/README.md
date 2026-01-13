# Recurso Numerador (SACER)

El recurso **Numerador** centraliza la gestión de secuencias numéricas dentro del módulo SACER. Su propósito es garantizar la integridad, correlatividad y unicidad de los documentos emitidos por el sistema (como Cartas de Porte, Contratos y Certificados), administrando tanto numeraciones únicas como aquellas divididas por puntos de venta.

## 📋 Estructura de Datos (Schema)

### 1. Objeto Numerador
Define la configuración cabecera de una secuencia documental.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idNumerador` | Int | **0** para crear nuevo. ID para editar. |
| `nombre`* | String | Nombre descriptivo (ej: "Carta de Porte Electrónica"). |
| `porPrefijo` | Bool | **True**: Usa puntos de venta. **False**: Secuencia única. |
| `numero` | Int | Último número utilizado (solo si `porPrefijo` es false). |
| `conVencimiento` | Bool | Indica si valida fechas límite (ej. para CAI). |
| `observaciones` | String | Notas internas sobre el uso de este numerador. |
| `prefijos` | Array | Lista de configuraciones por punto de venta (ver abajo). |

### 2. Objeto Prefijo
Configuración específica para cada Punto de Venta (cuando el numerador lo requiere).

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `nombre` | String | Descripción del punto de venta (ej: "Planta Silos"). |
| `numeroPrefijo`* | Int | El número del punto de venta (ej: 0004). |
| `numero`* | Int | Último número correlativo utilizado. |
| `numeroDesde` | Int | Inicio del rango autorizado (CAI). |
| `numeroHasta` | Int | Fin del rango autorizado (CAI). |
| `fechaVencimiento`| Date | Fecha límite de validez del rango (ISO 8601). |
| `nroCAC` | String | Código de Autorización (CAI/CAE). |

---

## 🛠 Operaciones Disponibles

### 🔢 Consultas
* **Listar Todos** (`getNumeradores`): Devuelve la configuración de todos los numeradores.
* **Obtener Detalle** (`getNumerador`): Consulta la configuración completa de un ID específico.
* **Numerador Contratos** (`getNumeradorContratos`): Acceso directo a la configuración activa para contratos.

### 🏢 Consultas por Planta
* **Listar por Planta** (`getNumeradoresByPlanta`): Devuelve los numeradores vinculados a una planta específica.
    * *Filtros*: `idTipoFormato`, `formulario` (búsqueda parcial por nombre).

### ⚙️ Gestión
* **Crear** (`createNumerador`): Alta de nuevas configuraciones y sus prefijos.
* **Modificar** (`updateNumerador`): Actualizar el último número utilizado.
    * *Params*: `idNumerador`, `idPrefijo`, `Numero` (nuevo valor).
* **Eliminar** (`deleteNumerador`): Baja de una configuración.

---

## 💡 Ejemplos de Uso

### 1. Crear Numerador con Puntos de Venta
Para dar de alta la numeración de Cartas de Porte con control de CAI.

**Recurso**: `Numerador`

**Operación**: `Numerador: Crear`

**JSON Body**:
```json
{
  "idNumerador": 0,
  "nombre": "Carta de Porte Electrónica",
  "porPrefijo": true,
  "conVencimiento": true,
  "observaciones": "Uso obligatorio según normativa AFIP",
  "prefijos": [
    {
      "nombre": "Administración Central",
      "numeroPrefijo": 1,
      "numero": 1050,
      "numeroDesde": 1,
      "numeroHasta": 5000,
      "fechaVencimiento": "2026-01-20T00:00:00.000Z",
      "nroCAC": "12345678901234"
    }
  ]
}
```

### 2. Buscar Numeradores Disponibles en Planta
El usuario necesita emitir un formulario y el sistema busca qué numeradores tiene habilitados su planta (ID 5).

**Recurso**: `Numerador`

**Operación**: `Numeradores por Planta`

**Parámetros**:

* codPlanta: `5`

* formulario: `Certificado (Filtra por nombre)`

## 3. Corrección de Numeración
Avanzar manualmente la numeración del prefijo 4 al número 1200.

**Recurso**: `Numerador`

**Operación**: `Numerador: Modificar`

**Parámetros**:

* idNumerador: `15`

* idPrefijo: `4`

* Numero: `1200`

---

## ⚠️ Notas Técnicas
**Precedencia**: Si `porPrefijo` es `true`, el sistema ignora el campo `numero` del objeto padre y se rige exclusivamente por los contadores dentro del array `prefijos`.

**Validaciones**: Al momento de la emisión de documentos, el sistema validará que `fechaVencimiento` sea mayor a la fecha actual y que el próximo número no supere `numeroHasta`.