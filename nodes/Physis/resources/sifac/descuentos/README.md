# Recurso Descuentos Clientes (SIFAC)

El recurso **Descuentos Clientes** administra el maestro de bonificaciones comerciales.

Estos descuentos funcionan como entidades auxiliares que se pueden asignar directamente a un cliente (como condición comercial por defecto) o utilizarse manualmente en los comprobantes de venta. Permite definir descuentos porcentuales o importes fijos.

## 📋 Campos Principales (Schema)

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCtaReagAuxi` | String | Código único del descuento (ej: "DTO-10"). | Sí |
| `nombre` | String | Descripción (ej: "Descuento Pago Contado"). | Sí |
| `sigla` | String | Alias corto (ej: "CONTADO"). | Sí |
| `porcentaje` | Decimal | Valor porcentual a descontar (ej: 10.00). | No* |
| `importe` | Decimal | Valor fijo monetario a descontar (ej: 500.00). | No* |
| `imputable` | Bool | `true`: Es un descuento aplicable. `false`: Es una carpeta. | Sí |

*\* Generalmente se usa uno de los dos (`porcentaje` o `importe`), aunque técnicamente el modelo soporta ambos.*

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Árbol** (`getArbol`): Devuelve la estructura jerárquica. Útil para poblar selectores.
* **Obtener por ID** (`get`): Busca por el código principal (`idCtaReagAuxi`).
* **Obtener por Alias** (`getByAlias`): Busca por el campo `sigla` o alias.

### Gestión (ABM)
* **Crear** (`create`): Da de alta un nuevo esquema de descuento.
* **Modificar** (`update`): Actualiza valores o descripciones.
* **Eliminar** (`delete`): Borra el descuento.

---

## 💡 Ejemplos de JSON

### 1. Crear Descuento del 10%
Registrar un descuento porcentual para pagos en efectivo.

**Recurso**: `Descuentos Clientes` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idCtaReagAuxi": "DTO-EFEC",
  "sigla": "EFECTIVO",
  "nombre": "Descuento Pago Efectivo",
  "porcentaje": 10.00,
  "importe": 0,
  "imputable": true,
  "observaciones": "Solo aplicable en mostrador"
}
```

### 2. Buscar por Alias
Recuperar los datos del descuento usando su sigla.

**Recurso**: ``Descuentos Clientes`` 

**Operación**: ``Obtener por Alias``

**JSON Body**:

```json
{
  "alias": "EFECTIVO"
}
```

### 3. Listar Solo Descuentos Imputables
Obtener la lista plana de descuentos aplicables (ignorando carpetas o grupos).

**Recurso**: ``Descuentos Clientes`` 

**Operación**: ``Listar Árbol``

**JSON Body (Filtros)**:

```json
{
  "imputables": true,
  "noImputables": false,
  "unSoloNivel": false
}
```

---

## ⚠️ Notas Técnicas
* **Jerarquía**: Al igual que Zonas o Vendedores, si ``imputable`` es ``false``, el registro actúa como un agrupador y no puede ser usado en cálculos de facturación.

* **Uso en Ventas**: El ``idCtaReagAuxi`` es el valor que se debe asignar en el campo de descuento al crear una Factura o Pedido, o asociar a la ficha del Cliente.