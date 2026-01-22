# Recurso Observaciones (SIFAC)

El recurso **Observaciones** administra el catálogo de notas predefinidas o leyendas estándar.

Estas observaciones funcionan como auxiliares que se pueden vincular a **Clientes** (como nota por defecto en sus comprobantes) o seleccionarse manualmente al momento de crear Facturas, Pedidos o Remitos. Son útiles para estandarizar comunicaciones como instrucciones de entrega, condiciones especiales o advertencias.

## 📋 Campos Principales (Schema)

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCtaReagAuxi` | String | Código único de la observación (ej: "OBS-01"). | Sí |
| `nombre` | String | Texto principal de la nota (ej: "Entregar por depósito lateral"). | Sí |
| `sigla` | String | Alias corto para búsqueda rápida. | Sí |
| `imputable` | Bool | `true`: Es una nota utilizable. `false`: Es una carpeta. | Sí |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Árbol** (`getArbol`): Devuelve la estructura jerárquica de observaciones disponibles.

### Gestión (ABM)
* **Crear** (`create`): Da de alta una nueva nota estándar.
* **Modificar** (`update`): Edita el texto o alias de la nota.
* **Eliminar** (`delete`): Borra la nota (si no está en uso).

---

## 💡 Ejemplos de JSON

### 1. Crear Nota de Entrega
Registrar una observación para indicar horario de recepción.

**Recurso**: `Observaciones` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idCtaReagAuxi": "ENT-PM",
  "sigla": "PM",
  "nombre": "Horario de Entrega: 14:00 a 18:00 Hs",
  "imputable": true,
  "observaciones": "Solo días hábiles"
}
```

### 2. Modificar Nota
Corregir el texto de la observación "ENT-PM".

**Recurso**: ``Observaciones`` 

**Operación**: ``Modificar``

**JSON Body**:

```json
{
  "idCtaReagAuxi": "ENT-PM",
  "sigla": "PM",
  "nombre": "Horario de Entrega: 13:00 a 17:00 Hs (Horario Invierno)",
  "imputable": true
}
```

### 3. Listar Notas Disponibles
Obtener lista plana de observaciones imputables.

**Recurso**: ``Observaciones`` 

**Operación**: ``Listar Árbol``

**JSON Body (Filtros)**:

```json
{
  "imputables": true,
  "noImputables": false
}
```

---

## ⚠️ Notas Técnicas
* **Integración**: El ``idCtaReagAuxi`` de este recurso se utiliza en los campos ``idObservacion`` de las cabeceras de Pedidos (``Pedidos``), Facturas y la ficha del Cliente.

* **Jerarquía**: Si ``imputable`` es ``false``, actúa como una categoría (ej: "Notas de Logística", "Notas Administrativas") para organizar las notas reales dentro.