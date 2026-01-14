# Recurso Zonas (SIFAC)

El recurso **Zonas** administra la segmentación geográfica o lógica de los clientes.

En SIFAC, las zonas funcionan como una "Reagrupación Auxiliar". Permiten clasificar a los clientes por región (ej: "Norte", "Sur"), ruta logística o área comercial. Este dato es fundamental para organizar hojas de ruta, asignar listas de precios por región o filtrar reportes de ventas.

## 📋 Campos Principales (Schema)

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCtaReagAuxi` | String | Código único de la zona (ej: "ZN-01"). | Sí |
| `nombre` | String | Descripción o nombre de la zona. | Sí |
| `sigla` | String | Código corto o abreviatura. | Sí |
| `imputable` | Bool | `true`: Es una zona asignable. `false`: Es una carpeta/región. | Sí |
| `observaciones` | String | Notas internas. | No |

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Registra una nueva zona.
* **Modificar** (`update`): Actualiza el nombre o la sigla de una zona existente.
* **Obtener por ID** (`get`): Recupera el detalle de una zona.
* **Eliminar** (`delete`): Borra una zona (si no está asignada a clientes).

### Consultas
* **Árbol de Zonas** (`getArbol`): Devuelve la estructura jerárquica de zonas. Es el método utilizado para poblar los selectores en la ficha del Cliente.
    * *Filtros*: `imputables`, `noImputables`, `cuentaPadre`.

---

## 💡 Ejemplos de JSON

### 1. Crear Nueva Zona
Registrar la "Zona Centro" con el código "Z-CEN".

**Recurso**: `Zonas` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idCtaReagAuxi": "Z-CEN",
  "sigla": "CEN",
  "nombre": "Zona Centro",
  "imputable": true,
  "observaciones": "Comprende radio céntrico y macrocentro"
}
```

### 2. Modificar Zona
Actualizar el nombre de la zona "Z-CEN".

**Recurso**: ``Zonas`` 

**Operación**: ``Modificar``

**JSON Body**:

```json
{
  "idCtaReagAuxi": "Z-CEN",
  "sigla": "CEN",
  "nombre": "Zona Centro Ampliada",
  "imputable": true,
  "observaciones": "Se agregaron barrios aledaños"
}
```

### 3. Respuesta de Estructura de Árbol
Ejemplo de respuesta del endpoint de árbol, mostrando una región (No imputable) que contiene una zona específica (Imputable).

**Recurso**: ``Zonas`` 

**Operación**: ``Árbol de Zonas``

**JSON Response**:

```json
[
  {
    "text": "Provincia de Santa Fe",
    "codigo": "SF",
    "descripcion": "Región Santa Fe",
    "nivel": 1,
    "imputable": false,
    "items": [
      {
        "text": "Rosario - Zona Sur",
        "codigo": "ROS-SUR",
        "descripcion": "Rosario Sur",
        "nivel": 2,
        "imputable": true,
        "items": []
      }
    ]
  }
]
```

---

## ⚠️ Notas Técnicas
**Jerarquía (imputable)**: Al igual que en Rubros o Vendedores, el campo ``imputable`` define el comportamiento.

* ``false``: Actúa como carpeta contenedora (ej: "Provincia de Córdoba"). No se puede asignar a un cliente.

* ``true``: Es una zona operativa (ej: "Córdoba Capital"). Sí se puede asignar a un cliente.

**Integración**: Este recurso es un maestro auxiliar. Su ID (``idCtaReagAuxi``) se utiliza posteriormente en el recurso Clientes para llenar el campo ``idZona``.