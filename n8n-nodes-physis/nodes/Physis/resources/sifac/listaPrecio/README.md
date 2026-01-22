# Recurso Listas de Precios (SIFAC)

El recurso **Listas de Precios** gestiona las tarifas habilitadas para la venta. Define la moneda, la vigencia y las reglas de negocio para la valorización de los productos en los comprobantes.

Al igual que otros maestros de SIFAC, este recurso soporta una estructura jerárquica (árbol), permitiendo agrupar listas bajo carpetas (Nodos no imputables) o definir listas concretas (Nodos imputables) para asignar a los clientes.

## 📋 Campos Principales (Schema)

La creación de una lista de precios es potente: permite crear una lista vacía o **generar una nueva basada en otra existente**, aplicando aumentos porcentuales o fijos automáticos en el mismo paso.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCtaReagAuxi` | String | Código único (ej: "L-MAYORISTA"). | Sí |
| `descripcion` | String | Nombre visible de la lista. | Sí |
| `idMoneda` | String | Código de moneda (ej: "PES", "DOL"). | Sí |
| `imputable` | Bool | Si `true`, es una lista utilizable. Si `false`, es una carpeta agrupada. | Sí |
| `listaVigente` | Bool | Indica si la lista está activa para la venta. | No |
| `copiarListaPrecios` | Bool | **Acción**: Indica si se copian precios de otra lista. | No |
| `listaPreciosACopiar` | String | ID de la lista base para la copia. | Req. si copia |
| `porcentaje` | Decimal | % de aumento a aplicar sobre la lista base. | No |
| `redondeo` | Int | Regla de redondeo de decimales. | No |

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Da de alta una nueva lista. Puede disparar procesos de copia de precios.
* **Modificar** (`update`): Actualiza cabecera o reglas de la lista.
* **Obtener por ID** (`get`): Recupera el detalle de la configuración de una lista.
* **Eliminar** (`delete`): Borra una lista de precios.

### Consultas de Estructura
* **Listar Todas** (`getAll`): Listado plano de listas.
* **Árbol de Listas** (`getArbol`): Estructura jerárquica para selectores de UI.
    * *Filtros*: `imputables` (hojas), `noImputables` (carpetas), `cuentaPadre` (navegación por niveles).

---

## 💡 Ejemplos de JSON

### 1. Crear Lista Simple (Vacía)
Da de alta una lista manual en Dólares.

**Recurso**: `Listas de Precios` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idCtaReagAuxi": "EXP-2026",
  "descripcion": "Exportación 2026",
  "idMoneda": "DOL",
  "imputable": true,
  "listaVigente": true,
  "idTipo": "GENERAL"
}
```

### 2. Generar Lista con Aumento Masivo
Crea la lista "FEBRERO" copiando los precios de "ENERO" y aplicando un 10% de aumento automáticamente.

**Recurso**: ``Listas de Precios`` 

**Operación**: ``Crear``

**JSON Body**:

```json
{
  "idCtaReagAuxi": "FEB-2026",
  "descripcion": "Lista Febrero con Aumento",
  "idMoneda": "PES",
  "imputable": true,
  "listaVigente": true,
  "copiarListaPrecios": true,
  "listaPreciosACopiar": "ENE-2026",
  "aumentar": true,
  "porcentaje": 10.00,
  "redondeo": 2
}
```

### 3. Consultar Árbol de Selección
Obtener solo las listas válidas (imputables) para llenar un combo en la factura, excluyendo carpetas organizativas.

**Recurso**: ``Listas de Precios`` 

**Operación**: ``Árbol de Listas``

**Parámetros (Query)**:

* imputables: ``true``

* noImputables: ``false``

---

## ⚠️ Notas Técnicas
* **Jerarquía (cuentaPadre)**: Este recurso permite organizar listas dentro de otras. Por ejemplo, una carpeta "2025" (``imputable: false``) que contenga "Enero", "Febrero", etc. Para obtener solo los hijos de esa carpeta, se usa el filtro ``cuentaPadre``.

* **Motor de Precios**: El ``POST`` es una operación pesada si se activa ``copiarListaPrecios``, ya que el backend duplica miles de registros de precios de productos y aplica la fórmula matemática (Porcentaje/Importe Fijo) en ese momento.

* **Vigencia**: El campo ``listaVigente`` y ``fechaBaja`` controlan la visibilidad de la lista en los procesos de venta, pero no eliminan los precios históricos.