# Recurso Grupos Proveedores (SIFAC)

El recurso **Grupos Proveedores** gestiona la seguridad a nivel de datos (Data Level Security) para los grupos de usuarios, específicamente en lo relacionado con atributos de compras y proveedores.

Permite definir qué opciones auxiliares están disponibles para los usuarios de un grupo al momento de cargar comprobantes de compra (Facturas, Pedidos, Remitos). Por ejemplo, se puede limitar que un grupo de compradores solo pueda utilizar ciertos transportes o ciertas condiciones de pago.

## 📋 Estructura de Asignación (POST)

Todas las operaciones de asignación (`POST`) en este recurso utilizan un mapa de valores y niveles de restricción.

**Estructura del Body JSON:**
```json
{
  "valuesAndNivelesRestricciones": {
    "CLAVE_ELEMENTO_1": 0,
    "CLAVE_ELEMENTO_2": 1
  }
}
```
* **Clave**: Es el ID del elemento auxiliar (ej: "30DIAS" para una condición de pago, o "TRANS-01" para un transporte).

* **Valor**: Es el nivel de acceso (0 generalmente indica acceso permitido/total).

## 🛠 Operaciones Disponibles
**Financiero**
* **Condiciones de Pago**: Controla los plazos permitidos (ej: Contado, 30 Días).

* **Topes de Crédito**: Controla los límites de crédito asignables.

* **Descuentos**: Controla qué estructuras de descuento pueden aplicar.

* **Conexiones Contables**: Controla las imputaciones contables disponibles.

**Logística y Gestión**
* **Transportes**: Define qué empresas de logística se pueden seleccionar.

**Vendedores (* Compradores)**: Define qué agentes de compra/venta están visibles.

* **Observaciones**: Restringe el uso de textos predefinidos.

## 💡 Ejemplos de Uso

### 1. Consultar Transportes Permitidos
Ver qué transportistas puede asignar el Grupo ID 5.

**Recurso**: ``Grupos Proveedores`` 

**Operación**: ``Transportes: Listar``

**Parámetros**:

* ID Grupo: ``5``

* jsonBody: ``{ "obtenerTambienSoloLectura": true }``

### 2. Restringir Condiciones de Pago
Configurar el Grupo ID 10 para que SOLO pueda operar con la condición de pago "CONTADO" y "30DIAS".

**Recurso**: ``Grupos Proveedores`` 

**Operación**: ``Cond. Pago: Asignar``

**Parámetros**:

* ID Grupo: ``10``

**JSON Body**:

```json
{
  "valuesAndNivelesRestricciones": {
    "CONTADO": 0,
    "30DIAS": 0
  }
}
```

---

## ⚠️ Notas Técnicas
* **Acción Destructiva**: Las operaciones **POST** sobrescriben la configuración existente para el recurso específico en ese grupo. Si se envía un JSON con solo dos elementos, el grupo perderá acceso a cualquier otro elemento que tuviera asignado previamente.

* **Vendedores**: En el contexto de proveedores/compras, el endpoint vendedores suele referirse a los "Compradores" o responsables de la cuenta, aunque el nombre técnico del recurso se mantenga.