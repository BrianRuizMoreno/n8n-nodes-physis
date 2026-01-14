# Recurso Grupos Productos (SIFAC)

El recurso **Grupos Productos** gestiona la seguridad a nivel de fila (Data Level Security) para los Grupos de Usuarios de Physis, específicamente enfocada en la **visibilidad del catálogo**.

Permite definir qué artículos o familias de productos puede ver u operar un grupo de usuarios determinado.

## 📋 Estructura de Asignación

La operación de asignación (`POST`) utiliza una estructura JSON específica para definir las relaciones masivas.

### Asignación de Productos (`updateProductos`)
Se envía un array de objetos `restriccion`.

```json
{
  "restricciones": [
    {
      "idProducto": "SOJA",
      "digitos": "string", // Opcional, para máscaras
      "nivel": 0,          // Nivel de acceso
      "restriccion": 0     // Tipo de restricción
    },
    {
      "idProducto": "MAIZ",
      "nivel": 0,
      "restriccion": 0
    }
  ]
}
```

## 🛠 Operaciones Disponibles

**Productos (Catálogo)**
* **Listar Asignados** (``getProductos``): Devuelve los productos habilitados para el grupo.

* **Detalle Restricciones** (``getProductosRestricciones``): Consulta técnica de las reglas aplicadas.

* **Asignar/Actualizar**(``updateProductos``): Define (sobrescribe) qué productos puede ver/usar el grupo.

## 💡 Ejemplos de Uso

### 1. Consultar Catálogo Visible
Ver qué productos puede operar el Grupo de "Vendedores Junior" (ID 15).

**Recurso**: ``Grupos Productos`` 

**Operación**: ``Productos: Listar Asignados``

**Parámetros**:

* ID Grupo: ``15``

### 2. Restringir Grupo a Ciertos Productos
Configurar el Grupo ID 20 para que SOLO opere con los productos "SOJA" y "MAIZ".

**Recurso**: ``Grupos Productos`` 

**Operación**: ``Productos: Asignar/Actualizar``

**Parámetros**:

* ID Grupo: ``20``

**JSON Body**:

```json
{
  "restricciones": [
    { "idProducto": "SOJA", "nivel": 0, "restriccion": 0 },
    { "idProducto": "MAIZ", "nivel": 0, "restriccion": 0 }
  ]
}
```

---

## ⚠️ Notas Técnicas
* **IDs de Grupo**: El ``idGrupo`` es un entero (``integer($int32)``).

* **Sobreescritura**: La operación **POST** reemplaza la configuración anterior para ese grupo.