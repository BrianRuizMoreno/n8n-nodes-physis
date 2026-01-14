# Recurso Especie (SACH)

El recurso **Especie** administra el catálogo de tipos de animales que comercializa la empresa (ej: Bovinos, Porcinos, Ovinos). Es la clasificación de más alto nivel en el módulo de Hacienda, de la cual dependen luego las **Categorías**.

Permite configurar atributos fiscales y regulatorios críticos, como los códigos de homologación con AFIP y si la especie aplica para regímenes especiales (LSP).

## 📋 Campos Principales (Schema)

Al utilizar las operaciones **Crear** o **Actualizar**, el sistema espera un objeto JSON con la siguiente estructura.

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :---: |
| `idEspecie` | Int | Código identificador (0 para crear nueva). | Sí |
| `descripcion` | String | Nombre de la especie (ej: "Bovinos"). | Sí |
| `especieAFIP` | Int | Código oficial de AFIP para facturación. | No |
| `aplicaLSP` | Bool | Si aplica Ley de Solidaridad Previsional (u otro régimen). | No |
| `brutoExentoIVA` | Bool | Si el importe bruto está exento de IVA por defecto. | No |
| `porcenReduc` | Decimal | Porcentaje de reducción (si aplica). | No |

---

## 🛠 Operaciones Disponibles

### Consultas
* **Listar Especies** (`getAll`): Devuelve el listado completo de especies configuradas.
* **Obtener por ID** (`get`): Recupera el detalle de una especie específica.

### ABM (Escritura)
* **Crear** (`create`): Da de alta una nueva especie en el sistema.
* **Actualizar** (`update`): Modifica los datos de una especie existente.
* **Eliminar** (`delete`): Borra una especie (si no tiene categorías ni movimientos asociados).

---

## 💡 Ejemplos de JSON

### 1. Crear Especie "Porcinos"
Registra una nueva especie con su código de homologación fiscal.

**Recurso**: `Especie` 

**Operación**: `Crear`

**JSON Body**:
```json
{
  "idEspecie": 0,
  "descripcion": "Porcinos",
  "especieAFIP": 2,
  "aplicaLSP": false,
  "brutoExentoIVA": false
}
```

### 2. Actualizar Configuración
Modifica una especie existente para indicar que aplica un régimen especial.

**Recurso**: ``Especie``  

**Operación**: ``Actualizar`` 

**JSON Body**:

```json
{
  "idEspecie": 1,
  "descripcion": "Bovinos",
  "aplicaLSP": true
}
```

---

## ⚠️ Notas Técnicas
* **Jerarquía**: La Especie es el padre de la ``Categoría``. Antes de crear categorías (ej: Novillo, Ternero), debe existir la especie correspondiente (ej: Bovinos).

* **AFIP**: El campo ``especieAFIP`` es obligatorio para que los comprobantes electrónicos (Liquidaciones, Facturas de Crédito) sean validados correctamente por el organismo fiscal.