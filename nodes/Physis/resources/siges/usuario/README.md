# Recurso Usuarios (SIGES)

El recurso **Usuarios** permite la administración de los perfiles de acceso al sistema.

Además de consultar los datos básicos y credenciales de los operadores, su función más crítica en entornos web es la **Vinculación Usuario-Tercero**. Esto permite definir qué entidades comerciales (Clientes, Proveedores, Vendedores) puede gestionar un usuario específico al loguearse en los portales de autogestión.

## 📋 Campos Principales

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `idUsuario` | Int | Identificador único del operador o usuario del sistema. |
| `nombre` | String | Nombre completo o Razón Social asociada al usuario. |
| `login` | String | Nombre de usuario o correo electrónico para iniciar sesión. |
| `tercerosAsociados` | Array | Lista de cuentas (Clientes/Proveedores) que este usuario tiene permiso de ver. |

---

## 🛠 Operaciones Disponibles

### Consulta de Perfiles
* **Listar Usuarios** (`getAll`): Devuelve el directorio completo de usuarios registrados con sus datos básicos.
* **Obtener Detalle** (`get`): Recupera la ficha completa de un usuario específico (`idUsuario`).

### Gestión de Permisos (Relación con Terceros)
Estas operaciones son fundamentales para configurar **Portales Web**.
* **Consultar Terceros Asignados** (`getAssociatedTerceros`): Devuelve la lista de cuentas (ej: qué Proveedores) están vinculados a un usuario.
* **Asignar Terceros** (`linkTerceros`): Vincula una o más cuentas auxiliares a un usuario.
    * *Uso*: Si el usuario "Juan Perez" es el contacto comercial de "Empresa A" y "Empresa B", se utiliza este endpoint para darle acceso a la información de ambas empresas con un solo login.

---

## 💡 Ejemplos de Uso

### 1. Obtener Lista de Usuarios
Recuperar todos los operadores para mostrarlos en una grilla de administración.

**Recurso**: `Usuarios` 

**Operación**: `Listar Usuarios`

### 2. Configurar Acceso a Portal de Proveedores
El usuario con ID `55` debe tener acceso a ver las facturas del proveedor con código `PROV-001` y `PROV-002`.
(Asumiendo que `idAuxi` 200 corresponde al plan de Proveedores).

**Recurso**: `Usuarios` 

**Operación**: `Asignar Terceros`

**Parámetros (Path)**:

* idUsuario: `55`
* idAuxi: `200` (Proveedores)

**Body (Array de Strings)**:
```json
[
  "PROV-001",
  "PROV-002"
]
```

### 3. Verificar a quién representa un Usuario
Al iniciar sesión en el portal, el sistema necesita saber de qué cliente mostrar los datos.

**Recurso**: Usuarios 

**Operación**: Consultar Terceros Asignados

**Parámetros**:

* idUsuario: ``55``

* idAuxi: ``100`` (Clientes)

---

## ⚠️ Notas Técnicas
* **Seguridad**: Estos endpoints suelen requerir permisos de Administrador, ya que exponen la totalidad de la base de usuarios y sus relaciones comerciales.

* **Body del POST**: La operación de asignación (**POST**) espera un Array de Strings simple en el cuerpo de la petición, donde cada string es el ``idCtaAuxi`` (Código) del tercero a vincular.