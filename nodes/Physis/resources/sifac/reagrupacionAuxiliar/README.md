# Recurso Reagrupaciones Auxiliares (SIFAC)

El recurso **Reagrupaciones Auxiliares** es un servicio utilitario diseñado para recuperar la configuración predeterminada de un Tercero (Cliente o Proveedor).

Su función principal es devolver los atributos categóricos asignados a una cuenta (como su Vendedor, Zona, Lista de Precios o Cuenta Contable asociada) para automatizar la carga de comprobantes. Cuando un usuario selecciona un cliente en una factura, este endpoint provee los datos necesarios para pre-completar el formulario.

## 📋 Parámetros de Identificación

Para obtener los datos, es necesario identificar unívocamente al tercero mediante su par de claves:

| Parámetro | Tipo | Descripción | Ubicación |
| :--- | :--- | :--- | :---: |
| `idAuxi` | Integer | Tipo de auxiliar (ej: 1=Cliente, 2=Proveedor). | Path |
| `idCtaAuxi` | String | Código de la cuenta del tercero (ej: "C001"). | Path |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Obtener Defaults por Tercero** (`getDefault`): Recupera el conjunto de reagrupaciones (categorías) asociadas a un cliente o proveedor específico.

---

## 💡 Ejemplos de Uso

### 1. Obtener Configuración de un Cliente
Al crear un Pedido, se necesita saber qué lista de precios y vendedor tiene asignados el cliente "CLI-99" (Tipo de Auxiliar 1).

**Recurso**: `Reagrupaciones Auxiliares` 

**Operación**: `Obtener Defaults`

**Endpoint**:
`GET /api/sifac/reagrupaciones-auxiliares/1/CLI-99/default`

**Respuesta Esperada (Concepto)**:
El sistema devolverá un objeto conteniendo los IDs de las reagrupaciones, por ejemplo:
* IdVendedor asociado.
* IdListaPrecios asociada.
* IdZona asociada.
* IdCondicionPago asociada.

---

## ⚠️ Notas Técnicas

* **Estructura de Respuesta**: El esquema de respuesta documentado sigue el patrón estándar de SIFAC (con envoltorios de `mensajes`, `validaciones` y `filtros`). Los datos concretos de las reagrupaciones se encontrarán dentro de la estructura de retorno principal.
* **Uso en UI**: Este endpoint es crítico para la experiencia de usuario (UX), ya que evita que el operador tenga que recordar o buscar manualmente las condiciones comerciales de cada cliente al momento de facturar.