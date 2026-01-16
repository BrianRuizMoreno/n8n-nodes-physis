# Recurso Combos (Selectores) (SIGES)

El recurso **Combos** proporciona endpoints optimizados para obtener listas simples de entidades.

Su propósito principal es poblar **listas desplegables (dropdowns)** en interfaces de usuario o formularios, donde solo se necesita el ID y la Descripción de la entidad (ej: seleccionar un Vendedor al cargar un pedido), sin cargar toda la información pesada del objeto.

## 📋 Campos de Retorno

Generalmente, estos endpoints devuelven una estructura simplificada:

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` / `codigo` | String/Int | El valor a guardar (Value). |
| `descripcion` / `nombre` | String | El texto a mostrar (Label). |

---

## 🛠 Operaciones Disponibles

### Obtención de Listas
* **Obtener Lista (Combo)** (`getCombo`): Operación unificada para recuperar cualquiera de las listas soportadas.
    * **Tipos soportados**:
        * `Condiciones de Pago` / `Venta`
        * `Vendedores` / `Compradores`
        * `Listas de Precios` (Venta, Compra, VNR)
        * `Transportes`
        * `Descuentos`
        * `Observaciones`

### Metadatos
* **Listar Tipos Disponibles** (`getSearchTypes`): Consulta de utilidad para saber qué tipos de combos expone la API dinámicamente.

---

## 💡 Ejemplos de Uso

### 1. Llenar Selector de Vendedores
En un formulario de Pedido, necesito que el usuario elija un vendedor.

**Recurso**: `Combos` 

**Operación**: `Obtener Lista`

**Parámetro**: 

* Tipo de Lista: `Vendedores`
> *Respuesta*: `[{ "id": "VEN-01", "nombre": "Juan Gomez" }, ...]`

### 2. Obtener Condiciones de Venta
Listar las formas de pago habilitadas (Contado, Cta Cte, Cheque).

**Recurso**: `Combos` 

**Operación**: `Obtener Lista`

**Parámetro**: 

* Tipo de Lista: `Condiciones de Venta`

---

## ⚠️ Notas Técnicas

* **Performance**: Estos endpoints son mucho más rápidos que consultar el recurso completo (ej: usar `/combos/vendedores` es más liviano que `/planes-reagrupacion-auxi/.../cuentas` y filtrar). Úselos siempre que solo necesite validar existencia o mostrar una lista.
* **Deprecación**: El parámetro `idReagAuxi` que aparece en la documentación oficial está marcado como **DEPRECATED**. Este nodo lo omite intencionalmente para asegurar compatibilidad futura.