# Recurso Infraestructura (SACER)

El recurso **Infraestructura** agrupa la gestión de las instalaciones físicas de acopio. Se compone de dos entidades principales:

1.  **Plantas**: Los predios, sucursales o centros de acopio donde se recibe la mercadería.
2.  **Silos**: Las celdas, tanques o silobolsas individuales dentro de una planta donde se almacena el grano.

Este módulo es fundamental para controlar el **Stock Físico** y la capacidad operativa de la empresa.

---

## 📋 Estructura de Datos (Schema)

### 1. Objeto Planta
Es la entidad padre. Define la ubicación y los permisos regulatorios.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codPlanta` | Int | **0** para crear nueva. ID para editar. |
| `descripcion`* | String | Nombre de la planta (ej: "Planta Central"). |
| `domicilio` | String | Dirección física. |
| `localidad` | String | Ciudad. |
| `codONCCA` | Int | Número de matrícula en el registro oficial. |
| `propiedadTercero`| Bool | Si es una planta propia o alquilada/externa. |
| `parametrosTicket`| Array | Configuración de impresión (Numeradores) para esa planta. |

### 2. Objeto Silo
Es la unidad de almacenaje. Se vincula obligatoriamente a una planta.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `codSilo` | Int | **0** para crear nuevo. |
| `codPlanta`* | Int | ID de la planta a la que pertenece. |
| `descripcion`* | String | Nombre/Número (ej: "Celda 1", "Silo 5"). |
| `capacidad` | Decimal | Capacidad máxima en Kilos. |
| `esSiloBolsa` | Bool | Define si es estructura fija o móvil. |
| `codCereal` | Int | (Opcional) Grano predeterminado que almacena. |

---

## 🛠 Operaciones Disponibles

### Gestión de Plantas
* **Listar Plantas** (`getAllPlantas`): Devuelve todas las plantas activas.
    * *Filtro útil*: `traerExistenciaSilos=true`. Si se activa, devuelve la planta con el detalle anidado de todos sus silos y el stock actual de cada uno.
* **Crear / Actualizar Planta**: ABM estándar de sucursales.

### Gestión de Silos
* **Listar Silos** (`getAllSilos`): Lista plana de todos los silos del sistema.
* **Crear Silo** (`createSilo`): Da de alta una nueva celda en una planta existente.
* **Modificar Silo** (`updateSilo`): Permite cambiar la capacidad o descripción.

---

## 💡 Ejemplos de Uso

### 1. Crear una Nueva Planta
**Recurso**: `Infraestructura` 

 **Operación**: `Planta: Crear`

**JSON Body**:
```json
{
  "codPlanta": 0,
  "descripcion": "Planta Pergamino - Ruta 8",
  "domicilio": "Km 220",
  "localidad": "Pergamino",
  "codONCCA": 12345,
  "propiedadTercero": false
}
```
### 2. Agregar un Silo a la Planta
Suponiendo que la planta anterior obtuvo el ID 10. 

**Recurso**: `Infraestructura` 

**Operación**: `Silo: Crear`

**JSON Body**:

```json
{
  "codSilo": 0,
  "codPlanta": 10,
  "descripcion": "Silo A1 - Maíz",
  "capacidad": 500000,
  "esSiloBolsa": false,
  "codCereal": 2
}
```

### 3. Consultar Stock Físico por Planta
Obtener la estructura completa para ver cuánto hay en cada silo. 

**Recurso**: `Infraestructura`

**Operación**: `Planta: Listar` 

**Parámetro**: `traerExistenciaSilos = true`

---

## ⚠️ Notas Técnicas
* **Jerarquía**: No se puede crear un Silo sin referenciar un `codPlanta` válido.

* **Stock (Existencia)**: Aunque el objeto Silo tiene un campo `existencia`, este suele ser de **lectura**. El stock se modifica a través de movimientos (Cartas de Porte, Movimientos Internos), no editando el silo directamente (salvo ajustes de inicialización).

* **Numeradores**: El campo `parametrosTicket` en Planta es vital para que la planta pueda emitir Cartas de Porte o Remitos, ya que define qué "Punto de Venta" fiscal utiliza.