# Recurso Condicion Comercial (SIFAC)

El recurso **Condicion Comercial** administra la matriz de permisos y relaciones entre los **Grupos de Usuarios** del sistema y las tablas auxiliares de clientes (Reagrupaciones).

Su función principal es definir el **Alcance y Restricción**: permite configurar qué elementos específicos (ej: qué Listas de Precios, qué Vendedores o qué Zonas) están habilitados para un grupo de usuarios determinado. Esto asegura que, por ejemplo, un vendedor solo pueda ver los clientes de su zona o utilizar ciertas listas de precios.

## 📋 Campos y Estructura

Las operaciones se centran en un `idGrupo` (el rol o grupo de usuarios) y un sub-recurso (la entidad a restringir).

| Parámetro / Campo | Tipo | Descripción | Ubicación |
| :--- | :--- | :--- | :---: |
| `idGrupo` | Int | Identificador del Grupo de Usuarios a configurar. | Path |
| `obtenerTambienSoloLectura` | Bool | Filtro para visualizar permisos de solo lectura (Nivel 3). | Query |
| `valuesAndNivelesRestricciones` | Map | **Diccionario clave-valor** enviado en los POST. <br>• **Clave**: ID del ítem (ej: ID de la Lista de Precios).<br>• **Valor**: Nivel de permiso (0=Sin acceso, 1=Alta, 2=Modificación, 3=Consulta). | Body (POST) |

---

## 🛠 Operaciones Disponibles

Todas las operaciones siguen el patrón: `GET` para consultar los permisos actuales y `POST` para sobrescribir/asignar nuevos permisos.

### 💰 Condiciones Comerciales
Configura qué opciones financieras y de venta están disponibles para el grupo.
* **Listas de Precios** (`/listas-de-precios`)
* **Condiciones de Pago** (`/condiciones-de-pagos`)
* **Condiciones de Venta** (`/condiciones-de-ventas`)
* **Descuentos** (`/descuentos`)
* **Descuentos 2** (`/descuentos2`)
* **Topes de Crédito** (`/topes-de-creditos`)

### 🚚 Logística y Distribución
Define la visibilidad sobre la logística.
* **Zonas** (`/zonas`)
* **Transportes** (`/transportes`)
* **Distribuidores** (`/distribuidores`)

### 🏢 Gestión y Contabilidad
Restricciones sobre asignaciones operativas.
* **Vendedores** (`/vendedores`): Define qué vendedores puede asignar este grupo.
* **Conexiones Contables** (`/conexiones-contables`)
* **Observaciones** (`/observaciones`)

---

## 💡 Ejemplos de Uso

### 1. Consultar Listas de Precios Habilitadas
Ver qué listas de precios tiene permitidas el Grupo de Usuarios 5 (ej: "Vendedores Junior"), incluyendo las de solo lectura.

**Recurso**: `Grupos Clientes`

**Operación**: `GET Listas de Precios`

**Endpoint**: `/api/sifac/grupos/5/clientes/listas-de-precios?obtenerTambienSoloLectura=true`

### 2. Asignar Permisos de Zonas (POST)
Configurar al Grupo 10 para que tenga acceso total a la Zona "Norte" (ID 100) y solo lectura a la Zona "Sur" (ID 200).

**Recurso**: `Grupos Clientes`

**Operación**: `POST Zonas`

**Endpoint**: `/api/sifac/grupos/10/clientes/zonas`

**JSON Body**:
```json
{
  "valuesAndNivelesRestricciones": {
    "100": 2, 
    "200": 3  
  }
}
```
(Nota: Los valores 2 y 3 son ejemplos de niveles de restricción internos del sistema).

---

## ⚠️ Notas Técnicas
* **Modelo de Seguridad**: Este recurso no gestiona los datos de los clientes en sí, sino los metadatos de seguridad. Es el backend de la pantalla de "Permisos por Grupo" en la configuración del sistema.

* **Mapa de Valores**: El body del ``POST`` es dinámico (``Dictionary<string, int>``). No tiene una estructura fija de propiedades, sino que acepta los IDs de los elementos como claves dinámicas.

* **Reemplazo Total**: Al realizar un ``POST`` sobre una relación (ej: ``vendedores``), generalmente se actualiza la configuración completa para ese grupo y ese recurso, reemplazando los permisos anteriores.