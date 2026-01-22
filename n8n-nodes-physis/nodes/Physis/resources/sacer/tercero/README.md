# Recurso Tercero (SACER)

El recurso **Tercero** en SACER gestiona las entidades comerciales que interactúan en la operatoria de granos. Aunque contablemente son "Terceros" (clientes/proveedores), en SACER se categorizan funcionalmente en:

1.  **Productores**: Quienes entregan el grano.
2.  **Corredores**: Intermediarios comerciales.
3.  **Transportistas**: Empresas de logística.

## 📋 Estructura de Datos (Schema)

*Nota: La estructura de respuesta varía según el tipo de tercero, pero comparten identificadores comunes.*

| Campo Clave | Tipo | Descripción |
| :--- | :--- | :--- |
| `idAuxi` | Int | Código numérico del tercero (Titular). |
| `idCtaAuxi` | String | Código de la cuenta (ej. "PRO", "CLI", "COR"). |
| `nombre` | String | Razón Social o Nombre. |
| `cuit` | String | Clave Única de Identificación Tributaria. |

---

## 🛠 Operaciones Disponibles

### 👥 Listados Específicos
* **Productores** (`getProductores`): Lista todos los productores activos.
* **Corredores** (`getCorredores`): Lista intermediarios.
* **Transportistas** (`getTransportistas`): Lista empresas de transporte.
* **Por Tipo** (`getByTipo`): Lista terceros filtrando por `codTipoTercero`.

### 📍 Domicilios
* **Listar Domicilios** (`getDomicilios`): Obtiene las direcciones registradas para un tercero específico.
* **Domicilio Detalle** (`getDomicilio`): Consulta una dirección puntual por código.

---

## 💡 Ejemplos de Uso

### 1. Obtener Lista de Productores
Para poblar un selector en la carga de Carta de Porte.

**Recurso**: `Tercero`
**Operación**: `Productores: Listar`

### 2. Buscar Domicilios de un Cliente
Obtener las plantas o direcciones de entrega del tercero 1020 (Cuenta "CLI").

**Recurso**: `Tercero`
**Operación**: `Domicilios: Listar`
**Parámetros**:
* **idAuxi**: `1020`
* **idCtaAuxi**: `CLI`

---

## ⚠️ Notas Técnicas
**Identificación**: Un tercero se identifica únicamente por la combinación compuesta de `idAuxi` (Entidad legal) + `idCtaAuxi` (Rol contable). Un mismo CUIT puede tener rol de "Proveedor" y "Cliente" simultáneamente.