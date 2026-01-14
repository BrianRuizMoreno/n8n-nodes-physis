# Recurso Vendedores (SIFAC)

El recurso **Vendedores** administra el maestro de la fuerza de ventas de la empresa.

En SIFAC, los vendedores son entidades auxiliares que se asignan a los **Clientes** (como vendedor por defecto) y a los **Comprobantes** (Facturas, Pedidos) para el cálculo de comisiones y reportes de gestión comercial. Al igual que otros auxiliares, soportan una estructura jerárquica (Árbol), permitiendo agrupar vendedores por zonas o equipos.

## 📋 Campos Principales (Schema)

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idCtaReagAuxi` | String | Código único del vendedor (ej: "VEN-01"). | Sí |
| `nombre` | String | Nombre y Apellido o Razón Social. | Sí |
| `sigla` | String | Alias o código corto (ej: "JPEREZ"). | Sí |
| `imputable` | Bool | `true`: Es un vendedor. `false`: Es un grupo/zona. | Sí |
| `comision` | Decimal | % de comisión por venta. | No |
| `comisionCobranza` | Decimal | % de comisión por cobranza realizada. | No |
| `email` | String | Correo electrónico de contacto. | No |
| `domicilioCalle` | String | Dirección del vendedor. | No |

---

## 🛠 Operaciones Disponibles

### Gestión (ABM)
* **Crear** (`create`): Da de alta un nuevo vendedor.
* **Modificar** (`update`): Actualiza datos (ej: cambio de % de comisión, dirección).
* **Obtener por ID** (`get`): Recupera el detalle completo de un vendedor.
* **Eliminar** (`delete`): Borra un vendedor (si no tiene operaciones asociadas).

### Consultas
* **Árbol de Vendedores** (`getArbol`): Devuelve la estructura jerárquica de la fuerza de ventas. Es el método principal para listar vendedores disponibles para asignar en combos o selectores.
    * *Filtros*: `imputables` (Solo vendedores reales), `noImputables` (Grupos/Carpetas), `cuentaPadre` (Filtrar por una rama/zona específica).

---

## 💡 Ejemplos de JSON

### 1. Registrar un Nuevo Vendedor
Dar de alta a "Juan Pérez" con el código "V05", asignarle una comisión del 3% y datos de contacto.

**Recurso**: `Vendedores` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idCtaReagAuxi": "V05",
  "sigla": "JPEREZ",
  "nombre": "Juan Pérez",
  "imputable": true,
  "observaciones": "Ingresó en Enero 2026 - Zona Norte",
  "idTipoDocumento": "80",
  "nroDocumento": "20-30444555-6",
  "domicilioCalle": "Av. Libertador",
  "domicilioNumero": "1000",
  "domicilioPiso": "1",
  "domicilioDepto": "A",
  "localidad": "Rosario",
  "codigoPostal": "2000",
  "idProvincia": 1, 
  "idPais": 1,
  "telefonos": "0341-155123456",
  "email": "juan.perez@empresa.com",
  "comision": 3.00,
  "comisionCobranza": 1.50
}
```

### 2. Actualizar Comisiones y Datos
Modificar al vendedor "V05": se le sube la comisión al 5% y se corrige su email.

**Recurso**: ``Vendedores`` 

**Operación**: ``Modificar``

**JSON Body**:

```json
{
  "idCtaReagAuxi": "V05",
  "sigla": "JPEREZ",
  "nombre": "Juan Pérez",
  "imputable": true,
  "observaciones": "Comisión actualizada por gerencia",
  "email": "juan.perez.nuevo@empresa.com",
  "comision": 5.00,
  "comisionCobranza": 1.50,
  // Se recomienda enviar el resto de datos para mantener consistencia si la API es PUT estricto
  "domicilioCalle": "Av. Libertador",
  "domicilioNumero": "1000",
  "localidad": "Rosario"
}
```

### 3. Respuesta de Estructura de Árbol
Ejemplo de lo que devuelve el endpoint de árbol, mostrando una carpeta (Zona) y un vendedor dentro.

**Recurso**: ``Vendedores`` 

**Operación**: ``Árbol de Vendedores``

**JSON Response**:

```json
[
  {
    "text": "Zona Norte",
    "codigo": "ZN",
    "descripcion": "Zona Norte",
    "nivel": 1,
    "imputable": false,
    "items": [
      {
        "text": "Juan Pérez",
        "codigo": "V05",
        "descripcion": "Juan Pérez",
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
**Jerarquía (imputable)**: El campo ``imputable`` es vital. Si se crea con ``false``, el sistema lo tratará como una carpeta agrupadora (ej: "Vendedores Zona Norte") y no permitirá asignarlo a una factura. Para vendedores operativos que comisionan, siempre debe ser ``true``.

**Integración**: El ``idCtaReagAuxi`` es la clave foránea utilizada en:

* Clientes: Campo ``idVendedor`` (Vendedor asignado por defecto).

* Pedidos/Facturas: Campo ``idVendedor`` en la cabecera del comprobante.

**Rutas**:

* ABM (Alta/Baja/Mod): ``/api/sifac/vendedores``

* Árbol (Consulta): ``/api/sifac/clientes/vendedores/arbol``