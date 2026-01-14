# Recurso Tipos de Tasas (SIFAC)

El recurso **Tipos de Tasas** administra el catálogo de alícuotas impositivas aplicables en el sistema.

Define los porcentajes y códigos para el cálculo de impuestos como el IVA (21%, 10.5%, 0%, Exento) o Impuestos Internos. Es un recurso de referencia utilizado para poblar selectores al momento de cargar productos o definir la situación fiscal de una operación.

## 📋 Parámetros de Filtrado

El listado general permite filtrar las tasas aplicables según el tercero (Cliente/Proveedor) involucrado. Esto es útil para regímenes especiales donde las tasas varían según el sujeto.

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| `idTipoTasa` | String | Código identificador (ej: "1" para IVA 21%). |
| `idAuxi` | Int | (Opcional) ID numérico del tercero para filtrar tasas aplicables. |
| `idCtaAuxi` | String | (Opcional) Código alfanumérico del tercero. |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Todas** (`getAll`): Devuelve el maestro completo de tasas disponibles.
* **Obtener por ID** (`get`): Recupera el detalle de una tasa específica (descripción y valor porcentual).

---

## 💡 Ejemplos de Uso

### 1. Poblar Combo de Alícuotas de IVA
Obtener todas las tasas posibles para permitir al usuario seleccionar el IVA de un producto nuevo.

**Recurso**: `Tipos de Tasas` 

**Operación**: `Listar Todas`

**Endpoint**:
`GET /api/sifac/tipos-tasas`

**Respuesta Esperada (Ejemplo)**:
```json
[
  { "idTipoTasa": "1", "descripcion": "IVA 21%", "tasa": 21.00 },
  { "idTipoTasa": "2", "descripcion": "IVA 10.5%", "tasa": 10.50 },
  { "idTipoTasa": "3", "descripcion": "Exento", "tasa": 0.00 }
]
```

## 2. Validar Tasa Específica
Consultar los datos de la tasa código "1".

**Recurso**: ``Tipos de Tasas ``

**Operación**: ``Obtener por ID``

**Parámetros (Path)**:

* idTipoTasa: ``1``

---

## ⚠️ Notas Técnicas
* **Uso en Comprobantes**: Los IDs obtenidos de este recurso son los que se deben enviar en el campo ``tasaIVA`` o ``idTipoTasa`` dentro del array ``items`` al crear Facturas, Pedidos o Remitos.

* **Contexto**: Aunque la mayoría de las tasas son generales, el filtro por ``idCtaAuxi`` permite manejar excepciones donde un proveedor específico tiene un tratamiento fiscal particular configurado en el sistema.